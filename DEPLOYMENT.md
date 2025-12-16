# Deployment Guide

This guide covers deploying the Todo App to production using Vercel (frontend), Railway (backend), and Neon (database).

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Railway account (free tier)
- Neon account (free tier)

## Database Setup (Neon)

1. **Create Neon Account**

   - Visit https://neon.tech
   - Sign up with GitHub

2. **Create Database**

   - Click "Create Project"
   - Name: `todo-app-prod`
   - Region: Choose closest to your users
   - Copy the connection string

3. **Connection String Format**
   ```
   postgresql://user:password@host.neon.tech/database?sslmode=require
   ```

## Backend Deployment (Railway)

1. **Create Railway Account**

   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` directory as root

3. **Environment Variables**
   Add these in Railway dashboard:

   ```
   DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
   JWT_SECRET=your-super-secure-secret-key-min-32-chars
   JWT_ALGORITHM=HS256
   JWT_EXPIRATION_DAYS=7
   CORS_ORIGINS=https://your-app.vercel.app
   ENVIRONMENT=production
   ```

4. **Configure Build**
   Railway should auto-detect Python. If not:

   - Build Command: `pip install -r requirements.txt`
   - Start Command: `alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

5. **Deploy**
   - Railway will auto-deploy on push to main
   - Copy the generated URL (e.g., `https://your-app.up.railway.app`)

## Frontend Deployment (Vercel)

1. **Create Vercel Account**

   - Visit https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**

   - Click "New Project"
   - Import your GitHub repository
   - Framework Preset: Next.js
   - Root Directory: `frontend`

3. **Environment Variables**
   Add in Vercel dashboard:

   ```
   NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
   ```

4. **Deploy**

   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Copy the generated URL (e.g., `https://your-app.vercel.app`)

5. **Update Backend CORS**
   - Go back to Railway
   - Update `CORS_ORIGINS` environment variable:
     ```
     CORS_ORIGINS=https://your-app.vercel.app,https://your-app-git-main.vercel.app
     ```
   - Railway will redeploy automatically

## Post-Deployment Steps

### 1. Update README

Update the README.md with your live URLs:

```markdown
## 🎯 Live Demo

- **Frontend**: https://your-app.vercel.app
- **API Docs**: https://your-app.up.railway.app/docs
- **Demo Video**: [Link to video]
```

### 2. Test Production Deployment

Test the following:

- [ ] User signup works
- [ ] User login works
- [ ] Tasks can be created
- [ ] Tasks can be updated/deleted
- [ ] Tags can be managed
- [ ] Filters and search work
- [ ] Keyboard shortcuts work
- [ ] Mobile responsive works

### 3. Performance Testing

Use Lighthouse in Chrome DevTools:

```
Target Scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90
```

Run the audit:

1. Open your Vercel URL in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Click "Generate report"
5. Take screenshot for documentation

### 4. Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Railway)
- [ ] CORS properly configured (no "\*")
- [ ] Environment variables are secret
- [ ] JWT secret is strong (32+ chars)
- [ ] Rate limiting is working
- [ ] SQL injection protection (SQLModel ORM)
- [ ] Password hashing with bcrypt cost 12

## Custom Domains (Optional)

### Vercel Custom Domain

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS configuration instructions

### Railway Custom Domain

1. Go to Railway project settings
2. Click "Settings" → "Domains"
3. Add your domain
4. Configure DNS records as shown

## Monitoring & Maintenance

### Railway Logs

View logs in Railway dashboard:

- Click on your service
- Go to "Deployments"
- Click "View Logs"

### Vercel Analytics

Enable Vercel Analytics (free):

1. Go to project settings
2. Click "Analytics"
3. Enable Web Analytics

### Database Monitoring

Monitor Neon database:

1. Go to Neon dashboard
2. View "Monitoring" tab
3. Check connection count, query performance

## Rollback Procedure

If deployment fails:

### Vercel Rollback

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "..." menu
4. Select "Promote to Production"

### Railway Rollback

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "Redeploy"

## Continuous Deployment

Both Vercel and Railway auto-deploy on:

- Push to `main` branch
- Pull request merges

To disable auto-deploy:

- Vercel: Project Settings → Git → Disable
- Railway: Project Settings → Disable auto-deploy

## Environment-Specific Configuration

### Development

```
NEXT_PUBLIC_API_URL=http://localhost:8001
DATABASE_URL=postgresql://localhost:5432/todo_dev
```

### Staging (Optional)

```
NEXT_PUBLIC_API_URL=https://staging-api.railway.app
DATABASE_URL=postgresql://...neon.tech/todo_staging
```

### Production

```
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
DATABASE_URL=postgresql://...neon.tech/todo_prod
```

## Troubleshooting

### Frontend shows "Network Error"

- Check `NEXT_PUBLIC_API_URL` is correct
- Check backend is deployed and running
- Check CORS settings in backend

### Backend shows database errors

- Check `DATABASE_URL` is correct
- Check Neon database is accessible
- Run migrations: `alembic upgrade head`

### Rate limiting too strict

- Adjust limits in `backend/app/routers/auth.py`
- Redeploy backend

### Build failures

- Check Node.js version (18+)
- Check Python version (3.11+)
- Check all dependencies are in requirements.txt/package.json

## Cost Estimation

### Free Tier Limits

- **Vercel**: Unlimited bandwidth, 100GB-hours
- **Railway**: $5 credit/month, ~500 hours
- **Neon**: 3GB storage, shared compute

### Expected Usage

For a competition demo:

- All services stay within free tier
- No credit card required

## Support

If you encounter issues:

1. Check service status pages
2. Review deployment logs
3. Test locally first
4. Check environment variables
5. Verify database connectivity

## Success Criteria

Your deployment is successful when:

- ✅ Frontend is accessible via HTTPS
- ✅ Backend API docs are accessible
- ✅ Users can signup and login
- ✅ All features work in production
- ✅ Lighthouse score >90
- ✅ No console errors
- ✅ Mobile responsive works
