interface ContentViewProps {
  url: string;
}

export const ContentView = ({ url }: ContentViewProps) => {
  return (
    <div style={{ marginTop: '2rem', width: '100%', height: '600px' }}>
      <iframe 
        key={url}
        src={url}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
        title="Content Frame"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
