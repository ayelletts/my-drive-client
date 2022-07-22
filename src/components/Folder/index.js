import styles from "./style.module.css";
import CurrentFolderContext from "../../contexts/CurrentFolderContext";
import RootContentContext from "../../contexts/RootContentContext";
import { useContext } from "react";
import axios from "axios";

export default function Folder(props) {
  const folder = props;
  const [currentFolder, setCurrentFolder] = useContext(CurrentFolderContext);
  const [rootContent, setRootContent] = useContext(RootContentContext);

  const onDblClick = (e) => {
    setCurrentFolder(`${folder.parent}/${folder.name}`);
    axios
      .post(`http://localhost:3000/files/`, {
        folder: currentFolder.replace("./", ""),
      })
      .then((res) => {
        console.log(res.data);
        setRootContent(res.data);
      });
  };

  const renameFolder = (e) => {
    let newName = prompt("Enter new folder name ");
    axios
      .post(`http://localhost:3000/files/rename`, {
        oldName: `${folder.parent}/${folder.name}`,
        newName: `${folder.parent}/${newName}`,
      })
      .then((res) => {
        axios
          .post(`http://localhost:3000/files/`, {
            folder: folder.parent.replace("./", ""),
          })
          .then((res) => {
            setRootContent(res.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const deleteFolder = (e) => {
    axios
      .post(`http://localhost:3000/files/deleteFolder`, {
        folderName: `${folder.parent}/${folder.name}`.replace("./", ""),
      })
      .then((res) => {
        axios
          .post(`http://localhost:3000/files/`, {
            folder: folder.parent.replace("./", ""),
          })
          .then((res) => {
            setRootContent(res.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className={styles.folderDiv} onDoubleClick={onDblClick}>
      <img className={styles.folderImg}></img>
      <span className={styles.folderName}>{folder.name}</span>
      <div className={styles.menu}>
        <a href="#">☰</a>
        <div className={styles.menuContent}>
          <a href="#" onClick={renameFolder}>
            Rename Folder
          </a>
          <a href="#" onClick={deleteFolder}>
            Delete Folder
          </a>
        </div>
      </div>
    </div>
  );
}
