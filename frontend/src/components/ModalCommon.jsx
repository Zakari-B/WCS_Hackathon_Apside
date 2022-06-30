import React, { useContext } from "react";
import "@styles/ModalCommon.scss";
import ExportContext from "../contexts/BubbleContext";

import NewProject from "./NewProject";
import Profil from "./Profil";
import ViewBubble from "./ViewBubble";


function ModalCommon({ type, dimensions }) {
  const { setModalCommon } = useContext(ExportContext.BubbleContext);
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
      <div className="common-cross">
        <button
          type="button"
          className="modal-close-button"
          onClick={() => setModalCommon("")}
        >
          <span className="text-4xl">×</span>
        </button>
      </div>
      {type === "new" && <NewProject />}
      {type === "profil" && <Profil />}
      {type === "bubble" && <ViewBubble />}
    </div>
  );
}

export default ModalCommon;
