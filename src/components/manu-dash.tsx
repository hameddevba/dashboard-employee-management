export default function ManuDash({
  children
}: {
  children: React.ReactNode;
}){
    return (
         <div className="flex h-screen">
            <div className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                <nav>
                <ul>
                    <li className="mb-3">
                    <a href="/dash/card" className="block py-2 px-3 rounded hover:bg-gray-700">
                        Liste
                    </a>
                    </li>
                    <li className="mb-3">
                    <a href="/dash" className="block py-2 px-3 rounded hover:bg-gray-700">
                        Add
                    </a>
                    </li>
                    {/* <li className="mb-3">
                    <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
                        Link 3
                    </a>
                    </li> */}
                </ul>
                </nav>
            </div>
            <div className="flex-1 overflow-auto w-100% h-screen ">
                {children}
            </div>
    </div>
    )
}