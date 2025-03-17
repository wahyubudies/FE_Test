import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

// Single Date Filter with Reset Capability
const DateFilter = forwardRef(({ onDateChange, initialDate = null, placeholder = "Select date" }, ref) => {
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [isOpen, setIsOpen] = useState(false);

    // Expose the reset method to parent components
    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelectedDate(null);
            onDateChange("");
        }
    }));

    // Format date for display (DD-MM-YYYY)
    const formatDateDisplay = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Handle date changes
    const handleDateChange = (date) => {
        setSelectedDate(date);

        if (!date) {
            onDateChange("");
            return;
        }

        // Format the date DD-MM-YYYY and pass it to parent component
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        onDateChange(formattedDate);
        setIsOpen(false);
    };

    // Toggle the date picker
    const toggleDatePicker = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Custom styled input with calendar icon */}
            <div
                className="border p-2 rounded w-full flex items-center justify-between bg-white cursor-pointer hover:bg-gray-50 min-w-[135px]"
                onClick={toggleDatePicker}>
                <span className={`${!selectedDate ? 'text-gray-400' : 'text-gray-700'}`}>
                  {selectedDate ? formatDateDisplay(selectedDate) : placeholder}
                </span>
                <FiCalendar className="text-gray-500" />
            </div>

            {/* Date picker dropdown */}
            {isOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-xl shadow-lg pl-2 pr-2 pt-2">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={10}
                        onClickOutside={() => setIsOpen(false)}
                    />
                </div>
            )}
        </div>
    );
});

// Date Range Filter with Reset Capability
export const DateRangeFilter = forwardRef(({ onDateRangeChange, initialStartDate = null, initialEndDate = null }, ref) => {
    const [dateRange, setDateRange] = useState([initialStartDate, initialEndDate]);
    const [isOpen, setIsOpen] = useState(false);

    // Expose reset method to parent components
    useImperativeHandle(ref, () => ({
        reset: () => {
            setDateRange([null, null]);
            onDateRangeChange({ startDate: "", endDate: "" });
        }
    }));

    // Format date range for display
    const formatDateRangeDisplay = () => {
        const [startDate, endDate] = dateRange;
        if (!startDate && !endDate) return "Select date range";
        if (!endDate) return `From ${formatDateDisplay(startDate)}`;
        return `${formatDateDisplay(startDate)} to ${formatDateDisplay(endDate)}`;
    };

    // Format a single date for display
    const formatDateDisplay = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Handle date range changes
    const handleDateRangeChange = (update) => {
        setDateRange(update);

        if (!update[0] && !update[1]) {
            onDateRangeChange({ startDate: "", endDate: "" });
            return;
        }

        // Format dates for parent component
        let formattedStartDate = "";
        let formattedEndDate = "";

        if (update[0]) {
            const startDay = String(update[0].getDate()).padStart(2, "0");
            const startMonth = String(update[0].getMonth() + 1).padStart(2, "0");
            const startYear = update[0].getFullYear();
            formattedStartDate = `${startDay}-${startMonth}-${startYear}`;
        }

        if (update[1]) {
            const endDay = String(update[1].getDate()).padStart(2, "0");
            const endMonth = String(update[1].getMonth() + 1).padStart(2, "0");
            const endYear = update[1].getFullYear();
            formattedEndDate = `${endDay}-${endMonth}-${endYear}`;
        }

        onDateRangeChange({ startDate: formattedStartDate, endDate: formattedEndDate });

        // Auto close when both dates selected
        if (update[0] && update[1]) {
            setIsOpen(false);
        }
    };

    // Toggle date range picker
    const toggleDatePicker = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Custom styled input */}
            <div
                className="border p-2 rounded w-full flex items-center justify-between bg-white cursor-pointer hover:bg-gray-50"
                onClick={toggleDatePicker}
            >
        <span className={`${!dateRange[0] && !dateRange[1] ? 'text-gray-400' : 'text-gray-700'}`}>
          {formatDateRangeDisplay()}
        </span>
                <FiCalendar className="text-gray-500" />
            </div>

            {/* Date range picker dropdown */}
            {isOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded shadow-lg">
                    <DatePicker
                        selected={dateRange[0]}
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={handleDateRangeChange}
                        selectsRange
                        inline
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={10}
                        onClickOutside={() => setIsOpen(false)}
                    />
                </div>
            )}
        </div>
    );
});

// Add display names
DateFilter.displayName = "DateFilter";
DateRangeFilter.displayName = "DateRangeFilter";

export default DateFilter;