interface KeyMetricCardProps {
  text: string;
  description: string;
}

const KeyMetricCard = ({ text, description }: KeyMetricCardProps) => {
  return (
    <div className=" w-full rounded-md-2 border border-key-card-border key-metric-card-bg py-space-20 sm:py-space-20 px-space-10">
      <div className="flex flex-col">
        <div className="section-title font-bold text-white text-center">{text?.toUpperCase()}</div>
        <div className="primary-content text-center !text-desc-text">{description}</div>
      </div>
    </div>
  );
};

export default KeyMetricCard;
