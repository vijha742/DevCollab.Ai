# Quick Start - Neon PostgreSQL Setup

## 5-Minute Setup Guide

### Step 1: Get Neon Credentials (2 minutes)

1. Go to **https://neon.tech**
2. Sign up/login (free tier available)
3. Create a new project or select existing
4. Click **"Connection Details"** or **"Connection String"**
5. Copy your credentials:
   - **Host:** `ep-xxx-xxx.region.aws.neon.tech`
   - **Database:** Usually `neondb`
   - **Username:** Your neon username
   - **Password:** Your neon password

### Step 2: Configure Environment (1 minute)

Edit `server/.env` file:

```env
# Replace with YOUR Neon credentials
DATABASE_URL=jdbc:postgresql://YOUR-HOST:5432/YOUR-DATABASE?sslmode=require
DATABASE_USERNAME=YOUR-USERNAME
DATABASE_PASSWORD=YOUR-PASSWORD

# These can stay as-is for now
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false
JWT_SECRET=mySecretKeyForJwtTokenGenerationThatIsLongEnoughForHS256AlgorithmRequirements
JWT_EXPIRATION=86400000
GEMINI_API_KEY=your-gemini-api-key-here
GITHUB_API_TOKEN=your-github-token-here
```

**Example:**
If Neon gives you:
```
postgresql://alex:pass123@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb
```

Your `.env` should be:
```env
DATABASE_URL=jdbc:postgresql://ep-cool-darkness-123456.us-east-2.aws.neon.tech:5432/neondb?sslmode=require
DATABASE_USERNAME=alex
DATABASE_PASSWORD=pass123
```

### Step 3: Run the Application (2 minutes)

```bash
cd server
./mvnw spring-boot:run
```

### Step 4: Verify Success

Look for these lines in your terminal:
```
✅ HikariPool-1 - Starting...
✅ HikariPool-1 - Start completed.
✅ Started DevcollabApplication in X.XXX seconds
```

Test the API:
```bash
curl http://localhost:8080/api/users
```

## Done! 🎉

Your application is now:
- ✅ Connected to Neon PostgreSQL
- ✅ Tables auto-created from JPA entities
- ✅ Ready for development
- ✅ Ready for production deployment

## Common Issues

### Issue 1: "Connection refused"
**Fix:** Check your `DATABASE_URL` format - must start with `jdbc:postgresql://`

### Issue 2: "Password authentication failed"
**Fix:** Double-check username and password from Neon dashboard

### Issue 3: "SSL connection closed"
**Fix:** Make sure your URL ends with `?sslmode=require`

## What Changed?

- ❌ **Removed:** H2 in-memory database
- ✅ **Added:** Neon PostgreSQL connection
- ✅ **Same:** All your JPA entities, repositories, services
- ✅ **Same:** All your API endpoints

## Environment Variables You Can Customize

| Variable | Purpose | Default |
|----------|---------|---------|
| `JPA_DDL_AUTO` | Schema management | `update` |
| `JPA_SHOW_SQL` | Log SQL queries | `false` |
| `LOG_SQL` | SQL logging level | `DEBUG` |

### Schema Management Options

- **`update`** (recommended for dev) - Updates schema automatically
- **`create`** - Drops and recreates schema on startup (⚠️ destroys data!)
- **`validate`** - Only validates, doesn't modify
- **`none`** - No schema management

## Next Steps

1. ✅ **Development:** Keep using `JPA_DDL_AUTO=update`
2. ✅ **Testing:** Test all your endpoints
3. ✅ **Production:** Consider using `JPA_DDL_AUTO=validate` + migration tools

## Need More Help?

- **Detailed setup:** See `POSTGRES_SETUP.md`
- **Understanding architecture:** See `JPA_HIBERNATE_EXPLAINED.md`
- **Migration details:** See `MIGRATION_SUMMARY.md`

## Tips

### Viewing Your Data
Use Neon's web console or connect with tools like:
- **pgAdmin**
- **DBeaver**
- **TablePlus**
- **psql** command line

### Connection String for GUI Tools
```
Host: ep-xxx-xxx.region.aws.neon.tech
Port: 5432
Database: neondb
Username: your-username
Password: your-password
SSL: Required
```

### Development vs Production

**Development (.env):**
```env
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true
LOG_SQL=DEBUG
```

**Production (environment variables):**
```env
JPA_DDL_AUTO=validate
JPA_SHOW_SQL=false
LOG_SQL=WARN
```

## You're All Set! 🚀

Your Spring Boot application is now running with Neon PostgreSQL. No code changes were needed - just configuration!
