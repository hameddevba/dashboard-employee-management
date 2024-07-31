import { ColumnDef } from "@tanstack/react-table"
 import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
 import { Button } from "@/components/ui/button"
 import { Checkbox } from "@/components/ui/checkbox"
 import { InsertEmployee } from "../../../../db/schema"


import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useEffect } from "react"
import supabase from "@/lib/supabase-init"
import Image from "next/image"
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"


const columns: ColumnDef<InsertEmployee>[] = [
  
  {
      accessorKey:"name",
      header: "Name",
      cell:({row})=> row.getValue("name")
  },
  {
      accessorKey:"lastName",
      header: "LastName",
      cell:({row})=> row.getValue("lastName")
  },
  {
      accessorKey: "phone",
      header: "Phone",
      cell:({row})=> row.getValue("phone")
   },
   {
      accessorKey: "nni",
      header: "nni",
      cell:({row})=> row.getValue("nni")
   },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "code",
    header: () => <div className="">code</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium w-1/2">{row.getValue("code")}</div>
    },
  },
  {
      accessorKey: "profile",
      header: "profile",
      cell: ({ row }) =>{
   const { data } = supabase.storage.from('employee').getPublicUrl(row.original.imageName ?? "")
         
         console.log("Column: "+data.publicUrl)
         // return <HoverCardDemo imgName={data.publicUrl} />
         return (
            // <div className="flex flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-800">
            //     {/* <Image src={data.publicUrl} width={50} height={50} alt=""  unoptimized /> */}
            //     <img src={data.publicUrl}  alt="" />
            // </div>
            <Avatar>
               <AvatarImage src={data.publicUrl} alt="@shadcn" />
               <AvatarFallback>CN</AvatarFallback>
          </Avatar>
         )
      }
   },

   {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(employee.code)}
              >
                Copy employee code
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                  <Link href={`/dashboard/delete/${employee.id}`}>Delete the employee</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Link href={`/dashboard/update/${employee.id}`}>update the employee</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Link href={`/dashboard/update-img/${employee.id}`}>update Image</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
//   {
//     id: "actions",
//     header: () => <div className="text-center">Action</div>,
//     enableHiding: false,
//     cell: ({ row }) => {

    
//       const employee = row.original

//       return(
//          <div className="flex w-10/12 justify-end">
//             <div className="">
//                <FormDialogView id={employee.id}>
//                   <Button variant="outline"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></Button>
//                </FormDialogView>
//                <AlertDialogView id={employee.id} />    
//             </div>                
//        </div>
//       )
//     },
//   },
]

export default columns;


