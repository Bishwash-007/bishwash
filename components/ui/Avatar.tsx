"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AvatarProps {
  imageSrc: string;
}

const Avatar = ({ imageSrc }: AvatarProps) => {
  return (
    <motion.div
      className="flex-1 flex justify-center w-full md:w-auto relative z-10"
      initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1,
        delay: 0.5,
      }}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]">
        {/* Profile Image Container */}
        <motion.div
          className="absolute inset-2 rounded-full overflow-hidden bg-black"
          whileHover={{
            scale: 1.05,
            rotate: 0,
            transition: { type: "spring", stiffness: 400, damping: 10 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={imageSrc}
            alt="Profile Picture"
            fill
            style={{ objectFit: "cover" }}
            className="object-cover rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Avatar;