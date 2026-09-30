import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="container">
        <Link to="/beranda" className="logo">
          <span className="video">video</span>
          <span className="belajar">belajar</span>
        </Link>
      </div>
    </header>
  );
}
