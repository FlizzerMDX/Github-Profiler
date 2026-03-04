import ComponantColorPicker from "./color-picker";
import { Input } from "../ui/input";
import { Params } from "@/types/modules";
import { Settings2 } from "lucide-react";
import { Module } from "@/types/modules";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Dispatch, HTMLAttributes, ReactNode, RefObject, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ShadcnTemplateRef } from "../editor";
import { renderToString } from "react-dom/server";
import { User } from "@/types";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Color } from "react-aria-components";

const createLink = (url: string, params: any) =>{
    const linkParameters = Object.keys(params).map((param, index) => `${index === 0 ? "?" : "&"}${param}=${params[param]}`).join("");
    return url + linkParameters;
}

export const ParamComponent = ({params, setParams, param, defaultValue}: {params: object, setParams: Dispatch<SetStateAction<object>>, param: Params, defaultValue?: string}) => {
    switch(param.type){
        case "color":
            const [color, setColor] = useState<Color>();
            // useEffect(() =>{
            //     setParams({...params, [param.key] : color?.toString("hex") || ""});
            // }, [color]);
            return(
                <Field onBlur={() => setParams({...params, [param.key] : color?.toString("hex").replace("#", "") || ""})}>
                    <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
                    <ComponantColorPicker color={color} setColor={setColor}/>
                </Field>
            )
        default:
            const [value, setValue] = useState<string>(defaultValue && param.name.toLowerCase() === "username" ? defaultValue : ""); //params[param.key]
            useEffect(() =>{
                setParams({...params, [param.key] : value});
            }, [value]);
            return (
                <Field>
                    <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
                    <Input 
                    id={`${param.name}-1`} 
                    name={`${param.name}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
                </Field>
            );
    }
};

const ParamDialog = ({children, module, editorRef, user}: {children: ReactNode, module: Module, editorRef?: RefObject<ShadcnTemplateRef | null>, user: User}) =>{
    const [params, setParams] = useState<object>(Object.fromEntries(module.params.map((param) => [param.key, ""])));
    const [src, setSrc] = useState<string>(createLink(module.link, params));
    useEffect(() =>{
        setSrc(createLink(module.link, params));
    }, [params]);
    return(
    <Dialog modal={false}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Edit Module</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <div className="flex gap-8">
                <FieldGroup className="sm:max-w-60">
                    {module?.params.map((param) => <ParamComponent params={params} setParams={setParams} param={param} key={param.key} defaultValue={user.username}/>)}
                </FieldGroup>
                <div className="flex align-middle">
                    <img src={src} draggable={false}/>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" onClick={() => console.log(params)}>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button 
                    variant="outline" 
                    onClick={() => editorRef?.current?.addHTML(renderToString(<img src={src} />))}>
                        Add to Readme
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
};

const EditableModule = ({module, editorRef, user}: {module: Module, editorRef?: RefObject<ShadcnTemplateRef | null>, user: User}) =>{
    return(
        <div>
            <img src={`${module.link}?username=FlizzerMDX`} className="select-none"/>
            <ParamDialog editorRef={editorRef} module={module} user={user}>
                <Button variant="outline">
                    Add
                </Button>
            </ParamDialog>
        </div>
    )
}

export default EditableModule;