import { getModules } from "@/services/marketplace";
import { User } from "@/types";
import { Modules } from "@/types/modules";
import { useSession } from "next-auth/react";
import { RefObject, useEffect, useState } from "react";
import EditableModule, { ParamComponent } from "./EditableModule";
import { Button } from "../ui/button";
import { ShadcnTemplateRef } from "../editor";
import { renderToString } from 'react-dom/server'
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

// const MarketPlace = ({...props}: React.ComponentProps<"div">) =>{
// const MarketPlace = ({editorRef, ...props}: {editorRef?: RefObject<ShadcnTemplateRef | null>, props: React.ComponentProps<"div"> }) =>{
const MarketPlace = ({editorRef, className}: {editorRef?: RefObject<ShadcnTemplateRef | null>, className: string }) =>{

    const { data: session } = useSession();
    const [user, setUser] = useState<User>(session?.user as User);
    const [modules, setModules] = useState<Modules>();

    const call = async() => {
        const content = await getModules();
        setModules(content);
    };
    useEffect(() => {
        call();
    }, []);

    return(
        // <div {...props}>
        <div className={cn("ml-2", className)}>
            <span>
                MarketPlace
            </span>
            <Separator/>
            {modules?.modules?.map(
                (module) => {
                    return(
                        <div key={module.key}>
                            <EditableModule editorRef={editorRef} module={module} user={user}/>
                        </div>
                    )
                })}
        </div>
    )
};

export default MarketPlace;