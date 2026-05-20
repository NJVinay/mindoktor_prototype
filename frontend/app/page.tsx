import CategoryGrid from "./components/CategoryGrid";
import BodyModelViewer from "./components/BodyModelViewer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles["hero-section"]}>
        <div className={styles["hero-left"]}>
          <h1 className={styles["hero-title"]}>Find the right door.</h1>
          
          <div className={styles["trust-signal"]}>
            <span className={styles["check-icon"]}>✓</span>
            Easy contact with doctors... 24/7
          </div>

          <CategoryGrid />
        </div>
        
        <div className={styles["hero-right"]}>
          <BodyModelViewer />
        </div>
      </section>
    </main>
  );
}
