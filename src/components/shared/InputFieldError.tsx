import { getInputFieldError, IInputErrorState } from "@/lib/getInputFiledError";
import { FieldDescription } from "../ui/field";

interface FieldErrorProps{
    field:string
    state: IInputErrorState
}


export default function InputFieldError({field,state}:FieldErrorProps) {
    if(getInputFieldError(field,state)){
        return ( <FieldDescription className="text-sm text-red-600">
    {getInputFieldError(field,state)}
 </FieldDescription>)
    }
return null
}
