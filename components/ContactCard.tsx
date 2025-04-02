"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { InputField } from "./ui/InputField";
import {
  Mail,
  Send,
  User,
  Github,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { personalDetails } from "@/constants";

export const ContactCard = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  const socialLinks = [
    { icon: Github, href: personalDetails.socials.github, label: "GitHub" },
    {
      icon: Facebook,
      href: personalDetails.socials.facebook,
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: personalDetails.socials.instagram,
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: personalDetails.socials.Linkedin,
      label: "LinkedIn",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <section
      className={`w-full py-20 ${
        theme === "dark" ? "bg-neutral-950" : "bg-[#FAF9F6]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16 px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-neutral-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let&apos;s Connect!
          </motion.h2>
          <motion.p
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Have a cool project in mind? I&apos;d love to hear about it! Let&apos;s make something awesome together 
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6">
          {/* Contact Form - Left Side */}
          <motion.div
            className={`rounded-2xl p-6 sm:p-8 shadow-xl ${
              theme === "dark"
                ? "bg-neutral-900 border-neutral-800"
                : "bg-[#FAF9F6] border-neutral-200"
            } border`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-100 text-neutral-900"
                }`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  rotate: { duration: 0.5 },
                }}
              >
                <Mail className="w-8 h-8" />
              </motion.div>
              <motion.h2
                className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-neutral-900"
                }`}
                variants={itemVariants}
              >
                Send a Message
              </motion.h2>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={itemVariants}
            >
              <InputField
                label="Full Name"
                placeholder="John Doe"
                icon={<User className="w-5 h-5" />}
                required
              />

              <InputField
                label="Email"
                type="email"
                placeholder="john@example.com"
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <div className="relative">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  Message
                </label>
                <motion.textarea
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 ${
                    theme === "dark"
                      ? "border-neutral-800 bg-neutral-800 text-white focus:border-white focus:ring-white"
                      : "border-neutral-200 bg-[#FAF9F6] text-neutral-900 focus:border-neutral-900 focus:ring-neutral-900"
                  } focus:outline-none focus:ring-2 min-h-[120px] resize-none`}
                  placeholder="Your message here..."
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <motion.button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || isSuccess}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotate: 360 
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`w-5 h-5 border-2 rounded-full ${
                        theme === "dark"
                          ? "border-neutral-900 border-t-transparent"
                          : "border-white border-t-transparent"
                      }`}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-neutral-900 text-white"
                            : "bg-white text-neutral-900"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Message Sent!
                      </motion.span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Info & Social Links - Right Side */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Let's Connect Section */}
            <motion.div
              className={`p-6 sm:p-8 rounded-xl ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-[#FAF9F6] border-neutral-200"
              } border`}
              variants={itemVariants}
            >
              <motion.h3
                className={`text-xl font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-neutral-900"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                Drop Me a Line
              </motion.h3>
              <div className="space-y-3">
                <motion.a
                  href={`mailto:${personalDetails.email}`}
                  className={`flex items-center gap-3 group ${
                    theme === "dark" ? "text-neutral-300" : "text-neutral-700"
                  } hover:text-neutral-900 dark:hover:text-white transition-colors`}
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{personalDetails.email}</span>
                </motion.a>
                <motion.div
                  className={`flex items-center gap-3 ${
                    theme === "dark" ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Jhapa, Nepal</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Follow Me Section */}
            <motion.div
              className={`p-6 sm:p-8 rounded-xl ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-[#FAF9F6] border-neutral-200"
              } border`}
              variants={itemVariants}
            >
              <motion.h3
                className={`text-xl font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-neutral-900"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                Let&apos;s Be Friends!
              </motion.h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-full ${
                      theme === "dark"
                        ? "bg-neutral-800 text-white hover:bg-neutral-700"
                        : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                    } transition-all duration-300`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 360,
                      boxShadow: theme === "dark" 
                        ? "0 0 20px rgba(255,255,255,0.1)" 
                        : "0 0 20px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      rotate: { duration: 0.5 },
                      delay: index * 0.1
                    }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
