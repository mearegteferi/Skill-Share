import os
import re
import shutil

src_dir = r"c:\Users\omen\Documents\Projects\Sofi\github\Skill-Share\backend\src"

# 1. Moves
def move_file(src, dst):
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.move(src, dst)

move_file(os.path.join(src_dir, "core", "security.py"), os.path.join(src_dir, "security.py"))
move_file(os.path.join(src_dir, "api", "deps.py"), os.path.join(src_dir, "dependencies.py"))
move_file(os.path.join(src_dir, "users", "auth_router.py"), os.path.join(src_dir, "auth", "router.py"))

# Clean up core if empty
try:
    if os.path.exists(os.path.join(src_dir, "core", "__init__.py")):
        os.remove(os.path.join(src_dir, "core", "__init__.py"))
    os.rmdir(os.path.join(src_dir, "core"))
except:
    pass

# 2. Fix imports across all backend files
def process_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content
        # Fix the modules path
        new_content = re.sub(r'src\.modules\.users', 'app.users', new_content)
        new_content = re.sub(r'src\.core\.security', 'app.security', new_content)
        # Auth router was moved to src.auth.router
        new_content = re.sub(r'src\.users\.auth_router', 'app.auth.router', new_content)
        new_content = re.sub(r'src\.api\.deps', 'app.dependencies', new_content)

        if content != new_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error {filepath}: {e}")

for root, dirs, files in os.walk(r"c:\Users\omen\Documents\Projects\Sofi\github\Skill-Share\backend"):
    if ".venv" in root or "__pycache__" in root or ".idea" in root or ".git" in root or ".ruff_cache" in root or ".pytest_cache" in root:
        continue
    for file in files:
        if file.endswith(".py") or file in ("alembic.ini", "pyproject.toml", "pytest.ini"):
            process_file(os.path.join(root, file))
