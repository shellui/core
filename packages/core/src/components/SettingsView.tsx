export const SettingsView = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      color: '#333'
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: '2rem', 
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        Settings
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <section>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '0.75rem',
            color: '#666'
          }}>
            General
          </h2>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <p style={{ margin: 0, color: '#666' }}>
              General settings will be available here.
            </p>
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '0.75rem',
            color: '#666'
          }}>
            Appearance
          </h2>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <p style={{ margin: 0, color: '#666' }}>
              Appearance settings will be available here.
            </p>
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '0.75rem',
            color: '#666'
          }}>
            Advanced
          </h2>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <p style={{ margin: 0, color: '#666' }}>
              Advanced settings will be available here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
