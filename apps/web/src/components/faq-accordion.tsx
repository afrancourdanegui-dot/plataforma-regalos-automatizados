"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={i}
            className="rounded-[20px] border border-borde bg-white"
            style={{ boxShadow: "0 10px 30px rgba(58,30,48,.06)" }}
          >
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left"
            >
              <span className="font-ui text-[15px] font-semibold text-carbon">
                {faq.q}
              </span>
              <span
                className="flex-shrink-0 select-none text-[22px] font-light leading-none transition-all duration-300"
                style={{
                  transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                  color: isOpen ? "var(--color-terracota)" : "var(--color-mute)",
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? "260px" : "0",
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
                transition: "max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s ease",
              }}
            >
              <p className="px-7 pb-6 text-[14.5px] leading-[1.65] text-atenuado">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
