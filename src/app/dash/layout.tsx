import ManuDash from "@/components/manu-dash";


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    
       <ManuDash>
         <div className="container">
            <div className="flex justify-center items-center h-full">
               {children}
            </div>
         </div>
       </ManuDash>
  )
}
