import type { ErrorPayload, CreateErrorPayloadParams } from './types';
import { MEERCAT_API_BASE, SESSION_COOKIE_KEY } from './constants';
import { getPageType } from './utils';
import Cookies from 'js-cookie';

export const sendClientError = async (errorData: ErrorPayload): Promise<void> => {
  try {
    await fetch(`${MEERCAT_API_BASE}/error/client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    });
  } catch (networkError) {
    console.error('Error reporting failed:', networkError);
  }
};

export const createErrorPayload = ({
  errorCategory,
  errorCode,
  message,
  stackTrace,
  componentName,
  userAction,
}: CreateErrorPayloadParams): ErrorPayload => {
  const sessionId = Cookies.get(SESSION_COOKIE_KEY) || 'unknown';
  const pageType = getPageType();

  return {
    sessionId,
    pageType,
    errorCategory,
    errorCode: errorCode || 'UNKNOWN',
    message,
    stackTrace,
    pageUrl: window.location.pathname,
    componentName: componentName || 'Unknown',
    userAction: userAction || 'Unknown',
  };
};
