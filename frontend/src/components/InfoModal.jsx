import { useState } from "react";
import "../styles/Modal.scss";
import iconMark from "../assets/logo/white-question.svg";

function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="modal">
      <button type="button" onClick={toggle}>
        <img
          src={iconMark}
          draggable={false}
          alt=""
          className="img-icon-mark"
        />
      </button>
      {isOpen ? (
        <div className="modal-container">
          <div className="flex justify-between">
            <h1 className="info-title">Help?</h1>
            <button
              onClick={toggle}
              type="button"
              className="modal-close-button"
            >
              <span className="text-4xl">×</span>
            </button>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-black w-3.5 h-3.5" />
            <p>colour number one</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-orange-500 w-3.5 h-3.5" />
            <p>colour number one</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-blue-500 w-3.5 h-3.5" />
            <p>colour number one</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-lime-400 w-3.5 h-3.5" />
            <p>colour number one</p>
          </div>
          <h2 className="info-title">Bubbles size is important!</h2>
          <p>
            As you can see, there are different sizes.
            <br />
            The size can be defined thanks to different criteria.
          </p>
        </div>
      ) : null}
    </div>
  );
}
export default InfoModal;
