import allWhite from "../assets/Category/allWhite.svg";
import allPink from "../assets/Category/AllBlack.svg";
import graphicPink from "../assets/Category/GraphicBlack.svg";
import graphicWhite from "../assets/Category/graphicWhite.svg";
import lawWhite from "../assets/Category/lawWhite.svg";
import lawPink from "../assets/Category/LawBlack.svg";
import economicWhite from "../assets/Category/economicWhite.svg";
import economicPink from "../assets/Category/EconomicBlack.svg";

export const categories = [
  { text: "ทั้งหมด", value: 0, imgPink: allPink, imgWhite: allWhite },
  {
    text: "กราฟิกดีไซน์",
    value: 1,
    imgPink: graphicPink,
    imgWhite: graphicWhite,
  },
  { text: "กฎหมาย", value: 8, imgPink: lawPink, imgWhite: lawWhite },
  { text: "ธุรกิจ", value: 5, imgPink: economicPink, imgWhite: economicWhite },
];
