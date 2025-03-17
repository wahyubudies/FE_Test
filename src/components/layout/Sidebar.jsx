// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../utils/helpers.js";
import clsx from "clsx";
import { FiChevronDown, FiMap, FiHome, FiFolder } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { selectSidebarOpen } from "../../features/home/homeSlice";

export default function Sidebar() {
    const isSidebarOpen = useSelector(selectSidebarOpen);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("dashboard");
    const location = useLocation();

    // Update active item based on current path
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setActiveItem('dashboard');
        else if (path.includes('gate')) setActiveItem('gate');
        else if (path.includes('report')) setActiveItem('report');
    }, [location]);

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleSetActive = (item) => {
        setActiveItem(item)
        if (item !== 'report') {
            setIsAccordionOpen(false);
        }
    }

    const activeClass = "bg-blue-100 text-blue-600";
    const baseClass = "text-slate-500 hover:bg-slate-100";

    return (
        <div className={clsx(
            "bg-white h-screen fixed left-0 top-0 pt-5 flex flex-col shadow-md z-0",
            "transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-[250px] opacity-100" : "w-0 opacity-0"
        )}>
            <div className={clsx(
                "w-[250px] px-4 py-6 flex flex-col overflow-hidden",
                isSidebarOpen ? "opacity-100" : "opacity-0",
                "transition-opacity duration-200",
                !isSidebarOpen && "delay-200"
            )}>
                <img
                    src={getImageUrl('logo.jpg')}
                    alt="Image Logo"
                    className={"max-w-[180px] mx-auto"}
                />

                <nav className="flex flex-col space-y-2 mt-10">
                    {/* Dashboard link */}
                    <Link
                        to="/"
                        onClick={() =>  handleSetActive("dashboard")}
                        className={clsx(
                            "px-4 py-2 rounded-md transition-colors flex items-center space-x-2 duration-200",
                            activeItem === "dashboard"
                                ? activeClass
                                : baseClass
                        )}>
                        <FiHome size={18}/>
                        <span>Dashboard</span>
                    </Link>

                    {/* Accordion Menu */}
                    <div className="flex flex-col">
                        <button
                            onClick={toggleAccordion}
                            className={clsx(
                                "px-4 py-2 rounded-md flex justify-between items-center transition-colors duration-200",
                                activeItem === "report"
                                    ? activeClass
                                    : baseClass
                            )}>
                            <div className="flex items-center space-x-2">
                                <FiFolder size={18}/>
                                <span>Laporan Lalin</span>
                            </div>
                            <FiChevronDown
                                className={clsx(
                                    "transition-transform duration-200",
                                    isAccordionOpen ? "transform rotate-180" : ""
                                )}
                                size={18}
                            />
                        </button>

                        {/* Submenu items with animation */}
                        <div
                            className={
                            clsx(
                                "overflow-hidden  transition-all duration-300 pl-6",
                                isAccordionOpen || location.pathname === "/report" ? "block" : "hidden"
                            )}>
                            <Link
                                to="/report"
                                onClick={() => handleSetActive("report")}
                                className={clsx(
                                    "px-4 py-2 rounded-md my-1 flex items-center space-x-2 transition-colors duration-200",
                                    activeItem === "report"
                                        ? activeClass
                                        : baseClass
                                )}>
                                <span>Laporan Per Hari</span>
                            </Link>
                        </div>
                    </div>

                    {/* Master Gerbang link */}
                    <Link
                        to="/gate"
                        onClick={() => handleSetActive("gate")}
                        className={clsx(
                            "px-4 py-2 rounded-md transition-colors flex items-center space-x-2 duration-200",
                            activeItem === "gate"
                                ? activeClass
                                : baseClass
                        )}>
                        <FiMap size={18}/>
                        <span>Master Gerbang</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}