// libs
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// utils
import { COLOR_PRIMARY } from '~/utils/conts';
import { Bell, Home, Profile, Twitter, TwitterOutline } from '~/utils/svgs';

const Sidenav = () => {
  const { data } = useSession();

  return (
    <header className="flex flex-col w-60 p-4">
      {Twitter(40, 40, COLOR_PRIMARY)}
      <div className="flex flex-col mt-10">
        <Link href={'/'} className="flex mb-5 items-center">
          {Home(24, 24, COLOR_PRIMARY)}
          <span className="ml-5 text-xl">Home</span>
        </Link>
        <Link href={'/'} className="flex mb-5 items-center">
          {Bell(24, 24, COLOR_PRIMARY)}
          <span className="ml-5 text-xl">Notifications</span>
        </Link>
        <Link href={`/@${data?.user.username}`} className="flex mb-5 items-center">
          {Profile(24, 24, COLOR_PRIMARY)}
          <span className="ml-5 text-xl">Profile</span>
        </Link>
        <Link href={'/'} className="flex mb-5 items-center">
          {TwitterOutline(24, 24, COLOR_PRIMARY)}
          <span className="ml-5 text-xl">Premium</span>
        </Link>
      </div>
      <button className="bg-amber-600 rounded-full text-slate-800 h-12"><b>POST</b></button>
    </header>
  )
}

export default Sidenav;