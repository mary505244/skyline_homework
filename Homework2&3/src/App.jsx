import clsx from "clsx";
import React from "react";
import { ThemeToggle, Calculator } from "./components";

function App() {
  return (
    <div
      className={clsx(
        "w-screen h-screen px-6 py-8 flex justify-center items-center",
        "pink:bg-pinkbg bg-cover pink:text-pink-800",
        "blue:bg-bluebg bg-cover blue:text-white",
        "purple:bg-purplebg bg-cover purple:text-white"
      )}
    >
      <main className="flex flex-col gap-6 w-screen max-w-xl">
        
        <header className={clsx("flex justify-between items-end")}>
          <ThemeToggle />
        </header>

        <Calculator />

      </main>
    </div>
  );
}

export default App;
