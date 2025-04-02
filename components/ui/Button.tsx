"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  Icon?: React.ElementType;
  title: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-white text-black hover:bg-gray-200",
};

const CustomButton = ({
  Icon,
  title,
  href = "#",
  size = "md",
  variant = "primary",
  className = "",
}: ButtonProps) => {
  return (
    <motion.a
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 group ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {title}
      {Icon && <Icon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
    </motion.a>
  );
};

export default CustomButton;