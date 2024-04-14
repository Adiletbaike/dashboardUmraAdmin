import {
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineBuildingOffice2,
  HiOutlineCog,
} from "react-icons/hi2";

export const DASHBOARD_SIDEBAR_LINKS = [
  // {
  //   key: "dashboard",
  //   label: "Башкы бет",
  //   path: "/",
  //   icon: <HiOutlineSquares2X2 />,
  // },
  {
    key: "groups",
    label: "Группалар",
    path: "/",
    icon: <HiOutlineUserGroup />,
  },
  {
    key: "guide",
    label: "Умра башчылар",
    path: "/guide",
    icon: <HiOutlineUserPlus />,
  },
  {
    key: "hotels",
    label: "Мейманканалар",
    path: "/hotels",
    icon: <HiOutlineBuildingOffice2 />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Настройка",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
];
