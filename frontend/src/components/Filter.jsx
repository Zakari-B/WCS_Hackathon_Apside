import React, { useState, useContext } from "react";
import ExportContext from "../contexts/BubbleContext";
import "@styles/Filter.scss";

function Filter() {
  const { isOpenFilter, setSearchParams } = useContext(
    ExportContext.BubbleContext
  );
  const [userSearchInput, setUserSearchInput] = useState("");

  const handleSubmit = () => {
    setSearchParams({
      searchInput: userSearchInput,
    });
  };

  return (
    <div>
      {isOpenFilter && (
        <section className={`filter ${isOpenFilter ? "go-left" : null}`}>
          <div className="flex flex-col items-center">
            <h1 className="pb-10">Filters</h1>
            <div className="searchbar flex flex-col">
              <input
                id="search"
                value={userSearchInput}
                type="search"
                name="search"
                onChange={(e) => setUserSearchInput(e.target.value)}
                placeholder="Type something"
                className="filter-input "
              />
              <select>
                <option>-----</option>
                <option>Skills</option>
              </select>
              <select>
                <option>-----</option>
                <option>Skills</option>
              </select>
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="py-2 px-4 bg-orange"
              >
                Search
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Filter;
