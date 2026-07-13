import { nextGame } from "../data/games";

function Header() {
  const upcoming = nextGame();

  return (
    <header className="header">
      <div className="header-brand">
        <span className="mark">HCA</span>
        <span className="sub">Hockey Club Association</span>
      </div>

      {upcoming && (
        <div className="header-live">
          <span className="dot" />
          {upcoming.away} @ {upcoming.home}
        </div>
      )}
    </header>
  );
}

export default Header;
