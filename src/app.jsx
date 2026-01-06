import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  // __SHELLUI_CONFIG__ is replaced by Vite at build time
  const config = typeof __SHELLUI_CONFIG__ !== 'undefined' ? __SHELLUI_CONFIG__ : {};

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>ShellUI</h1>
      <p>Welcome to ShellUI</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <h2>Configuration</h2>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

