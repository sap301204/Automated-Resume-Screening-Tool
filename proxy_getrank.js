export default async function handler(req, res) {
  const { jobId } = req.query;
  const r = await fetch(`http://localhost:8000/rank/${jobId}`);
  const j = await r.json();
  res.status(r.status).json(j);
}
