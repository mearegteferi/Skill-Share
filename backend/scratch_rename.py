import os
import re

backend_dir = r'c:\Users\omen\Documents\Projects\Sofi\github\Skill-Share\backend'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex 1: from app... -> from app...
    new_content = re.sub(r'\bfrom src\b', 'from app', content)
    
    # Regex 2: import app... -> import app...
    new_content = re.sub(r'\bimport src\b', 'import app', new_content)
    
    # Regex 3: strings referencing src.something -> app.something
    new_content = re.sub(r'([\'"])src\.', r'\g<1>app.', new_content)
    
    # Regex 4: app/ -> app/ (for paths in toml, ini, dockerfile, md)
    new_content = re.sub(r'\bsrc/', 'app/', new_content)
    
    # Regex 5: src\ -> app\ (for windows paths if any)
    new_content = re.sub(r'\bsrc\\\\', r'app\\\\', new_content)
    
    # Regex 6: "app" -> "app"
    new_content = re.sub(r'([\'"])src([\'"])', r'\g<1>app\g<2>', new_content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')

for root, dirs, files in os.walk(backend_dir):
    if '.git' in root or '.venv' in root or '__pycache__' in root or '.idea' in root or '.pytest_cache' in root or '.ruff_cache' in root:
        continue
    for file in files:
        if file.endswith('.py') or file.endswith('.toml') or file.endswith('.ini') or file.endswith('.md') or file == 'Dockerfile' or file.endswith('.sh'):
            filepath = os.path.join(root, file)
            replace_in_file(filepath)

# Now rename the directory
src_dir = os.path.join(backend_dir, 'app')
app_dir = os.path.join(backend_dir, 'app')
if os.path.exists(src_dir):
    os.rename(src_dir, app_dir)
    print(f'Renamed {src_dir} to {app_dir}')
