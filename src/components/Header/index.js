import cloudStorage from "../../assets/Images/cloudStorage.jpg";
import styles from "./style.module.css";

export default function Header() {
  return (
    <div className={styles.divHeader}>
      <h1>MyDrive</h1>
      <img className={styles.imgHeader} src={cloudStorage}></img>
    </div>
  );
}
