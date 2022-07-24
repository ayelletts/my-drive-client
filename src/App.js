import { useEffect, useState } from "react";
import "./App.css";
import RootContentContext from "./contexts/RootContentContext";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  const [rootContent, setRootContent] = useState([]);

  // useEffect(() => {
  axios.post("http://localhost:3000/files/", { folder: "root" }).then((res) => {
    console.log(res.data);
    setRootContent(res.data);
  });
  //}, []);

  return (
    <div>
      <RootContentContext.Provider value={[rootContent, setRootContent]}>
        <Home />
      </RootContentContext.Provider>
    </div>
  );
}

export default App;
