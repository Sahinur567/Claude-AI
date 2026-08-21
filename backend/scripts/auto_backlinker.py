import os
import json
import time
import requests
from datetime import datetime

# ==========================================
# CONFIGURATION - ADD YOUR API KEYS HERE
# ==========================================
DEV_TO_API_KEY = os.environ.get("DEV_TO_API_KEY", "your_dev_to_api_key_here")
MEDIUM_INTEGRATION_TOKEN = os.environ.get("MEDIUM_INTEGRATION_TOKEN", "your_medium_token_here")
MEDIUM_AUTHOR_ID = os.environ.get("MEDIUM_AUTHOR_ID", "your_medium_author_id_here")

# Paths
FRONTEND_PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'public')
BLOG_INDEX_PATH = os.path.join(FRONTEND_PUBLIC_DIR, 'blogs', 'blog_index.json')
BLOGS_DIR = os.path.join(FRONTEND_PUBLIC_DIR, 'blogs')

# Main Website URL
MAIN_WEBSITE_URL = "https://claudewatermarkremover.space"

def get_latest_blog():
    """Reads the blog_index.json and returns the latest blog post data."""
    if not os.path.exists(BLOG_INDEX_PATH):
        print("Blog index not found. Run seo_blog_generator.py first.")
        return None
        
    with open(BLOG_INDEX_PATH, 'r', encoding='utf-8') as f:
        blogs = json.load(f)
        
    if not blogs:
        return None
        
    # Sort by date descending and get the latest
    blogs.sort(key=lambda x: x['date'], reverse=True)
    return blogs[0]

def append_backlink(content, original_url):
    """Appends a high-quality SEO backlink to the end of the article."""
    backlink_markdown = f"""

---
### Elevate Your AI Document Workflow

Are you concerned about AI detection or statistical watermarks in your text? 
Ensure your content is indistinguishable from human writing with our Enterprise-Grade 
[Claude Watermark Remover]({MAIN_WEBSITE_URL}). Experience unparalleled accuracy and bypass detection algorithms effortlessly.
"""
    return content + backlink_markdown

def post_to_dev_to(title, content, tags, original_url):
    """Syndicates the article to Dev.to via API."""
    if DEV_TO_API_KEY == "your_dev_to_api_key_here":
        print("[DRY RUN] Dev.to API Key not set. Simulating post to Dev.to...")
        print(f"Would post: {title}")
        return True

    headers = {
        "Content-Type": "application/json",
        "api-key": DEV_TO_API_KEY
    }
    
    payload = {
        "article": {
            "title": title,
            "body_markdown": content,
            "published": True,
            "tags": tags,
            "canonical_url": original_url
        }
    }
    
    print("Publishing to Dev.to...")
    response = requests.post("https://dev.to/api/articles", json=payload, headers=headers)
    
    if response.status_code == 201:
        print(f"Successfully published to Dev.to! URL: {response.json().get('url')}")
        return True
    else:
        print(f"Failed to publish to Dev.to: {response.text}")
        return False

def get_medium_author_id(headers):
    """Fetches the Medium Author ID using the Integration Token."""
    print("Fetching Medium Author ID...")
    response = requests.get("https://api.medium.com/v1/me", headers=headers)
    if response.status_code == 200:
        author_id = response.json().get('data', {}).get('id')
        print(f"Successfully retrieved Author ID: {author_id}")
        return author_id
    else:
        print(f"Failed to fetch Author ID: {response.text}")
        return None

def post_to_medium(title, content, tags, original_url):
    """Syndicates the article to Medium via API."""
    global MEDIUM_AUTHOR_ID
    
    if MEDIUM_INTEGRATION_TOKEN == "your_medium_token_here":
        print("[DRY RUN] Medium Token not set. Simulating post to Medium...")
        print(f"Would post: {title}")
        return True

    headers = {
        "Authorization": f"Bearer {MEDIUM_INTEGRATION_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    }
    
    # Auto-fetch Author ID if not set
    if MEDIUM_AUTHOR_ID == "your_medium_author_id_here" or not MEDIUM_AUTHOR_ID:
        MEDIUM_AUTHOR_ID = get_medium_author_id(headers)
        if not MEDIUM_AUTHOR_ID:
            return False
    
    payload = {
        "title": title,
        "contentFormat": "markdown",
        "content": content,
        "canonicalUrl": original_url,
        "tags": tags[:5], # Medium allows max 5 tags
        "publishStatus": "public" 
    }
    
    print("Publishing to Medium...")
    url = f"https://api.medium.com/v1/users/{MEDIUM_AUTHOR_ID}/posts"
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 201:
        print(f"Successfully published to Medium! URL: {response.json().get('data', {}).get('url')}")
        return True
    else:
        print(f"Failed to publish to Medium: {response.text}")
        return False

def main():
    print(f"--- Starting Web 2.0 Syndication Script at {datetime.now()} ---")
    
    latest_blog = get_latest_blog()
    if not latest_blog:
        print("No blogs found to syndicate.")
        return
        
    slug = latest_blog['slug']
    title = latest_blog['title']
    tags = ["ai", "seo", "technology", "writing"]
    
    # Construct original URL for canonical tags (Very important for SEO!)
    original_url = f"{MAIN_WEBSITE_URL}/post/{slug}"
    
    # Read the actual markdown file
    md_path = os.path.join(BLOGS_DIR, f"{slug}.md")
    if not os.path.exists(md_path):
        print(f"Markdown file {md_path} not found.")
        return
        
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Inject our SEO Backlink at the bottom
    syndicated_content = append_backlink(content, original_url)
    
    print(f"Processing article: '{title}'")
    
    # Publish to platforms
    post_to_dev_to(title, syndicated_content, tags, original_url)
    
    time.sleep(2) # Avoid rate limits
    
    post_to_medium(title, syndicated_content, tags, original_url)
    
    print("--- Syndication Complete ---")
    print("NOTE: To make this run automatically, run this script as a daily cron job!")

if __name__ == "__main__":
    main()
