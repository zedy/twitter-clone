import Image from 'next/image';
import { useSession } from 'next-auth/react';

const UserProfilePicture = () => {
  const { data: userData } = useSession();

  return (
    <div className="rounded-full mr-2 overflow-hidden" style={{ minWidth: '40px', height: '40px' }}>
      {userData?.user ? (
        <Image
          src={userData.user.image?.toString() ?? ''}
          alt='profile image'
          width={40}
          height={40}
          className="object-contain"
          loading={'eager'}
        />
      ) : (
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-12 h-12 text-gray-400 -top-1 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
      )
      }
    </div>
  );
};

export default UserProfilePicture;