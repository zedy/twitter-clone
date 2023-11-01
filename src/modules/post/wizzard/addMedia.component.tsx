import type { FC } from 'react';
import { COLOR_PRIMARY } from '~/utils/conts';
import { Emoji, Image, Location } from '~/utils/svgs';
import EmojiPicker from 'emoji-picker-react';

interface ComponentProps {

}

const AddMedia: FC<ComponentProps> = ({ }) => {
  const ImageWrapper: FC<{ image: JSX.Element }> = ({ image }) => (
    <div className='mr-3 cursor-pointer'>
      {image}
    </div>
  );

  return (
    <div className='flex items-center'>
      <ImageWrapper image={Image(24, 24, COLOR_PRIMARY)} />
      <ImageWrapper image={Emoji(20, 20, COLOR_PRIMARY)} />
      <ImageWrapper image={Location(24, 24, COLOR_PRIMARY)} />
    </div>
  )
}

export default AddMedia;