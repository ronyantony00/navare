import Link from 'next/link';

const IntegrationSidebar = () => {
  return (
    <div className="py-space-16 px-space-12 bg-base-white rounded-lg">
      <div className="flex flex-col gap-space-08">
        <div className="text-secondary font-bold text-size-md">Your Integration not listed?</div>
        <div className="text-size-3xs leading-normal">Are we missing any carrier or software integrations, or are you a partner that would like to partner with Shippit?</div>
        <Link href="/contact" className="text-blue-500 text-size-3xs">
          <div className="flex gap-space-04">
            <div>Get in touch</div>
            <div>{'>'}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default IntegrationSidebar;
