import { FC } from "react";
import { Link } from "react-router-dom";

const Navigation: FC = () => {
  return (
    <div className="bg-gray-600 text-white py-3 px-6 flex justify-between w-screen align-middle">
      <Link to="/" className="font-bold cursor-pointer py-1 text-xl">
        TaskManager
      </Link>
      <div className="flex justify-between">
        <Link
          to="auth/signup"
          className="mr-4 hover:bg-white hover:text-gray-600 py-1 px-4 rounded cursor-pointer transition-all"
        >
          Signup
        </Link>
        <Link
          to="auth/signin"
          className="mr-4 hover:bg-white hover:text-gray-600 py-1 px-4 rounded cursor-pointer"
        >
          Signin
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
