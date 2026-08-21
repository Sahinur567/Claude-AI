from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.detection import analyze_text
from services.paraphrase import restructure_text
import uvicorn

app = FastAPI(
    title="AI Watermark Detection API",
    description="API for simulating statistical watermark detection and text paraphrasing.",
    version="1.0.0",
)

# CORS configuration for production readiness
# Replace "*" with specific frontend domain (e.g., ["https://yourfrontend.com"]) in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str

class AnalysisResponse(BaseModel):
    probability: float
    perplexity: float
    burstiness: float
    is_watermarked: bool
    message: str

class ParaphraseResponse(BaseModel):
    original_text: str
    paraphrased_text: str

@app.get("/")
def root():
    return {"status": "ok", "message": "AI Watermark Detection API is running."}

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_endpoint(request: TextRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    if len(request.text) > 100000:
        raise HTTPException(status_code=400, detail="Text too long. Max 100,000 (1 Lakh) characters.")
    
    # Run simulated analysis
    result = analyze_text(request.text)
    return result

@app.post("/api/paraphrase", response_model=ParaphraseResponse)
async def paraphrase_endpoint(request: TextRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    
    # Mock LLM API call (since we don't have an API key right now)
    # In a real production app, this would call OpenAI/Anthropic
    try:
        paraphrased = restructure_text(request.text)
        return ParaphraseResponse(
            original_text=request.text,
            paraphrased_text=paraphrased
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Paraphrasing failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
