export default function TeamCard({ team }) {
  const points = Number(team.W) * 2 + Number(team.otl);

  return (
    <div
      style={{
        background: "#1B1D24",
        color: "white",
        borderLeft: `6px solid ${team.color}`,
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <h2>{team.city}</h2>
      <h3>{team.name}</h3>

      <p>
        {team.W}-{team.L}-{team.otl}
      </p>

      <strong>{points} pts</strong>
    </div>
  );
}