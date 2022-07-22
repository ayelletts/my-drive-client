import Folder from "../Folder";
import styles from "./style.module.css";

export default function Folders(props) {
  const { folders } = props;
  return (
    <>
      <ul>
        <li>
          {folders.map((folder) => {
            return <Folder key={folder.name} {...folder} />;
          })}
        </li>
      </ul>
    </>
  );
}
