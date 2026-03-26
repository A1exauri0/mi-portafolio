"use client";

import { motion } from "framer-motion";

interface ProjectFeaturesProps {
  features: string[];
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 p-5 bg-[#111] border border-white/5 rounded-2xl hover:border-purple-500/20 transition-all group"
        >
          <div className="shrink-0 mt-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors">{feature}</span>
        </motion.div>
      ))}
    </div>
  );
}
