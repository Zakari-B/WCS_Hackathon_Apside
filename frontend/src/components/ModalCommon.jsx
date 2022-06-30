import React from "react";
import "@styles/ModalCommon.scss";

import NewProject from "./NewProject";
import ViewBubble from "./ViewBubble";
import UserProfile from "./UserProfile";

function ModalCommon({ type, dimensions }) {
  const modalSize = Math.min(dimensions.height, dimensions.width) / 1.1;

  return (
    <div
      className="common-box"
      style={{
        width: modalSize,
        height: modalSize,
        left: (dimensions.width - modalSize) / 2,
        top: (dimensions.height - modalSize) / 2,
      }}
    >
      {type === "new" && <NewProject />}
      {type === "bubble" && <ViewBubble />}
      {type === "profile" && <UserProfile />}
    </div>
  );
}

export default ModalCommon;
