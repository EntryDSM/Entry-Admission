import { startSession, getSessionId, setSessionId, isSessionValid, clearSession } from './session';
import { sendHealthcheck } from './healthcheck';
import { sendClientError, createErrorPayload } from './error';
import { MEERCAT_API_BASE } from './constants';

export * from './types';
export * from './constants';
export * from './utils';
export * from './session';
export * from './healthcheck';
export * from './error';

export const initializeMeercatEngine = async () => {
  let sessionId = getSessionId();

  // 세션이 있으면 유효성 검증
  if (sessionId && !isSessionValid()) {
    console.log('Session expired. Clearing old session...');
    clearSession();
    sessionId = undefined;
  }

  // 세션이 없거나 만료되었으면 새로 생성
  if (!sessionId) {
    const newSessionId = await startSession();
    if (newSessionId) {
      setSessionId(newSessionId);
      sessionId = newSessionId;
    }
  }

  if (sessionId) {
    await sendHealthcheck(sessionId);

    // 6초마다 주기적으로 HealthCheck 전송
    setInterval(() => {
      const currentSessionId = getSessionId();
      if (currentSessionId) {
        // 세션 유효성 재검증
        if (!isSessionValid()) {
          console.log('Session expired during interval. Re-initializing...');
          clearSession();
          // 재초기화
          initializeMeercatEngine();
        } else {
          sendHealthcheck(currentSessionId);
        }
      }
    }, 6000);

    // 페이지 이탈 시 세션 종료
    window.addEventListener('beforeunload', () => {
      const currentSessionId = getSessionId();
      if (currentSessionId) {
        navigator.sendBeacon(
          `${MEERCAT_API_BASE}/session/end`,
          JSON.stringify({
            sessionId: currentSessionId,
            reason: 'user_exit',
          })
        );
      }
    });
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
