import styles from "./style.module.css";
import CurrentFolderContext from "../../contexts/CurrentFolderContext";
import RootContentContext from "../../contexts/RootContentContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function File(props) {
  const FileSaver = require("file-saver");
  const file = props;
  const [currentFolder, setCurrentFolder] = useContext(CurrentFolderContext);
  const [rootContent, setRootContent] = useContext(RootContentContext);
  const [fileInfo, setFileInfo] = useState(false);

  const renameFile = (e) => {
    e.preventDefault();
    let newName = prompt("Enter new file name ");
    let ext = file.name.slice(file.name.lastIndexOf(".") + 1);
    newName = `${newName}.${ext}`;
    axios
      .post(`http://localhost:3000/files/rename`, {
        oldName: `${file.parent}/${file.name}`,
        newName: `${file.parent}/${newName}`,
      })
      // .then((res) => {
      //   axios
      //     .post(`http://localhost:3000/files/`, {
      //       folder: file.parent.replace("./", ""),
      //     })
      .then((res) => {
        setRootContent(res.data);
        // });
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const deleteFile = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/files/delete`, {
        filename: `${file.parent}/${file.name}`.replace("./", ""),
      })
      .then((res) => {
        setRootContent(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const downloadFile = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/files/download`, {
        responseType: "blob",
        filename: `${file.parent}/${file.name}`.replace("./", ""),
      })
      .then((res) => {
        var blob = new Blob([res.data]);
        FileSaver.saveAs(blob, "hello world.png");
        // const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        // const fileLink = document.createElement("a");
        // fileLink.href = fileURL;
        // // const fileName = res.headers["content-disposition"].substring(22, 52);
        // fileLink.setAttribute("download", `${file.name}`);
        // fileLink.setAttribute("target", "_blank");
        // document.body.appendChild(fileLink);
        // fileLink.click();
        // fileLink.remove();
        // // res.data.blob().then((blob) => {
        // //   let url = window.URL.createObjectURL(blob);
        // //   let a = document.createElement("a");
        // //   a.href = url;
        // //   a.download = `download.${res.headers["content-type"].split("/")[1]}`;
        // //   a.click();
        // //   window.URL.revokeObjectURL(url);
        // // });
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const showFileInfo = (e) => {
    e.preventDefault();
    setFileInfo(true);
  };

  const closeFileInfo = (e) => {
    e.preventDefault();
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
          <a href="#" onClick={downloadFile}>
            Download File
          </a>
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
