"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailStep } from "./email-step";
import { PasswordStep } from "./password-step";
import { toast } from "sonner";

export type LoginData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [loginData, setLoginData] = useState<Partial<LoginData>>({});

  const handleEmailSubmit = (email: string) => {
    setLoginData({ ...loginData, email });
    setStep("password");
  };

  const handlePasswordSubmit = async (password: string) => {
    const finalData = { ...loginData, password } as LoginData;
    
    // Simulate API call
    try {
      // Replace with actual API call
      console.log("Logging in with", finalData);
      
      // Simulate successful login
      toast.success("Successfully logged in!");
      
      // Redirect or update authentication state here
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Tabs value={step} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger 
          value="email" 
          disabled={step === "password"}
          className="data-[state=active]:font-semibold"
        >
          Email
        </TabsTrigger>
        <TabsTrigger 
          value="password" 
          disabled={step === "email" || !loginData.email}
          className="data-[state=active]:font-semibold"
        >
          Password
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="email" className="mt-0">
        <EmailStep 
          initialEmail={loginData.email || ""} 
          onSubmit={handleEmailSubmit} 
        />
      </TabsContent>
      
      <TabsContent value="password" className="mt-0">
        <PasswordStep 
          email={loginData.email || ""}
          onSubmit={handlePasswordSubmit}
          onBack={() => setStep("email")}
        />
      </TabsContent>
    </Tabs>
  );
}