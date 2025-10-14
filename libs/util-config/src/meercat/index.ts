import { startSession, getSessionId, setSessionId } from './session';
import { sendHealthcheck } from './healthcheck';
import { sendClientError, createErrorPayload } from './error';

export * from './types';
export * from './constants';
export * from './utils';
export * from './session';
export * from './healthcheck';
export * from './error';

export const initializeMeercatEngine = async () => {
  let sessionId = getSessionId();

  if (!sessionId) {
    const newSessionId = await startSession();
    if (newSessionId) {
      setSessionId(newSessionId);
      sessionId = newSessionId;
    }
  }

  if (sessionId) {
    await sendHealthcheck(sessionId);
  }

  window.onerror = (message, source, lineno, colno, error) => {
    sendClientError(
      createErrorPayload({
        errorCategory: 'RUNTIME_ERROR',
        errorCode: 'ERR_RUNTIME',
        message: String(message),
        stackTrace: error?.stack,
        componentName: source,
      })
    );
  };

  window.onunhandledrejection = (event) => {
    sendClientError(
      createErrorPayload({
        errorCategory: 'RUNTIME_ERROR',
        errorCode: 'ERR_UNHANDLED_PROMISE',
        message:
          event.reason?.message ||
          'Unhandled promise rejection without explicit message',
        stackTrace: event.reason?.stack,
      })
    );
  };
};
