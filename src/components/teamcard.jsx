export default function TeamCard({ team }) {
  const gp = team.w + team.l + team.otl;
  const pts = team.w * 2 + team.otl;

  return (
    <div className="team-card" style={{ "--team-color": team.color }}>
      <div className="crest">{team.short}</div>

      <div className="info">
        <span className="name">{team.city} {team.name}</span>
        <span className="meta">{gp} GP · {team.w}-{team.l}-{team.otl}</span>
      </div>

      <div className="record">
        {team.w}-{team.l}-{team.otl}
        <span className="pts">{pts} PTS</span>
      </div>
    </div>
  );
}
