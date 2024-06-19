import Link from 'next/link';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <div>
      <Link className='rounded py-2 hover:text-sky-700' href={href} prefetch>
        {children}
      </Link>
    </div>
  );
};
