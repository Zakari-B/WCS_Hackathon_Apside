import React, { useContext, useEffect, useState } from "react";
import "@styles/ViewBubble.scss";

import ExportContext from "@contexts/BubbleContext";
import backendAPI from "@services/backendAPI";

function ViewBubble() {
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState([]);
  const { bubble } = useContext(ExportContext.BubbleContext);
  const words = [
    ...new Set([...bubble.skills.split(" "), ...bubble.keywords]),
  ].filter((word) => word.length);

  const getData = async () => {
    const users = (await backendAPI.get("/api/users")).data;

    const photos = bubble.participantsIds.map(
      (uid) => users.filter((u) => u.id === uid)[0].photo
    );
    setImages(photos);
  };

  useEffect(() => {
    getData();
  }, []);

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
            <button className="magnifying-btn" type="button" />
          </div>
          <div className="box3">
            <button className="description-btn btn-comment" type="button" />
            <button className="description-btn btn-like" type="button" />
            <button className="description-btn btn-join" type="button" />
          </div>
          <div className="box4">
            {images &&
              images
                .filter((img, imgIndex) => imgIndex < 5)
                .map((lien, lienIndex) => (
                  <a
                    className={`team team-type-${lienIndex + 1}`}
                    target="_blank"
                    href="https://gitlab.com"
                    rel="noreferrer"
                  >
                    <img src={lien} alt="" />
                  </a>
                ))}
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
