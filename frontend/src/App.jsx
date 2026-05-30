import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import useThemeStore from "./store/themeStore";

function App() {
   const darkMode =
    useThemeStore(
      (state) => state.darkMode
    );

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );
    }

  }, [darkMode]);
  return <AppRoutes />;
}

export default App;