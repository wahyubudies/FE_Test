import React from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const Table = ({
                   data = [],
                   columns = [],
                   onSort = null,
                   sortColumn = null,
                   sortOrder = 'asc',
                   showRowNumbers = true,
                   rowsPerPage = null,
                   currentPage = 0,
                   emptyMessage = "No data available"
               }) => {
    // Helper function to render sort indicators for all sortable columns
    const renderSortIndicators = (column) => {
        if (!column.sortable) return null;

        const isActiveSort = sortColumn === column.key;

        return (
            <div className="inline-flex flex-col ml-1">
                <FiChevronUp
                    className={`h-3 w-3 ${isActiveSort && sortOrder === 'asc'
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                />
                <FiChevronDown
                    className={`h-3 w-3 mt-[-3px] ${isActiveSort && sortOrder === 'desc'
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                />
            </div>
        );
    };

    // Function to handle column click for sorting
    const handleHeaderClick = (column) => {
        if (onSort && column.sortable) {
            onSort(column.key);
        }
    };

    // Calculate row numbers based on pagination
    const getRowNumber = (index) => {
        if (rowsPerPage && currentPage !== undefined) {
            return rowsPerPage * currentPage + index + 1;
        }
        return index + 1;
    };

    return (
        <div className="overflow-x-auto pb-4">
            {data.length === 0 ? (
                <div className="py-8 text-center text-gray-500">{emptyMessage}</div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        {showRowNumbers && (
                            <th className="border border-gray-300 px-4 py-2 text-center">
                                No
                            </th>
                        )}

                        {columns.map((column, idx) => (
                            <th
                                key={idx}
                                className={`border border-gray-300 px-4 py-2 ${column.sortable ? 'cursor-pointer hover:bg-gray-300' : ''}`}
                                onClick={() => handleHeaderClick(column)}
                            >
                                <div className="flex items-center justify-center">
                                    <span>{column.label}</span>
                                    {renderSortIndicators(column)}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                            {showRowNumbers && (
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {getRowNumber(rowIndex)}
                                </td>
                            )}

                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`border border-gray-300 px-4 py-2 ${
                                        column.key === 'total' ? 'font-bold' : ''
                                    } ${column.className || ''}`}
                                >
                                    {/* Render cell content based on type or custom renderer */}
                                    {column.render
                                        ? column.render(row[column.key], row, rowIndex)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;