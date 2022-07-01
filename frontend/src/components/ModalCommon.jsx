import React, { useContext, useEffect } from "react";
import "@styles/ModalCommon.scss";
import ExportContext from "@contexts/BubbleContext";

import NewProject from "./NewProject";
import UserProfile from "./UserProfile";
import ViewBubble from "./ViewBubble";

const colorPalette = [
  "#183650",
  // "#FF0000",
  "#5ABDB2",
  "#E79759",
  "#F0F0F0",
  "#8493A0",
  "#586994",
];

function ModalCommon({ type, dimensions }) {
  const { setModalCommon, bubble, setFadeAnimated } = useContext(
    ExportContext.BubbleContext
  );
  const modalSize = Math.min(dimensions.height, dimensions.width) / 1.1;

  const modaleStyle = {
    width: modalSize,
    height: modalSize,
    left: (dimensions.width - modalSize) / 2,
    top: (dimensions.height - modalSize) / 2,
  };

  if (bubble) {
    const backgroundColor = colorPalette[bubble.workflow_id];
    modaleStyle.background = backgroundColor;
  }

  useEffect(() => {
    if (type) setFadeAnimated(false);
  }, [type]);

  return (
    <div className="common-box" style={modaleStyle}>
      {type === "new" && <NewProject />}
      {type === "bubble" && <ViewBubble />}
      {type === "profile" && <UserProfile />}
    </div>
  );
}

export default ModalCommon;
