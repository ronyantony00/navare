import Link from 'next/link';
import NavBarItem from '@/components/atoms/NavItem/NavItem';
import MegaMenuPanel from '@/components/organisms/MegaMenuPanel/MegaMenuPanel';
import { NAVBAR } from '@/constants/dataConstants/NavBarConstants';

interface Navlink {
  id: number;
  navItem: string;
  text: string;
  type: string;
  href?: string;
}

interface Option {
  id: number;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

interface NavlinkProps {
  Navlinks: Navlink[];
  onHover?: (menuId: string) => void;
  onLeave?: () => void;
  hoveredMenuItem?: string | null;
  onItemClick?: (menuId: string) => void;
  onNavigate?: () => void;
  onCloseHover?: () => void;
  isTouchDevice?: boolean;
  options?: Option[];
}

const NavlinkSection = ({
  Navlinks,
  onHover,
  onLeave,
  hoveredMenuItem,
  onItemClick,
  onNavigate,
  onCloseHover,
  isTouchDevice,
  options,
}: NavlinkProps) => {
  const getDropdownData = (menuId: string) => {
    return NAVBAR.dropdownData[menuId as keyof typeof NAVBAR.dropdownData] || NAVBAR.dropdownData.solutions;
  };

  const handleKeyDown = (event: React.KeyboardEvent, link: Navlink) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (link.type === 'dropdown') {
        onItemClick?.(link.navItem);
      }
    }
  };

  return (
    <div className="relative bg-navare-green 2md:bg-transparent flex flex-col h-fit 2md:flex-row gap-space-10 w-full 2md:w-fit
    pb-space-06 2md:pb-space-00 min-w-0 2md:min-w-space-150 py-space-05 2md:py-space-00"
    >
      {Navlinks.map((link) => {
        if (link.type === 'dropdown') {
          const isActive = hoveredMenuItem === link.navItem;

          return (
            <div key={link.id} className="w-full 2md:w-fit">
              <button
                type="button"
                className="w-full 2md:w-fit text-left flex items-center min-h-space-22 2md:min-h-0"
                onMouseEnter={() => !isTouchDevice && onHover?.(link.navItem)}
                onMouseLeave={() => !isTouchDevice && onLeave?.()}
                onClick={() => onItemClick?.(link.navItem)}
                onFocus={() => !isTouchDevice && onHover?.(link.navItem)}
                onBlur={() => !isTouchDevice && onLeave?.()}
                onKeyDown={e => handleKeyDown(e, link)}
                aria-expanded={isActive}
                aria-haspopup="true"
                aria-label={`${link.text} menu`}
              >
                <NavBarItem
                  NavOption={link.text}
                  isActive={isActive}
                />
              </button>

              {/* Mobile Mega Menu Panel */}
              {isActive && (
                <div className="relative w-full 2md:hidden bg-navare-green">
                  <MegaMenuPanel
                    options={options || []}
                    promoCardImage={getDropdownData(link.navItem).promocardImage}
                    promoCardDescription={getDropdownData(link.navItem).promocardDescription}
                    linkOnButton={getDropdownData(link.navItem).buttonLink}
                    ButtonText={getDropdownData(link.navItem).buttonText}
                    linkOnCard={getDropdownData(link.navItem).linkOnCard}
                    onNavigate={onLeave}
                    onMobileNavigate={onNavigate}
                  />
                </div>
              )}
            </div>
          );
        }

        if (link.type === 'link') {
          return (
            <Link
              href={link.href || ''}
              key={link.id}
              className="w-full 2md:w-fit flex items-center text-secondary-text hover:text-primary text-size-3xs px-space-12 min-h-space-22 2md:min-h-0 2md:py-space-00 2md:px-space-00"
              onMouseEnter={() => {
                // Close open mega-menu when hovering Integrations (desktop)
                if (!isTouchDevice) {
                  onCloseHover?.();
                }
              }}
              onClick={() => onNavigate?.()}
              aria-label={`Navigate to ${link.text}`}
            >
              {link.text}
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
};

export default NavlinkSection;
