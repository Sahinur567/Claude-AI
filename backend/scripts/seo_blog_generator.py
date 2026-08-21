import os
import json
import datetime
import re
import random

try:
    from google import genai
except ImportError:
    print("Google GenAI library not found. Please install it using: pip install google-genai")
    exit(1)

# Initialize Gemini Client
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set.")
    exit(1)
    
client = genai.Client(api_key=GEMINI_API_KEY)

def generate_seo_blog_post(topic, keywords):
    """
    Calls the Google Gemini API to generate an SEO-optimized blog post in Markdown format.
    """
    print(f"Generating blog post for: {topic}...")
    
    prompt = f"""
    Write a high-quality, professional, and SEO-optimized blog post (around 800-1000 words) in Markdown format about '{topic}'.
    Make sure to naturally include these keywords: {', '.join(keywords)}.
    The blog post should be informative, engaging, and directly related to AI text generation, AI watermarks, or bypassing AI detection.
    
    IMPORTANT INSTRUCTION: The very first line of your response MUST be a catchy, unique title for the article starting with a single #. 
    Make the title unique every time (for example, add "A 2026 Guide", or "Expert Analysis", etc).
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=prompt
        )
        content = response.text.strip()
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None, None, None
    
    # Extract the dynamic title from the first line
    lines = content.split('\n')
    dynamic_title = topic
    if lines and lines[0].startswith('#'):
        dynamic_title = lines[0].replace('#', '').strip()
        # Remove the title from the body so we can inject our image below it
        content = '\n'.join(lines[1:]).strip()
    
    current_date = datetime.datetime.now().strftime("%B %d, %Y")
    slug = re.sub(r'[^a-z0-9]+', '-', dynamic_title.lower()).strip('-') + f"-{random.randint(1000, 9999)}"
    
    # Generate a random seed for the dynamic image so it's unique per post
    random_seed = random.randint(1, 100000)
    header_image_url = f"https://loremflickr.com/1200/630/technology,ai,computer?random={random_seed}"
    
    # Prepend the Title, Image, and Date to the generated markdown content
    formatted_content = f"# {dynamic_title}\n\n![AI Technology Header]({header_image_url})\n\n*Published on: {current_date}*\n\n{content}"
    
    return slug, formatted_content, dynamic_title

def generate_sitemap(blog_metadata, frontend_public_dir):
    static_urls = [
        ("https://claudewatermarkremover.space/", "1.0"),
        ("https://claudewatermarkremover.space/claude-watermark-remover", "0.9"),
        ("https://claudewatermarkremover.space/claude-watermark-detector", "0.9"),
        ("https://claudewatermarkremover.space/how-it-works", "0.8"),
        ("https://claudewatermarkremover.space/features", "0.8"),
        ("https://claudewatermarkremover.space/faq", "0.7"),
        ("https://claudewatermarkremover.space/blog", "0.7"),
        ("https://claudewatermarkremover.space/about", "0.6"),
        ("https://claudewatermarkremover.space/privacy-policy", "0.5"),
        ("https://claudewatermarkremover.space/terms-of-service", "0.5"),
        ("https://claudewatermarkremover.space/disclaimer", "0.5"),
    ]
    
    sitemap_lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    sitemap_lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    # Add Static URLs
    for url, priority in static_urls:
        sitemap_lines.append(f'  <url><loc>{url}</loc><priority>{priority}</priority></url>')
        
    # Add Dynamic Blog URLs
    for blog in blog_metadata:
        url = f"https://claudewatermarkremover.space/post/{blog['slug']}"
        # date format in json is YYYY-MM-DDTHH:MM:SS, sitemap needs YYYY-MM-DD
        lastmod = blog['date'].split('T')[0]
        sitemap_lines.append(f'  <url><loc>{url}</loc><lastmod>{lastmod}</lastmod><priority>0.8</priority></url>')
        
    sitemap_lines.append('</urlset>')
    
    sitemap_path = os.path.join(frontend_public_dir, 'sitemap.xml')
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_lines))
    print(f"Sitemap regenerated successfully at {sitemap_path}")

def main():
    # Massive SEO keyword expansion (50+ clusters grouped into tuples)
    blog_topics = [
        ("How to Bypass GPTZero in 2026", ["GPTZero bypass", "AI detection evasion", "undetectable AI"]),
        ("Claude 3.5 Sonnet Watermark Detection", ["Claude 3.5 Sonnet watermark", "detect Claude AI", "remove Claude footprint"]),
        ("Best Stealth AI Writing Tools", ["Stealth AI writer", "bypass AI checks", "AI humanizer tool"]),
        ("Can Turnitin Detect ChatGPT 4?", ["Turnitin ChatGPT detection", "Turnitin AI checker accuracy", "evade Turnitin"]),
        ("How to Humanize AI Content Automatically", ["Humanize AI content", "AI paraphrase tool", "make AI sound human"]),
        ("Understanding Statistical Watermarks in LLMs", ["LLM watermarking", "statistical watermark detection", "AI text fingerprint"]),
        ("Why Do AI Detectors Have False Positives?", ["AI detector false positive", "AI plagiarism falsely flagged", "human writing marked as AI"]),
        ("The Ethics of AI Watermark Removal", ["AI watermark removal ethics", "academic integrity AI", "stealth AI usage"]),
        ("How to Remove Hidden AI Formatting", ["Remove AI formatting", "ChatGPT copy paste traces", "clean AI text"]),
        ("Top 5 Tools to Bypass AI Detection", ["bypass AI detection tools", "undetectable AI alternatives", "best AI humanizers"]),
        ("Does Winston AI Detect Claude Text?", ["Winston AI detector", "detect Claude 3", "bypass Winston AI"]),
        ("How to Rewrite AI Text to Pass Copyleaks", ["Copyleaks bypass", "AI rewriter for Copyleaks", "evade Copyleaks detection"]),
        ("The Future of AI Detection Evasion Algorithms", ["AI evasion algorithms", "future of AI text generation", "adversarial AI prompting"]),
        ("What is Perplexity and Burstiness in AI Writing?", ["Perplexity AI detection", "burstiness AI text", "how AI detectors work"]),
        ("How to Make ChatGPT Write Like a Human", ["ChatGPT human writing style", "AI prompt engineering for stealth", "natural AI text"]),
        ("Detecting AI Text in Academic Essays", ["AI detection in essays", "university AI policies", "Turnitin alternatives"]),
        ("Can Google Detect AI Generated SEO Content?", ["Google AI content update", "SEO AI detection", "rank AI content on Google"]),
        ("How to Mask AI Generation Traces", ["Mask AI traces", "hide AI footprints", "AI text scrubber"]),
        ("The Battle Between AI Detectors and Generators", ["AI arms race", "LLM detection vs generation", "stealth text technology"]),
        ("How to Use AI for Writing Without Getting Caught", ["Write with AI safely", "undetectable AI usage", "avoid AI detection flags"])
    ]
    
    # Pick ONE random topic to generate today
    topic, keywords = random.choice(blog_topics)
    
    # Paths
    frontend_public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'public'))
    output_dir = os.path.join(frontend_public_dir, 'blogs')
    os.makedirs(output_dir, exist_ok=True)
    
    # Load existing index to append to it
    index_path = os.path.join(output_dir, "blog_index.json")
    blog_metadata = []
    if os.path.exists(index_path):
        try:
            with open(index_path, "r", encoding="utf-8") as f:
                blog_metadata = json.load(f)
        except Exception:
            pass
            
    slug, content, final_title = generate_seo_blog_post(topic, keywords)
    
    if not slug or not content:
        print("Failed to generate blog post.")
        return
        
    # Save Markdown file
    file_path = os.path.join(output_dir, f"{slug}.md")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {file_path}")
    
    # Prepend new metadata for the frontend to list
    new_entry = {
        "title": final_title,
        "slug": slug,
        "date": datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S"), # Use exact timestamp to ensure it's always the newest
        "excerpt": f"Learn the secrets behind {keywords[0]} and how to effectively manage AI generated content.",
        "file": f"/blogs/{slug}.md"
    }
    blog_metadata.insert(0, new_entry)
    
    # Save the updated index file for the frontend
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(blog_metadata, f, indent=4)
        
    print(f"Saved updated blog index to {index_path}")
    
    # Regenerate sitemap.xml dynamically
    generate_sitemap(blog_metadata, frontend_public_dir)
    
    print("Blog generation and sitemap update complete.")

if __name__ == "__main__":
    main()
