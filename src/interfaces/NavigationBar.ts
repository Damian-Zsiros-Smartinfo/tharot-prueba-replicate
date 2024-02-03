/** @format */

export interface NavigationBar {
  tabs: {
    text: string;
    nameFile: string;
    fixed: boolean;
  }[];
  activeIndex: number;
}
