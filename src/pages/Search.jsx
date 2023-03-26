import tw from "twin.macro";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/share/Navbar";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import TemplateFilter from "../components/searchPage/TemplateFilter";
import { categories, faculties, durationOptions } from "../store/search-store";
import CategoryFilter from "../components/searchPage/CategoryFilter";
import { authClient } from "../utils/auth";
import PortFolioCard from "../components/share/PortfolioCard";
import PortfolioImg from "../assets/PortfolioImage.svg";
import SubTemplateFilter from "../components/searchPage/SubTemplateFilter";
import FacultyFilter from "../components/searchPage/FacultyFilter";
import PriceFilter from "../components/searchPage/PriceFilter";
import DurationFilter from "../components/searchPage/DurationFilter";
import PaginationBar from "../components/share/PaginationBar";
import { mapFaculties, mapOptions } from "../store/portfolioForm";
import FilterButton from "../components/searchPage/FilterButton";

const Page = tw.div`w-full`;
const BG = tw.div`flex-col w-[90%] h-auto flex dt:flex-row justify-between min-h-[95vh] pt-[15vh] max-w-[1200px] mx-auto`;
const FilterContainer = tw.div`dt:sticky top-[15vh] h-auto dt:w-[20%]  font-ibm flex flex-col items-end`;
const PortfolioCardContainer = tw.div`w-full flex justify-center dt:justify-start flex-wrap gap-x-[3%] gap-y-[2vh] my-10 min-h-[65vh]`;
const Filterbar = tw.div`flex flex-wrap gap-2 items-center text-mobile-h2 font-ibm font-medium text-freelance-black-secondary`;

