import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
}

export const OActivate: React.FC<IconProps> = ({ width = 52, height = 52 }) => (
  <svg width={width} height={height} viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="26" fill="#FF7C33"/>
    <circle cx="26" cy="26" r="11" stroke="white" strokeWidth="2"/>
  </svg>
);

export const ONoActivate: React.FC<IconProps> = ({ width = 52, height = 52 }) => (
  <svg width={width} height={height} viewBox="0 0 52 52" fill="none">
    <rect x="1" y="1" width="50" height="50" rx="25" fill="white"/>
    <rect x="1" y="1" width="50" height="50" rx="25" stroke="#D6D6D6" strokeWidth="2"/>
    <circle cx="26" cy="26" r="11" stroke="#D6D6D6" strokeWidth="2"/>
  </svg>
);

export const XActivate: React.FC<IconProps> = ({ width = 52, height = 52 }) => (
  <svg width={width} height={height} viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="26" fill="#FF7C33"/>
    <path d="M20.4 33L19 31.6L24.6 26L19 20.4L20.4 19L26 24.6L31.6 19L33 20.4L27.4 26L33 31.6L31.6 33L26 27.4L20.4 33Z" fill="white"/>
  </svg>
);

export const XNoActivate: React.FC<IconProps> = ({ width = 52, height = 52 }) => (
  <svg width={width} height={height} viewBox="0 0 52 52" fill="none">
    <rect x="1" y="1" width="50" height="50" rx="25" fill="white"/>
    <rect x="1" y="1" width="50" height="50" rx="25" stroke="#D6D6D6" strokeWidth="2"/>
    <path d="M20.4 33L19 31.6L24.6 26L19 20.4L20.4 19L26 24.6L31.6 19L33 20.4L27.4 26L33 31.6L31.6 33L26 27.4L20.4 33Z" fill="#D6D6D6"/>
  </svg>
);
