import { useNavigate } from "react-router";
import OrderIcon from "../assets/OrderIcon.svg";
import ChatIcon from "../assets/ChatIcon.svg";
import NotificationIcon from "../assets/NotificationIcon.svg";
import SignoutIcon from "../assets/SignoutIcon.svg";
import profile1 from "../assets/profile1.svg";

export const navbarButton = [
  { img: OrderIcon, to: "/home" },
  { img: ChatIcon, to: "/home" },
  { img: NotificationIcon, to: "/home" },
  { img: SignoutIcon, to: "/logout" },
  { img: profile1, to: "/profile" },
];
