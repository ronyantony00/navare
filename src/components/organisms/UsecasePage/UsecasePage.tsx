// import FooterSection from '@/components/atoms/UsecasePageFooterSection/FooterSection';
// import ChallengesSection from '@/components/molecules/ChallengesSection/ChallengesSection';
// import PageIntroBlock from '@/components/molecules/PageIntroBlock/PageIntroBlock';
// import SolutionSection from '@/components/molecules/UsecaseSolutionSection/UsecaseSolutionSection';
// import FeaturesSection from '@/components/organisms/FeaturesSection/FeaturesSection';
// import UsecaseCardSection from '@/components/organisms/UsecaseCardSection/UsecaseCardSection';
// import UsecaseTestimonials from '@/components/organisms/UsecaseTestimonials/UsecaseTestimonials';
// import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
// import { Testimonial } from '@/types/commonTypes';
// import { useCaseData } from '@/types/usecase';

// interface UsecasePageProps {
//     testimonialData: Testimonial[];
//     useCaseData: useCaseData;
// }

// const UsecasePage = ({ testimonialData, useCaseData }: UsecasePageProps) => {

//   const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(useCaseData?.heroSection?.postHeroTitle);

//   return (
//     <div className="flex flex-col bg-navare-green">
//       <PageIntroBlock
//         tagText={useCaseData?.heroSection?.postKeyWord || ''}
//         titlePrefix={titlePrefix}
//         titleHighlight={titleHighlight}
//         titleSuffix={titleSuffix}
//         description={useCaseData?.heroSection?.postHeroSubTitle || ''}
//       />
//       <UsecaseCardSection
//         titlePrefix="Import With Full "
//         titleHighlight="Control "
//         sectionDescription="As importers, you need full tracking visibility and control to resolve delays, reduce costs, and streamline inbound logistics."
//         CardData={useCaseData?.featureSection || []}
//       />
//       <ChallengesSection />
//       <SolutionSection />
//       <FeaturesSection
//         featureCards={useCaseData?.advantagesSection || []}
//       />
//       <UsecaseTestimonials testimonialData={testimonialData} />
//       <FooterSection />
//     </div>
//   );
// };

// export default UsecasePage;
