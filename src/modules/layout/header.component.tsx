import CreatePostWizzard from '../post/post-wizzard.component';

const HeaderComponent = () => {
  return (
    <div className="header flex border-b border-slate-600 p-4">
      <div className="flex justify-between w-full">
        <CreatePostWizzard />
      </div>
    </div>
  )
}

export default HeaderComponent;