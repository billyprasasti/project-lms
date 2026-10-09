import { useState } from "react";
import { CATEGORIES, PRICE_RANGES, DURATION_RANGES } from "../data/courses";

const GROUPS = [
  { id: "cat", title: "Bidang Studi", options: CATEGORIES },
  { id: "price", title: "Harga", options: PRICE_RANGES },
  { id: "duration", title: "Durasi", options: DURATION_RANGES },
];

export default function FilterSidebar({ filters, onToggle, onReset }) {
  const [open, setOpen] = useState({ cat: true, price: true, duration: true });

  return (
    <aside className="h-fit rounded-[14px] border border-line bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="m-0 font-head text-base font-semibold">Filter</h2>
        <button onClick={onReset} className="border-0 bg-transparent text-[13px] font-semibold text-red">Reset</button>
      </div>

      {GROUPS.map((g) => (
        <div key={g.id} className="mb-3 rounded-lg border border-line last:mb-0">
          <button type="button" aria-expanded={open[g.id]}
            onClick={() => setOpen({ ...open, [g.id]: !open[g.id] })}
            className="flex w-full items-center justify-between border-0 bg-transparent px-3 py-2.5 text-[13.5px] font-semibold text-green">
            {g.title}
            <span className={`transition-transform ${open[g.id] ? "rotate-180" : ""}`}>⌃</span>
          </button>
          {open[g.id] && (
            <ul className="m-0 flex list-none flex-col gap-2.5 border-t border-line px-3 py-3">
              {g.options.map((o) => (
                <li key={o.key}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-inkSoft">
                    <input type="checkbox" className="h-4 w-4 accent-green"
                      checked={filters[g.id].includes(o.key)}
                      onChange={() => onToggle(g.id, o.key)} />
                    {o.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
