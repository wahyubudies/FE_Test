import React, { useState, useRef, useEffect } from "react";
import Pagination from "../../../components/common/Pagination.jsx";
import EntriesPerPage from "../../../components/common/EntriesPerPage.jsx";
import Tab from "../../../components/common/Tab.jsx";
import Table from "../../../components/common/Table.jsx";
import Search from "../../../components/common/Search.jsx";
import DateFilter from "../../../components/common/DateFilter.jsx";

const ReportPage = () => {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0); // Start from 0 for zero-indexed pagination
    const [activeTab, setActiveTab] = useState("Total Tunai");

    const dateFilterRef = useRef(null);
    const searchRef = useRef(null);

    const dataLaporan = [
        { ruas: "Ruas 1", gerbang: "Gerbang 1", gardu: "01", hari: "Kamis", tanggal: "30-05-2024", metode: "Total Tunai", golI: 567, golII: 234, golIII: 12, golIV: 10, golV: 8, total: 831 },
        { ruas: "Ruas 1", gerbang: "Gerbang 2", gardu: "01", hari: "Rabu", tanggal: "29-05-2024", metode: "Total E-Toll", golI: 456, golII: 345, golIII: 23, golIV: 12, golV: 9, total: 986 },
        { ruas: "Ruas 1", gerbang: "Gerbang 3", gardu: "02", hari: "Selasa", tanggal: "28-05-2024", metode: "Total Flo", golI: 768, golII: 345, golIII: 34, golIV: 13, golV: 7, total: 897 },
        { ruas: "Ruas 2", gerbang: "Gerbang 4", gardu: "02", hari: "Senin", tanggal: "27-05-2024", metode: "Total KTP", golI: 1435, golII: 1234, golIII: 34, golIV: 15, golV: 8, total: 2304 },
        { ruas: "Ruas 2", gerbang: "Gerbang 5", gardu: "02", hari: "Minggu", tanggal: "26-06-2024", metode: "Keseluruhan", golI: 2454, golII: 1256, golIII: 12, golIV: 16, golV: 7, total: 3459 },
        { ruas: "Ruas 2", gerbang: "Gerbang 5", gardu: "02", hari: "Minggu", tanggal: "26-06-2024", metode: "Total E-Toll+Tunai+Flo", golI: 2454, golII: 1256, golIII: 12, golIV: 16, golV: 7, total: 3459 },
        { ruas: "Ruas 2", gerbang: "Gerbang 5", gardu: "02", hari: "Minggu", tanggal: "26-06-2024", metode: "Total Tunai", golI: 2454, golII: 1256, golIII: 12, golIV: 16, golV: 7, total: 3459 },
        { ruas: "Ruas 2", gerbang: "Gerbang 5", gardu: "02", hari: "Minggu", tanggal: "26-06-2024", metode: "Total KTP", golI: 2454, golII: 1256, golIII: 12, golIV: 16, golV: 7, total: 3459 },
        { ruas: "Ruas 2", gerbang: "Gerbang 5", gardu: "02", hari: "Minggu", tanggal: "26-07-2024", metode: "Total E-Toll", golI: 2454, golII: 1256, golIII: 12, golIV: 16, golV: 7, total: 3459 },
        { ruas: "Ruas 2", gerbang: "Gerbang 5", gardu: "02", hari: "Minggu", tanggal: "26-07-2024", metode: "Total Tunai", golI: 2454, golII: 1256, golIII: 12, golIV: 16, golV: 7, total: 3459 },
    ];

    // Filter data based on search and date
    const filteredData = dataLaporan.filter((item) => {
        // Only perform the search if there's a search term
        const searchMatch = search === "" ? true : (
            item.ruas.toLowerCase().includes(search.toLowerCase()) ||
            item.gerbang.toLowerCase().includes(search.toLowerCase()) ||
            item.gardu.toLowerCase().includes(search.toLowerCase()) ||
            item.hari.toLowerCase().includes(search.toLowerCase())
        );

        // Date filter
        const dateMatch = date ? item.tanggal === date : true;

        // Return true if both conditions meet
        return searchMatch && dateMatch;
    });

    // Fixed: Filter by method based on active tab
    const filteredByMethod = filteredData.filter((item) => {
        if (activeTab === "Total Keseluruhan") {
            return item.metode === "Keseluruhan";
        } else {
            return item.metode === activeTab;
        }
    });

    // Reset to first page when tab changes
    useEffect(() => {
        setCurrentPage(0);
    }, [activeTab]);

    // Sortable columns
    const sortableColumns = ["ruas", "gerbang", "gardu", "hari", "tanggal", "metode", "total"];

    // Handle sorting
    const handleSort = (column) => {
        if (!sortableColumns.includes(column)) return;

        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    // Sort the filtered data
    const sortedData = [...filteredByMethod].sort((a, b) => {
        if (!sortColumn) return 0;
        if (!sortableColumns.includes(sortColumn)) return 0;

        const aValue = typeof a[sortColumn] === "string" ? a[sortColumn].toLowerCase() : a[sortColumn];
        const bValue = typeof b[sortColumn] === "string" ? b[sortColumn].toLowerCase() : b[sortColumn];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    // Fixed: Pagination logic - uses correct indices
    const indexOfFirstItem = currentPage * entriesPerPage;
    const indexOfLastItem = indexOfFirstItem + entriesPerPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const tabs = [
        "Total Tunai",
        "Total E-Toll",
        "Total Flo",
        "Total KTP",
        "Total Keseluruhan",
        "Total E-Toll+Tunai+Flo",
    ];

    const handleReset = () => {
        // Reset state values
        setSearch("");
        setDate("");
        setEntriesPerPage(5);
        setCurrentPage(0);
        setActiveTab("Total Tunai"); // Reset to default tab

        // Reset DateFilter component via ref
        if (dateFilterRef.current) {
            dateFilterRef.current.reset();
        }

        // Reset Search component if it has a reset function
        if (searchRef.current && searchRef.current.reset) {
            searchRef.current.reset();
        }
    };

    const columns = [
        { key: "ruas", label: "Ruas", sortable: true },
        { key: "gerbang", label: "Gerbang", sortable: true },
        { key: "gardu", label: "Gardu", sortable: true },
        { key: "hari", label: "Hari", sortable: true },
        { key: "tanggal", label: "Tanggal", sortable: true },
        { key: "metode", label: "Metode Pembayaran", sortable: false },
        { key: "golI", label: "Gol I", sortable: false },
        { key: "golII", label: "Gol II", sortable: false },
        { key: "golIII", label: "Gol III", sortable: false },
        { key: "golIV", label: "Gol IV", sortable: false },
        { key: "golV", label: "Gol V", sortable: false },
        { key: "total", label: "Total Lalin", sortable: false },
    ];


    return (
        <div className="p-4 bg-white rounded-xl">
            <h1 className="text-xl font-bold mb-4">Laporan Per Hari</h1>
            <div className="flex space-x-4 mb-4">
                <Search
                    onSearch={setSearch}
                    ref={searchRef}
                />
                <DateFilter
                    onDateChange={setDate}
                    ref={dateFilterRef}
                    placeholder="Select date"
                />
                <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white">
                    Filter
                </button>
                <button
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <Tab activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

            {/* Show message if no data available */}
            {currentData.length === 0 ? (
                <div className="py-6 text-center text-gray-500">
                    No data found for the selected filters.
                </div>
            ) : (
                <Table
                    data={currentData}
                    columns={columns}
                    onSort={handleSort}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                />
            )}

            <div className="flex justify-end gap-7 mt-4">
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
    );
};

export default ReportPage;