const SearchPage = () => {
  const authCtx = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchResult, setSearchResult] = useState(
    searchParams.get("keyword") || ""
  );

  const searchResultChangeHandler = (e) => {
    setSearchResult(e.target.value);
  };

  const pageRef = React.createRef();
  const page = searchParams.get("pages");

  const onResetPage = () => {
    searchParams.set("pages", 1);
    setSearchParams(searchParams);
  };

  const onNextPageHandler = (e) => {
    e.preventDefault();
    searchParams.set("pages", parseInt(page) + 1);
    setSearchParams(searchParams);
  };

  const onPrevPageHandler = (e) => {
    e.preventDefault();
    searchParams.set("pages", parseInt(page) - 1);
    setSearchParams(searchParams);
  };

  const onSetPageHandler = (event) => {
    event.preventDefault();
    const inputPage = parseInt(pageRef.current.value);
    const totalPage = parseInt(meta.TotalPage);
    pageRef.current.value = "";
    pageRef.current.blur();
    if (inputPage > totalPage) searchParams.set("pages", totalPage);
    else if (inputPage < 1) searchParams.set("pages", 1);
    else searchParams.set("pages", inputPage);
    setSearchParams(searchParams);
  };

  const keyword = searchParams.get("keyword");
  const selectedCategory = searchParams.get("category") || "0";
  const selectedFaculty = searchParams.get("faculty") || "0";
  const priceMin = searchParams.get("min_price") || "";
  const priceMax = searchParams.get("max_price") || "";
  const duration = searchParams.get("duration") || "";

  const splitDuration = duration.split(",");

  const submitResultHandler = (e) => {
    e.preventDefault();
    setSelected("keyword", searchResult);
    onResetPage();
  };

  const setSelected = (filter, value) => {
    let realValue = value;

    if (filter === "faculty") {
      if (realValue === parseInt(selectedFaculty)) {
        realValue = "0";
      }
    }
    searchParams.set(filter, realValue);
    setSearchParams(searchParams);
    onResetPage();
  };

  const [portfolios, setPortfolios] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState(null);
  const [priceShow, setPriceShow] = useState({ min: priceMin, max: priceMax });
  const [showDuration, setShowDuration] = useState({
    1: splitDuration.includes("1"),
    3: splitDuration.includes("3"),
    7: splitDuration.includes("7"),
    15: splitDuration.includes("15"),
    30: splitDuration.includes("30"),
  });

  console.log(selectedFaculty);

  const onChangeDurationHandler = (e) => {
    const changeValue = !showDuration[e.target.name];
    console.log(changeValue);
    setShowDuration((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
    let value = "";
    for (let duration in showDuration) {
      if (duration === e.target.name && changeValue) {
        value += duration + ",";
      } else if (
        duration !== e.target.name &&
        showDuration[duration] === true
      ) {
        value += duration + ",";
      }
    }
    if (value !== "") {
      value = value.slice(0, value.length - 1);
    }
    setSelected("duration", value);
    onResetPage();
  };
  const onChangePriceHandler = (e) => {
    setPriceShow((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitPriceHandler = (e) => {
    e.preventDefault();
    setSelected("min_price", priceShow.min === "0" ? "1" : priceShow.min);
    setSelected("max_price", priceShow.max);
  };

  const onCancelDurationHandler = (name) => {
    console.log(name);
    setShowDuration((prev) => ({
      ...prev,
      [name]: false,
    }));
    let value = "";
    for (let duration in showDuration) {
      if (parseInt(duration) !== name && showDuration[duration] === true) {
        value += duration + ",";
      }
    }
    if (value !== "") {
      value = value.slice(0, value.length - 1);
    }
    setSelected("duration", value);
    onResetPage();
  };

  const onCancelFaculty = (name) => {
    searchParams.set(name, "0");
    setSearchParams(searchParams);
    onResetPage();
  };

  console.log(duration);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let params = {
          limit: 6,
          page: page,
          keyword: keyword,
          category: selectedCategory !== "0" ? selectedCategory : null,
          faculty: selectedFaculty !== "0" ? selectedFaculty : null,
          min_price: priceMin !== "" ? priceMin : 1,
          max_price: priceMax !== "" ? priceMax : 100000,
          duration: duration !== "" ? duration : null,
        };
        for (let param in params) {
          if (
            params[param] === undefined ||
            params[param] === null ||
            params[param] === ""
          ) {
            delete params[param];
          }
        }

        let response;
        response = await authClient.get(
          `/portfolio/search?` + new URLSearchParams(params).toString()
        );
        console.log(response);
        setPortfolios(response.data.pagination.items);
        setMeta(response.data.pagination.meta);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [
    keyword,
    selectedCategory,
    page,
    selectedFaculty,
    priceMin,
    priceMax,
    duration,
  ]);

  const navigate = useNavigate();
  const onClickDetailCard = (id) => {
    navigate(`/portfolio/${id}`);
  };

  console.log(mapOptions);

  return (
    <>
      <Navbar
        login={!!authCtx.acToken}
        search
        fixed
        searchResult={searchResult}
        onChange={searchResultChangeHandler}
        onSubmit={submitResultHandler}
        placeholder="ค้นหางานที่ต้องการ..."
      />
      <Page>
        {" "}
        <BG>
          <FilterContainer>
            <TemplateFilter header="หมวดหมู่">
              {categories.map((category, idx) => (
                <CategoryFilter
                  key={idx}
                  value={category.value}
                  text={category.text}
                  selectedFilter={parseInt(selectedCategory)}
                  setSelectedFilter={setSelected}
                />
              ))}
            </TemplateFilter>
            <TemplateFilter header="ช่วงราคา">
              <PriceFilter
                onChangePrice={onChangePriceHandler}
                onSubmitPrice={onSubmitPriceHandler}
                priceMin={priceShow.min}
                priceMax={priceShow.max}
                placeMin="0"
                placeMax="Max"
              />
            </TemplateFilter>
            <TemplateFilter header="ระยะเวลา">
              {durationOptions.map((option, idx) => (
                <DurationFilter
                  value={option.value}
                  text={option.text}
                  key={idx}
                  onChange={onChangeDurationHandler}
                  showDuration={showDuration}
                />
              ))}
            </TemplateFilter>
            <TemplateFilter header="คณะ">
              {faculties.map((faculty, idx1) => (
                <SubTemplateFilter key={idx1} header={faculty.text}>
                  {faculty.sub.map((subFac, idx2) => (
                    <FacultyFilter
                      key={idx2}
                      value={subFac.value}
                      text={subFac.text}
                      selectedFilter={parseInt(selectedFaculty)}
                      setSelectedFilter={setSelected}
                    />
                  ))}
                </SubTemplateFilter>
              ))}
            </TemplateFilter>
          </FilterContainer>
          <div tw="w-full dt:w-[70%]  h-auto dt:min-h-[70vh] mx-auto">
            <Filterbar>
              เเสดงผลลัพธ์เฉพาะ
              {selectedCategory !== "0" && (
                <FilterButton
                  text={mapOptions[parseInt(selectedCategory)]}
                  onClick={onCancelFaculty.bind(null, "category")}
                />
              )}
              {selectedFaculty !== "0" && (
                <FilterButton
                  text={mapFaculties[parseInt(selectedFaculty)]}
                  onClick={onCancelFaculty.bind(null, "faculty")}
                />
              )}
              {duration !== "" &&
                duration
                  .split(",")
                  .map((d, idx) => (
                    <FilterButton
                      key={idx}
                      text={`${d} วัน`}
                      onClick={onCancelDurationHandler.bind(null, parseInt(d))}
                    />
                  ))}
            </Filterbar>
            <PortfolioCardContainer>
              {isLoading && "Loading..."}
              {!isLoading &&
                portfolios &&
                portfolios.map((portfolio, i) => {
                  return (
                    <PortFolioCard
                      id={portfolio.id}
                      setPortfolios={setPortfolios}
                      key={i}
                      portImg={PortfolioImg}
                      category={portfolio.category}
                      name={portfolio.name}
                      description={portfolio.description}
                      duration={portfolio.duration}
                      price={portfolio.price}
                      canEdit={false}
                      isPublic={portfolio.is_public}
                      onClick={onClickDetailCard.bind(null, portfolio.id)}
                      onClickPencil={() => {}}
                    />
                  );
                })}
              {!isLoading && !portfolios && "Not found"}
            </PortfolioCardContainer>
            {portfolios && meta && meta.TotalPage !== 1 && (
              <PaginationBar
                page={page}
                ref={pageRef}
                totalPage={meta.TotalPage}
                onPrev={onPrevPageHandler}
                onNext={onNextPageHandler}
                onSet={onSetPageHandler}
              />
            )}
          </div>
        </BG>
      </Page>
    </>
  );
};

export default SearchPage;
