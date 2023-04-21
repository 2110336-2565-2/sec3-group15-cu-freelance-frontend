import tw, { styled } from "twin.macro";
import React, { useContext, useState, useEffect, useRef } from "react";
import InputSearch from "../components/share/InputSearch";
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
import FilterModal from "../components/share/FilterModal";
import FilterButton from "../components/searchPage/FilterButton";
import LoadingSpinner from "../components/share/LoadingSpinner";
import { useWindow } from "../hooks/window-hook";
import SearchCorousel from "../components/searchPage/SearchCarousel";
import CategoryButtonContainer from "../components/searchPage/CategoryButtonContainer";
import { AnimatePresence } from "framer-motion";
import Suggestion from "../components/share/Suggestion";
const Page = tw.div`w-full`;
const BG = tw.div`flex-col w-full dt:w-[90%] mx-auto gap-4 h-auto flex dt:flex-row justify-center min-h-[95vh] pt-[5vh] dt:pt-[10vh] max-w-[1200px]`;
const Header = tw.div`pl-2 dt:pl-0 font-ibm text-mobile-h1 dt:text-desktop-h1 font-bold my-4`;
const Header2 = tw.div`pl-2 dt:pl-0 text-mobile-h2 dt:text-desktop-h2 font-ibm font-normal my-4 text-[#707070]`;
const FilterContainer = tw.div`pt-4 h-[90%] overflow-auto overflow-x-hidden dt:sticky  dt:top-[15vh] dt:h-auto dt:w-[20%] dt:mx-auto font-ibm flex flex-col items-end`;
const PortfolioCardContainer = tw.div`w-full flex justify-center dt:justify-start flex-wrap gap-y-[2vh] mb-5 mt-2 min-h-[65vh] gap-x-[2%]`;
const Filterbar = tw.div`min-h-[42px] flex flex-wrap gap-2 items-center text-mobile-h2 font-ibm font-medium text-freelance-black-secondary`;
const InputSearchContainer = tw.div`px-2 dt:px-0 h-[40px] w-[100%] mx-auto my-4`;
const SuggestionList = styled.div(({ isHidden }) => [
  tw`flex flex-col place-self-start w-full bg-white  mt-1 rounded-lg z-[70]`,
  isHidden && tw`hidden`,
]);

