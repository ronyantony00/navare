'use client';
import type { ResourceCompanyNavbarData, SolutionsNavbarData, Testimonial } from '@/types/commonTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import CustomButton from '@/components/atoms/CustomButton/Button';
import MegaMenuPanel from '@/components/organisms/MegaMenuPanel/MegaMenuPanel';
import { NAVBAR } from '@/constants/dataConstants/NavBarConstants';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { useHoverMenu } from '@/hooks/useHoverMenu';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useMenuState } from '@/hooks/useMenuState';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import NavlinkSection from '../NavlinkSection/NavlinkSection';

export interface NavbarProps {
  solutionsNavbarData?: SolutionsNavbarData[];
  useCaseNavbarData?: SolutionsNavbarData[];
  articleToShowNavData?: Testimonial [];
  resourceCompanyNavbarData?: ResourceCompanyNavbarData;
}

const Navbar = ({ solutionsNavbarData, useCaseNavbarData, articleToShowNavData, resourceCompanyNavbarData }: NavbarProps) => {
  // const articleTitle = articleToShowNavData?.[0]?.title;
  // const articleSlug = articleToShowNavData?.[0]?.slug;
  const resourceCompanyData = resourceCompanyNavbarData?.navbar;
  // const articleThumbnail = articleToShowNavData?.[0]?.thumbnail?.url;
  console.warn('articleToShowNavData', articleToShowNavData?.[0]?.thumbnail?.url);

  const { isMobile, isTouchDevice } = useDeviceDetection();
  const t = useTranslations('commonMessages');
  const { isMenuOpen, hoveredMenuItem, toggleMobileMenu, closeAllMenus, setActiveMenuItem, handleMobileNavigation } = useMenuState();
  const { handleMenuItemHover, handleMenuItemLeave, handleMenuItemClick, clearHoverTimeout } = useHoverMenu({
    isTouchDevice,
    isMobile,
    hoveredMenuItem,
    setActiveMenuItem,
    hoverDelay: 200,
  });

  const { ref: navbarRef } = useClickOutside<HTMLDivElement>({
    callback: () => {
      closeAllMenus();
      clearHoverTimeout();
    },
    enabled: isMenuOpen || hoveredMenuItem !== null,
  });

  useKeyboardNavigation({
    keyHandlers: {
      Escape: () => {
        closeAllMenus();
        clearHoverTimeout();
      },
    },
    enabled: isMenuOpen || hoveredMenuItem !== null,
  });

  const prevIsMobile = useRef(isMobile);

  // Handle resize during hover
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 992;
      if (newIsMobile !== prevIsMobile.current) {
        closeAllMenus();
        clearHoverTimeout();
        prevIsMobile.current = newIsMobile;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeAllMenus, clearHoverTimeout]);

  const getDropdownData = (menuId: string) => {
    // Unified helper function to generate dynamic navigation data
    const generateNavData = (
      data: any[],
      basePath: string,
      navbarConfig: any,
      dataStructure: 'navbarCard' | 'direct',
      useCustomPromo?: boolean,
      articleIndex?: number,
    ) => ({
      options: data.map((item, index) => {
        if (dataStructure === 'navbarCard') {
          return {
            id: item.id,
            title: item.navbarCard.short_title,
            href: `${basePath}/${item.slug}`,
            description: item.navbarCard.short_description,
            icon: getImageUrl(item.navbarCard.icon.url),
          };
        } else {
          // Use the URL from constants file instead of generating dynamically
          return {
            id: item.id,
            title: item.short_title,
            href: navbarConfig.options[index]?.href || `${basePath}/${item.short_title.toLowerCase().replace(/\s+/g, '-')}`,
            description: item.short_description,
            icon: getImageUrl(item.icon.url),
          };
        }
      }),
      promocardImage: articleIndex !== undefined ? getImageUrl(articleToShowNavData?.[articleIndex]?.thumbnail?.url) : navbarConfig.promocardImage,
      promocardDescription: useCustomPromo ? 'Read More about us' : articleIndex !== undefined && articleToShowNavData?.[articleIndex]?.title,
      buttonLink: useCustomPromo ? navbarConfig.buttonLink : `/testimonials`,
      buttonText: navbarConfig.buttonText,
      linkOnCard: useCustomPromo ? navbarConfig.linkOnCard : articleIndex !== undefined && articleToShowNavData?.[articleIndex]?.slug,
    });

    // For solutions menu, generate dynamic data from API response
    if (menuId === 'solutions' && solutionsNavbarData && solutionsNavbarData.length > 0) {
      return generateNavData(
        solutionsNavbarData,
        '/solutions',
        NAVBAR.dropdownData.solutions,
        'navbarCard',
        false,
        0,
      );
    }

    // For use cases menu, generate dynamic data from API response
    if (menuId === 'useCases' && useCaseNavbarData && useCaseNavbarData.length > 0) {
      return generateNavData(
        useCaseNavbarData,
        '/usecases',
        NAVBAR.dropdownData.useCases,
        'navbarCard',
        false,
        2,
      );
    }

    // For resources menu, generate dynamic data from API response
    if (menuId === 'resources' && resourceCompanyData?.resources && resourceCompanyData.resources.length > 0) {
      return generateNavData(
        resourceCompanyData.resources,
        '/resources',
        NAVBAR.dropdownData.resources,
        'direct',
        false,
        3,
      );
    }

    // For company menu, generate dynamic data from API response
    if (menuId === 'company' && resourceCompanyData?.company && resourceCompanyData.company.length > 0) {
      return generateNavData(
        resourceCompanyData.company,
        '/company',
        NAVBAR.dropdownData.company,
        'direct',
        false,
        4,
      );
    }

    // For other menus, use the original static data
    return NAVBAR.dropdownData[menuId as keyof typeof NAVBAR.dropdownData] || NAVBAR.dropdownData.resources;
  };

  return (
    <div
      ref={navbarRef}
      className="w-full bg-navare-green border-b border-navare-green-light sticky top-0 z-999"
      role="navigation"
      aria-label="Main navigation"
      data-solutions-slug={solutionsNavbarData?.[0]?.slug}
    >

      <div className="max-w-maxwidth mx-auto w-full flex items-center py-space-08 md:pt-space-13 md:pb-space-16 section-padding-x">

        {/* Blur effect container with overflow hidden */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute -top-space-25 -left-space-20 w-space-70 h-space-50 opacity-70 blur-2xl
          sm:-top-space-50 sm:left-space-00 sm:w-space-100 sm:h-space-100 sm:blur-3xl rounded-full sm:opacity-70
          bg-blue-circle-bg"
          >
          </span>
          <span className="absolute -top-space-25 -right-space-30 w-space-70 h-space-50 opacity-80 blur-2xl
          sm:-top-space-40 sm:right-space-10 sm:w-space-300 sm:h-space-150 sm:blur-3xl rounded-full sm:opacity-75
          bg-primary-blur"
          >
          </span>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-space-15 w-full justify-between">
            <Link href="/" className="my-auto z-10 -ml-space-04 sm:-ml-space-00 w-space-35 h-space-12 sm:w-space-62 sm:h-space-21">
              <Image
                src={ImageConstants.NavareWhiteLogo}
                alt="Navare Solutions-Home"
                width={73}
                height={24}
                className="cursor-pointer min-w-space-50 transition-transform duration-200 active:scale-90 w-full h-full"
                priority
              />
            </Link>

            <div className="flex items-center z-10">
              <div className="hidden 2md:block min-w-space-300">
                <NavlinkSection
                  Navlinks={NAVBAR.navigation}
                  onHover={handleMenuItemHover}
                  onLeave={handleMenuItemLeave}
                  hoveredMenuItem={hoveredMenuItem}
                  onItemClick={handleMenuItemClick}
                  isTouchDevice={isTouchDevice}
                />
              </div>

              {/* Hamburger visible below 992px */}
              <button
                type="button"
                className="2md:hidden flex items-center cursor-pointer text-secondary-text hover:text-navare-secondary-green transition-colors duration-200"
                onClick={toggleMobileMenu}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <Image src={ImageConstants.HamburgerIcon} alt="" width={23} height={23} className="w-space-16 h-space-16" />
              </button>
            </div>
          </div>

          <div className="2md:block hidden z-10">
            <CustomButton
              variant="primary"
              text={t('Book_Demo')}
              link="/schedule-demo"
              animation={true}
              arrow={true}
              mainClass="gap-space-05"
              arrowClassName="size-space-05"
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`2md:hidden absolute top-full left-0 w-full bg-navare-green z-50 transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? 'opacity-100' : 'max-h-0 opacity-0'}
          `}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <NavlinkSection
            options={getDropdownData(hoveredMenuItem || '').options}
            Navlinks={NAVBAR.navigation}
            onHover={handleMenuItemHover}
            onLeave={handleMenuItemLeave}
            hoveredMenuItem={hoveredMenuItem}
            onItemClick={handleMenuItemClick}
            onMobileNavigate={handleMobileNavigation}
            isTouchDevice={isTouchDevice}
          />
        </div>
      </div>

      {/* Desktop Mega menu */}
      <div
        onMouseEnter={() => {
          if (!isTouchDevice) {
            clearHoverTimeout();
          }
        }}
        onMouseLeave={handleMenuItemLeave}
        className="absolute top-full left-0 right-0 hidden 2md:block z-50"
        role="region"
        aria-label="Mega menu"
      >
        {hoveredMenuItem && (
          <div className="relative">
            <MegaMenuPanel
              options={getDropdownData(hoveredMenuItem).options}
              promoCardImage={getDropdownData(hoveredMenuItem).promocardImage}
              promoCardDescription={getDropdownData(hoveredMenuItem).promocardDescription || ''}
              linkOnCard={getDropdownData(hoveredMenuItem).linkOnCard}
              linkOnButton={getDropdownData(hoveredMenuItem).buttonLink}
              ButtonText={getDropdownData(hoveredMenuItem).buttonText}
              onNavigate={() => {
                setActiveMenuItem(null);
                clearHoverTimeout();
                closeAllMenus();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
