// GET CURRENT ACTIVE TAB INDEX
export const getActiveMenu = () => {
  let path: string = window.location.pathname;
  if (path === "/occasions") {
    return 0;
  } else if (path === "/products") {
    return 1;
  } else if (path === "/shopbylook") {
    return 2;
  } else if (path === "/accessories") {
    return 3;
  } else if (path === "/mystyles") {
    return 4;
  } else {
    return false;
  }
};
