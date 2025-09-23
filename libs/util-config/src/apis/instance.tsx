import axios from 'axios';

// 공통 instance (baseURL은 필요 시 env에서 추가)
export const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 사용자 관련 instance
export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 예: 스케줄, 상태 등 다른 instance
export const scheduleInstance = axios.create({
  baseURL: import.meta.env.VITE_SCHEDULE_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const statusInstance = axios.create({
  baseURL: import.meta.env.VITE_STATUS_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const applicationInstance = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_BASE_URL,
});