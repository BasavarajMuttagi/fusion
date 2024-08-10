import { useEffect } from "react";
import "./App.css";
import useFusionStore from "./store";

function App() {
  const { theme, toggelTheme } = useFusionStore();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    return () => {
      document.body.removeAttribute("data-theme");
    };
  }, [theme]);
  return (
    <>
      <button
        onClick={() => toggelTheme(theme == "cupcake" ? "forest" : "cupcake")}
      >
        change Theme
      </button>
    </>
  );
}

export default App;
