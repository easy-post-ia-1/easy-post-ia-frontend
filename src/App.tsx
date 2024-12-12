import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, protectedRoutes } from '@router/routes';
import PrivateRoute from '@router/PrivateRoute';
import ProtectedRoute from '@router/ProtectedRoute';
import PublicRoute from '@router/PublicRoute';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Theme from '@components/materialui/Theme';
import i18n from './_i18n';
import AlertNotifistack from '@components/notifications/AlertNotistack';
import DrawerConfig from '@components/materialui/ConfigAccesability/DrawerConfig';
import { useAccesibilityConfig } from '@stores/useAccessibilityConfig';

const App: React.FC = () => {
  const { country } = useAccesibilityConfig();

  useEffect(() => {
    i18n.changeLanguage(country.lang);
  }, [country]);

  return (
    <Theme>
      <SnackbarProvider
        Components={{
          success: AlertNotifistack,
          error: AlertNotifistack,
          warning: AlertNotifistack,
          info: AlertNotifistack,
        }}
      >
        <CssBaseline>
          <div>
            <DrawerConfig />
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {publicRoutes.map(({ path, component: Component }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <PublicRoute>
                          <Component />
                        </PublicRoute>
                      }
                    />
                  ))}

                  {privateRoutes.map(({ path, component: Component, roles }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <PrivateRoute roles={roles}>
                          <Component />
                        </PrivateRoute>
                      }
                    />
                  ))}

                  {protectedRoutes.map(({ path, component: Component, roles }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute roles={roles}>
                          <Component />
                        </ProtectedRoute>
                      }
                    />
                  ))}
                </Routes>
              </Suspense>
            </Router>
          </div>
        </CssBaseline>
      </SnackbarProvider>
    </Theme>
  );
};

export default App;
