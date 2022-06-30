import React from "react";
import "@styles/ModalCommon.scss";
import { useNavigate } from "react-router-dom";

function ModalCommon() {
  const navigate = useNavigate();

  return (
    <div id="common-container">
      <div className="common-box">
        <div className="flex justify-between">
          <h1 className="info-title">Title</h1>
          <button
            type="button"
            className="modal-close-button"
            onClick={() => navigate("/")}
          >
            <span className="text-4xl">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCommon;
