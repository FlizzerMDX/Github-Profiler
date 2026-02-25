import {EmojiClickData, SuggestionMode, Theme} from 'emoji-picker-react';
import { EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { RefObject } from 'react';
import { ShadcnTemplateRef } from './ShadcnTemplate';

const EmojiPickr = dynamic(() => import('emoji-picker-react'), { ssr: false });

export const EmojiPicker = ({className, editorRef}: {className: string, editorRef?: RefObject<ShadcnTemplateRef | null>}) => {

  const handleEmojiClick = (emojiObject: EmojiClickData) =>{
    editorRef?.current?.addMarkdown(emojiObject.emoji);
  };

  return (
    <div className={className}>
      <EmojiPickr 
        skinTonesDisabled
        emojiStyle={EmojiStyle.TWITTER}
        previewConfig={{showPreview: false}}
        onEmojiClick={(emojiObject: EmojiClickData) => handleEmojiClick(emojiObject)}
        theme={Theme.DARK}
        suggestedEmojisMode={SuggestionMode.FREQUENT}
        reactionsDefaultOpen
        reactions={["1f680", "1f6e0-fe0f", "1f3a8", "2728", "1f91d", "1f41b", "1f3af", "1f4da"]}
      />
    </div>
  );
}