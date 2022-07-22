import FolderPopupContext from "../../contexts/FolderPopupContext";
import { useContext } from "react";
import "./style.css";

export default function Popup() {
  const [folderPopup, setFolderPopup] = useContext(FolderPopupContext);

  return (
    <div className={`overlay ${folderPopup ? "" : "close"}`}>
      <div className="popup">{folderPopup}</div>
    </div>
  );
}
