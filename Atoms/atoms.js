import { atom } from "recoil";

export const selectedItem = atom({
  key: "selectedItem", //선택된 태그들
  default: { first: "약이름1", second: "약이름2" },
});
