import React, { useState, useContext, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import ExportContext from "@contexts/BubbleContext";
import backendAPI from "@services/backendAPI";
import "@styles/Filter.scss";

function Filter() {
  const { isOpenFilter, setSearchParams } = useContext(
    ExportContext.BubbleContext
  );
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [bubbleInput, setBubbleInput] = useState("");
  const [agenciesInput, setAgenciesInput] = useState("");
  const [workflowsInput, setWorkflowsInput] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [userList, setUserList] = useState("");
  const [bubbleList, setBubbleList] = useState("");
  const [agenciesList, setAgenciesList] = useState("");
  const [workflowsList, setWorkflowsList] = useState("");
  const [keywordsList, setKeywordsList] = useState("");

  const populate = async () => {
    const bubbles = (await backendAPI.get("/api/bubble")).data;
    const agencies = (await backendAPI.get("/api/agency")).data;
    const workflows = (await backendAPI.get("/api/workflow")).data;
    const keywords = (await backendAPI.get("/api/keyword")).data;
    const users = (await backendAPI.get("/api/users")).data;

    setUserList([
      ...new Set(
        users.map((user) => [user.firstname, user.lastname, user.email]).flat(2)
      ),
    ]);

    setBubbleList([
      ...new Set(
        bubbles
          .map((bubble) => [
            bubble.description.split(" ").filter((word) => word.length > 3),
            bubble.name.split(" ").filter((word) => word.length > 3),
          ])
          .flat(3)
      ),
    ]);

    setAgenciesList([
      ...new Set(
        agencies.map((agency) => [agency.city, agency.country]).flat(3)
      ),
    ]);

    setWorkflowsList(workflows.map((workflow) => workflow.workflow));

    setKeywordsList(keywords.map((keyword) => keyword.label));
  };

  useEffect(() => {
    populate();
  }, []);

  const handleSubmit = () => {
    setSearchParams({
      searchInput: userSearchInput,
      userInput,
      bubbleInput,
      agenciesInput,
      workflowsInput,
      keywordsInput,
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
                placeholder="Type anything"
                className="filter-input "
              />
              <Typeahead
                id="selectBubble"
                multiple
                placeholder="search Bubbles"
                onChange={(e) => setBubbleInput(e)}
                options={bubbleList}
                // selected={keywords?.keywords}
                // className="typeahead-input"
              />

              <Typeahead
                id="selectUsers"
                multiple
                placeholder="search Users"
                onChange={(e) => setUserInput(e)}
                options={userList}
                // selected={keywords?.keywords}
                // className="typeahead-input"
              />

              <Typeahead
                id="selectAgency"
                multiple
                placeholder="search Agency"
                onChange={(e) => setAgenciesInput(e)}
                options={agenciesList}
                // selected={keywords?.keywords}
                // className="typeahead-input"
              />

              <Typeahead
                id="selectWorkflow"
                multiple
                placeholder="search Workflow"
                onChange={(e) => setWorkflowsInput(e)}
                options={workflowsList}
                // selected={keywords?.keywords}
                // className="typeahead-input"
              />

              <Typeahead
                id="selectKeywords"
                multiple
                placeholder="search Keywords"
                onChange={(e) => setKeywordsInput(e)}
                options={keywordsList}
                // selected={keywords?.keywords}
                // className="typeahead-input"
              />

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
