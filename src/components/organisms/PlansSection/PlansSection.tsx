import type { planCard } from '@/types/usecase';
import Button from '@/components/atoms/CustomButton/Button';
import PlanCard from '@/components/atoms/PlanCard/PlanCard';
import SectionHeader from '@/components/atoms/SectionHeading/SectionHeading';

interface PlansSectionProps {
  title: {
    titlePrefix?: string;
    titleHighlight: string;
    titleSuffix?: string;
  };
  buttonText: string;
  buttonLink: string;
  Plans: planCard[];
}

const PlansSection = ({ Plans, title, buttonLink, buttonText }: PlansSectionProps) => {
  return (
    <div className="max-w-section-max-width mx-auto px-space-12 flex flex-col gap-space-10 mt-space-40">
      <div className="flex justify-between">
        <div>
          <SectionHeader
            titleHighlight={title.titleHighlight}
            titlePrefix={title.titlePrefix}
            titleSuffix={title.titleSuffix}
            variant="medium"
          />
        </div>
        <div className="self-center">
          <Button variant="linkButton" text={buttonText} arrow={true} link={buttonLink} mainClass="rounded-full " />
        </div>
      </div>
      <div className="flex flex-wrap gap-space-15 justify-center">
        {Plans.map(plan => (
          <PlanCard
            key={plan.id}
            planType={plan.planType}
            planBadge={plan.planBadge}
            planTier={plan.planTier}
            planTypeName={plan.planTypeName}
            // buttonLink={plan.buttonLink}
            // buttonText={plan.buttonText}
            // features={plan.features}
            description={plan.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PlansSection;
