import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  label?: string;
  message?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function WhatsAppButton({
  label = "Plan My Trip on WhatsApp",
  message,
  variant = "primary",
  className = "",
}: WhatsAppButtonProps) {
  const defaultMessage =
    "Hello YTDA Tours! I would like to plan a trip to Swat Valley. Please share available packages and details.";

  const href = buildWhatsAppUrl(message ?? defaultMessage);

  const styles =
    variant === "primary"
      ? "bg-[#D6AE55] text-[#123D2B] hover:bg-[#d7ba76]"
      : "border border-[#D6AE55] bg-white text-[#123D2B] hover:bg-[#F7F8F5]";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 ${styles} ${className}`}
    >
      <MessageCircle size={18} />
      {label}
    </Link>
  );
}
