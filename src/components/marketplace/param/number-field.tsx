import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Param } from "@/types/modules";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export const NumberField = ({param, params, setParams}: {param: Param, params: Record<string, string | number>, setParams: Dispatch<SetStateAction<Record<string, string | number>>>}) =>{
    const [number, setNumber] = useState<number>(0); //params[param.key]
    useEffect(() =>{
        setParams({...params, [param.key] : number});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number]); 
    return(
        <Field>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <Input 
            id={`${param.name}-1`} 
            name={`${param.name}`}
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))} />
        </Field>
    )
};