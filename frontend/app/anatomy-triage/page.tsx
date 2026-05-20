"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryCTAButton from "../components/PrimaryCTAButton";
import { questionBank } from "../lib/questionBank";
import styles from "./page.module.css";

const API_BASE = "http://localhost:4000/api/v1";

const LAYER_LABELS: Record<string, string> = {
  skin: "Skin (rashes, itching)",
  muscle: "Muscles & Tendons",
  bone: "Bones & Joints",
  nerve: "Nerves (numbness, tingling)",
  organ: "Organs & Internal",
};

function AnatomyTriageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const zone = searchParams.get("zone");

  const [step, setStep] = useState<"layer" | "condition" | "questions" | "result">("layer");
  
  const [availableLayers, setAvailableLayers] = useState<{ layer: string; count: number }[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  
  const [conditions, setConditions] = useState<any[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<any | null>(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (zone && step === "layer") {
      fetch(`${API_BASE}/conditions/layers?zone=${zone}`)
        .then((res) => res.json())
        .then((data) => {
          setAvailableLayers(data.data || []);
        })
        .catch(console.error);
    }
  }, [zone, step]);

  useEffect(() => {
    if (zone && selectedLayer && step === "condition") {
      fetch(`${API_BASE}/conditions?zone=${zone}&layer=${selectedLayer}`)
        .then((res) => res.json())
        .then((data) => {
          setConditions(data.data || []);
        })
        .catch(console.error);
    }
  }, [zone, selectedLayer, step]);

  if (!zone) {
    return <div className={styles.container}>Loading...</div>;
  }

  const handleLayerSelect = (layer: string) => {
    setSelectedLayer(layer);
    setStep("condition");
  };

  const handleConditionSelect = (condition: any) => {
    setSelectedCondition(condition);
    setAnswers({});
    setQuestionIndex(0);
    if (condition.questions && condition.questions.length > 0) {
      setStep("questions");
    } else {
      setStep("result");
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (selectedCondition && questionIndex < selectedCondition.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setStep("result");
    }
  };

  const renderLayerStep = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <h2 className={styles["step-header"]}>Which layer is affected in your {zone}?</h2>
      <p className={styles["sub-text"]}>Select the type of tissue to help us narrow down the issue.</p>
      <div className={styles["options-grid"]}>
        {availableLayers.map((l) => (
          <button key={l.layer} className={styles["option-btn"]} onClick={() => handleLayerSelect(l.layer)}>
            <span>{LAYER_LABELS[l.layer] || l.layer}</span>
            <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{l.count} options</span>
          </button>
        ))}
      </div>
      <div className={styles["nav-controls"]}>
        <button className={styles["back-btn"]} onClick={() => router.back()}>← Back to Body Map</button>
      </div>
    </motion.div>
  );

  const renderConditionStep = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <h2 className={styles["step-header"]}>Matching conditions</h2>
      <p className={styles["sub-text"]}>Please select the condition that best matches your symptoms.</p>
      <div className={styles["options-grid"]}>
        {conditions.map((c) => (
          <button key={c.slug} className={styles["option-btn"]} onClick={() => handleConditionSelect(c)}>
            <span>{c.name_en}</span>
            <span>→</span>
          </button>
        ))}
      </div>
      <div className={styles["nav-controls"]}>
        <button className={styles["back-btn"]} onClick={() => setStep("layer")}>← Back to Layers</button>
      </div>
    </motion.div>
  );

  const renderQuestionsStep = () => {
    if (!selectedCondition || !selectedCondition.questions || selectedCondition.questions.length === 0) return null;
    const currentQId = selectedCondition.questions[questionIndex];
    const qData = questionBank[currentQId];

    if (!qData) {
      // Skip unknown questions
      setTimeout(() => handleNextQuestion(), 0);
      return null;
    }

    const currentAnswer = answers[currentQId];

    return (
      <motion.div key={currentQId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
        <h2 className={styles["step-header"]}>{qData.text}</h2>
        <div className={styles["options-grid"]}>
          {qData.answers.map((opt) => (
            <button
              key={opt}
              className={styles["option-btn"]}
              style={{
                borderColor: currentAnswer === opt ? "var(--color-primary)" : "var(--color-border-card)",
                background: currentAnswer === opt ? "var(--color-bg-blush)" : "var(--color-bg-white)",
              }}
              onClick={() => handleAnswerSelect(currentQId, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className={styles["nav-controls"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => {
              if (questionIndex > 0) setQuestionIndex((prev) => prev - 1);
              else setStep("condition");
            }}
          >
            ← Back
          </button>
          <PrimaryCTAButton onClick={handleNextQuestion} disabled={!currentAnswer}>
            {questionIndex === selectedCondition.questions.length - 1 ? "Finish →" : "Next →"}
          </PrimaryCTAButton>
        </div>
      </motion.div>
    );
  };

  const renderResultStep = () => {
    const specialist = selectedCondition?.specialist_type || "General Practitioner";
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className={styles["step-header"]}>Our Assessment</h2>
        <div className={styles["result-card"]}>
          <div className={styles["result-title"]}>Recommended Specialist</div>
          <div className={styles["result-specialist"]}>{specialist}</div>
          <p className={styles["sub-text"]} style={{ marginBottom: 0 }}>
            Based on your answers regarding <strong>{selectedCondition?.name_en}</strong>, we are matching you directly with a {specialist}.
          </p>
        </div>
        <div className={styles["nav-controls"]} style={{ justifyContent: "center", gap: "16px", marginTop: "40px" }}>
          <button className={styles["back-btn"]} onClick={() => setStep("condition")}>Change Condition</button>
          <PrimaryCTAButton onClick={() => alert("Redirecting to booking...")}>
            Book Appointment →
          </PrimaryCTAButton>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {step === "layer" && renderLayerStep()}
        {step === "condition" && renderConditionStep()}
        {step === "questions" && renderQuestionsStep()}
        {step === "result" && renderResultStep()}
      </AnimatePresence>
    </div>
  );
}

export default function AnatomyTriagePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnatomyTriageContent />
    </Suspense>
  );
}
