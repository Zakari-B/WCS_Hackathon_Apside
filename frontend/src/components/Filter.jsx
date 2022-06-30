import React from "react";
import "@styles/Filter.scss";

function Filter() {
  return (
    <section id="filter">
      <div className="flex flex-col items-center">
        <h1>Filters</h1>
        <div className="searchbar">
          <input
            id="search"
            value="test"
            type="search"
            name="search"
            placeholder="Type something: Mojito, Lemon..."
            className="filter-input"
          />
        </div>
      </div>
    </section>
  );
}

export default Filter;
