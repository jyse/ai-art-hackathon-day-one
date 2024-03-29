import styles from "./page.module.css";
import Header from "./components/Header";
import ArtGenerator from "./components/ArtGenerator";

export default function Home() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <ArtGenerator />
      </div>
    </div>
  );
}
