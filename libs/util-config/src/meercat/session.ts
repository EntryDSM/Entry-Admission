import Cookies from 'js-cookie';
import type { SessionStartResponse, NetworkTest } from './types';
import { MEERCAT_API_BASE, SESSION_COOKIE_KEY, LAST_HEALTHCHECK_KEY, COOKIE_DOMAIN, COOKIE_EXPIRES, SESSION_TIMEOUT_MS } from './constants';
import { performBasicNetworkTest, performDetailedNetworkTest, getBrowserType, getDeviceType } from './utils';

export const sendNetworkTestResult = async (sessionId: string, networkTest: NetworkTest): Promise<void> => {
  try {
    const qualityRating =
      networkTest.downloadSpeed > 50 && networkTest.latency < 100 ? 'good' :
      networkTest.downloadSpeed > 20 && networkTest.latency < 200 ? 'fair' :
      'poor';

    await fetch(`${MEERCAT_API_BASE}/network/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        latency: networkTest.latency,
        downloadSpeed: networkTest.downloadSpeed,
        uploadSpeed: networkTest.uploadSpeed,
        jitter: networkTest.jitter,
        packetLoss: networkTest.packetLoss,
        connectionType: networkTest.connectionType,
        qualityRating,
      }),
    });
  } catch (error) {
    console.error('Failed to send network test result:', error);
  }
};

export const startSession = async (existingSessionId?: string): Promise<string | null> => {
  try {
    // 빠른 기본 테스트만 수행 (Latency만 측정, ~100ms 이내)
    const basicNetworkTest = await performBasicNetworkTest();

    const response = await fetch(`${MEERCAT_API_BASE}/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: window.location.hostname,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        entryPoint: window.location.pathname,
        referrer: document.referrer || 'direct',
        networkTest: basicNetworkTest,
        domLoadTime: Math.round(performance.timing?.domContentLoadedEventEnd - performance.timing?.navigationStart) || 0,
        browserType: getBrowserType(),
        deviceType: getDeviceType(),
        ...(existingSessionId && { existingSessionId }),
      }),
    });

    if (!response.ok) {
      throw new Error('Session start failed');
    }

    const data: SessionStartResponse = await response.json();
    const sessionId = data.data.sessionId;

    // 백그라운드에서 비동기로 상세 테스트 수행 (블로킹 안 됨)
    performDetailedNetworkTest()
      .then((detailedTest) => sendNetworkTestResult(sessionId, detailedTest))
      .catch((error) => console.error('Background network test failed:', error));

    return sessionId;
  } catch (error) {
    console.error('Failed to start session:', error);
    return null;
  }
};

export const getSessionId = (): string | undefined => {
  return Cookies.get(SESSION_COOKIE_KEY);
};

export const setSessionId = (sessionId: string): void => {
  Cookies.set(SESSION_COOKIE_KEY, sessionId, {
    domain: COOKIE_DOMAIN,
    expires: COOKIE_EXPIRES,
    secure: true,
    sameSite: 'lax',
  });
  updateLastHealthcheckTime();
};

export const getLastHealthcheckTime = (): number | null => {
  const timestamp = Cookies.get(LAST_HEALTHCHECK_KEY);
  return timestamp ? parseInt(timestamp, 10) : null;
};

export const updateLastHealthcheckTime = (): void => {
  Cookies.set(LAST_HEALTHCHECK_KEY, Date.now().toString(), {
    domain: COOKIE_DOMAIN,
    expires: COOKIE_EXPIRES,
    secure: true,
    sameSite: 'lax',
  });
};

export const isSessionValid = (): boolean => {
  const sessionId = getSessionId();
  if (!sessionId) return false;

  const lastHealthcheck = getLastHealthcheckTime();
  if (!lastHealthcheck) return false;

  const timeSinceLastHealthcheck = Date.now() - lastHealthcheck;
  return timeSinceLastHealthcheck < SESSION_TIMEOUT_MS;
};

export const clearSession = (): void => {
  Cookies.remove(SESSION_COOKIE_KEY, { domain: COOKIE_DOMAIN });
  Cookies.remove(LAST_HEALTHCHECK_KEY, { domain: COOKIE_DOMAIN });
};
