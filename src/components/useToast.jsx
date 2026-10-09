import { useRef, useState } from "react";

export default function useToast() {
  const [msg, setMsg] = useState("");
  const timer = useRef(null);

  const notify = (m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 2500);
  };

  const toastNode = msg ? (
    <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-[13.5px] text-white shadow-pop">
      {msg}
    </div>
  ) : null;

  return { notify, toastNode };
}
