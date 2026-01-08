import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useConfig } from '../features/config/useConfig';
import { ContentView } from './components/ContentView';
import type { NavigationItem } from '../features/config/types';

const Home = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Welcome to ShellUI</h1>
      <p>Select a navigation item to get started.</p>
    </div>
  );
};

interface ViewRouteProps {
  navigation: NavigationItem[];
}

const ViewRoute = ({ navigation }: ViewRouteProps) => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const navItem = useMemo(
    () => navigation.find(item => item.path === currentPath),
    [navigation, currentPath]
  );

  if (!navItem) {
    return <Navigate to="/" replace />;
  }

  return <ContentView url={navItem.url} />;
};

const AppContent = () => {
  const { config, loading, error } = useConfig();
  const location = useLocation();

  // Memoize routes to prevent recreation on every render
  const navigationRoutes = useMemo(
    () =>
      config.navigation?.map((item) => (
        <Route
          key={item.path}
          path={`/${item.path}`}
          element={<ViewRoute navigation={config.navigation || []} />}
        />
      )),
    [config.navigation]
  );

  if (loading) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
        <p>Loading configuration...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
        <p style={{ color: 'red' }}>Error loading configuration: {error.message}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>{config.title || 'ShellUI'}</h1>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <h2>Configuration</h2>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>

      {config.navigation && config.navigation.length > 0 && (
        <nav style={{ marginTop: '2rem' }}>
          {config.navigation.map((item) => {
            const isActive = location.pathname === `/${item.path}`;
            return (
              <Link
                key={item.path}
                to={`/${item.path}`}
                style={{ 
                  marginRight: '1rem',
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  border: '1px solid #0066cc',
                  borderRadius: '4px',
                  background: isActive ? '#0066cc' : 'transparent',
                  color: isActive ? 'white' : '#0066cc',
                  fontSize: '1rem',
                  display: 'inline-block'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        {navigationRoutes}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
