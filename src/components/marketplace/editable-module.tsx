import { Param } from "@/types/modules";
import { Module } from "@/types/modules";
import { Dispatch, RefObject, SetStateAction} from "react";
import { Button } from "../ui/button";
import { ShadcnTemplateRef } from "../editor";
import { User } from "@/types";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ColorField } from "./param/color-field";
import { NumberField } from "./param/number-field";
import { SelectField } from "./param/select-field";
import { StringField } from "./param/string-field";
import { ParamDialog } from "./param/dialog";

export const ParamComponent = ({params, setParams, param, defaultValue}: {params: Record<string, string | number>, setParams: Dispatch<SetStateAction<Record<string, string | number>>>, param: Param, defaultValue?: string}) => {
    switch(param.type){
        case "color":
            return(
                <ColorField param={param} params={params} setParams={setParams} />
            )
        case "number":
            return (
                <NumberField param={param} params={params} setParams={setParams}/>
            );
        case "select":
            return (
                <SelectField param={param} params={params} setParams={setParams} />
            );
        default:
            return (
                <StringField param={param} params={params} setParams={setParams} defaultValue={defaultValue} />
            );
    }
};

const EditableModule = ({module, editorRef, user}: {module: Module, editorRef?: RefObject<ShadcnTemplateRef | null>, user: User}) =>{
    return(
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <picture>
                <source srcSet={`${module.link}?username=${user.username}`} type="image/png" />
                <img
                    src={`${module.link}?username=${user.username}`}
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full select-none"
                />
            </picture>
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