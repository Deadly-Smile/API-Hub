import { useState, useEffect } from "react";
import "./App.css";
import { useGetUserQuery } from "./store";
import LoadingContext from "../Context/LoadingContext";
import UserContext from "../Context/UserContext";
import { Provider } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import NavConfig from "./components/NavConfig";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const { data, isSuccess, isLoading } = useGetUserQuery();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isLoading) {
      setProgress(30);
    } else {
      setProgress(100);
    }
  }, [isLoading]);
  return (
    // <LoadingContext.Provider value={{ progress, setProgress }}>
    //   <UserContext.Provider
    //     value={{ user: data?.data?.user, isLoggedIn: isSuccess }}
    //   >
    //     <Provider>
    //       <header>
    //         <LoadingBar
    //           color="#f11946"
    //           progress={progress}
    //           onLoaderFinished={() => setProgress(0)}
    //         />
    //         <NavConfig />
    //       </header>
    //       <section>
    //         <Routes>
    //           <Route path="/" element={<Home />} />
    //         </Routes>
    //       </section>
    //       <footer>
    //         <Footer />
    //       </footer>
    //     </Provider>
    //   </UserContext.Provider>
    // </LoadingContext.Provider>
    <p>Hi, this is lepjklhkh</p>
  );
}

export default App;
