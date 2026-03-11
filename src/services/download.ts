import { EditorCommands } from "@/components/editor/ShadcnTemplate";
import { User } from "@/types";

export const downloadEditingFile = async(editorRef: EditorCommands, user: User) =>{
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const filename = `${user.username}_readme.md`;
    
    const blob = new Blob([editorRef.exportToMarkdown()], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};