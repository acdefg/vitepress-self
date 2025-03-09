import{_ as a,c as n,a8 as e,o as i}from"./chunks/framework.CElktlHO.js";const c=JSON.parse('{"title":"安装node.js","description":"","frontmatter":{"title":"安装node.js","author":"Cici","date":"2024/11/04 23:56","isTop":false,"categories":["ubuntu"],"tags":["tool"]},"headers":[],"relativePath":"categories/ubuntu/一些配置/安装node.js.md","filePath":"categories/ubuntu/一些配置/安装node.js.md","lastUpdated":1730736460000}'),p={name:"categories/ubuntu/一些配置/安装node.js.md"};function l(t,s,d,r,o,h){return i(),n("div",null,s[0]||(s[0]=[e(`<h1 id="安装node-js" tabindex="-1">安装node.js <a class="header-anchor" href="#安装node-js" aria-label="Permalink to &quot;安装node.js&quot;">​</a></h1><p>ubuntu版参考：<a href="https://developer.aliyun.com/article/760687" target="_blank" rel="noreferrer">https://developer.aliyun.com/article/760687</a> 以下为上面链接提取出来的部分</p><ul><li>自动安装</li></ul><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodejs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这个自动安装nodejs为10.X，npm为6.14.4 查询版本代码为：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node --version</span></span>
<span class="line"><span>npm --version</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>指定版本</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -</span></span>
<span class="line"><span>sudo apt-get install -y nodejs</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>将14.x改成任意版本即可</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -sL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://deb.nodesource.com/setup_16.x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sudo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -E</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodejs</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>将16.x改成任意版本即可</p><p>第一句添加源，第二句安装 如没有安装curl，就像我，会报错，按照提示安装即可</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt install curl</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>提示：(没处理完，gcc已安装)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>## Run \`sudo apt-get install -y nodejs\` to install Node.js 16.x and npm</span></span>
<span class="line"><span>## You may also need development tools to build native addons:</span></span>
<span class="line"><span>     sudo apt-get install gcc g++ make</span></span>
<span class="line"><span>## To install the Yarn package manager, run:</span></span>
<span class="line"><span>     curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg &gt;/dev/null</span></span>
<span class="line"><span>     echo &quot;deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main&quot; | sudo tee /etc/apt/sources.list.d/yarn.list</span></span>
<span class="line"><span>     sudo apt-get update &amp;&amp; sudo apt-get install yarn</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul><li>nvm管理多个安装版本(没弄，暂时没必要)</li></ul>`,16)]))}const k=a(p,[["render",l]]);export{c as __pageData,k as default};
