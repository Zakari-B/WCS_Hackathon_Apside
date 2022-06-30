import React, { useContext } from "react";
import ExportContext from "../contexts/BubbleContext";
import "@styles/Filter.scss";

function Filter() {
  const { isOpenFilter } = useContext(ExportContext.BubbleContext);

  return (
    <div>
      {isOpenFilter && (
        <section className={`filter ${isOpenFilter ? "go-left" : null}`}>
          <div className="flex flex-col items-center">
            <h1 className="pb-10">Filters</h1>
            <div className="searchbar flex flex-col">
              {/* <input
                            id="search"
                            value="test"
                            type="search"
                            name="search"
                            onChange=""
                            placeholder="Type something: Mojito, Lemon..."
                            className="filter-input "
                        /> */}
              <select>
                <option>-----</option>
                <option>Skills</option>
              </select>
              <select>
                <option>-----</option>
                <option>Skills</option>
              </select>
              <button type="button" className="py-2 px-4 bg-orange">
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
