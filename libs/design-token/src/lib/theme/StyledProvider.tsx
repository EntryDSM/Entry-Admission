import { GlobalStyle } from './GlobalStyle';

export const StyledProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};
