import React from "react";

export const Bookmark = ({ _id, bookmark, onBookmarck }) => {
  return (
    <>
      <td className="ps-5" onClick={() => onBookmarck(_id)}>
        {!bookmark ? (
          <i className="bi bi-bookmark"></i>
        ) : (
          <i className="bi bi-bookmark-fill"></i>
        )}
      </td>
    </>
  );
};
