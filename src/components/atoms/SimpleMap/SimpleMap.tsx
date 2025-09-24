interface SimpleMapProps {
  mapUrl: string;
  title?: string;
}

const SimpleMap = ({ mapUrl, title = 'Location Map' }: SimpleMapProps) => {
  return (
    <iframe
      src={mapUrl}
      title={title}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
    />
  );
};

export default SimpleMap;
