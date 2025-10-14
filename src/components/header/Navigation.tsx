import Link from "next/link";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

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
    <nav className="flex-center space-x-0 md:space-x-2 lg:space-x-4">
      {items.map((item) => (
        <NavigationLink key={item.href} item={item} favoriteCount={favoriteCount} />
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
    "flex-center transition-colors duration-200 flex-shrink-0",
    // Responsive sizing
    "h-8 md:h-14 lg:h-14 px-2 md:px-3 lg:px-4 text-xs md:text-base lg:text-base",
    // Active/Inactive states
    item.isActive
      ? "font-semibold md:font-semibold lg:font-bold text-white"
      : "font-medium text-purple-100 hover:text-white",
  );

  return (
    <Link href={item.href} className={linkClasses}>
      {item.label === "찜한 모임" ? (
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
    <div className="flex-center gap-1 md:gap-1 lg:gap-1">
      <span>{label}</span>
      <Badge count={count} size="small" className="md:hidden" />
      <Badge count={count} size="large" className="hidden md:block" />
    </div>
  );
}
