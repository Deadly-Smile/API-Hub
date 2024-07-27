import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import UserContext from "../context/UserContext";
import { useGetRoleQuery } from "../store";

const NavConfig = () => {
  const { user } = useContext(UserContext);
  const { data, isSuccess } = useGetRoleQuery();
  const [username, setUsername] = useState();
  const [activeNavLinks, setActiveNavLinks] = useState([
    { label: "About", link: "/about" },
    { label: "Guide", link: "/guide" },
    { label: "Log in", link: "/login" },
    { label: "Sign up", link: "/signup" },
  ]);
  const [parentLinkList, setParentLinkList] = useState([]);
  const [manageLinkList, setManageLinkList] = useState([]);

  useEffect(() => {
    if (user?.name) {
      setUsername(user?.name);
      setActiveNavLinks([
        { label: "About", link: "/about" },
        { label: "Guide", link: "/guide" },
        { label: "My models", link: "/models" },
        { label: "Create new model", link: "/create-model" },
        // { label: "Log in", link: "/logout" },
      ]);
      setParentLinkList([
        { label: "Profile", link: `/user/${user?.id}` },
        { label: "Log out", link: "/logout" },
      ]);
    } else {
      setUsername(null);
    }
  }, [user]);

  useEffect(() => {
    if (data && isSuccess) {
      if (data?.slug === "admin") {
        setManageLinkList([{ lable: "Users", link: "/manage-users" }]);
      } else if (data?.slug === "master") {
        setManageLinkList([
          { lable: "Users", link: "/manage-users" },
          { lable: "Admins", link: "/manage-admins" },
        ]);
      }
    }
  }, [data, isSuccess]);

  return (
    <Navbar
      linkList={activeNavLinks}
      parentLinkList={parentLinkList}
      manageLinkList={manageLinkList}
      userName={username}
      webName={"API-Hub"}
    />
  );
};

export default NavConfig;
