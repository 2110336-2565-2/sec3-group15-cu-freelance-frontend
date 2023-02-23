import tw from "twin.macro";
import Navbar from "../components/share/Navbar";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useSearchParams } from "react-router-dom";
import TemplateFilter from "../components/searchPage/TemplateFilter";
import { categories } from "../store/search-store";
import CategoryFilter from "../components/searchPage/CategoryFilter";

const BG = tw.div`flex min-h-[95vh] pt-[15vh] max-w-[1200px] mx-auto`;
const FilterContainer = tw.div`sticky top-[15vh] h-auto w-[20vw]  font-ibm`;
const PortfolioCardContainer = tw.div`w-[75vw]`;

const SearchPage = () => {
  const authCtx = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchResult, setSearchResult] = useState(
    searchParams.get("keyword") || ""
  );

  const [selectedFilter, setSelectedFilter] = useState(0);

  const searchResultChangeHandler = (e) => {
    setSearchResult(e.target.value);
  };

  return (
    <>
      <Navbar
        login={!!authCtx.acToken}
        search
        fixed
        searchResult={searchResult}
        onChange={searchResultChangeHandler}
        onSubmit={() => {}}
      />
      <BG>
        <FilterContainer>
          <TemplateFilter header="หมวดหมู่">
            {categories.map((category) => (
              <CategoryFilter
                value={category.value}
                text={category.text}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            ))}
          </TemplateFilter>
          <TemplateFilter header="ช่วงราคา"></TemplateFilter>
          <TemplateFilter header="ระยะเวลา"></TemplateFilter>
          <TemplateFilter header="คณะ"></TemplateFilter>
        </FilterContainer>
        <PortfolioCardContainer></PortfolioCardContainer>
      </BG>
    </>
  );
};

export default SearchPage;
