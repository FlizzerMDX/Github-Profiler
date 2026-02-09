import { ShadcnTemplate } from './index'

export function Editor() {
  const markdown = `# Hello World
  
  This is a [link](https://midicix.vercel.app)`;
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
    />
  )
}