import OrderIcon from "../assets/OrderIcon.svg";
import SettingIcon from "../assets/SettingIcon.svg";
import SignoutIcon from "../assets/SignoutIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";

export const navbarButton = [
  { img: ProfileIcon, to: "/profile" ,text:"โปรไฟล์ของฉัน"},
  { img: OrderIcon, to: "/my-order"  ,text:"ออเดอร์ของฉัน"},
  { img: SettingIcon, to: "/edit-profile" ,text:"ตั้งค่า"},
  { img: SignoutIcon, to: "/logout" ,text:"ล็อคเอาท์"},
];
