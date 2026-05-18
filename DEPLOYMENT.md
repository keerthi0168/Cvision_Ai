# CVision AI - Complete Deployment Guide

## Prerequisites

Before deployment, ensure you have:
- GitHub account
- Vercel account (free tier)
- Render account (free tier)
- Google Gemini API key (free at [ai.google.dev](https://ai.google.dev))
- Git installed locally

## Step 1: Prepare Your Repository

### Initialize Git (if not done)
```bash
cd cvision-ai
git init
git add .
git commit -m "Initial CVision AI project"
```

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/cvision-ai.git
git branch -M main
git push -u origin main
```

## Step 2: Get Google Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key and save it securely
5. **⚠️ Never commit this key to Git**

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Select your `cvision-ai` repository
4. Configure settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click Deploy

### Option B: Using Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel
```

### Post-Deployment
- Your frontend will be live at: `https://cvision-ai.vercel.app`
- Copy this URL for backend configuration

## Step 4: Deploy Backend to Render

### Step 1: Create Render Service
1. Go to [render.com](https://render.com) and sign in
2. Click "New +"
3. Select "Web Service"
4. Connect your GitHub repository
5. Select the `cvision-ai` repository

### Step 2: Configure Service
Fill in the deployment form:

**Basic Settings**
- **Name**: `cvision-ai-backend`
- **Region**: Choose closest to you
- **Runtime**: Python 3.11
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: 
```
cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT main:app
```

### Step 3: Add Environment Variables
Click "Advanced" and add:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your Google API key |
| `ALLOWED_ORIGINS` | `https://cvision-ai.vercel.app,http://localhost:5173` |
| `DEBUG` | `False` |
| `PORT` | `10000` |

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment to complete (~5-10 minutes)
- Your backend will be live at: `https://cvision-ai-backend.onrender.com`

## Step 5: Connect Frontend & Backend

### Update Frontend Environment
Create `frontend/.env.production`:
```
VITE_API_URL=https://cvision-ai-backend.onrender.com
```

### Redeploy Frontend
```bash
cd frontend
npm run build
vercel --prod
```

## Testing Deployment

### Test Backend
```bash
curl https://cvision-ai-backend.onrender.com/health
# Should return: {"status": "ok"}
```

### Test API Documentation
- Visit: `https://cvision-ai-backend.onrender.com/docs`
- Should see Swagger UI with all endpoints

### Test Frontend
1. Visit: `https://cvision-ai.vercel.app`
2. Try uploading a sample resume PDF
3. Check if analysis works

## Troubleshooting

### Frontend Issues
**Problem**: "Cannot find module"
- **Solution**: `cd frontend && npm install && npm run build`

**Problem**: "Page not found"
- **Solution**: Check Vercel settings, Root Directory should be `./frontend`

### Backend Issues
**Problem**: "500 Internal Server Error"
- **Solution**: Check Render logs for Python errors

**Problem**: "CORS error"
- **Solution**: Update `ALLOWED_ORIGINS` in Render environment variables

**Problem**: "Gemini API not working"
- **Solution**: Verify `GEMINI_API_KEY` is set correctly in Render

### Connection Issues
**Problem**: Frontend can't reach backend
- **Solution**: Update `VITE_API_URL` and redeploy frontend

## Monitoring & Maintenance

### Render Logs
- Go to your Render service
- Click "Logs" tab to see real-time logs
- Check for errors and performance issues

### Vercel Analytics
- Go to your Vercel project
- Check performance metrics under Analytics
- Monitor Web Vitals

### Cost Optimization
- **Vercel**: Free tier covers up to 100GB bandwidth/month
- **Render**: Free tier provides up to 750 hours/month
- Monitor usage to avoid surprise bills

## CI/CD Setup (Optional)

### Auto-Deploy on Push
Both Vercel and Render auto-deploy on git push to main branch.

To disable:
1. **Vercel**: Project Settings → Git → Disable Auto-Deploy
2. **Render**: Service Settings → Auto-Deploy toggle

## Production Checklist

- [ ] Environment variables configured
- [ ] API key secured (not in repo)
- [ ] Frontend `.env.production` updated
- [ ] Backend CORS configured
- [ ] Database connected (optional)
- [ ] Monitoring set up
- [ ] Custom domain configured (optional)
- [ ] SSL certificates auto-renewed
- [ ] Backups configured
- [ ] Error tracking set up

## Next Steps

1. **Add Authentication**
   - Implement user login with JWT
   - Store user resumes in database

2. **Add Database**
   - Connect MongoDB Atlas
   - Persist resume data

3. **Enhance ML Features**
   - Add more sophisticated NLP models
   - Implement career recommendation engine

4. **Custom Domain**
   - Set up custom domain on Vercel & Render
   - Configure DNS records

5. **Marketing**
   - Write a compelling README
   - Add screenshots
   - Deploy showcase site

## Support

- **Render Support**: support@render.com
- **Vercel Support**: https://vercel.com/support
- **Google Gemini Docs**: https://ai.google.dev/docs

---

**Deployed successfully! 🚀** Your CVision AI platform is now live!
