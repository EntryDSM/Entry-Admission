export const OneIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="32" fill={isActive ? "#1DB954" : "#D6D6D6"}/>
<path d="M35.5938 20.375V43H32.125V23.8125H32L26.5938 27.3438V24.0625L32.2188 20.375H35.5938Z" fill="white"/>
</svg>

  );
};

