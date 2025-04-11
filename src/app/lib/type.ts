import {z} from 'zod'
export const signUpSchema= z.object({
    name:z.string()
    .min(3,{message:'Message must be atleast 3 character long'})
    .trim(),
    email:z.string()
    .email({message:'Please enter a valid email.'})
    .trim(),
    password:z.string()
    .min(8,{message:'Must be atleast 8 character'})
    .regex(/[a-zA-Z]/,{message:"Must contain at least one letter"})
    .regex(/[0-9]/,{message:'Must contain at least one number'})
    .trim()

})
export type FormState=| {
    errors:{
        name?:string[] |null
        email?:string[] |null
        password?:string[] |null
    }
    message?:string,
    user?:{
        name:string,
        email:string,
        password:string
    } |undefined
} |undefined