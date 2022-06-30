import { createContext, useState } from "react";

const BubbleContext = createContext();

function BubbleProvider({ children }) {
  const [keywords, setKeywords] = useState([{ id: 1, label: "init" }]);
  const [skills, setSkills] = useState([{ id: 1, label: "init" }]);
  const [modalCommon, setModalCommon] = useState();
  const [bubble, setBubble] = useState();

  return (
    <BubbleContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        keywords,
        setKeywords,
        skills,
        setSkills,
        modalCommon,
        setModalCommon,
        bubble,
        setBubble,
      }}
    >
      {children}
    </BubbleContext.Provider>
  );
}
const ExportContext = {
  BubbleContext,
  BubbleProvider,
};
export default ExportContext;
