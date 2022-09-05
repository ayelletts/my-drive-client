import FolderPopupContext from "../../contexts/FolderPopupContext";
import { useContext, useRef } from "react";
import axios from "axios";
import RootContentContext from "../../contexts/RootContentContext";
import CurrentFolderContext from "../../contexts/CurrentFolderContext";

export default function NewFolder() {
  const [folderPopup, setFolderPopup] = useContext(FolderPopupContext);
  const inputRef = useRef();
  const [rootContent, setRootContent] = useContext(RootContentContext);
  const [currentFolder, setCurrentFolder] = useContext(CurrentFolderContext);

  const onClick = (e) => {
    // console.log("new folder name", e.target.value);
    if (inputRef.current.value === "") {
      alert("Please insert folder name");
    }
    axios
      .post("http://localhost:3000/files/newFolder/", {
        folderName: `./${currentFolder}/${inputRef.current.value}`,
      })
      .then((res) => {
        setRootContent(res.data);
        setFolderPopup("");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <div>
      <input placeholder="Insert folder name" ref={inputRef} />
      <button onClick={onClick}>Create Folder</button>
    </div>
  );
}
