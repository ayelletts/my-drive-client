import { useEffect, useState } from "react";
import "./App.css";
import RootContentContext from "./contexts/RootContentContext";
import Home from "./pages/Home";
import axios from "axios";
import CurrentFolderContext from "./contexts/CurrentFolderContext";
// import ClientChangedContentContext from "./contexts/ClientChangedContentContext";

export const baseUrl = process.env.BASE_URL;

function App() {
  const [rootContent, setRootContent] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("./root");
  // const clientChangedRootContent = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3000/files/", { folder: "root" })
      .then((res) => {
        console.log(res.data);
        setRootContent(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }, []);

  return (
    <div>
      <RootContentContext.Provider value={[rootContent, setRootContent]}>
        {/* <ClientChangedContentContext.Provider value={clientChangedRootContent}> */}
        <CurrentFolderContext.Provider
          value={[currentFolder, setCurrentFolder]}
        >
          <Home />
          {/* </ClientChangedContentContext.Provider> */}
        </CurrentFolderContext.Provider>
      </RootContentContext.Provider>
    </div>
  );
}

export default App;
