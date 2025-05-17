"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NameStep } from "./name-step";
import { EmailStep } from "./email-step";
import { PasswordStep } from "./password-step";
import { AgeStep } from "./age-step";
import { EducationStep } from "./education-step";
import { KnowledgeStep } from "./knowledge-step";
import { SuccessStep } from "./success-step";

export type SignupData = {
  name: string;
  email: string;
  password: string;
  age: number;
  educationLevel: string;
  currentKnowledge: string;
};

type StepType = "name" | "email" | "password" | "age" | "education" | "knowledge" | "success";

export function SignupForm() {
  const [step, setStep] = useState<StepType>("name");
  const [signupData, setSignupData] = useState<Partial<SignupData>>({});
  
  const updateData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const nextStep = (currentStep: StepType) => {
    const steps: StepType[] = ["name", "email", "password", "age", "education", "knowledge", "success"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const previousStep = (currentStep: StepType) => {
    const steps: StepType[] = ["name", "email", "password", "age", "education", "knowledge", "success"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-indigo-600"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: 
            step === "name" ? 0.14 :
            step === "email" ? 0.28 :
            step === "password" ? 0.42 :
            step === "age" ? 0.56 :
            step === "education" ? 0.7 :
            step === "knowledge" ? 0.85 : 1
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      <div className="p-6">
        <AnimatedStep isActive={step === "name"}>
          <NameStep
            initialName={signupData.name || ""}
            onSubmit={(name) => {
              updateData({ name });
              nextStep("name");
            }}
          />
        </AnimatedStep>

        <AnimatedStep isActive={step === "email"}>
          <EmailStep
            name={signupData.name || ""}
            initialEmail={signupData.email || ""}
            onSubmit={(email) => {
              updateData({ email });
              nextStep("email");
            }}
            onBack={() => previousStep("email")}
          />
        </AnimatedStep>

        <AnimatedStep isActive={step === "password"}>
          <PasswordStep
            name={signupData.name || ""}
            onSubmit={(password) => {
              updateData({ password });
              nextStep("password");
            }}
            onBack={() => previousStep("password")}
          />
        </AnimatedStep>

        <AnimatedStep isActive={step === "age"}>
          <AgeStep
            name={signupData.name || ""}
            initialAge={signupData.age}
            onSubmit={(age) => {
              updateData({ age });
              nextStep("age");
            }}
            onBack={() => previousStep("age")}
          />
        </AnimatedStep>

        <AnimatedStep isActive={step === "education"}>
          <EducationStep
            name={signupData.name || ""}
            initialEducation={signupData.educationLevel || ""}
            onSubmit={(educationLevel) => {
              updateData({ educationLevel });
              nextStep("education");
            }}
            onBack={() => previousStep("education")}
          />
        </AnimatedStep>

        <AnimatedStep isActive={step === "knowledge"}>
          <KnowledgeStep
            name={signupData.name || ""}
            initialKnowledge={signupData.currentKnowledge || ""}
            onSubmit={(currentKnowledge) => {
              updateData({ currentKnowledge });
              nextStep("knowledge");
            }}
            onBack={() => previousStep("knowledge")}
          />
        </AnimatedStep>

        <AnimatedStep isActive={step === "success"}>
          <SuccessStep 
            data={signupData as SignupData} 
            onRestart={() => {
              setSignupData({});
              setStep("name");
            }}
          />
        </AnimatedStep>
      </div>
    </div>
  );
}

function AnimatedStep({ 
  children, 
  isActive 
}: { 
  children: React.ReactNode; 
  isActive: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : 50,
        position: isActive ? "relative" : "absolute",
        zIndex: isActive ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ display: isActive ? "block" : "none" }}
    >
      {children}
    </motion.div>
  );
}