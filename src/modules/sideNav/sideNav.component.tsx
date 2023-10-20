import Link from 'next/link';
import { Bell, Home, Profile, Twitter, TwitterOutline } from '~/utils/svgs';

const Sidenav = () => {
  return (
    <div className="flex flex-col w-60 p-4">
      {Twitter(40, 40, 'd97706')}
      <div className="flex flex-col mt-10">
        <Link href={'/'} className="flex mb-5 items-center">
          {Home(28, 28, 'd97706')}
          <span className="ml-5 text-xl">Home</span>
        </Link>
        <Link href={'/'} className="flex mb-5 items-center">
          {Bell(28, 28, 'd97706')}
          <span className="ml-5 text-xl">Notifications</span>
        </Link>
        <Link href={'/'} className="flex mb-5 items-center">
          {Profile(28, 28, 'd97706')}
          <span className="ml-5 text-xl">Profile</span>
        </Link>
        <Link href={'/'} className="flex mb-5 items-center">
          {TwitterOutline(28, 28, 'd97706')}
          <span className="ml-5 text-xl">Premium</span>
        </Link>
      </div>
      <button className="bg-amber-600 rounded-full text-slate-800 h-12"><b>POST</b></button>
    </div>
  )
}

export default Sidenav;