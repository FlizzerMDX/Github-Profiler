"use client";

import { RefObject, useEffect, useState } from 'react';
import { ShadcnTemplate, ShadcnTemplateRef } from './index'
import { getReadmeContent } from '@/services/github';
import { EmojiPicker } from './emoji-picker';

export function Editor({markdown, ref, session }: {markdown?: string, ref?: RefObject<ShadcnTemplateRef | null>, session?: any}) {
  useEffect(()=>{
    const call = async() =>{
      const data = await getReadmeContent(session?.user?.username, session?.accessToken);
      const md = data?.success ? data?.content : "";
      ref?.current?.injectMarkdown(md);
    }
    call();
  }, [])

  return (
    <div className='flex flex-row w-full'>
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
      <div className='size-96'>s</div>
    </div>
  )
}