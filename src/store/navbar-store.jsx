import OrderIcon from "../assets/OrderIcon.svg";
import DashboardIcon from "../assets/DashboardIcon.svg";
import SignoutIcon from "../assets/SignoutIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";

export const navbarButton = [
  { img: ProfileIcon, to: "/profile" ,text:"โปรไฟล์ของฉัน"},
  { img: OrderIcon, to: "/my-order"  ,text:"ออเดอร์ของฉัน"},
  { img: DashboardIcon, to: "/home" ,text:"เเดชบอร์ด"},
  { img: SignoutIcon, to: "/logout" ,text:"ล็อคเอาท์"},
];
