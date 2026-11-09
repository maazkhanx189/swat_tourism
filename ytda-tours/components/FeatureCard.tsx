import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-[28px] border border-[#E7E8E5] bg-white p-6 shadow-[0_18px_45px_rgba(18,61,43,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123D2B] text-[#D6AE55]">
        <Icon size={22} />
      </div>
      <h3 className="mb-3 text-xl font-semibold text-[#123D2B]">{title}</h3>
      <p className="text-base leading-7 text-[#4A5950]">{description}</p>
    </div>
  );
}
