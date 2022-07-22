import styles from "./style.module.css";
import CurrentFolderContext from "../../contexts/CurrentFolderContext";
import RootContentContext from "../../contexts/RootContentContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function File(props) {
  const file = props;
  const [currentFolder, setCurrentFolder] = useContext(CurrentFolderContext);
  const [rootContent, setRootContent] = useContext(RootContentContext);
  const [fileInfo, setFileInfo] = useState(false);

  const renameFile = (e) => {
    let newName = prompt("Enter new file name ");
    let ext = file.name.slice(file.name.lastIndexOf(".") + 1);
    newName = `${newName}.${ext}`;
    axios
      .post(`http://localhost:3000/files/rename`, {
        oldName: `${file.parent}/${file.name}`,
        newName: `${file.parent}/${newName}`,
      })
      .then((res) => {
        axios
          .post(`http://localhost:3000/files/`, {
            folder: file.parent.replace("./", ""),
          })
          .then((res) => {
            setRootContent(res.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const deleteFile = (e) => {
    axios
      .post(`http://localhost:3000/files/delete`, {
        filename: `${file.parent}/${file.name}`.replace("./", ""),
      })
      .then((res) => {
        axios
          .post(`http://localhost:3000/files/`, {
            folder: file.parent.replace("./", ""),
          })
          .then((res) => {
            setRootContent(res.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const downloadFile = (e) => {
    axios
      .post(`http://localhost:3000/files/download`, {
        filename: `${file.name}`,
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const showFileInfo = (e) => {
    setFileInfo(true);
  };

  const closeFileInfo = (e) => {
    setFileInfo(false);
  };
  return (
    <div className={styles.fileDiv}>
      <img className={styles.fileImg}></img>
      <span className={styles.fileName}>{file.name}</span>
      <div className={styles.menu}>
        <a href="#">☰</a>
        <div className={styles.menuContent}>
          <a href="#" onClick={renameFile}>
            Rename File
          </a>
          <a href="#" onClick={deleteFile}>
            Delete File
          </a>
          {/* <a href="#" onClick={downloadFile}>
            Download File
          </a> */}
          <a href="#" onClick={showFileInfo}>
            File Info
          </a>
        </div>
        {fileInfo && (
          <div className={styles.fileInfo}>
            <span className={styles.closeFileInfo} onClick={closeFileInfo}>
              ✘
            </span>
            <h3>File Details: </h3>
            <p>File Name: {props.name}</p>
            <p>File Type: {props.type}</p>
          </div>
        )}
      </div>
    </div>
  );
}