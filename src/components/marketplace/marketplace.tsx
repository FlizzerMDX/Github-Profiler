import { getModules } from "@/services/marketplace";
import { User } from "@/types";
import { Modules } from "@/types/modules";
import { useSession } from "next-auth/react";
import { RefObject, useEffect, useState } from "react";
import EditableModule from "./editable-module";
import { ShadcnTemplateRef } from "../editor";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const MarketPlace = ({editorRef, className}: {editorRef?: RefObject<ShadcnTemplateRef | null>, className: string }) =>{

    const { data: session } = useSession();
    const [modules, setModules] = useState<Modules>();

    useEffect(() => {
        const call = async() => {
            const content = await getModules();
            setModules(content);
        };
        call();
    }, []);

    return(
        <div className={cn("ml-2", className)}>
            <span>
                MarketPlace
            </span>
            <Separator/>
            {modules?.modules?.map(
                (module) => {
                    return(
                        <div key={module.key}>
                            <EditableModule editorRef={editorRef} module={module} user={session?.user as User}/>
                        </div>
                    )
                })}
        </div>
    )
};

export default MarketPlace;