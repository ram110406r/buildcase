from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# ============== AUTH SCHEMAS ==============
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============== RESEARCH FILE SCHEMAS ==============
class ResearchFileUpload(BaseModel):
    filename: str
    file_type: str
    raw_content: Optional[str] = None


class ResearchFileResponse(ResearchFileUpload):
    id: int
    user_id: int
    uploaded_at: datetime
    
    class Config:
        from_attributes = True


# ============== ANALYSIS JOB SCHEMAS ==============
class AnalysisJobCreate(BaseModel):
    research_file_ids: List[int]


class AnalysisJobResponse(BaseModel):
    id: int
    user_id: int
    research_file_ids: Optional[List[int]] = None
    status: str
    bmad_result: Optional[dict] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# ============== FEATURE BRIEF SCHEMAS ==============
class FeatureBriefCreate(BaseModel):
    brief_title: str
    brief_content: str
    analysis_job_id: Optional[int] = None
    evidence_count: int = 0


class FeatureBriefUpdate(BaseModel):
    brief_title: Optional[str] = None
    brief_content: Optional[str] = None
    evidence_count: Optional[int] = None


class FeatureBriefResponse(BaseModel):
    id: int
    user_id: int
    analysis_job_id: Optional[int] = None
    brief_title: str
    brief_content: str
    evidence_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============== TASK SCHEMAS ==============
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    brief_id: Optional[int] = None
    status: str = "todo"
    priority: str = "medium"


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    brief_id: Optional[int] = None


class TaskResponse(BaseModel):
    id: int
    user_id: int
    brief_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============== BUG SCHEMAS ==============
class BugCreate(BaseModel):
    title: str
    description: str
    severity: str = "medium"
    status: str = "open"


class BugUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    status: Optional[str] = None


class BugResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    severity: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============== SETTINGS SCHEMAS ==============
class SettingsCreate(BaseModel):
    theme: str = "retro"
    notifications_enabled: bool = True
    auto_analysis: bool = False


class SettingsUpdate(BaseModel):
    theme: Optional[str] = None
    notifications_enabled: Optional[bool] = None
    auto_analysis: Optional[bool] = None


class SettingsResponse(BaseModel):
    id: int
    user_id: int
    theme: str
    notifications_enabled: bool
    auto_analysis: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
