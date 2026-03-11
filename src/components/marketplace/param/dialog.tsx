import { ShadcnTemplateRef } from "@/components/editor";
import { Module, User } from "@/types";
import { ReactNode, RefObject, useEffect, useState } from "react";
import { FieldGroup } from "@/components/ui/field";
import { renderToString } from "react-dom/server";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ParamComponent } from "../editable-module";
import { Button } from "@/components/ui/button";

const createLink = (url: string, params: Record<string, string | number>) =>{
    const linkParameters = Object.keys(params).map((param, index) => `${index === 0 ? "?" : "&"}${param}=${params[param]}`).join("");
    return url + linkParameters;
}

export const ParamDialog = ({children, module, editorRef, user}: {children: ReactNode, module: Module, editorRef?: RefObject<ShadcnTemplateRef | null>, user: User}) =>{
    const [params, setParams] = useState<Record<string, string | number>>(Object.fromEntries(module.params.map((param) => [param.key, param.key.toLowerCase() === "username" ? user.username : ""])));
    const [src, setSrc] = useState<string>(createLink(module.link, params));
    useEffect(() =>{
        // eslint-disable-next-line
        setSrc(createLink(module.link, params));
    }, [params, module.link]);
    return(
    <Dialog modal={false}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
                <DialogTitle>Edit Module</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <div className="flex gap-8">
                <FieldGroup className="w-14 grow">
                    {module?.params.map((param) => <ParamComponent params={params} setParams={setParams} param={param} key={param.key} defaultValue={user.username}/>)}
                </FieldGroup>
                <div className="flex align-middle w-14 grow-4">
                    <picture>
                        <source srcSet={src} type="image/png" />
                        <img
                            src={src}
                            alt={module.repo}
                            draggable={false}
                            className="relative z-20 aspect-video w-full select-none"
                        />
                    </picture>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button 
                    variant="outline" 
                    onClick={
                        () => editorRef?.current?.addHTML(
                            renderToString(
                                <picture>
                                    <source srcSet={src} type="image/png" />
                                    <img
                                        src={src}
                                        alt={module.repo}
                                    />
                                </picture>
                            )
                        )
                    }>
                        Add to Readme
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
};