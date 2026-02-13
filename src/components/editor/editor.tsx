"use client";

import { Ref } from 'react';
import { ShadcnTemplate, ShadcnTemplateRef } from './index'

export function Editor({markdown, ref}: {markdown?: string, ref: Ref<ShadcnTemplateRef>}) {
  return (
    <ShadcnTemplate
      onReady={(editor) => {
        if (markdown){
          editor.injectMarkdown(markdown);
        }
      }}
      ref={ref}
      className='bg-[#0d1117]'
    />
  )
}