import React, { useContext } from "react";
import "../styles/ViewBubble.scss";

import ExportContext from "../contexts/BubbleContext";

function ViewBubble() {
  // eslint-disable-next-line no-unused-vars

  const { modalCommon, bubble } = useContext(ExportContext.BubbleContext);
  console.warn("bubble", bubble);

  const words = [
    ...new Set([...bubble.skills.split(" "), ...bubble.keywords]),
  ].filter((word) => word.length);
  console.log(words);

  return (
    <section id="bubble-project">
      <div className="flex flex-col items-center bubble-full-box">
        <div className="bubble-box">
          <div className="box1">
            <a
              className="github-link"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
            <a
              className="trello-link"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
          </div>
          <div className="box2">
            <button className="magnifying-btn" type="text" />
          </div>
          <div className="box3">
            <button className="description-btn btn-comment" type="text" />
            <button className="description-btn btn-like" type="text" />
            <button className="description-btn btn-join" type="text" />
          </div>
          <div className="box4">
            <a
              className="team team-type-1"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
            <a
              className="team team-type-2"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
            <a
              className="team team-type-3"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
            <a
              className="team team-type-4"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
            <a
              className="team team-type-5"
              target="_blank"
              href="https://gitlab.com"
              rel="noreferrer"
            />
          </div>
        </div>
        <div className="box-content">
          <h1>{bubble.name}</h1>
          <p className="description">{bubble.description}</p>
          <div className="tools">
            {words && (
              <p className="skills">
                {words.map((skill) => (
                  <span>{skill}</span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewBubble;
