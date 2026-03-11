"use client";

import { RefObject, useEffect } from 'react';
import { ShadcnTemplate, ShadcnTemplateRef } from './index'
import { getReadmeContent } from '@/services/github';
import { EmojiPicker } from './emoji-picker';
import { EditorSkeleton } from './editor-skeleton';
import MarketPlace from '../marketplace/marketplace';
import { Session, User } from '@/types';

export function Editor({markdown, ref, session, hidden, repo}: {markdown?: string, ref?: RefObject<ShadcnTemplateRef | null>, session?: Session, hidden?: boolean, repo?: object | undefined}) {
  useEffect(()=>{
    const call = async() =>{
      const data = await getReadmeContent((session?.user as User)?.username, session?.accessToken || "");
      const md = data?.success ? data?.content : "";
      await ref?.current?.injectMarkdown(md);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    call();
  }, [repo, ref, session?.accessToken, session?.user])

  return (
    <>
      <div className='flex flex-row w-full' hidden={hidden || repo === undefined}>
        <EmojiPicker className='size-96' editorRef={ref}/>

        <ShadcnTemplate
          onReady={(editor) => {
            if (markdown){
              editor.injectMarkdown(markdown);
            }
          }}
          ref={ref}
          className='justify-items-center'
        />

        <MarketPlace editorRef={ref} className={'size-96'} />
      </div>

      <div hidden={!hidden}>
        <EditorSkeleton hidden={!hidden}/>
      </div>
    </>
  )
}