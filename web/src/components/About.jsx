import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">API hub!</h1>
          <p className="py-6">
            {
              "A all in one place for useful APIs that can be used for all kinds of projects. You can also add new API model that can be used by many."
            }
          </p>
          <p className="">
            <Link
              className="link link-hover text-lg font-semibold"
              to={"../login"}
            >
              Login
            </Link>
            {" and explore all interesting APIs"}
          </p>
          <p className="">
            To know more about me{" "}
            <a
              className="link link-hover text-lg font-semibold"
              href="https://github.com/Deadly-Smile"
            >
              click here
            </a>
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-fit shadow-2xl bg-base-100">
          <img className="w-80 h-80" src="/soloPic.jpg" alt="Creator's image" />
        </div>
      </div>
    </div>
  );
};

export default About;
