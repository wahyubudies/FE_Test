import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
        totalPage,
        postsPerPage,
        totalPosts,
        onClick,
        currentPage,
    }) => {
    return (
        <div className="flex flex-row items-center">
            <div className="flex-1">
                <p className="text-green-secondary text-xs">
                    <span className="font-medium">{1 + currentPage * postsPerPage} </span>
                    to
                    <span className="font-medium">
                    {" "}{Math.min(postsPerPage + currentPage * postsPerPage, totalPosts)}{" "}
                    </span>
                    of
                    <span className="font-medium"> {totalPosts} </span>
                    items
                </p>
            </div>
            <ReactPaginate
                className="inline-flex items-center"
                pageClassName="hover:bg-green-white hover:border-green-primary rounded-lg text-sm py-0.5 mx-0.5"
                pageLinkClassName="font-semibold px-2 py-0.5 cursor-pointer"
                activeClassName="border-green-primary bg-green-white border-2"
                activeLinkClassName="cursor-auto"
                previousClassName="text-green-primary"
                nextClassName="text-green-primary"
                disabledClassName="text-gray-300"
                previousLabel={
                    <svg
                        aria-hidden="true"
                        className="w-5 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                }
                nextLabel={
                    <svg
                        aria-hidden="true"
                        className="w-5 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                }
                breakLabel="..."
                onPageChange={(event) => {
                    onClick(event.selected);
                }}
                forcePage={currentPage}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;
