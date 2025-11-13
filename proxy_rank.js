export default async function handler(req, res) {
  const { jobId } = req.query;
  if (req.method === 'POST') {
    const r = await fetch(`http://localhost:8000/rank/${jobId}`, { method: "POST" });
    const j = await r.json();
    return res.status(r.status).json(j);
  }
  res.status(405).end();
}
