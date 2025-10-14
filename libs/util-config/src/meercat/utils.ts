import type { PageType, NetworkTest } from './types';
import { MEERCAT_API_BASE } from './constants';

export const getPageType = (): PageType => {
  if (window.location.hostname.includes('auth.entrydsm.kr')) {
    return 'AUTH';
  }
  if (window.location.hostname.includes('admission.entrydsm.kr')) {
    return 'ADMISSION';
  }
  if (window.location.hostname.includes('entrydsm.kr')) {
    return 'USER';
  }
  return 'ADMISSION';
};

export const getConnectionType = (): string => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return connection?.effectiveType || 'unknown';
};

export const getMemoryUsage = (): number | undefined => {
  const performance = (window.performance as any);
  if (performance.memory) {
    return Math.round((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100 * 10) / 10;
  }
  return undefined;
};

export const getBrowserType = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
};

export const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;
  if (/mobile|android|iphone|ipad|tablet/i.test(userAgent)) {
    return /ipad|tablet/i.test(userAgent) ? 'tablet' : 'mobile';
  }
  return 'desktop';
};

export const performNetworkTest = async (): Promise<NetworkTest> => {
  try {
    const start = performance.now();
    await fetch(`${MEERCAT_API_BASE.replace('/v1', '')}/health`, { method: 'HEAD' });
    const latency = Math.round(performance.now() - start);

    return {
      latency,
      downloadSpeed: 0,
      uploadSpeed: 0,
      jitter: 0,
      packetLoss: 0,
      connectionType: getConnectionType(),
    };
  } catch {
    return {
      latency: 0,
      downloadSpeed: 0,
      uploadSpeed: 0,
      jitter: 0,
      packetLoss: 0,
      connectionType: getConnectionType(),
    };
  }
};
