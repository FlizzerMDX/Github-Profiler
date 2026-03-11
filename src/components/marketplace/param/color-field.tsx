import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import ComponantColorPicker from "../color-picker";
import { Param } from "@/types/modules";
import { Color } from "react-aria-components";
import { Dispatch, SetStateAction, useState } from "react";

export const ColorField = ({param, params, setParams}: {param: Param, params: Record<string, string | number>, setParams: Dispatch<SetStateAction<Record<string, string | number>>>}) =>{
    const [color, setColor] = useState<Color>();
    return(
        <Field onBlur={() => setParams({...params, [param.key] : color?.toString("hex").replace("#", "") || ""})}>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <ComponantColorPicker color={color} setColor={setColor}/>
        </Field>
    )
};