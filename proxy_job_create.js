export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const r = await fetch("http://localhost:8000/job/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: req.body ? JSON.stringify(req.body) : await new Promise(r => {
      let data='';
      req.on('data', chunk=>data+=chunk);
      req.on('end', ()=>r(JSON.parse(data)));
    })
  });
  const j = await r.json();
  res.status(r.status).json(j);
}
