import{_ as e,c as s,a8 as n,o as t}from"./chunks/framework.CElktlHO.js";const u=JSON.parse('{"title":"在 zsh 中添加路径","description":"","frontmatter":{"title":"在 zsh 中添加路径","author":"Cici","date":"2024/11/04 23:56","isTop":false,"categories":["ubuntu"],"tags":["tool"]},"headers":[],"relativePath":"categories/ubuntu/ubtuntu配置/在 zsh 中添加路径.md","filePath":"categories/ubuntu/ubtuntu配置/在 zsh 中添加路径.md","lastUpdated":1730736460000}'),p={name:"categories/ubuntu/ubtuntu配置/在 zsh 中添加路径.md"};function r(i,a,l,o,c,d){return t(),s("div",null,a[0]||(a[0]=[n(`<h1 id="在-zsh-中添加路径" tabindex="-1">在 zsh 中添加路径 <a class="header-anchor" href="#在-zsh-中添加路径" aria-label="Permalink to &quot;在 zsh 中添加路径&quot;">​</a></h1><p><a href="https://qastack.cn/programming/11530090/adding-a-new-entry-to-the-path-variable-in-zsh" target="_blank" rel="noreferrer">在ZSH中将新条目添加到PATH变量中</a><a href="https://stackoverflow.com/questions/11530090/adding-a-new-entry-to-the-path-variable-in-zsh/18077919#18077919" target="_blank" rel="noreferrer">linux - Adding a new entry to the PATH variable in ZSH - Stack Overflow</a></p><h2 id="方法一" tabindex="-1">方法一 <a class="header-anchor" href="#方法一" aria-label="Permalink to &quot;方法一&quot;">​</a></h2><p>在这里，将此行添加到.zshrc：</p><p>export PATH=/home/david/pear/bin:$PATH</p><p><code>zshconfig</code> 这个是我改过的打开./zshrc 指令</p><h2 id="方法二" tabindex="-1">方法二 <a class="header-anchor" href="#方法二" aria-label="Permalink to &quot;方法二&quot;">​</a></h2><p>实际上，使用 ZSH 允许您使用环境变量的特殊映射。因此，您可以简单地执行以下操作：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># append</span></span>
<span class="line"><span>path+=(&#39;/home/david/pear/bin&#39;)</span></span>
<span class="line"><span># or prepend</span></span>
<span class="line"><span>path=(&#39;/home/david/pear/bin&#39; $path)</span></span>
<span class="line"><span># export to sub-processes (make it inherited by child processes)</span></span>
<span class="line"><span>export PATH\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>对我来说，这是一个非常简洁的功能，可以传播到其他变量。例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typeset -T LD_LIBRARY_PATH ld_library_path :</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="info custom-block github-alert"><p class="custom-block-title">INFO</p><p>只有方法一成功了，方法二可行性未知</p></div>`,12)]))}const b=e(p,[["render",r]]);export{u as __pageData,b as default};
