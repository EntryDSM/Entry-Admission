import type { HealthcheckRequest } from './types';
import { MEERCAT_API_BASE } from './constants';
import { getPageType, getMemoryUsage, getConnectionType } from './utils';
import { updateLastHealthcheckTime } from './session';

export const sendHealthcheck = async (sessionId: string): Promise<void> => {
  try {
    const pageType = getPageType();
    const memoryUsage = getMemoryUsage();
    const connectionType = getConnectionType();

    const payload: HealthcheckRequest = {
      sessionId,
      pageType,
      page: {
        url: window.location.pathname,
        title: document.title,
        domLoadTime: Math.round(performance.timing?.domContentLoadedEventEnd - performance.timing?.navigationStart) || 0,
        pageLoadTime: Math.round(performance.timing?.loadEventEnd - performance.timing?.navigationStart) || 0,
      },
      performance: {
        ...(memoryUsage !== undefined && { memoryUsage }),
        connectionType,
      },
    };

    await fetch(`${MEERCAT_API_BASE}/healthcheck`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // HealthCheck 성공 시 타임스탬프 업데이트
    updateLastHealthcheckTime();
  } catch (error) {
    console.error('Healthcheck failed:', error);
  }
};
