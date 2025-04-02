"use client";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from '@/context/ThemeContext';

interface Project {
  title: string;
  description: string;
  link: string;
  github: string;
  image: string;
}

const ProjectCard = ({ projectData }: { projectData: Project }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`max-w-sm rounded-lg overflow-hidden shadow-lg ${
        theme === 'dark' ? 'bg-neutral-950' : 'bg-white'
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Project Image */}
      <motion.div className="overflow-hidden">
        <motion.img
          src={projectData.image}
          alt={projectData.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Project Content */}
      <div className="p-6">
        <motion.h3
          className={`text-2xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
          whileHover={{ color: "#3498db" }}
          transition={{ duration: 0.2 }}
        >
          {projectData.title}
        </motion.h3>
        <p className={`mb-4 ${
          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          {projectData.description}
        </p>

        {/* Project Links */}
        <div className="flex justify-between">
          <motion.a
            href={projectData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            GitHub
          </motion.a>
          {projectData.link && (
            <motion.a
              href={projectData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;