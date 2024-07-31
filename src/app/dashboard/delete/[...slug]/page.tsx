'use client'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
 import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deleteEmployee } from "../../../../../db/queries"
 
 export default function AlertDialogDelete({ params }: { params: { slug: string } }) {

   const router = useRouter()
   return (
     <AlertDialog defaultOpen>
       <AlertDialogTrigger asChild>
         {/* <Button variant="outline">Show Dialog</Button> */}
       </AlertDialogTrigger>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
           <AlertDialogDescription>
             This action cannot be undone. This will permanently delete the
             employee and remove your data from the table.
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel onClick={() => router.back()}>Cancel</AlertDialogCancel>
           <AlertDialogAction onClick={async ()=> {
            await deleteEmployee(parseInt(params.slug))
            router.back()
            }}>
               Continue
            </AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   )
 }
 