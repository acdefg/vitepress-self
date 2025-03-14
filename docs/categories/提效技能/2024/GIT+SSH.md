---
title: GIT+SSH
author: Cici
date: 2024/11/04 22:30
isTop: false
categories:
  - 提效技能
tags:
  - 工具用法
  - GIT
---
# GIT+SSH

## 常用指令
git clone git add git commit git push git pull git init git log

### 版本管理
git branch：创建分支
git checkout：切换分支
git merge：分支混合

### 远程
git remote git fetch git diff git pull
git fetch：从远程拉取到本地，但不会修改本地文件
git diff：查看本地和远程仓库的区别，git fetch 之后使用

### tips
vscode 使用 git graph 管理 git 分支非常方便
husky 可以管理 commit message

rebase checkout

## git 详细

### Git 安装

```text
# ubuntu 安装
sudo apt update
sudo apt install git

# 其它系统可以去官网下载包安装
```

### git 配置（git config）

```text
# 给git配置用户名
git config --global user.name 'wenjtop'
git config --global user.email "1007131354.@qq.com" 
# --global 全局信息，所有仓库都生效。不加只对当前仓库生效。
# --system 系统配置，所有用户都生效。很少使用。

git config --global credential store # 存储配置
git config --global --list           # 查看当前仓库配置信息
```

只配置当前仓库的信息，用于多用户配置时
```
git config user.name 'wenjtop'
git config user.email "1007131354.@qq.com"
```

查看配置：
```
git config user.name
git config user.email

git config -l #查看详细信息
```

取消 config 设置：
```
git config unset user.name
git config --global --unset user.name
git config --global --unset http.proxy #取消代理
```

### git 仓库建立
git clone
```
# 格式：git clone -b <分支名> <URL>
git clone -b rsdmike-patch-1 https://gitee.com/EdgexFoundry/edgex-examples.git

#不考虑分支
git clone https://xxxxx
git clone git@xxxx    #ssh
```

#### tips
```
git init  #本地文件夹标记为 git 仓库
git remote add origin git@github.com:wenjtop/RepositoryTest.git
git branch -M main   #-M 修改名称
git push -u origin main  #-u 设置默认 之后可以直接用 git push做同样的操作
git commit -a -m "first commit" # 可以同时执行add和commit操作
git add .   #添加当前目录下所有文件
```



