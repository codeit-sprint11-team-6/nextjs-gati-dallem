import Link from 'next/link';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export interface NavigationItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  favoriteCount: number;
}

export default function Navigation({ items, favoriteCount }: NavigationProps) {
  return (
    <nav className="flex items-center">
      {items.map((item) => (
        <NavigationLink 
          key={item.href} 
          item={item} 
          favoriteCount={favoriteCount} 
        />
      ))}
    </nav>
  );
}

interface NavigationLinkProps {
  item: NavigationItem;
  favoriteCount: number;
}

function NavigationLink({ item, favoriteCount }: NavigationLinkProps) {
  const linkClasses = cn(
    // Base styles
    "flex items-center justify-center transition-colors duration-200 font-['Pretendard']",
    // Responsive sizing
    "h-8 md:h-14 lg:h-14 px-2 md:px-3 lg:px-4 text-xs md:text-base lg:text-base",
    // Active/Inactive states
    item.isActive 
      ? "text-[#4d59d5] font-semibold md:font-semibold lg:font-bold"
      : "text-[#737373] hover:text-gray-700 font-medium"
  );

  return (
    <Link href={item.href} className={linkClasses}>
      {item.label === '찜한 모임' ? (
        <FavoriteItem label={item.label} count={favoriteCount} />
      ) : (
        <span>{item.label}</span>
      )}
    </Link>
  );
}

interface FavoriteItemProps {
  label: string;
  count: number;
}

function FavoriteItem({ label, count }: FavoriteItemProps) {
  return (
    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2">
      <span>{label}</span>
      <Badge 
        count={count} 
        size="small"
        className="md:hidden"
      />
      <Badge 
        count={count} 
        size="large"
        className="hidden md:block"
      />
    </div>
  );
}