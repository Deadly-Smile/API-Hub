import AddSpace from "./AddSpace";
import RecentModelList from "./RecentModelList";
import TopModelList from "./TopModelList";
const Home = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/5 max-h-screen overflow-auto">
        <AddSpace />
      </div>
      <div className="divider min-h-screen divider-horizontal max-w-1" />
      <div className="w-3/5 max-h-screen overflow-auto">
        <RecentModelList />
      </div>
      <div className="divider min-h-screen divider-horizontal max-w-1" />
      <div className="w-1/5 max-h-screen overflow-auto">
        <TopModelList />
      </div>
    </div>
  );
};

export default Home;
