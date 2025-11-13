"use client"
import { useState } from "react";

export default function Page(){
  const [jobId, setJobId] = useState("");
  const [log, setLog] = useState("");
  const [file, setFile] = useState(null);

  async function createJob(){
    const payload = {
      title: "Data Analyst (demo)",
      jd_text: "SQL, Excel, Power BI and Python required.",
      must_have: ["sql","excel","power bi"],
      min_exp_years: 2.0
    };
    setLog("Creating job...");
    const r = await fetch("/api/proxy_job_create", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload)
    });
    const j = await r.json();
    setJobId(j.job_id);
    setLog(`Created job ${j.job_id}`);
  }

  async function uploadResume(){
    if(!file) return setLog("Choose file");
    const fd = new FormData();
    fd.append("candidate_id", "web_user_1");
    fd.append("file", file);
    setLog("Uploading resume...");
    const r = await fetch("/api/proxy_resume_upload", { method:"POST", body:fd });
    const j = await r.json();
    setLog(JSON.stringify(j));
  }

  async function rank(){
    if(!jobId) return setLog("Create job first");
    setLog("Running ranking...");
    await fetch(`/api/proxy_rank/${jobId}`, {method:"POST"});
    const r = await fetch(`/api/proxy_getrank/${jobId}`);
    const res = await r.json();
    setLog(JSON.stringify(res, null, 2));
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">Automated Resume Screening — Demo</h1>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={createJob}>Create Demo Job</button>
          <div className="flex items-center space-x-2">
            <input type="file" onChange={e=>setFile(e.target.files[0])} className=""/>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={uploadResume}>Upload Resume</button>
          </div>
          <div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={rank}>Run Ranking</button>
          </div>
          <pre className="mt-4 bg-gray-100 p-3 rounded text-sm">{log}</pre>
          <p className="text-xs text-gray-500">Frontend proxies backend calls via /api/proxy_* routes. Backend should run at http://localhost:8000</p>
        </div>
      </div>
    </main>
  )
}
