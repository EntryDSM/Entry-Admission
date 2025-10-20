export type PageType = 'AUTH' | 'USER' | 'ADMISSION' | 'ADMISSION_SUBMIT';

export interface NetworkTest {
  latency: number;
  downloadSpeed: number;
  uploadSpeed: number;
  jitter: number;
  packetLoss: number;
  connectionType: string;
}

export interface SessionStartRequest {
  domain: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  entryPoint: string;
  referrer: string;
  networkTest: NetworkTest;
  domLoadTime: number;
  browserType: string;
  deviceType: string;
  existingSessionId?: string;
}

export interface SessionStartResponse {
  success: boolean;
  data: {
    sessionId: string;
    serverTime: number;
    heartbeatInterval: number;
  };
}

export interface HealthcheckRequest {
  sessionId: string;
  pageType: PageType;
  page: {
    url: string;
    title: string;
    domLoadTime: number;
    pageLoadTime: number;
  };
  performance: {
    memoryUsage?: number;
    connectionType: string;
  };
}

export interface ErrorPayload {
  sessionId: string;
  pageType: PageType;
  errorCategory: string;
  errorCode: string;
  message: string;
  stackTrace?: string;
  pageUrl: string;
  componentName: string;
  userAction: string;
}

export interface CreateErrorPayloadParams {
  errorCategory: string;
  errorCode?: string;
  message: string;
  stackTrace?: string;
  componentName?: string;
  userAction?: string;
}
