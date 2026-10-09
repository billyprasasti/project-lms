import { useState } from "react";
import { inputCls } from "./ui";

const labelCls = "mb-1.5 block text-[13.5px] font-semibold text-ink";
const Req = () => <span className="ml-0.5 text-red">*</span>;

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export function Field({ id, label, required, error, ...rest }) {
  return (
    <div className="mb-[18px]">
      <label htmlFor={id} className={labelCls}>{label}{required && <Req />}</label>
      <input id={id} name={id} required={required}
        className={`${inputCls} ${error ? "border-red" : "border-line focus:border-green"}`} {...rest} />
      {error && <p className="mt-1 text-xs text-red">{error}</p>}
    </div>
  );
}

export function PasswordField({ id, label, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mb-[18px]">
      <label htmlFor={id} className={labelCls}>{label}<Req /></label>
      <input id={id} name={id} required type={show ? "text" : "password"}
        className={`${inputCls} border-line pr-[42px] focus:border-green`} {...rest} />
      <button type="button" onClick={() => setShow(!show)}
        aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        className="absolute right-3 top-[34px] flex border-0 bg-transparent p-1 text-inkSoft">
        <EyeIcon />
      </button>
    </div>
  );
}
