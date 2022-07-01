import React, { useContext } from "react";
import "@styles/ModalCommon.scss";
import ExportContext from "../contexts/BubbleContext";

import NewProject from "./NewProject";
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
  const { setModalCommon, bubble } = useContext(ExportContext.BubbleContext);
  const modalSize = Math.min(dimensions.height, dimensions.width) / 1.1;

  const modaleStyle = {
    width: modalSize,
    height: modalSize,
    left: (dimensions.width - modalSize) / 2,
    top: (dimensions.height - modalSize) / 2,
    backgroundColor: "white",
  };

  if (bubble) {
    console.log("bolos");
    const backgroundColor = colorPalette[bubble.workflow_id];
    modaleStyle.background = backgroundColor;
  }

  return (
    <div className="common-box" style={modaleStyle}>
      <div className="common-cross">
        {/* <button
          type="button"
          className="modal-close-button"
          onClick={() => setModalCommon("")}
        >
          <span className="text-4xl">×</span>
        </button> */}
      </div>
      {type === "new" && <NewProject />}
      {type === "bubble" && <ViewBubble />}
    </div>
  );
}

export default ModalCommon;
