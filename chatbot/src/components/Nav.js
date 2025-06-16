import React from "react";

function Nav({ handleRefreshChat }) {
  return (
    <div className="navBar">
      <button onClick={handleRefreshChat} className="newChat">
        New Chat
      </button>
    </div>
  );
}

export default Nav;
