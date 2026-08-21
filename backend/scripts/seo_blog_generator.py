import os
import json
import datetime
import re
import random

try:
    from openai import OpenAI
except ImportError:
    print("OpenAI library not found. Please install it using: pip install openai")
    exit(1)

# Initialize OpenAI Client
# Must provide API key via environment variable: OPENAI_API_KEY
client = OpenAI()

def generate_seo_blog_post(topic, keywords):
    """
    Calls the OpenAI API to generate an SEO-optimized blog post in Markdown format.
    """
    print(f"Generating blog post for: {topic}...")
    
    prompt = f"""
    Write a high-quality, professional, and SEO-optimized blog post (around 800-1000 words) in Markdown format about '{topic}'.
    Make sure to naturally include these keywords: {', '.join(keywords)}.
    The blog post should be informative, engaging, and directly related to AI text generation, AI watermarks, or bypassing AI detection.
    Do NOT include a main # Heading at the very top (I will add it programmatically), start straight with the introduction or ## subheadings.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert SEO content writer and AI specialist."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        content = response.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return None, None
    
    current_date = datetime.datetime.now().strftime("%B %d, %Y")
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-') + f"-{random.randint(1000, 9999)}"
    
    # Prepend the Title and Date to the generated markdown content
    formatted_content = f"# {topic}\n\n*Published on: {current_date}*\n\n{content}"
    
    return slug, formatted_content

def main():
    # A list of diverse topics to choose from randomly each day
    blog_topics = [
        ("How to Bypass Turnitin AI Detection in 2026", ["Turnitin AI detection", "AI text watermarks", "Turnitin bypass tool"]),
        ("The Ultimate ChatGPT Watermark Remover Guide", ["ChatGPT watermark remover", "Remove AI footprint", "Humanize AI text"]),
        ("Can Universities Detect Claude 3.5 Sonnet?", ["Claude 3.5 Sonnet detection", "AI academic integrity", "Claude text humanizer"]),
        ("Why AI Detectors Fail: The False Positive Problem", ["AI detector false positive", "AI writing detection error", "bypass AI checks"]),
        ("Humanizing AI Content: Best Practices for 2026", ["Humanize AI content", "AI paraphrase tool", "undetectable AI writing"]),
        ("The Future of AI Watermarking Technologies", ["AI watermark techniques", "detecting AI generated text", "LLM watermarking"])
    ]
    
    # Pick ONE random topic to generate today so we don't spam the API or Dev.to
    topic, keywords = random.choice(blog_topics)
    
    # Create the output directory if it doesn't exist
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'public', 'blogs'))
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
            
    slug, content = generate_seo_blog_post(topic, keywords)
    
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
        "title": topic,
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
    print("Blog generation complete.")

if __name__ == "__main__":
    main()
