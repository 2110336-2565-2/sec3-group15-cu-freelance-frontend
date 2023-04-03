import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/share/Navbar";
import { authClient } from "../utils/auth";
// import { apiClient } from "../utils/axios";

const LayoutWithNavbar = (props) => {

  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState("");
  const [suggestList, setSuggestList] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [fetchFinished, setFetchFinished] = useState(true);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?pages=1&limit=6&keyword=${searchResult}`);
  };
  const fetchSuggest = async(value)=>{
    setFetchFinished(false);
    const response = await authClient.get(`/portfolio/suggest?keyword=${value}`);
    // console.log(response.data.Suggests, searchResult);
    setSuggestList(response.data.Suggests||!value ? response.data.Suggests : []);
    setFetchFinished(true);
  }
  const searchResultChangeHandler = async(e) => {
    // const response = await authClient.get(`/portfolio/suggest?keyword=${e.target.value}`);
    // console.log(response.data);
    // setSuggestList(response.data.suggest)
    // console.log(e.target.value);
    setSearchResult(e.target.value);
    if(timerId){
      clearTimeout(timerId);
    }
    setTimerId(setTimeout(()=>{
      fetchSuggest(e.target.value)
    },10))
  };

  return (
    <>
      <Navbar
        login={!!props.acToken}
        fixed
        search
        suggestList={suggestList}
        searchResult={searchResult}
        onChange={searchResultChangeHandler}
        onSubmit={onSubmitHandler}
        setSearchResult={setSearchResult}
        fetchFinished={fetchFinished}
      />
      <Outlet />
    </>
  );
};
export default LayoutWithNavbar;
