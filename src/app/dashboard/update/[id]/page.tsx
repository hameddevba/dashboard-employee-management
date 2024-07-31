'use client'

import { useEffect, useState } from "react";
import { getEmployeeById } from "../../../../../db/queries";
import UpdateForm from "./updateForm";

export default function TheFormUpdate({ params }: { params: { id: number } }){

   const [employee, setEmployee] = useState({
      name: "",
      lastName: "",
      age: "",
      phone: "",
      email: "",
      nni: "",
   })

   useEffect(()=>{
      
      const newUpdate = async (id:number) => {

         const data = await getEmployeeById(id);
       
         setEmployee({
         name: data[0].name,
         lastName: data[0].lastName ?? "",
         age: data[0].age.toString(),
         phone: data[0].phone.toString(),
         email: data[0].email,
         nni: data[0].nni.toString(),
         });   
      } 

      newUpdate(params.id)
   
   },[params.id])


   const isEmployeeEmpty = (employeeObj:any) => {
      return Object.values(employeeObj).every(value => value === "");
   }

   if(isEmployeeEmpty(employee)){
      return <div>Loading...</div>

   }else{
      return(
         <UpdateForm theDefaultValues={employee} id={params.id} />
      )
   }

}