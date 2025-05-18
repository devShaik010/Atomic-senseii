"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { SignupData } from "./signup-form";

interface SuccessStepProps {
  data: SignupData;
  onRestart: () => void;
}

export function SuccessStep({ data, onRestart }: SuccessStepProps) {
  return (
    <div className="text-center py-6 space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex justify-center"
      >
        <CheckCircle2 className="h-24 w-24 text-blue-500" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome Aboard, {data.name}!
        </h1>
        <p className="text-slate-600">
          Your account has been successfully created. You're all set to begin your learning journey with Atomic Sensei!
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-4 pt-4"
      >
        <Link href="/login" className="block">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go to Login
          </Button>
        </Link>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={onRestart}
          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          Start Over
        </Button>
      </motion.div>
    </div>
  );
}