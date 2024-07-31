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
import { Loader2} from "lucide-react"
import { useState } from "react"
import { updateEmployee } from "../../../../../db/queries"
import { useRouter } from "next/navigation"





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
   email:z.string().email({ message: "Invalid email address" }),
   nni: z.string().min(10,{message: "invalide nni"}),
   // code: asyncCheckBefore("code", "Code is required."),
  
});




export default function UpdateForm({ theDefaultValues, id}:{theDefaultValues:z.infer<typeof FormSchema>, id:number}){
  

   const router = useRouter()

   const form = useForm<z.infer<typeof FormSchema>>({
         resolver: zodResolver(FormSchema),
         defaultValues: theDefaultValues
      })

   const [disableBtn, setDisableBtn] = useState(false)
   
    
 


  

   async function onSubmit(data:any) {
      updateEmployee(id, data);
      router.back()
   }

   return (
      <div className="md:w-9/12 h-screen flex flex-col justify-center items-center lg:w-1/2">

         <div className="container mb-10 text-2xl uppercase  font-bold text-center">
            <h1>Update employee</h1>
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
                        <Input placeholder="John" {...field}  />
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
                        <Input type="email" placeholder="example@example.com" {...field}  />
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
                        <Input placeholder="CODE123" {...field} defaultValue={code} disabled />
                     </FormControl>
                     <FormMessage />
                     </FormItem>
                  )}
               /> */}

{/* 
               <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field: { defaultValue, onChange, ...fieldProps } }) => (
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
               /> */}
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

