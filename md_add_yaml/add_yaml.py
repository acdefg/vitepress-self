import os
import sys
import shutil
import re
from datetime import datetime

def generate_yaml_content(file_name, is_top=False, categories="未整理", tags=None):
    if tags is None:
        tags = []

    date_now = datetime.now().strftime("%Y/%m/%d %H:%M")
    title = os.path.splitext(file_name)[0]  # 获取文件名作为标题

    yaml_content = f"""---
title: {title}
author: Cici
date: {date_now}
isTop: {str(is_top).lower()}
categories:
  - {categories}
tags:
  - {"\n  - ".join(tags)}
---
"""

    return yaml_content

def extract_yaml_content(original_content):
    # 使用正则表达式提取 YAML 部分
    yaml_regex = r'---\n(.*?)\n---'
    match = re.search(yaml_regex, original_content, re.DOTALL)
    return match.group(1).strip() if match else None

def update_yaml_content(yaml_content, is_top=None, categories=None, tags=None):
    lines = yaml_content.splitlines()
    updated_content = []

    for line in lines:
        if line.startswith("isTop:") and is_top is not None:
            line = f"isTop: {str(is_top).lower()}"
        elif line.startswith("categories:") and categories is not None:
            line = f"categories:\n  - {categories}"
        elif line.startswith("tags:") and tags is not None:
            line = f"tags:\n  - {'\n  - '.join(tags)}"
        updated_content.append(line)

    return "\n".join(updated_content)

def add_yaml_prefix(file_path, yaml_content):
    if not os.path.isfile(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        original_content = f.read()

    title = os.path.splitext(os.path.basename(file_path))[0]  # 文件名作为标题
    new_content = f"{yaml_content}\n# {title}\n\n{original_content}"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Added YAML prefix and title to: {file_path}")

def move_file_to_category(file_path, category, base_directory):
    # 保留子文件夹结构
    relative_path = os.path.relpath(file_path, base_directory)
    target_path = os.path.join("..", "docs", "categories", category, os.path.dirname(relative_path))
    
    os.makedirs(target_path, exist_ok=True)  # 创建目录（如果不存在）
    shutil.move(file_path, os.path.join(target_path, os.path.basename(file_path)))
    print(f"Moved {file_path} to {target_path}")

def process_markdown_files(directory, is_top=None, categories=None, tags=None, no_move=False):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    original_content = f.read()

                yaml_content = extract_yaml_content(original_content)

                if yaml_content:
                    # YAML 前缀存在，更新内容
                    updated_yaml = update_yaml_content(yaml_content, is_top, categories, tags)
                    new_content = re.sub(r'---\n.*?\n---', f'---\n{updated_yaml}\n---', original_content, flags=re.DOTALL)
                else:
                    # YAML 前缀不存在，创建新的
                    updated_yaml = generate_yaml_content(os.path.basename(file_path), is_top or False, categories or "未整理", tags)
                    title = os.path.splitext(os.path.basename(file_path))[0]
                    new_content = f"{updated_yaml}\n# {title}\n\n{original_content}"

                # 写入新内容
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated content for: {file_path}")

                # 移动文件
                if not no_move and categories:
                    move_file_to_category(file_path, categories, directory)

if __name__ == "__main__":
    # 默认配置
    is_top = None
    categories = None
    tags = []
    no_move = False

    # 解析命令行参数
    args = sys.argv[1:]
    directory = ""

    for arg in args:
        if arg.startswith("--isTop="):
            is_top = arg.split("=")[1].lower() == "true"
        elif arg.startswith("--tags="):
            tags = arg.split("=")[1].split(",")  # 以逗号分隔的多个标签
        elif arg.startswith("--categories="):
            categories = arg.split("=")[1]  # 获取类别
        elif arg == "--no-move":
            no_move = True
        else:
            directory = arg  # 文件夹路径

    if not directory:
        print("Usage: python script.py [--isTop=true|false] [--tags=tag1,tag2,...] [--categories=category] [--no-move] <directory_path>")
        sys.exit(1)

    process_markdown_files(directory, is_top, categories, tags, no_move)
