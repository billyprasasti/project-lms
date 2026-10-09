export default function Stars({ value = 0, onChange, size = "text-sm" }) {
  return (
    <span className={`inline-flex ${size}`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const cls =
          value >= n ? "text-amber-400" : value >= n - 0.5 ? "text-amber-400/60" : "text-gray-300";
        return onChange ? (
          <button key={n} type="button" onClick={() => onChange(n)} aria-label={`${n} bintang`}
            className={`border-0 bg-transparent p-0 ${cls}`}>★</button>
        ) : (
          <span key={n} className={cls}>★</span>
        );
      })}
    </span>
  );
}
