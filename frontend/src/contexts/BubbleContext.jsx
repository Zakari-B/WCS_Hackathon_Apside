import { createContext, useState } from "react";

const BubbleContext = createContext();

function BubbleProvider({ children }) {
  const [keywords, setKeywords] = useState();
  const [modalCommon, setModalCommon] = useState();

  return (
    <BubbleContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        keywords,
        setKeywords,
        modalCommon,
        setModalCommon,
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
