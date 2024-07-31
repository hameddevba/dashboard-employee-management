"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabase-init"
import { useEffect, useState } from "react"
import { getEmployeeById, updateEmployee } from "../../../../../db/queries"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"


export default function Component({ params }: { params: { id: number } }) {

   const [imagefile, setImagefile ] = useState("");
   const [image, setImage]= useState('');

   const router = useRouter();
  

   function getImage(e:any){
      setImagefile(e.target.files[0]);
   }

 
    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (params.id) {
         try{
            const employee = await getEmployeeById(params.id);
            // console.log(employee[0].imageName)
            if(employee[0].imageName != null || employee[0].imageName ==""){
               const { data, error } = await supabase
               .storage
               .from('employee')
               .update(employee[0].imageName, imagefile, {})
            }else{
               employee[0].imageName = employee[0].name+"-"+employee[0].code
               // console.log(employee[0])
               updateEmployee(params.id, employee[0]);
               await supabase.storage.from('employee').upload(employee[0].name+"-"+employee[0].code,imagefile, {})
               console.log("Add new image")
            }
            router.back()

         }catch (error) {
            console.error('Failed to fetch employee data', error);
         }  
      }
      
    };


   
    useEffect(()=>{

      const putImage = async ()=> {
         const employee = await getEmployeeById(params.id);
         // console.log(employee[0].imageName)
         const { data } = supabase.storage.from('employee').getPublicUrl(employee[0].imageName ??"")
         if (data) {
            setImage(data.publicUrl)     
            }
      }
      
      putImage();
       
      
      },[params.id])
   



   return (
      <div className="container flex flex-col justify-center items-center h-screen">
         <Card className="w-full max-w-md">
            <CardHeader>
               <Avatar className="w-20 h-20 ring-2 ring-background mx-auto">
                  <AvatarImage src={image} />
                  <AvatarFallback>JD</AvatarFallback>
               </Avatar>
               <CardTitle>Upload a File</CardTitle>
               <CardDescription>Select a file from your device to upload.</CardDescription>
            </CardHeader>
            <CardContent>
            <form className="space-y-4"  onSubmit={onSubmit}>
               <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" name="file" type="file" onChange={getImage} />
               </div>
               <Button type="submit" className="w-full">
                  Upload
               </Button>
            </form>
            </CardContent>
         </Card>
      </div>
   )
}