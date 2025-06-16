import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { ApplicationDataProvider, CheckDataProvider } from '@entry/ui';

export const App = () => {
  return (
    <CheckDataProvider>
      <ApplicationDataProvider>
        <RouterProvider router={Router} />
        <GlobalStyle />
      </ApplicationDataProvider>
    </CheckDataProvider>
  );
};
