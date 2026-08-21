import json
import os
import random
import time
import sys
import codecs

# Fix for windows unicode terminal printing
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

def generate_social_post(blog_title, slug):
    """
    Generates a catchy social media post based on the blog title.
    """
    templates = [
        "Just dropped a new guide on {title}! 🚀 Check it out here: {link} #AI #EdTech #Watermark",
        "Are you struggling with AI detection? Our latest research on '{title}' explains everything you need to know. 👇\n{link} #ChatGPT #AI",
        "🚨 New Post Alert: {title}\nLearn how to navigate AI text footprints and humanize your content.\nRead more: {link}"
    ]
    
    template = random.choice(templates)
    link = f"https://claudewatermarkremover.space/post/{slug}"
    return template.format(title=blog_title, link=link)

def post_to_twitter(text):
    """
    Simulates posting to Twitter/X API.
    In production, use tweepy and X API credentials.
    """
    print(f"[Twitter API] Authenticating...")
    time.sleep(1)
    print(f"[Twitter API] Successfully posted tweet:\n\n{text}\n")
    print("-" * 40)

def post_to_reddit(title, text):
    """
    Simulates posting to Reddit API (e.g., r/OpenAI, r/ChatGPT).
    In production, use praw.
    """
    print(f"[Reddit API] Authenticating...")
    time.sleep(1)
    print(f"[Reddit API] Successfully posted to r/Student:\nTitle: {title}\nBody: {text}\n")
    print("-" * 40)

def main():
    blog_index_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'public', 'blogs', 'blog_index.json'))
    
    if not os.path.exists(blog_index_path):
        print("Blog index not found. Run seo_blog_generator.py first.")
        return
        
    with open(blog_index_path, "r", encoding="utf-8") as f:
        blogs = json.load(f)
        
    if not blogs:
        print("No blogs to post.")
        return
        
    print(f"Loaded {len(blogs)} blogs. Starting social media automation sequence...\n")
    
    for blog in blogs:
        # Generate Social Text
        social_text = generate_social_post(blog['title'], blog['slug'])
        
        # Post to Platforms
        post_to_twitter(social_text)
        post_to_reddit(blog['title'], social_text)
        
        # Wait between posts to avoid rate limiting
        print("Waiting for next scheduled post...\n")
        time.sleep(2) # Simulated delay
        
    print("Social media automation complete. Traffic is on the way! 🚀")

if __name__ == "__main__":
    main()
