import os
import sys
import subprocess
import ftplib
import time
from datetime import datetime

# ==========================================
# FTP CONFIGURATION
# ==========================================
FTP_HOST = os.environ.get('FTP_HOST', '145.79.211.41')
FTP_USER = os.environ.get('FTP_USER', '')
FTP_PASS = os.environ.get('FTP_PASS', '')
FTP_PORT = int(os.environ.get('FTP_PORT', '21'))

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(WORKSPACE_DIR, 'frontend')
DIST_DIR = os.path.join(FRONTEND_DIR, 'dist')
SCRIPTS_DIR = os.path.join(WORKSPACE_DIR, 'backend', 'scripts')

def log(msg):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {msg}")

def run_script(script_name):
    script_path = os.path.join(SCRIPTS_DIR, script_name)
    if not os.path.exists(script_path):
        log(f"ERROR: Cannot find {script_name} at {script_path}")
        return False
    
    log(f"--- Running {script_name} ---")
    try:
        # Run python script
        result = subprocess.run([sys.executable, script_path], cwd=WORKSPACE_DIR, capture_output=True, text=True)
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(result.stderr)
            
        if result.returncode != 0:
            log(f"ERROR: {script_name} failed with exit code {result.returncode}")
            return False
        return True
    except Exception as e:
        log(f"Exception running {script_name}: {e}")
        return False

def build_frontend():
    log("--- Building Frontend ---")
    try:
        # shell=True is needed on Windows for npm
        result = subprocess.run(["npm", "run", "build"], cwd=FRONTEND_DIR, shell=True, capture_output=True, text=True)
        if result.returncode != 0:
            log(f"ERROR: Frontend build failed:\n{result.stderr}")
            return False
        log("Frontend built successfully.")
        return True
    except Exception as e:
        log(f"Exception building frontend: {e}")
        return False

def upload_dir_ftp(ftp, local_dir, remote_dir):
    try:
        ftp.mkd(remote_dir)
    except Exception:
        pass # Ignore if exists
    
    ftp.cwd(remote_dir)
    
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isfile(local_path):
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
        elif os.path.isdir(local_path):
            upload_dir_ftp(ftp, local_path, item)
            ftp.cwd('..')

def deploy_to_ftp():
    log("--- Deploying to FTP ---")
    try:
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, FTP_PORT, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        log("Connected to FTP server.")
        
        # We start in public_html
        for item in os.listdir(DIST_DIR):
            local_path = os.path.join(DIST_DIR, item)
            if os.path.isfile(local_path):
                with open(local_path, 'rb') as f:
                    ftp.storbinary(f'STOR {item}', f)
            elif os.path.isdir(local_path):
                upload_dir_ftp(ftp, local_path, item)
                ftp.cwd('..')
                
        ftp.quit()
        log("FTP deployment complete.")
        return True
    except Exception as e:
        log(f"ERROR during FTP deployment: {e}")
        return False

def main():
    log("==========================================")
    log("  STARTING MASTER DAILY AUTOMATION CYCLE")
    log("==========================================")
    
    # 1. Generate Blog
    if not run_script('seo_blog_generator.py'):
        log("Aborting automation cycle due to blog generation failure.")
        return
        
    # 2. Build Frontend with new blog index
    if not build_frontend():
        log("Aborting automation cycle due to build failure.")
        return
        
    # 3. Deploy to Hostinger
    if not deploy_to_ftp():
        log("Aborting automation cycle due to deployment failure.")
        return
        
    # 4. Auto Backlinker (Syndicate to Dev.to)
    run_script('auto_backlinker.py')
    
    # 5. Social Poster (Twitter/Reddit)
    run_script('social_poster.py')
    
    log("==========================================")
    log("  MASTER AUTOMATION CYCLE COMPLETE")
    log("==========================================")

if __name__ == "__main__":
    main()
