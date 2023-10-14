import { useSession, signOut, signIn } from 'next-auth/react';
import CreatePostWizzard from '../post/post-wizzard.component';

const HeaderComponent = () => {
  const { status } = useSession();

  return (
    <div className="header flex border-b border-slate-600 p-4">
      <div className="flex justify-between w-full">
        <CreatePostWizzard />
        <div className="flex">
          {status === 'authenticated' ? (
            <button className="w-20" onClick={() => void signOut()}>Sign out</button>
          ) : (
            <button className="w-20" onClick={() => void signIn()}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent;