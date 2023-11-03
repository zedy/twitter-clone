import type { FC } from 'react';
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';

interface ComponentProps {
  callback: (emoji: string) => void;
}

const EmojiWrapper: FC<ComponentProps> = ({ callback }) => {
  const handleEmojiPick = (emojiData: EmojiClickData) => {
    callback(emojiData.emoji);
  }

  return <div className='absolute top-6 z-20'>
    <EmojiPicker
      theme={Theme.DARK}
      onEmojiClick={handleEmojiPick}
      previewConfig={{
        showPreview: false,
      }}
    />
  </div>;
}

export default EmojiWrapper;