import OrderIcon from "../assets/OrderIcon.svg";
import SettingIcon from "../assets/SettingIcon.svg";
import SignoutIcon from "../assets/SignoutIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import SearchIcon from "../assets/searchIcon.svg";
import ChatIcon from "../assets/ChatIcon.svg";
export const navbarButton = [
  { img: SearchIcon, to: "/search", text: "ค้นหางานทั้งหมด" },
  { img: ProfileIcon, to: "/profile", text: "โปรไฟล์ของฉัน" },
  { img: OrderIcon, to: "/my-order", text: "ออเดอร์ของฉัน" },
  { img: ChatIcon, to: "/chat", text: "แชท" },
  { img: SettingIcon, to: "/user-setting-entrance-dt", text: "ตั้งค่า" },
  { img: SignoutIcon, to: "/logout", text: "ล็อคเอาท์" },
];
