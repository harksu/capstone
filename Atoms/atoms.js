import { atom } from "recoil";

export const selectedItem = atom({
  key: "selectedItem", //선택된 태그들
  default: {
    first: "약이름1",
    second: "약이름2",
    first_link: "../assets/noimage.png",
    second_link: "../assets/noimage.png",
    first_ingredient: "재료이름1",
    second_ingredient: "재료이름2",
  },
});

export const accessToken = atom({
  key: "accessToken",
  default: {
    accessToken: "",
  },
});
