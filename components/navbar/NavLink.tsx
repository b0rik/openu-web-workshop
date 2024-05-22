import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <div>
      <Link
        className='rounded px-4 py-2 hover:border-sky-500 hover:text-sky-200 md:border md:bg-sky-800 '
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};
