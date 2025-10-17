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

// 빠른 기본 네트워크 테스트 (세션 시작용)
export const performBasicNetworkTest = async (): Promise<NetworkTest> => {
  try {
    // Latency만 빠르게 측정 (1번의 HEAD 요청)
    const latencyStart = performance.now();
    await fetch(`${MEERCAT_API_BASE.replace('/v1', '')}/health`, { method: 'HEAD' });
    const latency = Math.round(performance.now() - latencyStart);

    return {
      latency,
      downloadSpeed: 0,
      uploadSpeed: 0,
      jitter: 0,
      packetLoss: 0,
      connectionType: getConnectionType(),
    };
  } catch (error) {
    console.error('Basic network test failed:', error);
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

// 상세 네트워크 테스트 (백그라운드에서 비동기 실행)
export const performDetailedNetworkTest = async (): Promise<NetworkTest> => {
  try {
    // 1. Latency 측정
    const latencyStart = performance.now();
    await fetch(`${MEERCAT_API_BASE.replace('/v1', '')}/health`, { method: 'HEAD' });
    const latency = Math.round(performance.now() - latencyStart);

    // 2. Download Speed 측정 (2MB 파일)
    const downloadStart = performance.now();
    const downloadResponse = await fetch(`${MEERCAT_API_BASE}/network/download/2mb`);
    const downloadBlob = await downloadResponse.blob();
    const downloadTime = (performance.now() - downloadStart) / 1000;
    const downloadSizeMB = downloadBlob.size / (1024 * 1024);
    const downloadSpeed = Math.round((downloadSizeMB / downloadTime) * 100) / 100;

    // 3. Upload Speed 측정 (100KB로 축소)
    const uploadData = new Blob([new ArrayBuffer(100 * 1024)]); // 100KB
    const uploadStart = performance.now();
    await fetch(`${MEERCAT_API_BASE.replace('/v1', '')}/health`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: uploadData,
    });
    const uploadTime = (performance.now() - uploadStart) / 1000;
    const uploadSizeMB = uploadData.size / (1024 * 1024);
    const uploadSpeed = Math.round((uploadSizeMB / uploadTime) * 100) / 100;

    // 4. Jitter 측정 (3번 ping)
    const latencies: number[] = [];
    for (let i = 0; i < 3; i++) {
      const pingStart = performance.now();
      await fetch(`${MEERCAT_API_BASE.replace('/v1', '')}/health`, { method: 'HEAD' });
      latencies.push(performance.now() - pingStart);
    }
    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const jitter = Math.round(
      Math.sqrt(latencies.reduce((sum, lat) => sum + Math.pow(lat - avgLatency, 2), 0) / latencies.length)
    );

    return {
      latency,
      downloadSpeed,
      uploadSpeed,
      jitter,
      packetLoss: 0,
      connectionType: getConnectionType(),
    };
  } catch (error) {
    console.error('Detailed network test failed:', error);
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

// 레거시 호환성을 위한 alias
export const performNetworkTest = performBasicNetworkTest;
