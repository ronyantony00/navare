import Image from 'next/image';

const VideoCard = ({ imageUrl, title }: { imageUrl: string; title: string }) => (
  <div className="grid lg:grid-cols-3 grid-cols-1 items-center group gap-space-10 border border-small-text rounded-sm p-space-10">
    <div className="relative w-full rounded-lg col-span-1">
      <Image
        src={imageUrl}
        alt={title}
        height={100}
        width={100}
        className="lg:size-full w-full h-space-100 object-cover rounded-sm"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:cursor-pointer transition duration-100 ease-in-out">
        <div className="size-space-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
          {/* Play Icon SVG */}
          <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
        </div>
      </div>
    </div>
    <h3 className="text-desc-text font-medium text-size-2xs text-center lg:text-left col-span-2">{title}</h3>
  </div>
);

export default VideoCard;
