import React from "react";
import Avatar from "react-avatar";

function Member({ username }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px"
      }}
    >
      <Avatar name={username.toString()} size="40" round={true} />
      
      <span
        style={{
          fontSize: "16px",
          fontWeight: "500"
        }}
      >
        {username.toString()}
      </span>
    </div>
  );
}

export default Member;