import{_ as s,c as a,o as i,ab as n}from"./chunks/framework.Dd7dmwBs.js";const b=JSON.parse('{"title":"Appimage格式文件安装","description":"","frontmatter":{"title":"Appimage格式文件安装","author":"Cici","date":"2024/11/04 23:56","isTop":false,"categories":["ubuntu"],"tags":["tool","Appimage"]},"headers":[],"relativePath":"categories/ubuntu/一些工具安装/Appimage格式文件安装.md","filePath":"categories/ubuntu/一些工具安装/Appimage格式文件安装.md","lastUpdated":1732674868000}'),e={name:"categories/ubuntu/一些工具安装/Appimage格式文件安装.md"},p=n(`<h1 id="appimage格式文件安装" tabindex="-1">Appimage格式文件安装 <a class="header-anchor" href="#appimage格式文件安装" aria-label="Permalink to &quot;Appimage格式文件安装&quot;">​</a></h1><p>以 obsidian 的安装为例：</p><h2 id="运行" tabindex="-1">运行 <a class="header-anchor" href="#运行" aria-label="Permalink to &quot;运行&quot;">​</a></h2><p>为下载好的 AppImage文件赋予可执行权限：</p><ul><li>右键——&gt;属性——&gt;权限——&gt;勾选下方“允许文件作为程序执行” 或者 在该文件路径下，终端输入 <code>chmod +x Obsidian-0.14.2.AppImage</code></li><li>双击该文件就可以运行了</li></ul><h2 id="快捷方式添加" tabindex="-1">快捷方式添加 <a class="header-anchor" href="#快捷方式添加" aria-label="Permalink to &quot;快捷方式添加&quot;">​</a></h2><h3 id="简单说明" tabindex="-1">简单说明 <a class="header-anchor" href="#简单说明" aria-label="Permalink to &quot;简单说明&quot;">​</a></h3><p>需要切换到root模式</p><p>(possibly need root right, I&#39;ve already changed root setting, see [[配置中一些小问题]])</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/applications</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> obsidian.desktop</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在该文件中写入：（需要改：Exec=(AppImage路径)，Icon=(logo路径)）</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[Desktop Entry]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Obsidian</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Exec</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/Obsidian/Obsidian-0.14.2.AppImage</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Icon</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/Obsidian/obsidian.png</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">           </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Application</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">StartupNotify</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>或：</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nautilus</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>手动找到/usr/share/applications <code>sudo vim obsidian.desktop</code>加入一样的内容</p><h3 id="找-icon-的方法" tabindex="-1">找 ICON 的方法 <a class="header-anchor" href="#找-icon-的方法" aria-label="Permalink to &quot;找 ICON 的方法&quot;">​</a></h3><p>实际上，我添加的desktop的内容是从appimage中解压出来的 参考：<a href="https://blog.csdn.net/jiang_huixin/article/details/106037973" target="_blank" rel="noreferrer">AppImage 设置为图标启动(以 Wiznote和Navicat 为例)</a> 包含两种APPIMAGE解压方式 在appimage文件路径中打开终端，输入</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./Obsidian.AppImage</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --appimage-extract</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>进行解压，解压文件中包含.desktop和logo .desktop 内容如下，可以直接用下面的，改变 Exec 和 Icon两个路径即可</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[Desktop Entry]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Obsidian</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Exec</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">AppRun</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> --no-sandbox</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %U</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Terminal</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Application</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Icon</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">obsidian</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">StartupWMClass</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">obsidian</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-AppImage-Version</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.14</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Comment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Obsidian</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MimeType</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">x-scheme-handler/obsidian</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Categories</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Office</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>！要将.desktop文件也赋予可执行权限，方法同上</p><blockquote><p>note:尝试好几次失败的原因可能是引用了中文路径，之前放在“下载”文件夹中不成功，放在根目录后成功了</p></blockquote><div class="language-ad-warning vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ad-warning</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>要将.desktop文件也赋予可执行权限，方法同上</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-ad-note vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ad-note</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>尝试好几次失败的原因可能是引用了中文路径，之前放在“下载”文件夹中不成功，放在根目录后成功了</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,24),l=[p];function t(h,r,k,d,c,o){return i(),a("div",null,l)}const u=s(e,[["render",t]]);export{b as __pageData,u as default};
