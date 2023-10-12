import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import CreatePostWizzard from '../post/post-wizzard.component';

const HeaderComponent = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="header flex border-b border-slate-600 p-4">
      <div className="flex justify-between w-full">
        <CreatePostWizzard />
        <div className="flex">
          {/* <div className="mr-5">
            <UserButton afterSignOutUrl="/" />
          </div> */}
          {!user || !isSignedIn ? <SignInButton mode='modal' /> : <SignOutButton />}
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent;