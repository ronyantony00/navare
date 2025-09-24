const JobInfoItem = ({ label, value, showVLine = true }: { label: string; value: string; showVLine?: boolean }) => (
  <div className="flex lg:flex-row flex-col justify-between items-start h-full gap-space-05 lg:min-h-space-38">
    <div className="flex flex-col gap-space-05 2md:mx-auto items-start">
      <div className="primary-content text-text-placeholder text-left">{label}</div>
      <div className="text-subtle-desc small-card-heading">{value}</div>
    </div>
    {showVLine && <div className="lg:block hidden bg-primary w-space-01 h-full"></div>}
  </div>
);

export default JobInfoItem;
