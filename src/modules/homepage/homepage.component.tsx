// components/modules
import CenterComponent from '~/modules/layout/center.component';
import HeaderComponent from '~/modules/layout/header.component';
import PostsView from '~/modules/post/postsView.component';

export default function HomePage() {
  return (
    <CenterComponent title='Home'>
      <HeaderComponent />
      <PostsView />
    </CenterComponent>
  );
};
