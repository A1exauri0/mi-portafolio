"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import techMap from "../../data/tech-tags.json";

interface TechTagProps {
  name: string;
  size?: "sm" | "lg";
}

export default function TechTag({ name, size = "sm" }: TechTagProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = (techMap as any)[name] || {
    icon: "mdi:code-tags",
    bg: "bg-white/5",
    text: "text-gray-300",
    border: "border-white/5",
    hoverBg: "group-hover:bg-white/10"
  };

  const sizeClasses = size === "lg" ? "text-sm px-4 py-1.5" : "text-xs px-2.5 py-1";
  const iconSize = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  const imgSize = size === "lg" ? 20 : 14;

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-lg transition-colors duration-300 ${sizeClasses} ${config.bg} ${config.text} ${config.border} ${config.hoverBg} group-hover:text-white`}>
      {config.image ? (
        <Image src={config.image} alt={name} width={imgSize} height={imgSize} className="object-contain" />
      ) : (
        <Icon icon={config.icon} className={iconSize} />
      )}
      {name}
    </span>
  );
}
