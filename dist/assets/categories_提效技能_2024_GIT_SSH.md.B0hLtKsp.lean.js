import{_ as s,c as n,a8 as e,o as i}from"./chunks/framework.CElktlHO.js";const b=JSON.parse('{"title":"GIT+SSH","description":"","frontmatter":{"title":"GIT+SSH","author":"Cici","date":"2024/11/04 22:30","isTop":false,"categories":["提效技能"],"tags":["工具用法","GIT"]},"headers":[],"relativePath":"categories/提效技能/2024/GIT+SSH.md","filePath":"categories/提效技能/2024/GIT+SSH.md","lastUpdated":1730768517000}'),p={name:"categories/提效技能/2024/GIT+SSH.md"};function t(l,a,r,c,o,d){return i(),n("div",null,a[0]||(a[0]=[e(`<h1 id="git-ssh" tabindex="-1">GIT+SSH <a class="header-anchor" href="#git-ssh" aria-label="Permalink to &quot;GIT+SSH&quot;">​</a></h1><h2 id="常用指令" tabindex="-1">常用指令 <a class="header-anchor" href="#常用指令" aria-label="Permalink to &quot;常用指令&quot;">​</a></h2><p>git clone git add git commit git push git pull git init git log</p><h3 id="版本管理" tabindex="-1">版本管理 <a class="header-anchor" href="#版本管理" aria-label="Permalink to &quot;版本管理&quot;">​</a></h3><p>git branch：创建分支 git checkout：切换分支 git merge：分支混合</p><h3 id="远程" tabindex="-1">远程 <a class="header-anchor" href="#远程" aria-label="Permalink to &quot;远程&quot;">​</a></h3><p>git remote git fetch git diff git pull git fetch：从远程拉取到本地，但不会修改本地文件 git diff：查看本地和远程仓库的区别，git fetch 之后使用</p><h3 id="tips" tabindex="-1">tips <a class="header-anchor" href="#tips" aria-label="Permalink to &quot;tips&quot;">​</a></h3><p>vscode 使用 git graph 管理 git 分支非常方便 husky 可以管理 commit message</p><p>rebase checkout</p><h2 id="git-详细" tabindex="-1">git 详细 <a class="header-anchor" href="#git-详细" aria-label="Permalink to &quot;git 详细&quot;">​</a></h2><h3 id="git-安装" tabindex="-1">Git 安装 <a class="header-anchor" href="#git-安装" aria-label="Permalink to &quot;Git 安装&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># ubuntu 安装</span></span>
<span class="line"><span>sudo apt update</span></span>
<span class="line"><span>sudo apt install git</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 其它系统可以去官网下载包安装</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="git-配置-git-config" tabindex="-1">git 配置（git config） <a class="header-anchor" href="#git-配置-git-config" aria-label="Permalink to &quot;git 配置（git config）&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 给git配置用户名</span></span>
<span class="line"><span>git config --global user.name &#39;wenjtop&#39;</span></span>
<span class="line"><span>git config --global user.email &quot;1007131354.@qq.com&quot; </span></span>
<span class="line"><span># --global 全局信息，所有仓库都生效。不加只对当前仓库生效。</span></span>
<span class="line"><span># --system 系统配置，所有用户都生效。很少使用。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git config --global credential store # 存储配置</span></span>
<span class="line"><span>git config --global --list           # 查看当前仓库配置信息</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>只配置当前仓库的信息，用于多用户配置时</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git config user.name &#39;wenjtop&#39;</span></span>
<span class="line"><span>git config user.email &quot;1007131354.@qq.com&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>查看配置：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git config user.name</span></span>
<span class="line"><span>git config user.email</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git config -l #查看详细信息</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>取消 config 设置：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git config unset user.name</span></span>
<span class="line"><span>git config --global --unset user.name</span></span>
<span class="line"><span>git config --global --unset http.proxy #取消代理</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="git-仓库建立" tabindex="-1">git 仓库建立 <a class="header-anchor" href="#git-仓库建立" aria-label="Permalink to &quot;git 仓库建立&quot;">​</a></h3><p>git clone</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 格式：git clone -b &lt;分支名&gt; &lt;URL&gt;</span></span>
<span class="line"><span>git clone -b rsdmike-patch-1 https://gitee.com/EdgexFoundry/edgex-examples.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#不考虑分支</span></span>
<span class="line"><span>git clone https://xxxxx</span></span>
<span class="line"><span>git clone git@xxxx    #ssh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="tips-1" tabindex="-1">tips <a class="header-anchor" href="#tips-1" aria-label="Permalink to &quot;tips&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git init  #本地文件夹标记为 git 仓库</span></span>
<span class="line"><span>git remote add origin git@github.com:wenjtop/RepositoryTest.git</span></span>
<span class="line"><span>git branch -M main   #-M 修改名称</span></span>
<span class="line"><span>git push -u origin main  #-u 设置默认 之后可以直接用 git push做同样的操作</span></span>
<span class="line"><span>git commit -a -m &quot;first commit&quot; # 可以同时执行add和commit操作</span></span>
<span class="line"><span>git add .   #添加当前目录下所有文件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,26)]))}const u=s(p,[["render",t]]);export{b as __pageData,u as default};
