import { NavLink } from "react-router-dom";

import {
  FaHouse,
  FaNewspaper,
  FaHockeyPuck,
  FaChartSimple,
  FaPeopleGroup,
} from "react-icons/fa6";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">

      <NavLink to="/">
        <FaHouse />
        <span>Home</span>
      </NavLink>

      <NavLink to="/news">
        <FaNewspaper />
        <span>News</span>
      </NavLink>

      <NavLink to="/games">
        <FaHockeyPuck />
        <span>Games</span>
      </NavLink>

      <NavLink to="/standings">
        <FaChartSimple />
        <span>Standings</span>
      </NavLink>

      <NavLink to="/teams">
        <FaPeopleGroup />
        <span>Teams</span>
      </NavLink>

    </nav>
  );
}