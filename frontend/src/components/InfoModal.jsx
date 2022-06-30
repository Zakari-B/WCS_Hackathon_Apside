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
            <div className="bg-blue w-3.5 h-3.5" />
            <p>Idea</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-orange w-3.5 h-3.5" />
            <p>Team Building</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-lightblue w-3.5 h-3.5" />
            <p>Coding</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-lightgrey w-3.5 h-3.5" />
            <p>Review</p>
          </div>
          <div className="flex items-center gap-x-4 w-3/4 font-medium">
            <div className="bg-grey w-3.5 h-3.5" />
            <p>Finished</p>
          </div>
          <h2 className="info-title">Bubbles size is important!</h2>
          <p>
            The size can be defined thanks to different criterias.
            <br />
            Bubbles vary with the <em>numbers of likes</em>, and with the number
            of <em>person involved</em>.<br />
            <em>Bonus⭐ 5 Bonus points if you are from various agencies! </em>
            We invite you to join projects and discover other team members!
          </p>
        </div>
      ) : null}
    </div>
  );
}
export default InfoModal;
