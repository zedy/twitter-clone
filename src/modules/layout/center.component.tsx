// libs
import { type FC } from 'react';
import { useSession, signOut } from 'next-auth/react';

// components
import Sidenav from '../sideNav/sideNav.component';
import { Logout } from '~/utils/svgs';
import { COLOR_PRIMARY } from '~/utils/conts';
import RightSideBar from '../sideBar/sidebar.component';

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
  title: string | JSX.Element;
}

const CenterComponent: FC<ComponentProps> = ({ children, title }) => {
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const SignoutButton = () => (
    <button
      className="flex justify-center items-center hover:text-amber-600 transition-all"
      onClick={() => void signOut()}>
      <span>Sign out</span>
      <span className="rotate-180 ml-2">
        {Logout(20, 20, COLOR_PRIMARY)}
      </span>
    </button>
  )

  return (
    <div className="center-component flex justify-center">
      <Sidenav />
      <main className="relative w-full min-h-screen md:max-w-2xl border border-t-0 border-b-0 rounded border-gray-600">
        <div className="flex p-4 w-full border-b border-gray-600 justify-between">
          <strong>{title}</strong>
          {isLoggedIn && (
            <div className="flex">
              <SignoutButton />
            </div>
          )}
        </div>
        {children}
      </main>
      <RightSideBar />
    </div>
  )
};

export default CenterComponent;