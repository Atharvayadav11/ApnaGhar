import { Link } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header className="flex justify-between items-center w-full border-b py-6 sm:px-4 px-2 border-gray-500 gap-2">
      <Link to="/" className="flex space-x-2 items-center gap-2">
        <img
          alt="header text"
          src="/House_icon.png"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />
        <h1 className="sm:text-3xl text-xl font-light ml-2 tracking-tight">
          ApnaGhar
        </h1>
      </Link>
      {token ? (
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className=" border-gray-300 pr-4 flex space-x-2 hover:text-[#01BD57] transition"
          >
            <div>Dashboard</div>
          </Link>
          <Link
            to="/progress"
            className=" border-gray-300 pr-4 flex space-x-2 hover:text-[#01BD57] transition"
          >
            <div>Progress</div>
          </Link>

          <Link
            to="/compare"
            className="border-gray-300 pr-4 flex space-x-2 hover:text-[#01BD57] transition"
          >
            <div>Compare</div>
          </Link>

          {/* Replace Cost Estimation with Chat */}
          <Link
            to="/chat"
            className="border-gray-300 pr-4 flex space-x-2 hover:text-[#01BD57] transition"
          >
            <div>Chat</div>
          </Link>

          <Link
            to="https://64323ff406fb264b1328e217--poetic-lokum-8589b1.netlify.app/"
            className="border-gray-300 pr-4 flex space-x-2 hover:text-[#01BD57] transition"
          >
            <div>Playground</div>
          </Link>
          <Link
            to="/explore"
            className="border-gray-300 pr-4 flex space-x-2 hover:text-[#01BD57] transition"
          >
            <div>Explore</div>
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-green-400 transition"
            to="/profile"
          >
            <h1 className="font-semibold">{user.name}</h1>
            <img
              alt="Profile picture"
              src={`https://gravatar.com/avatar/${token}?s=400&d=robohash&r=x`}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border text-white px-5 py-2 text-sm shadow-md font-medium transition"
            to="/login"
          >
            <p>Login</p>
          </Link>
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border  text-white px-5 py-2 text-sm shadow-md  font-medium transition"
            to="/signup"
          >
            <p>Signup</p>
          </Link>
        </div>
      )}
    </header>
  );
}
