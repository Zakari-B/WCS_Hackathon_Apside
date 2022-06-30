import React, { useContext } from "react";
import "../styles/ViewBubble.scss";

import ExportContext from "../contexts/BubbleContext";

function ViewBubble() {
  // eslint-disable-next-line no-unused-vars
  const { modalCommon, bubble } = useContext(ExportContext.BubbleContext);

  console.warn("bubble", bubble);

  return (
    <section id="newproject">
      <div className="flex flex-col items-center">
        <h1>{JSON.stringify(bubble)}</h1>
      </div>
    </section>
  );
}

export default ViewBubble;
