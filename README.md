# CVision AI

**Intelligent Resume Analysis & Career Guidance Platform**

An AI-powered platform that analyzes resumes, extracts skills, predicts job roles, and provides personalized career guidance and interview preparation.

## 🌟 Features

### Core Features
- **PDF Resume Upload** - Easy drag-and-drop resume upload
- **Intelligent Text Extraction** - Automatic resume text parsing
- **Skill Extraction** - AI-powered skill detection and categorization
- **Job Role Prediction** - Predict suitable job roles based on resume
- **AI Suggestions** - Personalized improvement recommendations
- **Interview Questions** - AI-generated interview prep questions
- **Career Roadmap** - Personalized learning path and skill gap analysis

### UI Features
- **Modern Dark Theme** - Royal, elegant European startup style
- **Glassmorphism Design** - Soft shadows, rounded cards, minimal icons
- **Fully Responsive** - Perfect on desktop, tablet, and mobile
- **Professional Typography** - Clean, minimal animations

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** - Fast, modern frontend build
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach

### Backend
- **FastAPI** - High-performance Python API
- **spaCy** - NLP for skill extraction
- **scikit-learn** - Machine learning for role prediction
- **PyPDF2** - PDF text extraction
- **Google Gemini API** - AI suggestions and question generation

### Database & AI
- **MongoDB Atlas** - NoSQL database (optional)
- **Google Gemini** - Free-tier AI integration

### Deployment
- **Frontend** → Vercel
- **Backend** → Render

## 📁 Project Structure

```
cvision-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── ml/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## 🌐 Deployment

### Deploy Frontend to Vercel

> Note: In development, the frontend uses a Vite dev-proxy for `/api`. In production (Vercel), you must point the frontend to your deployed backend using `VITE_API_URL`.

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Frontend**
```bash
cd frontend
npm run build
vercel
```

3. **Vercel Project Settings (required)**
   - **Root Directory**: `./frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variable**: `VITE_API_URL`
     - Example: `https://cvision-ai-backend.onrender.com`
     - (The frontend calls `${VITE_API_URL}/resume/upload`, etc.)


### Deploy Backend to Render

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial CVision AI project"
git push origin main
```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Select `Python 3.11` as runtime

3. **Configure Build & Start Commands**
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT main:app`

4. **Add Environment Variables**
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `ALLOWED_ORIGINS`: Add your Vercel frontend URL
   - `DEBUG`: `False`

5. **Deploy**
   - Click Deploy
   - Render will automatically deploy on every push

### Environment Setup

#### Frontend `.env.local`
```
VITE_API_URL=https://your-backend-render-url.onrender.com
```

#### Backend `.env`
```
GEMINI_API_KEY=your_api_key_here
ALLOWED_ORIGINS=https://your-frontend-vercel-url.vercel.app,http://localhost:5173
DEBUG=False
```

### API Documentation

Once deployed, view interactive API docs at:
- **Swagger UI**: `https://your-backend-url/docs`
- **ReDoc**: `https://your-backend-url/redoc`

## 🔗 Deployment Links

After deployment, update these:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.onrender.com`
- **API Base**: `https://your-app.onrender.com/api`

## ⚠️ Deployment updates & 404 troubleshooting (May 2026)

I've made CI tweaks and Vercel recommendations to avoid the common 404 deployment result you may have seen:

- CI/workflow changes
   - Workflows now use `npm install` (instead of `npm ci`) when there is no lockfile, and run the Vercel CLI via `npx` to avoid global installs.

- Common cause of the 404 page on Vercel
   - Vercel couldn't find the built `index.html` (wrong `outputDirectory` / `dist` path) or the build step failed. Check the Vercel build logs:
      - Vercel Dashboard → Project → Deployments → open the latest deployment → View Build Logs
   - Ensure `frontend` produces `dist/index.html` (Vite default). The repo's `vercel.json` should point to the correct output folder.

- Quick fixes
   - Confirm `frontend/package.json` has `build` script: `vite build` and that running locally produces `frontend/dist`.
   - If your site shows Vercel's 404, open the project deployment logs and look for the `Build` step error; fix the build error and redeploy.

## 🔗 Single URL (frontend + backend) — recommended setup

If you want one public URL (e.g., `https://app.example.com`) where the frontend is served and all API calls use the same origin (`/api/*`), use one of these options:

Option A — Proxy API requests from the frontend domain to the backend (no code changes)
   1. Deploy the **backend** as its own Vercel or Render project so it has a public URL (e.g. `https://cvision-backend.vercel.app`).
   2. In the **frontend** Vercel project, add a rewrite so `/api/*` routes to the backend URL. Example `vercel.json` (placed at repo root):

```json
{
   "rewrites": [
      { "source": "/api/(.*)", "destination": "https://cvision-backend.vercel.app/api/$1" }
   ]
}
```

   - With this rule your frontend can fetch relative `/api/...` paths and Vercel will proxy them to the backend. The user sees only the frontend domain in the browser.

Option B — Configure frontend to call the backend URL via env var
   - Keep frontend and backend as separate projects. Set `VITE_API_URL` in the frontend project's Environment Variables to the backend URL, then the frontend will call absolute backend endpoints.

Option C — Combine backend into the frontend project as serverless functions
   - Move `backend` endpoints into a Vercel-compatible serverless `api/` folder (or adapt to Next.js API routes). This requires code changes but results in a single project deployment (single domain + single deploy).

Which option to use depends on how much you want to change the codebase vs. keep separate deployments. The fastest, least-invasive approach is Option A (rewrites).

