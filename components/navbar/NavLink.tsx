import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <div>
      {/* <Link className='' href={href}> */}
      <Link
        className='rounded border bg-sky-800 px-4 py-2 hover:border-sky-500 hover:text-sky-200 '
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};
