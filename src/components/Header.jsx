import { FaHockeyPuck } from "react-icons/fa6";

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="mark">
          <FaHockeyPuck />
          HCA
        </span>
        <span className="sub">League Central</span>
      </div>
    </header>
  );
}

export default Header;
