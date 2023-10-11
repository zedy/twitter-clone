// libs
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

const CreatePostWizzard = () => {
  const { user } = useUser();

  return (
    <>
      {user ? <div className="post-wizzard flex items-center w-full">
        <div className="rounded-full mr-2 overflow-hidden">
          <Image src={user.imageUrl} alt='profile image' width={64} height={64} objectFit={'contain'} />
        </div>
        <input type='text' placeholder="What's happening?" className="bg-transparent grow outline-none" />
      </div> : null}
    </>
  );
};

export default CreatePostWizzard;