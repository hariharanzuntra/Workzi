import React from "react";
import { cn } from "@/shared/utils";

export interface UserAvatarProps {
  name?: string;
  initials?: string;
  photoUrl?: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "24px" | "28px" | "32px" | "40px";
  className?: string;
}

export function UserAvatar({
  name,
  initials,
  photoUrl,
  color = "#5C5CFF",
  size = "md",
  className,
}: UserAvatarProps) {
  const displayInitials = initials || (name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "");
  
  const sizeMap = {
    xs: { dim: "24px", fontSize: "10px" },
    sm: { dim: "28px", fontSize: "11px" },
    md: { dim: "32px", fontSize: "12px" },
    lg: { dim: "40px", fontSize: "14px" },
    xl: { dim: "56px", fontSize: "16px" },
    "24px": { dim: "24px", fontSize: "10px" },
    "28px": { dim: "28px", fontSize: "11px" },
    "32px": { dim: "32px", fontSize: "12px" },
    "40px": { dim: "40px", fontSize: "14px" },
  };

  const { dim, fontSize } = sizeMap[size] || sizeMap["md"];

  const style: React.CSSProperties = {
    width: dim,
    height: dim,
    minWidth: dim,
    minHeight: dim,
    flex: "0 0 auto",
    flexShrink: 0,
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: photoUrl ? "transparent" : color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize,
    fontWeight: 600,
    color: "#FFFFFF",
    userSelect: "none",
  };

  if (photoUrl) {
    return (
      <div style={style} className={cn("select-none flex-shrink-0", className)}>
        <img
          src={photoUrl}
          alt={name || initials || "User Avatar"}
          className="w-full h-full object-cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div style={style} className={cn("select-none flex-shrink-0", className)}>
      {displayInitials}
    </div>
  );
}

export function Avt({ initials, color, size="md" }: { initials:string; color:string; size?:"sm"|"md"|"lg"|"xl" }) {
  const sizeMap = {
    sm: "28px" as const,
    md: "32px" as const,
    lg: "40px" as const,
    xl: "56px" as const,
  };
  const mappedSize = sizeMap[size as keyof typeof sizeMap] || "32px";
  return <UserAvatar initials={initials} color={color} size={mappedSize} />;
}

