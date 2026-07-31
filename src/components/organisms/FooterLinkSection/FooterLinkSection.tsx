import type { ResourceCompanyNavbarData, SocialLinksData, SolutionsNavbarData } from '@/types/commonTypes';
import FooterLinkGroup from '@/components/molecules/FooterLinkGroup/FooterLinkGroup';
import { linkPaths } from '@/constants/dataConstants/FooterConstants';
import { resolveNavigationLink } from '@/utils/Helpers';

interface link {
  id: number;
  linkText: string;
  path: string;
}

interface FooterLink {
  id: number;
  title: string;
  links: link[];
}

interface linkSectionProps {
  FooterLinks: FooterLink[];
  socialLinks?: SocialLinksData[];
  solutionsNavbarData?: SolutionsNavbarData[];
  useCaseNavbarData?: SolutionsNavbarData[];
  resourceCompanyData?: ResourceCompanyNavbarData;
}

const FooterLinkTransformer = (socialLinks: SocialLinksData[] | undefined) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return {
    id: 5,
    title: 'Social',
    links: socialLinks.map((socialLink, index) => ({
      id: index + 1,
      linkText: socialLink.socialMediaLink.text,
      path: resolveNavigationLink(socialLink.socialMediaLink.link).href,
      icon: socialLink.socialMediaLink.icon.url,
    })),
  };
};

const getSolutionOrderRank = (item: SolutionsNavbarData) => {
  const text = `${item.navbarCard?.short_title || ''} ${item.slug || ''}`.toLowerCase();
  if (text.includes('tms')) return 1;
  if (text.includes('cms')) return 2;
  if (text.includes('bridge')) return 3;
  if (text.includes('scan')) return 4;
  return 99;
};

const SolutionsLinkTransformer = (solutionsNavbarData: SolutionsNavbarData[] | undefined) => {
  if (!solutionsNavbarData || solutionsNavbarData.length === 0) {
    return null;
  }

  const sortedSolutions = [...solutionsNavbarData].sort(
    (a, b) => getSolutionOrderRank(a) - getSolutionOrderRank(b),
  );

  return {
    id: 1,
    title: 'Product',
    links: sortedSolutions.map((solution, index) => ({
      id: index + 1,
      linkText: solution.navbarCard.short_title,
      path: `/solutions/${solution.slug}`,
    })),
  };
};

const UseCaseLinkTransformer = (useCaseNavbarData: SolutionsNavbarData[] | undefined) => {
  if (!useCaseNavbarData || useCaseNavbarData.length === 0) {
    return null;
  }

  const transformed = {
    id: 2,
    title: 'Use cases',
    links: useCaseNavbarData.map((useCase, index) => {
      const link = {
        id: index + 1,
        linkText: useCase.navbarCard.short_title,
        path: `/usecases/${useCase.slug}`,
      };
      return link;
    }),
  };
  return transformed;
};

const FooterLinkSection = ({ FooterLinks, socialLinks, solutionsNavbarData, useCaseNavbarData, resourceCompanyData }: linkSectionProps) => {
  const transformedSocialLinks = FooterLinkTransformer(socialLinks);
  const transformedSolutionsLinks = SolutionsLinkTransformer(solutionsNavbarData);
  const transformedUseCaseLinks = UseCaseLinkTransformer(useCaseNavbarData);

  let linksToRender = FooterLinks;

  // Replace social links if available
  if (transformedSocialLinks) {
    linksToRender = linksToRender.map(link =>
      link.id === 5 ? transformedSocialLinks : link,
    );
  }

  // Replace solutions links if available
  if (transformedSolutionsLinks) {
    linksToRender = linksToRender.map(link =>
      link.id === 1 ? transformedSolutionsLinks : link,
    );
  }

  // Replace use case links if available
  if (transformedUseCaseLinks) {
    linksToRender = linksToRender.map(link =>
      link.id === 2 ? transformedUseCaseLinks : link,
    );
  }

  if (resourceCompanyData) {
    linksToRender = linksToRender.map(link =>
      link.id === 3
        ? {
            id: 3,
            title: 'Resource',
            links: resourceCompanyData.navbar.resources.map((company, index) => ({
              id: index + 1,
              linkText: company.short_title,
              path: linkPaths.resource.find(path => path.text === company.short_title)?.path || '',
            })),
          }
        : link,
    );
  }

  if (resourceCompanyData) {
    linksToRender = linksToRender.map(link =>
      link.id === 4
        ? {
            id: 4,
            title: 'Company',
            links: resourceCompanyData.navbar.company.map((company, index) => ({
              id: index + 1,
              linkText: company.short_title,
              path: linkPaths.company.find(path => path.text === company.short_title)?.path || '',
            })),
          }
        : link,
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-y-space-16 justify-items-start max-2xs:justify-items-center 2xs:grid-cols-2 2xs:gap-x-space-24 2xs:gap-y-space-20 2md:flex 2md:flex-1 2md:flex-row 2md:items-start 2md:justify-between 2md:gap-space-16 xl:gap-space-24">
      {linksToRender.map((obj) => {
        const isSocial = obj.id === 5;
        return (
          <FooterLinkGroup
            key={obj.id}
            title={obj.title}
            links={obj.links}
            className={
              isSocial
                ? '2xs:col-span-2 2md:col-auto'
                : ''
            }
          />
        );
      })}
    </div>
  );
};

export default FooterLinkSection;
