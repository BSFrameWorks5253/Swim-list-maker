import os
import subprocess
import sys

# Ensure UTF-8 output encoding for Windows terminal compatibility
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REPO_URL = "https://github.com/BSFrameWorks5253/Swim-list-maker.git"

def run_command(cmd, ignore_errors=False):
    """Executes a shell command and prints live output."""
    print(f"-> Running: {' '.join(cmd) if isinstance(cmd, list) else cmd}")
    try:
        result = subprocess.run(cmd, check=not ignore_errors, text=True, capture_output=True, encoding='utf-8', errors='replace')
        if result.stdout.strip():
            print(result.stdout.strip())
        return result
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e.stderr.strip() if e.stderr else str(e)}")
        if not ignore_errors:
            sys.exit(1)
        return e

def main():
    print("==================================================")
    print("Auto-Publishing Attendance Sheet Studio to GitHub")
    print("==================================================")
    print(f"Target Repository: {REPO_URL}\n")

    # Step 1: Ensure Git is installed
    try:
        subprocess.run(["git", "--version"], check=True, capture_output=True)
    except Exception:
        print("Error: Git command line tool is not installed or not in PATH.")
        sys.exit(1)

    # Step 2: Initialize Git if needed
    if not os.path.exists(".git"):
        print("Initializing new Git repository...")
        run_command(["git", "init"])
    else:
        print("Existing Git repository detected.")

    # Step 3: Set or update remote URL
    remotes = run_command(["git", "remote"], ignore_errors=True).stdout.splitlines()
    if "origin" in remotes:
        print("Updating existing remote 'origin' URL...")
        run_command(["git", "remote", "set-url", "origin", REPO_URL])
    else:
        print("Adding remote 'origin'...")
        run_command(["git", "remote", "add", "origin", REPO_URL])

    # Step 4: Stage all files
    print("Staging all project files...")
    run_command(["git", "add", "."])

    # Step 5: Commit changes
    print("Creating git commit...")
    commit_res = run_command(["git", "commit", "-m", "Auto-publish Attendance Sheet Studio"], ignore_errors=True)
    if "nothing to commit" in commit_res.stdout:
        print("No new changes to commit.")

    # Step 6: Rename branch to main
    print("Setting branch to 'main'...")
    run_command(["git", "branch", "-M", "main"])

    # Step 7: Push to GitHub
    print("Pushing code to GitHub repository...")
    push_res = run_command(["git", "push", "-u", "origin", "main"], ignore_errors=True)

    if push_res.returncode == 0:
        print("\n==================================================")
        print("SUCCESS! Code successfully published to GitHub.")
        print("==================================================")
        print(f"Repository URL: {REPO_URL}")
        print("\nNext Step to Enable GitHub Pages (Free Web Hosting):")
        print("1. Open: https://github.com/BSFrameWorks5253/Swim-list-maker/settings/pages")
        print("2. Under 'Source', select 'Deploy from a branch'")
        print("3. Select 'main' branch and '/ (root)' folder, then click Save.")
        print("4. Your live app link will be: https://bsframeworks5253.github.io/Swim-list-maker/")
        print("==================================================")
    else:
        print("\nPush encountered an issue. Output:")
        if push_res.stderr:
            print(push_res.stderr)

if __name__ == "__main__":
    main()
