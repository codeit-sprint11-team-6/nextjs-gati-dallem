import Link from 'next/link';

interface LogoProps {
  altText?: string;
  className?: string;
}

export default function Logo({ 
  altText = "같이달램", 
  className = ""
}: LogoProps) {
  return (
    <div className="flex-shrink-0 mr-2 md:mr-6 lg:mr-8">
      <Link href="/" className="flex-center h-full py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-sm">
        <span className={`font-tenada font-extrabold text-purple-500 transition-colors duration-200 text-sm md:text-xl leading-tight tracking-tight hover:text-purple-600 ${className}`}>
          {altText}
        </span>
      </Link>
    </div>
  );
}
