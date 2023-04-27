import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const Pagination = (props) => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;

    const pageCount = Math.ceil(itemsCount / pageSize);

    const pages = _.range(1, pageCount + 1);

    if (pageCount === 1) return null;

    return (
        <nav className="p-3">
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={
                            "page-item me-2" +
                            (page === currentPage ? " active" : "")
                        }
                        key={"page_" + page}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
