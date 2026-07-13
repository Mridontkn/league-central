export default function TeamCard({ team }) {
  return (
    <div className="team-card" style={{ "--team-color": team.color }}>
      <div className="crest">{team.short}</div>
      <div className="info">
        <span className="name">{team.city} {team.name}</span>
        <span className="meta">{team.w}-{team.l}-{team.otl}</span>
      </div>
      <div className="record">
        {team.w * 2 + team.otl}
        <span className="pts">PTS</span>
      </div>
    </div>
  );
}
