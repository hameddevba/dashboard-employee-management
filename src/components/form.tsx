/* eslint-disable react/no-unescaped-entities */
"use client"

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

import { DialogClose,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Loader2 } from "lucide-react"







export default function InputForm({ 
   Employee,
   FormSchema,
   onSubmit,
}:{
   Employee:any,
   FormSchema:any,
   onSubmit:any,
}) {

  

   const form = useForm<z.infer<typeof FormSchema>>({
     resolver: zodResolver(FormSchema),
     defaultValues:Employee,
   })

   const [disableBtn, setDisableBtn] = useState(false)
 
 
  return (
    <Form {...form}>
     
      <DialogHeader>
         <DialogTitle className="text-center text-2xl font-bold">PROFILE</DialogTitle>
         <DialogDescription className="text-center">
            Make changes here. Click save when you're done.
         </DialogDescription>
      </DialogHeader>
        
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
         <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
               <FormItem>
               <FormLabel>Code</FormLabel>
               <FormControl>
                  <Input placeholder="CODE123" {...field} />
               </FormControl>
               <FormMessage />
               </FormItem>
            )}
         />

         <DialogFooter>
            {disableBtn ? 
               <Button disabled >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wait
               </Button>
               :
               <Button type="submit" onClick={(e) => {
                  setTimeout(() => {
                     setDisableBtn(true);
                     setTimeout(()=>setDisableBtn(false),1000)
                  }, 200); // Change this duration as needed
                  // Handle submit logic here
               }}>
                  Submit
               </Button>
            }   
         </DialogFooter>
      </form>
    </Form>
  )
}
