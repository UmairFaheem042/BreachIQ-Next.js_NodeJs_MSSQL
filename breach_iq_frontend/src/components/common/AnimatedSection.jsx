"use client";

import { motion } from "framer-motion";

const AnimatedSection = ({ children }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" flex flex-col  flex-1 max-w-[1600px] mx-auto w-full"
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
