"use client";

import { Card } from "@/components/ui/card";
import { LoginForm } from "./components/login-form";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <LoginForm />
          </Card>

          <div className="text-center mt-6 text-slate-600">
            <p>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}