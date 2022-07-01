import { createContext, useState } from "react";

const BubbleContext = createContext();

function BubbleProvider({ children }) {
  const [keywords, setKeywords] = useState({});
  const [skills, setSkills] = useState({});
  const [modalCommon, setModalCommon] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [bubble, setBubble] = useState();
  const [searchParams, setSearchParams] = useState({});
  const [filter, setFilter] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

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
        isOpenFilter,
        setIsOpenFilter,
        bubble,
        setBubble,
        searchParams,
        setSearchParams,
        filter,
        setFilter,
        filterOptions,
        setFilterOptions,
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
