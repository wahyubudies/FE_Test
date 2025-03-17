import React from "react";
import clsx from "clsx";

const Tab = ({ activeTab, setActiveTab, tabs }) => {
    return (
        <div className="flex space-x-4 mb-4">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={
                    clsx(
                        "px-4 py-2 rounded-lg ",
                        activeTab === tab ? "bg-blue-100 text-blue-500" : "bg-gray-100 hover:bg-gray-200"
                    )}
                    onClick={() => setActiveTab(tab)}>
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tab;
