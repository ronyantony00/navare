'use client';
import type { featureCard } from '@/types/usecase';
import { useEffect, useRef, useState } from 'react';
import FeatureCard from '@/components/molecules/FeatureCard/FeatureCard';

interface FeatureCardContainerProps {
  featureCards: featureCard[];
}

const FeatureCardContainer = ({ featureCards }: FeatureCardContainerProps) => {
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (cardId: number) => {
    setOpenCardId(openCardId === cardId ? null : cardId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && featureCards && featureCards.length > 0 && openCardId === null) {
            const firstCard = featureCards[0];
            if (firstCard) {
              setOpenCardId(firstCard.id);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [featureCards, openCardId]);

  return (
    <div ref={containerRef} className="flex flex-col gap-space-12">
      {featureCards && featureCards.map(featureCard => (
        <FeatureCard
          key={featureCard.id}
          id={featureCard.id}
          icon={featureCard?.icon}
          title={featureCard.title || ''}
          description={featureCard.content}
          isOpen={openCardId === featureCard.id}
          onCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default FeatureCardContainer;
