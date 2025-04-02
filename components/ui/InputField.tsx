"use client";

import { motion, HTMLMotionProps } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

interface InputFieldProps extends Omit<HTMLMotionProps<"input">, "ref"> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <div className="w-full">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label
            className={`block text-sm font-medium mb-1 ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-700"
            }`}
          >
            {label}
          </label>
          <div className="relative">
            {icon && (
              <div
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {icon}
              </div>
            )}
            <motion.input
              ref={ref}
              className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 ${
                icon ? "pl-10" : ""
              } ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : theme === "dark"
                  ? "border-neutral-700 bg-neutral-800 text-white focus:border-white focus:ring-white"
                  : "border-neutral-300 bg-[#FAF9F6] text-neutral-900 focus:border-neutral-900 focus:ring-neutral-900"
              } focus:outline-none focus:ring-2 ${className}`}
              whileFocus={{ scale: 1.01 }}
              {...props}
            />
          </div>
          {error && (
            <motion.p
              className="mt-1 text-sm text-red-500"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
