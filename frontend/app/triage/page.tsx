"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTriageStore } from "../store/triageStore";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    id: "q1",
    question: "How long have you been feeling this way?",
    options: [
      "Just started (today)",
      "A few days (2-7 days)",
      "More than a week",
      "Ongoing / recurring",
    ],
  },
  {
    id: "q2",
    question: "Where do you feel it most?",
    options: [
      "Head, face or throat",
      "Chest or breathing",
      "Stomach or digestion",
      "Skin or a visible change",
      "Mental health or mood",
      "Muscles, joints or back",
      "Private parts or sexual health",
      "I'm not sure / General",
    ],
  },
  {
    id: "q3",
    question: "How much is it affecting your daily life?",
    options: [
      "Mild — noticeable but manageable",
      "Moderate — affecting my routine",
      "Severe — hard to function",
      "Emergency — I need urgent help",
    ],
  },
  {
    id: "q4",
    question: "Have you had this before?",
    options: [
      "First time",
      "Recurring issue",
      "I have a diagnosed condition",
      "I take regular medication for this",
    ],
  },
];

export default function TriagePage() {
  const router = useRouter();
  const store = useTriageStore();
  const [step, setStep] = useState(0);

  const currentQ = QUESTIONS[step];
  // @ts-ignore - dynamic key access
  const currentAnswer = store[currentQ.id];

  const handleSelect = (answer: string) => {
    store.setAnswer(currentQ.id as any, answer);
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/triage/result");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const isEmergency = currentQ.id === "q3" && currentAnswer?.includes("Emergency");

  return (
    <div className={styles["triage-container"]}>
      {/* Stepper */}
      <div className={styles["stepper-container"]}>
        <span className={styles["stepper-label"]}>Step {step + 1} of 4</span>
        <div className={styles["stepper-track"]}>
          <div
            className={styles["stepper-fill"]}
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={styles["question-screen"]}
        >
          <h2 className={styles["question-title"]}>{currentQ.question}</h2>

          <div className={styles["options-container"]}>
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt;
              // Pre-select if we arrived from 3D model with bodyZone
              let isPreSelected = false;
              if (currentQ.id === "q2" && !currentAnswer && store.bodyZone) {
                if (opt === store.bodyZone) {
                  // Wait for next tick to set state to avoid render warning
                  setTimeout(() => handleSelect(opt), 0);
                  isPreSelected = true;
                }
              }

              return (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  key={opt}
                  className={`${styles["option-btn"]} ${
                    isSelected || isPreSelected ? styles["selected"] : ""
                  }`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>

          {isEmergency && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles["emergency-card"]}
            >
              <div className={styles["emergency-title"]}>Emergency Warning</div>
              <div>Please call 112 or visit an emergency room now.</div>
            </motion.div>
          )}

          <div className={styles["nav-controls"]}>
            <button className={styles["back-btn"]} onClick={handleBack}>
              Back
            </button>
            <PrimaryCTAButton
              onClick={handleNext}
              disabled={!currentAnswer || isEmergency}
            >
              {step === QUESTIONS.length - 1 ? "Get Result \u2192" : "Next \u2192"}
            </PrimaryCTAButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
