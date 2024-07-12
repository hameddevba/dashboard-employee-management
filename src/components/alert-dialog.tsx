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
import { deleteEmployee } from "../../db/queries"
 
 export function AlertDialogView({ id }:{id:number}) {
   return (
     <AlertDialog>
       <AlertDialogTrigger asChild>
       {/* <Button variant="outline">Show Dialog</Button> */}
       <Button variant="outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></Button>
       </AlertDialogTrigger>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
           <AlertDialogDescription>
             This action cannot be undone. This will permanently delete your
             account and remove your data from our servers.
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction onClick={async ()=> await deleteEmployee(id)}>Continue</AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   )
 }
 