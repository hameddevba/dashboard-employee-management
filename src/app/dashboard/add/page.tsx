import { checkBySelected } from "../../../../db/queries";




export default function formAdd() {

   const email = checkBySelected("email","baahmedjunior02@gmail.com");
  

   return(

      <div className="ml-auto mr-auto flex justify-center h-[800px] items-center w-1/2">
         <>{email}</>
      </div>
     
   );
}