---

## 🚨 IMPORTANT: Vercel vs Render for this project

Short answer: Vercel is great for the frontend. For a heavy Python backend that uses spaCy, scikit-learn and other native ML libraries, Render (or a similar full container host) is the safer option.

Why Render (recommended)
- The backend depends on large Python packages with native extensions (spaCy, numpy, scikit-learn) that can cause build failures or excessive cold-start times on serverless platforms.
- I added a multi-stage `Dockerfile` and `render.yaml` so you can deploy the entire repo as a single Docker web service (frontend static + FastAPI backend behind nginx). This gives you one public URL and consistent runtime behavior.

When you might still use Vercel for backend
- If you refactor the backend into Vercel-compatible serverless functions (small, stateless endpoints) and remove heavy native deps, you can deploy the backend to Vercel as serverless functions. That requires non-trivial code changes and testing.
- Or host only the frontend on Vercel and point it to a separately hosted backend (Render, Railway, AWS, etc.). This is the simplest, most robust pattern for the current codebase.

What I changed to make "one deploy" easy
- Added `Dockerfile` at repo root (builds frontend then installs backend and runs nginx+gunicorn via supervisor).
- Added `docker/nginx.conf` and `docker/supervisord.conf` to serve the frontend and proxy `/api` to the Python app.
- Added `render.yaml` manifest for one-click deploy on Render using Docker.

If you insist on using Vercel for both
1. Option A (least code change): Keep frontend on Vercel and host backend on Render. Then configure a rewrite in the frontend Vercel project to proxy `/api/*` to the Render backend. This preserves a single public domain and is low-risk.
2. Option B (more work): Convert backend endpoints to small Vercel serverless functions (or migrate to Next.js API routes). You will need to remove heavy native packages or find pure-Python alternatives. This is a larger engineering effort and not recommended if you need accurate ML results quickly.

Recommendation (my suggested path)
1. Use Render to deploy the Docker web service now (I prepared `render.yaml`). This will give you a single URL and stable runtime for the ML backend.
2. Set `GEMINI_API_KEY` and `ALLOWED_ORIGINS` in the Render dashboard and optionally `DATABASE_URL` if you want persistent storage.
3. Update the Vercel frontend `VITE_API_URL` to the Render URL (or use a Vercel rewrite to keep the frontend domain only). Redeploy frontend.

If you want, I can deploy the Render service for you — I just need Render/GitHub access or a Render service API key and permission to connect the repo. Otherwise follow the quick steps below.

Quick Render deploy (one-liner summary)
1. Push these changes to `main`.
2. Connect the GitHub repo to Render and create a Web Service that uses the repo's `render.yaml` (it will use the `Dockerfile`).
3. Set environment variables in the Render service: `GEMINI_API_KEY`, `ALLOWED_ORIGINS`, `DATABASE_URL` (optional), `DEBUG=false`.

Local Docker test (optional)
```bash
docker build -t cvision-ai:local .
docker run -p 8080:8080 --env-file .env cvision-ai:local
# open http://localhost:8080
```

Accuracy notes — how to get better results
- Provide a valid `GEMINI_API_KEY` if you want to use Google Gemini responses in production.
- Use a larger spaCy model in production (install `en_core_web_trf` or `en_core_web_lg`) and update `backend/ml/skill_extraction.py` to load it. Small models miss entities and skills.
- Add labeled training data and re-train any scikit-learn models used for scoring/prediction.
- Replace the in-memory `RESUMES` store with a persistent DB (MongoDB Atlas). I can add persistent storage if you want.

---
If you want me to deploy now, reply with "Deploy to Render" and grant one of the following:
- a Render API Key with `create`/`deploy` permissions, or
- temporary GitHub access to connect the repo to Render, or
- ask me to provide step-by-step screenshots/commands and you'll do the deploy yourself.

---

## ✅ Where to find the single website URL

- Vercel Dashboard → select your Frontend project → the production domain is listed at the top (for example `https://your-app.vercel.app`).
- The same domain becomes your "single URL" once you apply the proxy (rewrites) in Option A or host your API as serverless functions in the same project.
- You can also get the production URL from the CLI when using `npx vercel --prod` — it prints the deployed production URL after a successful deploy.

## ✅ Verification & health checks

- After deployment, verify the frontend loads at the production URL and that API requests work (open browser devtools Network tab and try `/api/health` or `/health`).
- Backend docs (Swagger) should be reachable at `https://<backend-url>/docs` (or under the same origin if you used a rewrite).

---

If you'd like, I can:
- add the rewrite `vercel.json` for Option A and push it, then help you create the two Vercel projects and set the environment variables, or
- continue troubleshooting the CI failures and make the workflows deploy directly.

Tell me which path you want and I'll implement it for you.

## 📝 Resume Highlight

**Developed a full-stack AI-powered resume analysis platform using FastAPI, React, NLP, and machine learning techniques for skill extraction, job role prediction, and personalized career guidance.**

## 🎨 Color Palette

- **Background**: `#0F172A` (Dark Navy)
- **Cards**: `#1E293B` (Slate)
- **Primary**: `#6366F1` (Indigo)
- **Accent**: `#8B5CF6` (Violet)
- **Text**: `#F8FAFC` (Off-White)
- **Secondary Text**: `#CBD5E1` (Muted)

## 📄 License

MIT License

## 👤 Author

Keerthi

---

*Built for German universities and top tech companies. Clean, professional, deployed. 🚀*
