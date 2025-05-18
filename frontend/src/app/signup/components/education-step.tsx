"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft } from "lucide-react";

interface EducationStepProps {
  name: string;
  initialEducation: string;
  onSubmit: (educationLevel: string) => void;
  onBack: () => void;
}

export function EducationStep({ name, initialEducation, onSubmit, onBack }: EducationStepProps) {
  const [educationLevel, setEducationLevel] = useState(initialEducation || "");
  const [error, setError] = useState("");

  const educationLevels = [
    "Primary School", 
    "Secondary School", 
    "High School", 
    "Bachelor's Degree", 
    "Master's Degree", 
    "PhD", 
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!educationLevel) {
      setError("Please select your education level");
      return;
    }
    
    onSubmit(educationLevel);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Almost there, {name}!
        </h1>
        <p className="text-slate-600">
          What's your current education level?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center mb-4">
          <GraduationCap className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-slate-800">Education Level</h3>
        </div>
        
        <div>
          <select
            value={educationLevel}
            onChange={(e) => {
              setEducationLevel(e.target.value);
              setError("");
            }}
            className="w-full h-12 rounded-lg pl-3 pr-3 bg-blue-50/50 border border-blue-200 focus:border-blue-500 focus:ring-blue-500 outline-none"
          >
            <option value="" disabled>Select your education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-between"
      >
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Continue
        </Button>
      </motion.div>
    </form>
  );
}