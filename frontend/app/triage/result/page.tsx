"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTriageStore } from "../../store/triageStore";
import PrimaryCTAButton from "../../components/PrimaryCTAButton";
import styles from "./page.module.css";

// Mock data resolution based on q2
const RESOLUTION_MAP: Record<string, any> = {
  "Head, face or throat": {
    category: "Respiratory & Cold",
    condition: "Respiratory issue",
    docName: "Dr. Vibeke Billing",
    avatar: "👩‍⚕️",
  },
  "Chest or breathing": {
    category: "Respiratory & Cold",
    condition: "Respiratory issue",
    docName: "Dr. Vibeke Billing",
    avatar: "👩‍⚕️",
  },
  "Stomach or digestion": {
    category: "Chronic & Internal",
    condition: "Gastrointestinal issue",
    docName: "Dr. Maria Ek",
    avatar: "👩‍⚕️",
  },
  "Skin or a visible change": {
    category: "Skin & Body",
    condition: "Dermatological issue",
    docName: "Dr. Erik Lindqvist",
    avatar: "👨‍⚕️",
  },
  "Mental health or mood": {
    category: "Mental & Lifestyle",
    condition: "Mental health concern",
    docName: "Dr. Lars Johansson",
    avatar: "👨‍⚕️",
  },
  "Muscles, joints or back": {
    category: "Chronic & Internal",
    condition: "Musculoskeletal issue",
    docName: "Dr. Maria Ek",
    avatar: "👩‍⚕️",
  },
  "Private parts or sexual health": {
    category: "Women's Health",
    condition: "Sexual health concern",
    docName: "Dr. Anna Svensson",
    avatar: "👩‍⚕️",
  },
  "I'm not sure / General": {
    category: "Mental & Lifestyle",
    condition: "General health concern",
    docName: "Dr. Lars Johansson",
    avatar: "👨‍⚕️",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const store = useTriageStore();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // If no answers, redirect back to start
    if (!store.q2 && !store.bodyZone) {
      router.push("/");
      return;
    }

    // Resolve mock data
    const match = RESOLUTION_MAP[store.q2 as string] || RESOLUTION_MAP["I'm not sure / General"];
    setResult(match);
  }, [store.q2, router]);

  if (!result) return <div>Loading...</div>;

  return (
    <div className={styles["result-container"]}>
      <div className={styles["left-panel"]}>
        <div className={styles["recommendation-card"]}>
          <div className={styles["card-content"]}>
            <h2 className={styles["result-h2"]}>Based on your answers...</h2>
            <h1 className={styles["result-h1"]}>
              You may need a doctor for: {result.condition}
            </h1>
            <div className={styles["confidence-chip"]}>
              High confidence &middot; Acute care
            </div>
            <p className={styles["result-body"]}>
              We have matched you with a specialist who is available right now.
              The consultation will take place directly in our secure chat.
            </p>
          </div>
        </div>

        <div className={styles["doctor-card"]}>
          <div className={styles["doctor-header"]}>
            <div className={styles["doctor-avatar"]}>{result.avatar}</div>
            <div className={styles["doctor-info"]}>
              <h3>{result.docName}</h3>
              <span className={styles["specialty-badge"]}>{result.category}</span>
            </div>
          </div>
          <div className={styles["doctor-stats"]}>
            <div>
              <span className={styles["rating"]}>★★★★★</span> 4.8/5
            </div>
            <div>Usually responds in ~2 hours</div>
          </div>
          <PrimaryCTAButton onClick={() => window.location.href = MINDOKTOR_GUIDE_URL}>
            Start consultation &rarr;
          </PrimaryCTAButton>
        </div>
      </div>

      <div className={styles["right-panel"]}>
        <div className={styles["sidebar-card"]}>
          <h3>Other options</h3>
          <ul className={styles["sidebar-list"]}>
            <li>
              <a href="#">Talk to a nurse instead</a>
            </li>
            <li>
              <a href="#">Find a nearby clinic</a>
            </li>
            <li>
              <a href="#">See FAQ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
