import React, { useState, useRef } from "react";
import Table from "../../../components/common/Table.jsx";
import Search from "../../../components/common/Search.jsx";
import EntriesPerPage from "../../../components/common/EntriesPerPage.jsx";
import Pagination from "../../../components/common/Pagination.jsx";
import Form from "./Form.jsx";
import { FiPlus, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const Gate = () => {
    // State management
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    // Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add', 'edit', or 'view'
    const [selectedGate, setSelectedGate] = useState(null);

    // Delete confirmation modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [gateToDelete, setGateToDelete] = useState(null);

    // Refs for reset functionality
    const searchRef = useRef(null);

    // Sample data
    const [gates, setGates] = useState([
        { id: 1, ruas: "Ruas 1", gerbang: "Gerbang 1" },
        { id: 2, ruas: "Ruas 1", gerbang: "Gerbang 2" },
        { id: 3, ruas: "Ruas 2", gerbang: "Gerbang 3" },
        { id: 4, ruas: "Ruas 2", gerbang: "Gerbang 4" },
        { id: 5, ruas: "Ruas 3", gerbang: "Gerbang 5" },
        { id: 6, ruas: "Ruas 3", gerbang: "Gerbang 6" },
        { id: 7, ruas: "Ruas 4", gerbang: "Gerbang 7" },
        { id: 8, ruas: "Ruas 4", gerbang: "Gerbang 8" },
        { id: 9, ruas: "Ruas 5", gerbang: "Gerbang 9" },
    ]);

    // Table columns definition
    const columns = [
        { key: "ruas", label: "Ruas", sortable: true },
        { key: "gerbang", label: "Gerbang", sortable: true },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (_, row) => (
                <div className="flex space-x-2 justify-center">
                    <button
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        onClick={() => handleView(row)}
                        title="View"
                    >
                        <FiEye size={18} />
                    </button>
                    <button
                        className="p-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                        onClick={() => handleEdit(row)}
                        title="Edit"
                    >
                        <FiEdit size={18} />
                    </button>
                    <button
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        onClick={() => handleDelete(row)}
                        title="Delete"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            )
        },
    ];

    // Handling actions
    const handleView = (gate) => {
        setSelectedGate(gate);
        setFormMode('view');
        setIsFormOpen(true);
    };

    const handleEdit = (gate) => {
        setSelectedGate(gate);
        setFormMode('edit');
        setIsFormOpen(true);
    };

    const handleDelete = (gate) => {
        setGateToDelete(gate);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (gateToDelete) {
            setGates(gates.filter(g => g.id !== gateToDelete.id));
            setIsDeleteModalOpen(false);
            setGateToDelete(null);
        }
    };

    const handleAdd = () => {
        setSelectedGate(null);
        setFormMode('add');
        setIsFormOpen(true);
    };

    // Handling form save
    const handleSave = (gateData) => {
        if (formMode === 'add') {
            // Add new gate with a generated ID
            const newGate = {
                id: Math.max(0, ...gates.map(g => g.id)) + 1,
                ...gateData
            };
            setGates([...gates, newGate]);
        } else if (formMode === 'edit') {
            // Update existing gate
            setGates(gates.map(gate =>
                gate.id === gateData.id ? gateData : gate
            ));
        }
    };

    // Handling sort
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    // Reset functionality
    const handleReset = () => {
        setSearch("");
        setCurrentPage(0);
        setSortColumn(null);
        setSortOrder("asc");

        if (searchRef.current && searchRef.current.reset) {
            searchRef.current.reset();
        }
    };

    // Filter data based on search
    const filteredData = gates.filter((item) => {
        const searchLower = search.toLowerCase();
        return (
            item.ruas.toLowerCase().includes(searchLower) ||
            item.gerbang.toLowerCase().includes(searchLower)
        );
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;

        const aValue = typeof a[sortColumn] === 'string' ? a[sortColumn].toLowerCase() : a[sortColumn];
        const bValue = typeof b[sortColumn] === 'string' ? b[sortColumn].toLowerCase() : b[sortColumn];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const indexOfFirstItem = currentPage * entriesPerPage;
    const indexOfLastItem = indexOfFirstItem + entriesPerPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-4 bg-white rounded-xl">
            <h1 className="text-xl font-bold mb-4">Master Data Gerbang</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Search
                    onSearch={setSearch}
                    ref={searchRef}
                    placeholder="Search by ruas or gerbang"
                />

                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        onClick={handleAdd}
                    >
                        <FiPlus className="mr-1" /> Add Gate
                    </button>
                </div>
            </div>

            <Table
                data={currentData}
                columns={columns}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                rowsPerPage={entriesPerPage}
                currentPage={currentPage}
                emptyMessage="No gates found. Try a different search or add a new gate."
            />

            <div className="flex flex-col sm:flex-row justify-end mt-4 gap-4">
                <div className="flex justify-end gap-7">
                    <EntriesPerPage
                        entriesPerPage={entriesPerPage}
                        setEntriesPerPage={(value) => {
                            setEntriesPerPage(value);
                            setCurrentPage(0);
                        }}
                    />

                    <Pagination
                        totalPage={Math.ceil(sortedData.length / entriesPerPage)}
                        postsPerPage={entriesPerPage}
                        totalPosts={sortedData.length}
                        onClick={(page) => setCurrentPage(page)}
                        currentPage={currentPage}
                    />
                </div>
            </div>

            {/* Form modal for add/edit/view */}
            <Form
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                initialData={selectedGate}
                mode={formMode}
            />

            {/* Delete Confirmation Modal - simplified with only opening animation */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <div className="text-center mb-4">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3">
                                <FiTrash2 className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Are you sure you want to delete <span className="font-bold">{gateToDelete?.gerbang}</span>?
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
                                onClick={confirmDelete}
                            >Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gate;