import styles from "./style.module.css";
import FolderPopupContext from "../../contexts/FolderPopupContext";
import { useContext, useEffect, useRef, useState } from "react";
import NewFolder from "../NewFolder";
import axios from "axios";
import RootContentContext from "../../contexts/RootContentContext";
import CurrentFolderContext from "../../contexts/CurrentFolderContext";

export default function Button(props) {
  const folderPopup = useContext(FolderPopupContext);
  const inputFile = useRef("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [rootContent, setRootContent] = useContext(RootContentContext);
  const [currentFolder, setCurrentFolder] = useContext(CurrentFolderContext);

  useEffect(() => {
    if (selectedFile) {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append("file", selectedFile);
      formData.append("folder", currentFolder);

      // Send formData object
      axios
        .post("http://localhost:3000/files/upload", formData)
        .then((res) => {
          axios
            .post(`http://localhost:3000/files/`, {
              folder: currentFolder.replace("./", ""),
            })
            .then((res) => {
              setRootContent(res.data);
            });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, [selectedFile]);

  const onClick = (e) => {
    if (props.btnName === "New Folder") {
      folderPopup[1](<NewFolder />);
    } else if (props.btnName === "File Upload") {
      inputFile.current.click();
    }
  };

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={styles.divButton} onClick={onClick}>
      <img className={styles.imgButton} src={props.btnImgUrl} />
      <span className={styles.nameButton}>{props.btnName}</span>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </div>
  );
}
