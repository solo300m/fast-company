import React from "react";

export const SearchStatus = (props) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    if (lastOne === 1) return "человек тусанет";
    return "человек тусанет";
  };

  return (
    <>
      <h2>
        <span
          className={"badge " + (props.users > 0 ? "bg-primary" : "bg-danger")}
        >
          {props.users > 0
            ? `${props.users} ${renderPhrase(props.users)} с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
    </>
  );
};
