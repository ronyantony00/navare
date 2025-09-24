import Button from '../CustomButton/Button';

interface CtaContentProps {
  title?: string;
  description?: string;
  tagline?: string;
  mainClass?: string;
  titleClass?: string;
  descClass?: string;
  buttonText?: string;
}
const CtaContent: React.FC<CtaContentProps> = ({ title, description, tagline, mainClass, titleClass, descClass, buttonText }) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-space-08">
      <div className={`flex flex-col items-start gap-space-08 ${mainClass}`}>
        <div className="text-size-4xs text-plan-card-tier">
          {tagline}
        </div>
        <div className={`md:text-size-2xl text-size-xl leading-sub-title ${titleClass}`}>
          {title}
        </div>
        <div className={`text-size-3xs leading-description ${descClass}`}>
          {description}
        </div>
        {buttonText && (
          <Button
            text={buttonText}
            variant="primary"
            arrow={true}
            mainClass="text-center"
          />
        )}
      </div>
    </div>
  );
};

export default CtaContent;
