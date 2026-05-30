import useAuthStore from "../../store/authStore";
import { HiMoon, HiSun } from "react-icons/hi";
import useThemeStore from "../../store/themeStore";

const Navbar = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  const {
    darkMode,
    toggleTheme,
  } = useThemeStore();

  return (
    <div
      className="
      flex
      items-center
      justify-between
      px-6
      py-4
      bg-white
      dark:bg-slate-800
      shadow-md
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        text-slate-800
        dark:text-white
        "
      >
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <div
          className="
          font-semibold
          text-slate-700
          dark:text-slate-200
          "
        >
          Welcome, {user?.name}
        </div>

        <button
          onClick={toggleTheme}
          className="
          p-2
          rounded-lg
          bg-slate-100
          dark:bg-slate-700
          text-slate-700
          dark:text-white
          hover:scale-110
          transition
          "
        >
          {darkMode ? (
            <HiSun size={22} />
          ) : (
            <HiMoon size={22} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;