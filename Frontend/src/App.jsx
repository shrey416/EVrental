/** @format */

import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Siderbar";
import { useState, useEffect } from "react";

function App() {
  const [expanded, setExpanded] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        className="container-fluid p-0"
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div
          className="flex max-w-full overflow-x-auto" 
          style={{ flex: 1 }}
        >
          <div
            style={{
              width: expanded ? "200px" : "60px",
              transition: "width ease-out 0.1s",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Sidebar expanded={expanded} />
          </div>

          <div className="flex-grow px-0 bg-gray-100" style={{ overflowY: "auto", transition: "ease-in-out 0.3s" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;