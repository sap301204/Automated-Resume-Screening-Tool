import formidable from "formidable";
import fs from "fs";
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "form parse error" });
    const file = files.file;
    const data = fs.readFileSync(file.path);
    const formData = new FormData();
    formData.append("candidate_id", fields.candidate_id || "web_user_1");
    formData.append("file", new Blob([data]), file.name);
    const r = await fetch("http://localhost:8000/resume/upload", { method: "POST", body: formData });
    const j = await r.json();
    res.status(r.status).json(j);
  });
}
