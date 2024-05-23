import ManuDash from "@/components/manu-dash";


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    
       <ManuDash>
         <main className="container">
            {children}
         </main>
       </ManuDash>
  )
}
