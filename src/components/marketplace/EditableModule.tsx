import ComponantColorPicker from "./color-picker";
import { Input } from "../ui/input";
import { Param } from "@/types/modules";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const createLink = (url: string, params: any) =>{
    const linkParameters = Object.keys(params).map((param, index) => `${index === 0 ? "?" : "&"}${param}=${params[param]}`).join("");
    return url + linkParameters;
}

export const ParamComponent = ({params, setParams, param, defaultValue}: {params: object, setParams: Dispatch<SetStateAction<object>>, param: Param, defaultValue?: string}) => {
    switch(param.type){
        case "color":
            const [color, setColor] = useState<Color>();
            return(
                <Field onBlur={() => setParams({...params, [param.key] : color?.toString("hex").replace("#", "") || ""})}>
                    <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
                    <ComponantColorPicker color={color} setColor={setColor}/>
                </Field>
            )
        case "number":
            const [number, setNumber] = useState<number>(0); //params[param.key]
            useEffect(() =>{
                setParams({...params, [param.key] : number});
            }, [number]);
            return (
                <Field>
                    <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
                    <Input 
                    id={`${param.name}-1`} 
                    name={`${param.name}`}
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(parseInt(e.target.value))} />
                </Field>
            );
        case "select":
            const [selectValue, setSelectValue] = useState<string>(); //params[param.key]
            useEffect(() =>{
                setParams({...params, [param.key] : selectValue});
            }, [selectValue]);
            return (
                <Field>
                    <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
                    <Select onValueChange={(e) => setSelectValue(e)}>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectGroup>
                            <SelectLabel>{param.name}</SelectLabel>
                            {
                                param.options?.map((option) => <SelectItem key={option.key} value={option.key}>{option.name}</SelectItem>)
                            }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            );
        default:
            const [stringValue, setStringValue] = useState<string>(defaultValue && param.name.toLowerCase() === "username" ? defaultValue : ""); //params[param.key]
            useEffect(() =>{
                setParams({...params, [param.key] : stringValue});
            }, [stringValue]);
            return (
                <Field>
                    <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
                    <Input 
                    id={`${param.name}-1`} 
                    name={`${param.name}`}
                    value={stringValue}
                    onChange={(e) => setStringValue(e.target.value)} />
                </Field>
            );
    }
};

const ParamDialog = ({children, module, editorRef, user}: {children: ReactNode, module: Module, editorRef?: RefObject<ShadcnTemplateRef | null>, user: User}) =>{
    const [params, setParams] = useState<object>(Object.fromEntries(module.params.map((param) => [param.key, param.key.toLowerCase() === "username" ? user.username : ""])));
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
                    onClick={() => editorRef?.current?.addHTML(renderToString(<img src={src} alt={module.repo}/>))}>
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
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <img
                src={`${module.link}?username=FlizzerMDX`}
                alt="Event cover"
                className="relative z-20 aspect-video w-full select-none"
            />
            <CardHeader>
                <CardAction>
                {
                    module.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)
                }
                </CardAction>
                <CardTitle>{module.name}</CardTitle>
                <CardDescription>
                    {module.description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <ParamDialog editorRef={editorRef} module={module} user={user}>
                    <Button className="w-full">Add Element</Button>
                </ParamDialog>
            </CardFooter>
        </Card>
    )
}

export default EditableModule;