import DownArrowIcon from '../DownArrowIcon/DownArrowIcon';

interface NavItemProps {
  NavOption: string;
  isActive?: boolean;
}

const NavBarItem = ({ NavOption, isActive = false }: NavItemProps) => {
  return (
    <div className="flex cursor-pointer w-full 2md:w-fit group py-space-03 2md:py-space-00 px-space-12 2md:px-space-00 justify-between gap-space-05 items-center min-h-space-22 2md:min-h-0">
      <div className={`group-hover:text-primary text-size-3xs ${isActive ? 'text-primary' : 'text-secondary-text'}`}>{NavOption}</div>
      <div className={`transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-primary flex items-center ${isActive ? 'rotate-180 text-primary' : 'text-white'}`}>
        <DownArrowIcon color="currentColor" width={12} height={7} />
      </div>
    </div>
  );
};

export default NavBarItem;
