import ManuDash from "@/components/manu-dash";


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    
       <ManuDash>
        {children}
       </ManuDash>
  )
}
