import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../../features/home/homeSlice.js";
import clsx from "clsx";

function Layout() {
    const isSidebarOpen = useSelector(selectSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <main
                className={clsx(
                    "flex-grow p-4 transition-all duration-300 ease-in-out relative z-10",
                    isSidebarOpen ? "md:ml-[250px]" : "ml-0"
                )}>
                <Header />
                <div className="py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;