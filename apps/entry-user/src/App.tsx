import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { ToastContainer } from 'react-toastify';

const sendClientError = async (errorData: any) => {
  try {
    await fetch('https://meeeeercat.ncloud.sbs/v1/error/client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    });
  } catch (networkError) {
    console.error('Error reporting failed:', networkError);
  }
};

const createErrorPayload = ({
                              errorCategory,
                              errorCode,
                              message,
                              stackTrace,
                              componentName,
                              userAction,
                            }: {
  errorCategory: string;
  errorCode?: string;
  message: string;
  stackTrace?: string;
  componentName?: string;
  userAction?: string;
}) => {
  return {
    sessionId: crypto.randomUUID?.() || String(Date.now()),
    pageType: 'USER',
    errorCategory,
    errorCode: errorCode || 'UNKNOWN',
    message,
    stackTrace,
    pageUrl: window.location.pathname,
    componentName: componentName || 'Unknown',
    userAction: userAction || 'Unknown',
  };
};

export const App = () => {
  useEffect(() => {
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
  }, []);

  return (
    <>
      <RouterProvider router={Router} />
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};
