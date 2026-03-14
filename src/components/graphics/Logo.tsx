import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "icon";
}

export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Image
        src="/aiCartograph_icon_final.svg"
        alt="aiCartograph"
        width={32}
        height={32}
        className={className}
      />
    );
  }

  return (
    <Image
      src={
        variant === "dark"
          ? "/aiCartograph_logo_final_dark.svg"
          : "/aiCartograph_logo_final_light.svg"
      }
      alt="aiCartograph"
      width={180}
      height={32}
      className={`h-8 w-auto ${className}`}
      priority
    />
  );
}
