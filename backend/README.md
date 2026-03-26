# Buildcase Backend

FastAPI backend for Buildcase - Build what's worth building

## Quick Start

### 1. Setup Environment

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Generate Secret Key (REQUIRED)

```bash
# Windows PowerShell
$env:SECRET_KEY = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Output $env:SECRET_KEY

# Or use OpenSSL on Linux/Mac
openssl rand -hex 32
```

### 4. Configure Environment

```bash
cp .env.example .env
# Update SECRET_KEY with your generated key
```

### 5. Run Server

```bash
python main.py
```

Visit: http://localhost:8000/docs

## API Endpoints

### Authentication (Phase 2)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Research Files (Phase 3) - COMING SOON
- `POST /api/v1/research/upload` - Upload research file
- `GET /api/v1/research/files` - List user files
- `DELETE /api/v1/research/files/{id}` - Delete file

### BMAD Analysis (Phase 4) - COMING SOON
- `POST /api/v1/analysis/run` - Run BMAD analysis
- `GET /api/v1/analysis/jobs/{id}` - Get analysis job status
- `GET /api/v1/analysis/jobs/{id}/brief` - Get generated brief

### Feature Briefs (Phase 5) - COMING SOON
- `POST /api/v1/briefs` - Create brief
- `GET /api/v1/briefs/{id}` - Get brief
- `PUT /api/v1/briefs/{id}` - Update brief
- `GET /api/v1/briefs/{id}/export` - Export brief

### Tasks & Bugs (Phase 6) - COMING SOON
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - List tasks
- `PUT /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task
- `POST /api/v1/bugs` - Create bug
- `GET /api/v1/bugs` - List bugs
- `PUT /api/v1/bugs/{id}` - Update bug
- `DELETE /api/v1/bugs/{id}` - Delete bug

### Settings (Phase 6) - COMING SOON
- `GET /api/v1/settings` - Get user settings
- `PUT /api/v1/settings` - Update settings

## Testing Authentication

### Register a User
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

## Database Schema

- **users** - User accounts
- **research_files** - Uploaded research documents
- **analysis_jobs** - BMAD analysis job tracking
- **feature_briefs** - Generated feature briefs
- **tasks** - Development tasks
- **bugs** - Bug reports
- **settings** - User preferences

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database (MVP ready, PostgreSQL compatible)
- **JWT** - Authentication with python-jose
- **Passlib** - Password hashing with bcrypt
- **Pydantic** - Data validation

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| SECRET_KEY | ✅ | - | JWT secret key (generate with openssl) |
| DATABASE_URL | ❌ | sqlite:///./buildcase.db | Database connection string |
| ALGORITHM | ❌ | HS256 | JWT algorithm |
| ACCESS_TOKEN_EXPIRE_MINUTES | ❌ | 30 | Access token expiry |
| REFRESH_TOKEN_EXPIRE_DAYS | ❌ | 7 | Refresh token expiry |
| CORS_ORIGINS | ❌ | http://localhost:5173 | Allowed CORS origins |
| PORT | ❌ | 8000 | Server port |
| ANTHROPIC_API_KEY | ❌ | - | Claude API key (Phase 4) |

## Next Steps

✅ Phase 1: Backend Scaffolding - COMPLETE  
🔄 Phase 2: Authentication - READY NOW  
⏳ Phase 3: File Upload - NEXT  
⏳ Phase 4: BMAD Analysis - CRITICAL  
⏳ Phase 5: Brief Generation  
⏳ Phase 6: Tasks & Bugs  
⏳ Phase 7: Frontend Integration  

## Success Metrics

- ✅ User registration/login works
- ⏳ Upload research files
- ⏳ Run BMAD analysis
- ⏳ Generate feature briefs with evidence
- ⏳ Create tasks from briefs
- ⏳ Track tasks/bugs
- ⏳ Export briefs (JSON/PDF)
