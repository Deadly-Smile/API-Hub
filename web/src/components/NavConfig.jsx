import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import UserContext from "../context/UserContext";

const NavConfig = () => {
  const user = useContext(UserContext);
  // console.log(user);
  const [username, serUsername] = useState();
  const [activeNavLinks, setActiveNavLinks] = useState([
    { label: "About", link: "/about" },
    { label: "Log in", link: "/login" },
    { label: "Sign up", link: "/signup" },
  ]);

  const [parentList, setParentList] = useState([]);
  const [manageList, setManageList] = useState([]);

  useEffect(() => {
    if (user?.userName) {
      serUsername(user?.userName);
    } else {
      serUsername(null);
    }
  }, [user]);

  return (
    <Navbar
      linkList={activeNavLinks}
      parentLinkList={parentList}
      manageLinkList={manageList}
      userName={username}
      webName={"Model-Hub"}
    />
  );
};

export default NavConfig;
