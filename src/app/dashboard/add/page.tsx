'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"

import { useEffect, useState } from "react"
import { Loader2} from "lucide-react"
import { checkBySelected, createEmployee, getCode } from "../../../../db/queries"
import { zfd } from "zod-form-data";
import supabase from "@/lib/supabase-init"
import { useRouter } from "next/navigation"



const asyncCheckBefore = (type:any, message:any) => {
   return z.string().min(1, { message }).superRefine(async (val, ctx) => {
      const result = await checkBySelected(type, val);
      if (result === val) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} already exists`,
            fatal: true,
         });
      }
   });
};

const FormSchema = z.object({
   name: z.string().min(2, {
     message: "Username must be at least 2 characters.",
   }),
   lastName: z.string().min(2, {
     message: "Last name must be at least 2 characters.",
   }),
   age: z.string().min(1, {
     message: "Age must be a positive number.",
   }),
   phone: z.string().regex(/^\d+$/, {
     message: "Phone number must be numeric.",
   }),
   email: z.string().email({ message: "Insert a valid email" }).superRefine(async (val, ctx) => {
      const email = await checkBySelected("email", val);
      if (email === val) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email already exists",
            fatal: true,
         });
      }
   }),
   nni: asyncCheckBefore("nni", "NNI is required."),
   // code: asyncCheckBefore("code", "Code is required."),

   profileImage: zfd
    .file()
    .refine((file) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg lub png.",
      }
    )
});




export default function FormEmployee(){
  
   const [nextCode, setNextCode] = useState('');

   const router = useRouter();


   const form = useForm<z.infer<typeof FormSchema>>({
     resolver: zodResolver(FormSchema),
     defaultValues:{
         name: "",
         lastName:"",
         age: "",
         phone: "",
         email: "",
         nni: "",
         },
      })

   const [disableBtn, setDisableBtn] = useState(false)


   const wait = () => new Promise((resolve) => setTimeout(resolve, 800));


   async function onSubmit(data:any) {

      createEmployee({
         name: data.name,
         nni: data.nni,
         lastName: data.lastName,
         age: parseInt(data.age),
         phone: data.phone,
         email: data.email,
         code: nextCode,
         imageName:data.name+"-"+nextCode,
      });
  
   
      wait().then(async() =>{
         await supabase.storage.from('employee').upload(data.name+"-"+nextCode, data.profileImage, {})
         router.back();
         });
      }


      useEffect(()=>{

         const getTheCode = async ()=>{
            const res = await getCode();
            console.log(res[0].code)
            const theNextCode = parseInt(res[0].code) + 1;
            setNextCode(theNextCode.toString());

         }
         
         getTheCode();
         console.log("next code -> "+nextCode)

      
      },[])
 
   return (
      <div className="md:w-9/12 h-screen flex flex-col justify-center items-center lg:w-1/2">

         <div className="container mb-10 text-2xl uppercase  font-bold text-center">
            <h1>Add new employee</h1>
         </div>
         <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)}  className="w-full space-y-6">

               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input placeholder="John" {...field} />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>Last Name</FormLabel>
                     <FormControl>
                        <Input placeholder="Doe" {...field} />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>Age</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>Phone</FormLabel>
                     <FormControl>
                        <Input placeholder="1234567890" {...field} />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input type="email" placeholder="example@example.com" {...field} />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="nni"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>NNI</FormLabel>
                     <FormControl>
                        <Input placeholder="NNI123456" {...field} />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                     <FormItem>
                     <FormLabel>Code</FormLabel>
                     <FormControl>
                        <Input placeholder="CODE123" {...field} value={code} disabled />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               /> */}


               <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                     <FormItem>
                     <FormLabel>Profile picture</FormLabel>
                     <FormControl>
                        <Input
                           className=""
                           type="file"
                           {...fieldProps}
                           accept="image/png, image/jpeg, image/jpg"
                           onChange={(event) =>
                           onChange(event.target.files && event.target.files[0])
                           }
                        />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               />
               {disableBtn 
                  ? 
                     <Button disabled className="float-right">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wait
                     </Button>

                  :
                     <Button type="submit" className="float-right" onClick={(e) => {
                     setTimeout(() => {
                        setDisableBtn(true);
                        setTimeout(()=>setDisableBtn(false),5000)
                     }, 100);
                  }}>
                     Submit
                  </Button>
               }
            </form>
         </Form>
      </div>
   )
}
