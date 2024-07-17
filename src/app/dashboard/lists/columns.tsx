import { ColumnDef } from "@tanstack/react-table"
 import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
 import { Button } from "@/components/ui/button"
 import { Checkbox } from "@/components/ui/checkbox"
 import { InsertEmployee } from "../../../../db/schema"
import { FormDialogView } from "@/components/form-dialog"
import { AlertDialogView } from "@/components/alert-dialog"



const columns: ColumnDef<InsertEmployee>[] = [
   {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
   },
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
//   {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => (
//          <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
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
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    enableHiding: false,
    cell: ({ row }) => {

    
      const employee = row.original

      return(
         <div className="flex w-full justify-between">
            <FormDialogView id={employee.id}>
               <Button variant="outline"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></Button>
            </FormDialogView>
            <AlertDialogView id={employee.id} />         
       </div>
      )
    },
  },
]

export default columns;