const SearchPage = () => {
  const authCtx = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const windowSize = useWindow();
  const slideRef = useRef(null);
  const [searchResult, setSearchResult] = useState(
    searchParams.get("keyword") || ""
  );
  const [timerId, setTimerId] = useState(null);
  const [suggestList, setSuggestList] = useState(null);
  const [fetchFinished, setFetchFinished] = useState(true);
  const [isSuggestHidden, setIsSuggestHidden] = useState(true);
  const searchResultChangeHandler = (e) => {
    // e.preventDefault();
    // console.log(e.target.value);
    setIsSuggestHidden(false);
    setSearchResult(e.target.value);
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerId(
      setTimeout(() => {
        fetchSuggest(e.target.value);
      }, 30)
    );
  };

  const fetchSuggest = async (value) => {
    setFetchFinished(false);
    const response = await authClient.get(
      `/portfolio/suggest?keyword=${value}`
    );
    // console.log(response.data.Suggests, searchResult);
    setSuggestList(
      response.data.Suggests || !value ? response.data.Suggests : []
    );
    setFetchFinished(true);
  };

  const pageRef = React.createRef();
  const page = searchParams.get("pages") || "1";

  const onResetPage = () => {
    searchParams.set("pages", 1);
    setSearchParams(searchParams);
    if (slideRef.current) {
      if (slideRef.current.swiper) slideRef.current.swiper.slideTo(0, 1000);
    }
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
  const suggestOnclickHandler = (text) => {
    setIsSuggestHidden(true);
    setSearchResult(text);
    navigate(`/search?pages=1&limit=6&keyword=${text}`);
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
  const handleInfiniteScrollNextPage = () => {
    if (page < meta.TotalPage) {
      searchParams.set("pages", parseInt(page) + 1);
      setSearchParams(searchParams);
    }
  };
  const [priceShow, setPriceShow] = useState({ min: priceMin, max: priceMax });
  const [showDuration, setShowDuration] = useState({
    1: splitDuration.includes("1"),
    3: splitDuration.includes("3"),
    7: splitDuration.includes("7"),
    15: splitDuration.includes("15"),
    30: splitDuration.includes("30"),
  });

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
    setSelected(
      "min_price",
      parseInt(priceShow.min) <= 0 ? "1" : priceShow.min
    );
    setSelected(
      "max_price",
      parseInt(priceShow.max) <= 0 ? "100000" : priceShow.max
    );
    if (parseInt(priceShow.min) < 0) {
      setPriceShow((prev) => ({ ...prev, min: "0" }));
    }
    if (parseInt(priceShow.max) < 0) {
      setPriceShow((prev) => ({ ...prev, max: "100000" }));
    }
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

        if (!response.data.pagination.items) {
          setPortfolios([]);
          setIsLoading(false);
          return;
        }
        let ports;
        let portIds = "";
        if (page === "1" || windowSize >= 850 || !portfolios) {
          ports = [...response.data.pagination.items];
        } else {
          ports = [...portfolios, ...response.data.pagination.items];
        }
        ports.some((port) => {
          portIds += `${port.id},`;
        });
        if (portIds.length > 0) {
          portIds = portIds.slice(0, portIds.length - 1);
        }

        let data = [];
        params = { id: portIds };
        const res_img = await authClient.get(
          `/file/portfolio/thumbnail?` + new URLSearchParams(params).toString()
        );

        const thumbnails = [...res_img.data.thumbnails];
        for (let i = 0; i < ports.length; i++) {
          data.push({
            ...ports[i],
            url: thumbnails[
              thumbnails.findIndex((thumbnail) => {
                return thumbnail.portId === ports[i].id;
              })
            ].url,
          });
        }

        setPortfolios(data);
        setMeta(response.data.pagination.meta);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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

  const FilterContent = (
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
        <FacultyFilter
          value={0}
          text="ทั้งหมด"
          selectedFilter={parseInt(selectedFaculty)}
          setSelectedFilter={setSelected}
        />
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
  );
  //FilterModal
  const [showModal, setShowModal] = useState(false);
  const onCloseModalHandler = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };
  const onOpenModalHandler = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const resetAllParams = () => {
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    searchParams.delete("duration");
    setShowDuration({
      1: false,
      3: false,
      7: false,
      15: false,
      30: false,
    });
    setPriceShow({ min: "", max: "" });
    onResetPage();
  };

  const onSubmitPriceHandler2 = () => {
    setSelected(
      "min_price",
      parseInt(priceShow.min) <= 0 ? "1" : priceShow.min
    );
    setSelected(
      "max_price",
      parseInt(priceShow.max) <= 0 ? "100000" : priceShow.max
    );
    if (parseInt(priceShow.min) < 0) {
      setPriceShow((prev) => ({ ...prev, min: "0" }));
    }
    if (parseInt(priceShow.max) < 0) {
      setPriceShow((prev) => ({ ...prev, max: "100000" }));
    }
    setShowModal(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (windowSize < 850) {
      onResetPage();
    }
  }, [windowSize]);

  return (
    <>
      <FilterModal
        content={FilterContent}
        show={showModal}
        onClose={onCloseModalHandler}
        textBLeft="รีเซ็ต"
        textBRight="เรียบร้อย"
        onSubmitPrice={onSubmitPriceHandler2}
        onReset={resetAllParams}
      />
      <Navbar
        login={!!authCtx.acToken}
        search
        fixed
        suggestList={suggestList}
        searchResult={searchResult}
        onChange={searchResultChangeHandler}
        onSubmit={submitResultHandler}
        placeholder="ค้นหางานที่ต้องการ..."
        setSearchResult={setSearchResult}
        fetchFinished={fetchFinished}
      />
      <Page>
        {" "}
        <BG>
          {windowSize >= 850 && FilterContent}
          <div tw="w-full dt:w-[75%]  h-auto dt:min-h-[70vh] mx-auto">
            <div tw="text-center py-2">
              <Header>พอร์ตโฟลิโอทั้งหมด</Header>
              <Header2>
                ดูพอร์ตโฟลิโอจากทุกฟรีแลนซ์ หรือเลือกตัวกรองที่ต้องการได้เลย!
              </Header2>
            </div>

            {windowSize >= 850 && (
              <Filterbar>
                เเสดงผลลัพธ์เฉพาะ
                <AnimatePresence>
                  {selectedCategory !== "0" && (
                    <FilterButton
                      text={mapOptions[parseInt(selectedCategory)]}
                      onClick={onCancelFaculty.bind(null, "category")}
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {selectedFaculty !== "0" && (
                    <FilterButton
                      text={mapFaculties[parseInt(selectedFaculty)]}
                      onClick={onCancelFaculty.bind(null, "faculty")}
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {duration !== "" &&
                    duration
                      .split(",")
                      .map((d, idx) => (
                        <FilterButton
                          key={idx}
                          text={`${d} วัน`}
                          onClick={onCancelDurationHandler.bind(
                            null,
                            parseInt(d)
                          )}
                        />
                      ))}
                </AnimatePresence>
              </Filterbar>
            )}
            {windowSize < 850 && (
              <InputSearchContainer>
                {" "}
                <InputSearch
                  placeholder="ค้นหาพอร์ตโฟลิโอที่นี่..."
                  value={searchResult}
                  onChange={searchResultChangeHandler}
                  onSubmit={submitResultHandler}
                  filter
                  onClickFilter={onOpenModalHandler}
                />
                {suggestList && (
                  <SuggestionList
                    isHidden={
                      isSuggestHidden || !searchResult || !fetchFinished
                    }
                  >
                    {suggestList.length != 0 ? (
                      suggestList.map((suggest, i) => {
                        return (
                          <Suggestion
                            text={suggest}
                            key={i}
                            onClick={suggestOnclickHandler.bind(null, suggest)}
                          />
                        );
                      })
                    ) : (
                      <Suggestion def />
                    )}
                  </SuggestionList>
                )}
              </InputSearchContainer>
            )}
            {windowSize < 850 && (
              <CategoryButtonContainer
                setSelectedCategory={setSelected}
                select={parseInt(selectedCategory)}
              />
            )}
            {windowSize < 850 && (
              <SearchCorousel
                ref={slideRef}
                portfolios={portfolios}
                isLoading={isLoading}
                handleInfiniteScroll={handleInfiniteScrollNextPage}
              />
            )}
            {windowSize >= 850 && (
              <PortfolioCardContainer>
                {isLoading && <LoadingSpinner />}
                {!isLoading && portfolios && portfolios.length === 0 && (
                  <div>No result</div>
                )}
                {!isLoading &&
                  portfolios &&
                  portfolios.map((portfolio) => {
                    return (
                      <PortFolioCard
                        id={portfolio.id}
                        setPortfolios={setPortfolios}
                        key={portfolio.id}
                        portImg={portfolio.url}
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
            )}
            {windowSize >= 850 &&
              portfolios &&
              meta &&
              meta.TotalPage !== 1 && (
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
