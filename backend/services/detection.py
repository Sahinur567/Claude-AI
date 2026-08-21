import random

def analyze_text(text: str) -> dict:
    """
    Simulates statistical analysis to detect AI generation patterns.
    Since we don't have introspective access to actual cryptographic watermarks
    (as noted by Claude), this relies on simulated heuristic scoring.
    """
    # In a real production system, you might use a library or external API 
    # to calculate actual perplexity and burstiness.
    # Here we are simulating a response based on text length for demonstration.
    
    length = len(text)
    
    # Simple simulation logic
    if length < 50:
        probability = 0.1
        perplexity = 80.5
        burstiness = 0.8
        is_watermarked = False
        message = "Text is too short for reliable statistical detection."
    elif "watermark" in text.lower() or "anthropic" in text.lower():
        # High probability for text explicitly discussing it (like the user's prompt)
        probability = 0.95
        perplexity = 15.2 # Low perplexity (highly predictable)
        burstiness = 0.2
        is_watermarked = True
        message = "High statistical likelihood of AI generation detected."
    else:
        # Randomize slightly around a baseline for other texts
        probability = random.uniform(0.3, 0.7)
        perplexity = random.uniform(30.0, 60.0)
        burstiness = random.uniform(0.4, 0.6)
        is_watermarked = probability > 0.6
        message = "Analysis complete. Some predictable patterns found." if is_watermarked else "Analysis complete. Text appears human-like."

    return {
        "probability": probability,
        "perplexity": perplexity,
        "burstiness": burstiness,
        "is_watermarked": is_watermarked,
        "message": message
    }
