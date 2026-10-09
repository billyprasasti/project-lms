import { Link } from "react-router-dom";

export default function Logo({ size = "text-[22px]" }) {
  return (
    <Link to="/beranda" className={`font-head font-bold tracking-tight whitespace-nowrap ${size}`}>
      <span className="text-orange">video</span>
      <span className="text-red">belajar</span>
    </Link>
  );
}
