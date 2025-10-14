import Cookies from 'js-cookie';
import type { SessionStartResponse } from './types';
import { MEERCAT_API_BASE, SESSION_COOKIE_KEY, COOKIE_DOMAIN, COOKIE_EXPIRES } from './constants';
import { performNetworkTest, getBrowserType, getDeviceType } from './utils';

export const startSession = async (existingSessionId?: string): Promise<string | null> => {
  try {
    const networkTest = await performNetworkTest();

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
        networkTest,
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
    return data.data.sessionId;
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
};
