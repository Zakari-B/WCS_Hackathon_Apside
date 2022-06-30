import React from "react";
import "@styles/Filter.scss";

function Filter() {
  return (
    <section id="filter">
      <div className="flex flex-col items-center">
        <h1 className="pb-10">Filters</h1>
        <div className="searchbar flex ">
          <input
            id="search"
            value="test"
            type="search"
            name="search"
            placeholder="Type something: Mojito, Lemon..."
            className="filter-input"
          />
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
  );
}

export default Filter;
