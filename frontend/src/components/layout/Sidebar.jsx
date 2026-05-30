import {
  HiOutlineViewColumns,
  HiOutlineReceiptPercent,
  HiOutlineBanknotes,
  HiOutlineUser,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-800 shadow-lg min-h-screen p-5">
      <h1 className="text-3xl font-bold text-indigo-600 mb-10">
        SpendWise
      </h1>

      <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-200">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100"
        >
          <HiOutlineViewColumns size={22} />
          Dashboard
        </Link>

        <Link
          to="/transactions"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100"
        >
         <HiOutlineReceiptPercent size={22} />
          Transactions
        </Link>

        <Link
          to="/budgets"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100"
        >
         <HiOutlineBanknotes size={22} />
          Budgets
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100"
        >
        <HiOutlineUser size={22} />
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-500 mt-10"
        >
          <HiOutlineArrowLeftOnRectangle size={22} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;