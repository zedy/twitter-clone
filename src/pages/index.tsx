// components/modules
import CenterComponent from '~/modules/layout/center.component';
import HeaderComponent from '~/modules/layout/header.component';
import PostsView from '~/modules/post/posts-view.component';

export default function Home() {
  return (
    <>
      <CenterComponent>
        <>        
          <HeaderComponent />
          <PostsView />
        </>
      </CenterComponent>
    </>
  );
};
