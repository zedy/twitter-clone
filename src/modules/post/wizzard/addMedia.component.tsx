import { type FC, lazy, useState, Suspense } from 'react';
import { COLOR_PRIMARY } from '~/utils/conts';
import { Emoji, Image, Location } from '~/utils/svgs';

// component
import type { MediaCallbackData } from './create.component';
import { LoadingOverlay } from '~/modules/spinner/loading.component';

interface ComponentProps {
  callback: (arg0: MediaCallbackData) => void;
}

interface ImageWrapperProps {
  image: JSX.Element;
  onclick?: () => void;
}

const EmojiComponent = lazy(() => import('./emoji.component'));

const AddMedia: FC<ComponentProps> = ({ callback }) => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const ImageWrapper: FC<ImageWrapperProps> = ({ image, onclick }) => (
    <div className='mr-3 cursor-pointer' onClick={onclick}>
      {image}
    </div>
  );

  const handleEmojiWindow = () => {
    setShowEmoji(true);
  };

  const getEmoji = (emoji: string) => {
    callback({
      type: 'emoji',
      payload: emoji,
    });
    setShowEmoji(false);
  };

  return (
    <div className='flex items-center relative'>
      <ImageWrapper image={Image(24, 24, COLOR_PRIMARY)} />
      <ImageWrapper
        image={Emoji(20, 20, COLOR_PRIMARY)}
        onclick={handleEmojiWindow} />
      <ImageWrapper image={Location(24, 24, COLOR_PRIMARY)} />
      {showEmoji && <Suspense fallback={<LoadingOverlay />}>
        <EmojiComponent callback={getEmoji} />
      </Suspense>}
    </div>
  )
}

export default AddMedia;