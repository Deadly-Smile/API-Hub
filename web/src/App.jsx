import { useEffect, useState } from "react";
import { useGetUserQuery } from "./store";
import LoadingContext from "./context/LoadingContext";
import UserContext from "./context/UserContext";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import NavConfig from "./components/NavConfig";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
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
    <LoadingContext.Provider value={{ progress, setProgress }}>
      <UserContext.Provider value={{ user: data?.data, isSuccess }}>
        <header className="b border-emerald-950">
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <NavConfig />
        </header>
        <section className="min-h-[85vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
        <footer>
          <Footer />
        </footer>
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
};

export default App;
