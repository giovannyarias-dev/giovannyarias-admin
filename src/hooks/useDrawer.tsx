import { useState } from "react";

export const useDrawer = (getData: Function) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const showDrawer = () => {
    setIsOpenDrawer(true);
  };

  const closeDrawer = (refresh: boolean) => {
    setIsOpenDrawer(false);
    if(refresh)
      getData()
  };

  return { isOpenDrawer, showDrawer, closeDrawer };
}