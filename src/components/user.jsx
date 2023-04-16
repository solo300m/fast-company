import React from "react";
import { Qualitys } from "./quality";
import { Bookmark } from "./bookmark";

export const User = (props) => {
  const users = props;

  return (
    <>
      <tr>
        <td>{users.name}</td>
        <td>
          <Qualitys qualities={users.qualities} />
        </td>
        <td>{users.profession.name}</td>
        <td>{users.completedMeetings}</td>
        <td>{users.rate} /5</td>
        <Bookmark
          _id={users._id}
          bookmark={users.bookmark}
          onBookmarck={users.onBookmarck}
        />
        <td>
          <button
            onClick={() => props.onDelete(props._id)}
            className="btn btn-danger"
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};
