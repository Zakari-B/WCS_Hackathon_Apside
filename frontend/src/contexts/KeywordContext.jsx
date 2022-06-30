import { createContext, useState } from "react";

const KeywordContext = createContext();

function KeywordProvider({ children }) {
  const [keywords, setKeywords] = useState();

  return (
    <KeywordContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        keywords,
        setKeywords,
      }}
    >
      {children}
    </KeywordContext.Provider>
  );
}
const ExportContextKeyword = {
  KeywordContext,
  KeywordProvider,
};
export default ExportContextKeyword;
