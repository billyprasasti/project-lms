export default function Tabs({ tabs, value, onChange, className = "" }) {
  return (
    <div role="tablist" className={`no-scrollbar flex gap-6 overflow-x-auto border-b border-line ${className}`}>
      {tabs.map((t) => (
        <button key={t.key} role="tab" aria-selected={value === t.key} onClick={() => onChange(t.key)}
          className={`-mb-px whitespace-nowrap border-0 border-b-2 bg-transparent pb-2.5 text-[13px] font-medium ${value === t.key ? "border-red text-red" : "border-transparent text-inkSoft"}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
