import Button from "../Button";
import Files from "../Files";
import Folders from "../Folders";
import styles from "./style.module.css";
import RootContentContext from "../../contexts/RootContentContext";
import FolderPopupContext from "../../contexts/FolderPopupContext";
import CurrentFolderContext from "../../contexts/CurrentFolderContext";
import { useContext, useEffect, useRef, useState } from "react";
import Popup from "../Popup";
import App from "../../App";

const newFolderImage = require("../../assets/Images/newFolder.png");
const fileUploadImage = require("../../assets/Images/uploadFile.png");

export default function Layout() {
  const [rootContent, setRootContent] = useContext(RootContentContext);
  const [currentFolder, setCurrentFolder] = useState("./root");
  const [hasFolder, setHasFolder] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const folderPopup = useState("");
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    if (rootContent && rootContent.length > 0) {
      setFolders(
        rootContent.filter(
          (item) => item.parent === currentFolder && item.type === "Folder"
        )
      );
      folders && folders.length > 0 ? setHasFolder(true) : setHasFolder(false);
      setFiles(
        rootContent.filter(
          (item) => item.parent === currentFolder && item.type === "File"
        )
      );
      files && files.length > 0 ? setHasFile(true) : setHasFile(false);
    } else {
      setMsg("Folder is empty");
    }
  }, [currentFolder, rootContent]);

  return (
    <FolderPopupContext.Provider value={folderPopup}>
      <CurrentFolderContext.Provider value={[currentFolder, setCurrentFolder]}>
        <div className={styles.container}>
          <div className={styles.buttons}>
            <Button btnImgUrl={newFolderImage} btnName="New Folder" />
            <Button btnImgUrl={fileUploadImage} btnName="File Upload" />
          </div>
          <div>
            <a href={<App />}>My Storage ⮞ </a>
            {currentFolder}
          </div>
          {hasFolder || hasFile ? (
            <div>
              <div>
                Folders:
                <Folders folders={folders} />
              </div>
              <div>
                Files:
                <Files files={files} />
              </div>
            </div>
          ) : (
            <div>{msg}</div>
          )}
        </div>
        <Popup />
      </CurrentFolderContext.Provider>
    </FolderPopupContext.Provider>
  );
}
