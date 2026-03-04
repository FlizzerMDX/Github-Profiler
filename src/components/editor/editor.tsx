"use client";

import { RefObject, useEffect, useState } from 'react';
import { ShadcnTemplate, ShadcnTemplateRef } from './index'
import { getReadmeContent } from '@/services/github';
import { EmojiPicker } from './emoji-picker';
import { EditorSkeleton } from './editor-skeleton';
import { Button } from '../ui/button';
import MarketPlace from '../marketplace/marketplace';

export function Editor({markdown, ref, session, hidden, repo}: {markdown?: string, ref?: RefObject<ShadcnTemplateRef | null>, session?: any, hidden?: boolean, repo?: object | undefined}) {
  useEffect(()=>{
    const call = async() =>{
      const data = await getReadmeContent(session?.user?.username, session?.accessToken);
      const md = data?.success ? data?.content : "";
      await ref?.current?.injectMarkdown(md);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    call();
  }, [repo])

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