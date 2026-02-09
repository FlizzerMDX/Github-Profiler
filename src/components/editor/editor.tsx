"use client";

import { ShadcnTemplate } from './index'

export function Editor({markdown, ref}: {markdown: string, ref: any}) {
  return (
    <ShadcnTemplate
      onReady={(editor) => {
        console.log('Editor ready!')
        // Access editor methods here
        console.log('Write in markdown!')
        // editor.injectHTML("<div>test</div>")
        editor.injectMarkdown(markdown)
        // editor.injectMarkdown("[test](https://midicix.vercel.app)")
        // console.log(editor.getMarkdown());
      }}
      ref={ref}
    />
  )
}