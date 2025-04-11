
import { FormState, signUpSchema } from "../lib/type";
import bcrypt from "bcryptjs"
export async function signup(state:FormState,formData:FormData){
    const validateFields= signUpSchema.safeParse({
        name:formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password')
    })
    if(!validateFields.success){
       
        return {
            errors:validateFields.error.flatten().fieldErrors,
            message:"invalid credential",
            user:undefined
        }
    }
   //crete user
   const {name,email,password}= validateFields.data
   const hashedPassword= await bcrypt.hash(password,10)
  
   return{
    errors:{
        name:null,
        email:null,
        password:null
    },
    user:{
        name:name,
        email,
        password:hashedPassword
    },
    message:"success"
   }
}

export async function login(password:string,checkPass:string) {
    const isMatched= await bcrypt.compare(password,checkPass)
    
   return {
    success:true,
    isMatched:isMatched}
   
}