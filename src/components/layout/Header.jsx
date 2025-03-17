import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, logout } from '../../features/auth/authSlice';
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiSettings
} from "react-icons/fi";
import { selectSidebarOpen, toggleSidebar } from "../../features/home/homeSlice.js";

function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSidebarOpen = useSelector(selectSidebarOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false); // Close dropdown
    dispatch(logout());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
      <header className="bg-white text-slate-500 rounded-lg z-10 relative shadow-sm">
        <div className="px-4">
          <nav className="flex items-center justify-between h-16">
            <button
                onClick={handleToggleSidebar}
                className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                  <FiChevronLeft size={23} />
              ) : (
                  <FiChevronRight size={23} />
              )}
            </button>
            <ul className="flex space-x-6 items-center">
              <li>
                {isAuthenticated ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                          className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
                          onClick={toggleDropdown}
                      >
                        <span className="font-medium">Hi, {user.name}</span>
                        <FiChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                            <Link
                                to="/account"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                              <FiUser className="mr-2" size={16} />
                              <span>Account</span>
                            </Link>
                            <Link
                                to="/settings"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                              <FiSettings className="mr-2" size={16} />
                              <span>Settings</span>
                            </Link>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <FiLogOut className="mr-2" size={16} />
                              <span>Logout</span>
                            </button>
                          </div>
                      )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Login
                    </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
  );
}

export default Header;