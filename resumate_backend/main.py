from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.cerebras_service import CerebrasService
from services.resume_service import ResumeService
from services.skill_service import SkillService
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cerebras_service = CerebrasService()
resume_service = ResumeService()
skill_service = SkillService()

class PromptRequest(BaseModel):
    prompt: str

class ResumeTextRequest(BaseModel):
    type: str  # experience or project
    text: str

class SkillExtractionRequest(BaseModel):
    resume_text: str

@app.get("/")
async def root():
    return {"message": "Welcome to Resumate API"}

@app.post("/analyze")
async def analyze_text(request: PromptRequest):
    response = await cerebras_service.get_completion(request.prompt)
    return response

@app.post("/optimize-resume")
async def optimize_resume(request: ResumeTextRequest):
    response = await resume_service.optimize_resume_text(request.text, request.type)
    return response

@app.post("/extract-skills")
async def extract_skills(request: SkillExtractionRequest):
    response = await skill_service.extract_skills(request.resume_text)
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)