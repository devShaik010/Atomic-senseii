"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarDays, ArrowLeft } from "lucide-react";

const ageSchema = z.object({
  age: z.coerce
    .number()
    .min(5, { message: "Age must be at least 5" })
    .max(120, { message: "Age must be less than 120" }),
});

type AgeFormValues = z.infer<typeof ageSchema>;

interface AgeStepProps {
  name: string;
  initialAge?: number;
  onSubmit: (age: number) => void;
  onBack: () => void;
}

export function AgeStep({ name, initialAge, onSubmit, onBack }: AgeStepProps) {
  const form = useForm<AgeFormValues>({
    resolver: zodResolver(ageSchema),
    defaultValues: {
      age: initialAge || undefined,
    },
  });

  const handleSubmit = (values: AgeFormValues) => {
    onSubmit(values.age);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            A bit about you, {name}
          </h1>
          <p className="text-slate-600">
            How old are you? This helps us tailor your learning experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                    <Input
                      type="number"
                      placeholder="Your age"
                      className="pl-10 h-12 border-blue-200 focus:border-blue-500 bg-blue-50/50 text-lg rounded-lg"
                      autoFocus
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  );
}