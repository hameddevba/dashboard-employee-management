"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import InputForm from "./form"
import { z } from "zod"
import React, { useEffect, useState } from "react"
import { createEmployee, getEmployeeById, updateEmployee } from "../../db/queries";
import { checkBySelected } from "../../db/queries"




// Reusable async validation function
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

const FormSchemaInsert = z.object({
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
   code: asyncCheckBefore("code", "Code is required."),
});


const wait = () => new Promise((resolve) => setTimeout(resolve, 800));



export function FormDialogView({ id = null, children }:{id:number|null, children:React.ReactNode}) {

   const [open, setOpen] = useState(false);
   // const [employeeId, setEmployeeId] = useState(id)

   const [employee, setEmployee] =useState({
      name: "",
      lastName: "",
      age: "",
      phone: "",
      email: "",
      nni: "",
      code: "",
   });


   async function onSubmit(data: any, event:Event) {
      event.preventDefault();
      
      data.age = parseInt(data.age);
 
      createEmployee(data);
     
       wait().then(() => setOpen(false));
      //  toast({
      //    title: "You submitted the following values:",
      //    description: (
      //      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //      </pre>
      //    ),
      //  })
     }

   const updateOnSubmit = (data:any, event:Event)=>{
      console.log(data)
      data.age = parseInt(data.age);
      updateEmployee(id, data);
      wait().then(() => setOpen(false));
      event.preventDefault();
   }

   useEffect(()=>{
      if(id != null ){
   
         getEmployeeById(id).then(data => {
            if (data.length > 0) {
               const val = data[0];

               setEmployee({
                  ...employee,
                  name: val.name,
                  lastName: val.lastName,
                  age: val.age.toString(),
                  phone: val.phone.toString(),
                  email: val.email,
                  nni: val.nni.toString(),
                  code: val.code.toString(),
               })
               
            };
         })
      }   
   },[id])

   const isEmployeeEmpty = (employeeObj:any) => {
      return Object.values(employeeObj).every(value => value === "");
   }

   const renderForm = () => {

      if (isEmployeeEmpty(employee)) {
         return <InputForm Employee={employee}  FormSchema={FormSchemaInsert} onSubmit={onSubmit} />;
      } else {
         // console.log(employee)
         const FormSchemaUpdate = FormSchemaInsert.omit({ email: true, nni: true, code:true });

         const updatedFormSchema = FormSchemaUpdate.extend({
            email:z.string().email({ message: "Invalid email address" }),
            nni: z.string().min(10,{message: "invalide nni"}),
            code: z.string().min(5, {message: "invalide code"})
         })

         return <InputForm Employee={employee} FormSchema={updatedFormSchema} onSubmit={updateOnSubmit}/>;
      }
   }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
         {renderForm()}
      </DialogContent>
    </Dialog>
  )
}

