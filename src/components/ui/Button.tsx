import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger" | "secondary";
}

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const base =
    "px-4 py-2 rounded-xl font-semibold transition-colors duration-200";

  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-indigo-500",
    danger: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-slate-700 text-white hover:bg-slate-600",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};
