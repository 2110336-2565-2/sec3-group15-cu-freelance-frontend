import allWhite from "../assets/Category/allWhite.svg";
import allPink from "../assets/Category/AllBlack.svg";
import graphicPink from "../assets/Category/GraphicBlack.svg";
import graphicWhite from "../assets/Category/graphicWhite.svg";
import lawWhite from "../assets/Category/lawWhite.svg";
import lawPink from "../assets/Category/LawBlack.svg";
import economicWhite from "../assets/Category/economicWhite.svg";
import economicPink from "../assets/Category/EconomicBlack.svg";
import WritingWhite from "../assets/Category/WritingWhite.svg";
import WritingBlack from "../assets/Category/WritingBlack.svg";
import ProgrammingWhite from "../assets/Category/ProgrammingWhite.svg";
import ProgrammingBlack from "../assets/Category/ProgrammingBlack.svg";
import MarketingWhite from "../assets/Category/MarketingWhite.svg";
import MarketingBlack from "../assets/Category/MarketingBlack.svg";
import CameraWhite from "../assets/Category/CameraWhite.svg";
import CameraBlack from "../assets/Category/CameraBlack.svg";
import LifestyleWhite from "../assets/Category/LifestyleWhite.svg";
import LifestyleBlack from "../assets/Category/LifestyleBlack.svg";

export const categories = [
  { text: "ทั้งหมด", value: 0 },
  { text: "โปรเเกรมมิ่ง", value: 3 },
  { text: "กฏหมาย", value: 8 },
  { text: "ออกแบบเเละกราฟิก", value: 1 },
  { text: "ธุรกิจ", value: 5 },
  { text: "การตลาด", value: 4 },
  { text: "การถ่ายภาพเเละวีดีโอ", value: 6 },
  { text: "การเขียนเเละการแปล", value: 2 },
  { text: "ไลฟ์สไตล์", value: 7 },
];

export const faculties = [
  {
    text: "หมวดวิทย์",
    sub: [
      { text: "จิตวิทยา", value: 38 },
      { text: "เภสัชศาสตร์", value: 33 },
      { text: "วิทยาศาสตร์", value: 23 },
      { text: "วิทยาศาสตร์การกีฬา", value: 39 },
      { text: "วิศวกรรมศาสตร์", value: 21 },
      { text: "สหเวชศาสตร์", value: 37 },
    ],
  },
  {
    text: "หมวดศิลป์",
    sub: [
      { text: "ครุศาสตร์", value: 27 },
      { text: "นิติศาสตร์", value: 34 },
      { text: "นิเทศศาสตร์", value: 28 },
      { text: "พาณิชย์ศาสตร์เเละการบัญชี", value: 26 },
      { text: "รัฐศาสตร์", value: 24 },
      { text: "ศิลปกรรมศาสตร์", value: 35 },
      { text: "เศรษฐศาสตร์", value: 29 },
      { text: "สถาปัตยกรรมศาสตร์", value: 25 },
      { text: "อักษรศาสตร์", value: 22 },
    ],
  },
  {
    text: "หมวดเเพทย์",
    sub: [
      { text: "ทันตเเพทย์ศาสตร์", value: 32 },
      { text: "พยาบาลศาสตร์", value: 36 },
      { text: "เเพทยศาสตร์", value: 30 },
      { text: "สัตวเเพทย์ศาสตร์", value: 31 },
    ],
  },
];

export const durationOptions = [
  { text: "1 วัน", value: "1" },
  { text: "3 วัน", value: "3" },
  { text: "7 วัน", value: "7" },
  { text: "15 วัน", value: "15" },
  { text: "30 วัน", value: "30" },
];

export const statusOptions = [
  { text: "ส่งงานเเล้ว", value: "1" },
  { text: "กำลังทำงานอยู่", value: "2" },
  { text: "ยกเลิกงานเเล้ว", value: "3" },
];

export const statusRequest = [
  { text: "ออเดอร์ได้ถูกรับเเล้ว", value: "1" },
  { text: "มีผู้อื่นรับออเดอร์ไปเเล้ว", value: "2" },
  { text: "ออเดอร์ได้ถูกปฏิเสธเเล้ว", value: "3" },
  { text: "กำลังรอผู้รับออเดอร์", value: "4" },
];

export const statusRequestFreelance = [
  { text: "มีผู้อื่นรับออเดอร์ไปเเล้ว", value: "2" },
  { text: "กำลังรอผู้รับออเดอร์", value: "4" },
];

export const categoriesButton = [
  { text: "ทั้งหมด", value: 0, imgPink: allPink, imgWhite: allWhite },
  {
    text: "ออกแบบ",
    value: 1,
    imgPink: graphicPink,
    imgWhite: graphicWhite,
  },
  {
    text: "งานเขียน",
    value: 2,
    imgPink: WritingBlack,
    imgWhite: WritingWhite,
  },
  {
    text: "โปรเเกรมมิ่ง",
    value: 3,
    imgPink: ProgrammingBlack,
    imgWhite: ProgrammingWhite,
  },
  {
    text: "ตลาด",
    value: 4,
    imgPink: MarketingBlack,
    imgWhite: MarketingWhite,
  },
  { text: "ธุรกิจ", value: 5, imgPink: economicPink, imgWhite: economicWhite },
  {
    text: "ถ่ายรูป",
    value: 6,
    imgPink: CameraBlack,
    imgWhite: CameraWhite,
  },
  {
    text: "ไลฟ์สไตล์",
    value: 7,
    imgPink: LifestyleBlack,
    imgWhite: LifestyleWhite,
  },
  { text: "กฎหมาย", value: 8, imgPink: lawPink, imgWhite: lawWhite },
];
