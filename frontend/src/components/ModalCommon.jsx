import React from "react";
import "@styles/ModalCommon.scss";
import { useNavigate } from "react-router-dom";

function ModalCommon() {
  const navigate = useNavigate();

  return (
    <div className="common-box">
      <div className="common-cross">
        <button
          type="button"
          className="modal-close-button"
          onClick={() => navigate("/")}
        >
          <span className="text-4xl">×</span>
        </button>
      </div>
    </div>
  );
}

export default ModalCommon;
