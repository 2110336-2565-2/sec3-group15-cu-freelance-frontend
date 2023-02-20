import OrderIcon from "../assets/OrderIcon.svg";
import DashboardIcon from "../assets/DashboardIcon.svg";
import SignoutIcon from "../assets/SignoutIcon.svg";
import ProfileIcon from "../assets/profileIcon.svg";

export const navbarButton = [
  { img: ProfileIcon, to: "/profile" ,text:"โปรไฟล์ของฉัน"},
  { img: OrderIcon, to: "/home" ,text:"ออเดอร์ของฉัน"},
  { img: DashboardIcon, to: "/home" ,text:"เเดชบอร์ด"},
  { img: SignoutIcon, to: "/logout" ,text:"ล็อคเอาท์"},
];
