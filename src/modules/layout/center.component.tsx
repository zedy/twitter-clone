// libs
import { type FC } from 'react';
import { useSession, signOut } from 'next-auth/react';

// components
import Sidenav from '../sideNav/sideNav.component';

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
  title: string | JSX.Element;
}

const CenterComponent: FC<ComponentProps> = ({ children, title }) => {
  const { status } = useSession();

  return (
    <main className="center-component flex justify-center">
      <Sidenav />
      <div className="relative w-full min-h-screen md:max-w-2xl border border-t-0 border-b-0 rounded border-gray-600">
        <div className="flex p-4 w-full border-b border-gray-600 justify-between">
          <strong>{title}</strong>
          <div className="flex">
            {status === 'authenticated' && <button className="" onClick={() => void signOut()}>Sign out</button>}
          </div>
        </div>
        {children}
      </div>
    </main>
  )
};

export default CenterComponent;