import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Param } from "@/types/modules";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export const StringField = ({param, params, setParams, defaultValue}: {param: Param, params: Record<string, string | number>, setParams: Dispatch<SetStateAction<Record<string, string | number>>>, defaultValue?: string}) =>{
    const [stringValue, setStringValue] = useState<string>(defaultValue && param.name.toLowerCase() === "username" ? defaultValue : ""); //params[param.key]
    useEffect(() =>{
        setParams({...params, [param.key] : stringValue});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringValue]);    
    return(
        <Field>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <Input
            id={`${param.name}-1`} 
            name={`${param.name}`}
            value={stringValue}
            onChange={(e) => setStringValue(e.target.value)} />
        </Field>
    )
};