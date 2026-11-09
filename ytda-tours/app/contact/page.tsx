"use client";

import { useState } from "react";
import { Camera, Mail, MapPin, MessageSquareText, Send } from "lucide-react";

import WhatsAppButton from "@/components/WhatsAppButton";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setSuccessMessage("");
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please tell us how we can help.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("Thanks! Your message has been prepared successfully.");
    setValues(initialValues);
  };

  return (
    <main className="section-shell py-16 md:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Contact</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#123D2B] md:text-6xl">Let’s plan your Swat Valley journey.</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] bg-[#123D2B] p-8 text-white shadow-[0_22px_60px_rgba(18,61,43,0.12)]">
          <h2 className="text-3xl font-bold">Get in touch</h2>
          <p className="mt-4 text-base leading-7 text-[#D7E5DB]">
            We’re here to help you craft the perfect Swat itinerary, family getaway, or heritage day trip.
          </p>

          <div className="mt-8 space-y-5 text-sm text-[#E4EEE7]">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#D6AE55]">
                <Mail size={18} />
              </div>
              <span>hello@ytda-tours.com (placeholder)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#D6AE55]">
                <Camera size={18} />
              </div>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
                Instagram (placeholder)
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#D6AE55]">
                <MapPin size={18} />
              </div>
              <span>Swat, Khyber Pakhtunkhwa, Pakistan</span>
            </div>
          </div>

          <div className="mt-8">
            <WhatsAppButton
              label="Chat on WhatsApp"
              message="Hello YTDA Tours! I would like to plan a trip to Swat Valley. Please share available packages and details."
              variant="secondary"
              className="border border-white/20 bg-transparent text-black hover:text-white hover:bg-white/5"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[30px] border border-[#E3E7E1] bg-white p-8 shadow-[0_18px_45px_rgba(18,61,43,0.06)]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-1">
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#123D2B]">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="w-full rounded-2xl border border-[#D9DFD7] bg-[#F7F8F5] px-4 py-3 text-[#123D2B] outline-none transition focus:border-[#D6AE55]"
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="mt-2 text-sm text-[#C4413A]">{errors.name}</p> : null}
            </div>

            <div className="md:col-span-1">
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#123D2B]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="w-full rounded-2xl border border-[#D9DFD7] bg-[#F7F8F5] px-4 py-3 text-[#123D2B] outline-none transition focus:border-[#D6AE55]"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="mt-2 text-sm text-[#C4413A]">{errors.email}</p> : null}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#123D2B]">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={values.message}
              onChange={(event) => handleChange("message", event.target.value)}
              className="w-full rounded-2xl border border-[#D9DFD7] bg-[#F7F8F5] px-4 py-3 text-[#123D2B] outline-none transition focus:border-[#D6AE55]"
              placeholder="Tell us about your trip ideas..."
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? <p className="mt-2 text-sm text-[#C4413A]">{errors.message}</p> : null}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6AE55] px-5 py-3 text-sm font-semibold text-[#123D2B] shadow-sm transition hover:bg-[#dfc17a]"
            >
              <Send size={16} />
              Submit
            </button>

            <div className="inline-flex items-center gap-2 text-sm text-[#3C4A40]">
              <MessageSquareText size={16} className="text-[#123D2B]" />
              Friendly support for your travel plans
            </div>
          </div>

          {successMessage ? <p className="mt-6 rounded-2xl bg-[#E6F3E9] p-3 text-sm font-medium text-[#123D2B]">{successMessage}</p> : null}
        </form>
      </div>
    </main>
  );
}
