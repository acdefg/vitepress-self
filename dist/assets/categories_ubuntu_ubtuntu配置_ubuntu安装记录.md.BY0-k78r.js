import{_ as i,c as s,o as e,ab as a}from"./chunks/framework.Dd7dmwBs.js";const b=JSON.parse('{"title":"ubuntu安装记录","description":"","frontmatter":{"title":"ubuntu安装记录","author":"Cici","date":"2024/11/04 23:56","isTop":false,"categories":["ubuntu"],"tags":["tool"]},"headers":[],"relativePath":"categories/ubuntu/ubtuntu配置/ubuntu安装记录.md","filePath":"categories/ubuntu/ubtuntu配置/ubuntu安装记录.md","lastUpdated":1730736460000}'),t={name:"categories/ubuntu/ubtuntu配置/ubuntu安装记录.md"},l=a('<h1 id="ubuntu安装记录" tabindex="-1">ubuntu安装记录 <a class="header-anchor" href="#ubuntu安装记录" aria-label="Permalink to &quot;ubuntu安装记录&quot;">​</a></h1><h2 id="双系统安装" tabindex="-1">双系统安装 <a class="header-anchor" href="#双系统安装" aria-label="Permalink to &quot;双系统安装&quot;">​</a></h2><h2 id="ubuntu-installation" tabindex="-1">ubuntu_installation <a class="header-anchor" href="#ubuntu-installation" aria-label="Permalink to &quot;ubuntu_installation&quot;">​</a></h2><h3 id="write-iso-into-usb-disk-to-build-a-system-disk" tabindex="-1">write iso into USB disk to build a system disk <a class="header-anchor" href="#write-iso-into-usb-disk-to-build-a-system-disk" aria-label="Permalink to &quot;write iso into USB disk to build a system disk&quot;">​</a></h3><ul><li>iso mirror link: <a href="https://mirrors.tuna.tsinghua.edu.cn/#" target="_blank" rel="noreferrer">https://mirrors.tuna.tsinghua.edu.cn/#</a><img src="https://user-images.githubusercontent.com/48377634/166099113-ba4c3834-4e28-4ba3-ac4a-86e46f14d7ce.png" alt="image"><img src="https://user-images.githubusercontent.com/48377634/166099131-a6621a96-2d60-42d8-969f-1e42739594eb.png" alt="image"></li><li>ultraiso download link: <a href="https://ultraiso.en.softonic.com/" target="_blank" rel="noreferrer">https://ultraiso.en.softonic.com/</a> 选试用就行</li></ul><ol><li>文件-&gt; 打开-&gt;选择下载好的iso</li><li>启动-&gt; 写入硬盘映像</li><li>格式化-&gt;写入 <img src="https://user-images.githubusercontent.com/48377634/166101218-67cabc3a-7503-4a50-9c05-da1a5f459c09.png" alt="image"><img src="https://user-images.githubusercontent.com/48377634/166101201-fedacbe4-20f5-4e9b-be35-d4769398d95a.png" alt="image"><img src="https://user-images.githubusercontent.com/48377634/166101243-b9170479-59dd-4173-bc4a-9c03d30dba19.png" alt="image"></li></ol><ul><li>Installation: reboot computer <ol><li>Press F2 to enter boot system (most computer use F2, you can look up on internet)</li><li>Make the USB option to be the first boot option, then save</li><li>Installation interface <ol><li>我选的英文模式，可选择中文<img src="https://s2.loli.net/2022/05/01/viecr8l5E6wJQAd.png" alt=""></li><li>这张拍糊了，选择想要的语言即可<img src="https://s2.loli.net/2022/05/01/gvyAMEoPc8rSVzC.png" alt=""></li><li>不联网安的快一点，但是安完还是会更新的<img src="https://s2.loli.net/2022/05/01/a4cI5hZoRwU2GJ7.png" alt=""></li><li>事实上，我倾向于选择 Minimal installation + both other options, 有时候会卡住，等很长时间，点退出重来就行<img src="https://s2.loli.net/2022/05/01/HnqySjcBVvLmuxF.png" alt=""></li><li>网上大部分教程都选的第三项，自己分区，我之前按照教程来，结果用到一半提醒/boot 分区内存不够，没办法得重装，这次不想搞了就直接选择第一个了<img src="https://s2.loli.net/2022/05/01/PL78Aic2WUmpdCk.png" alt=""></li><li>continue<img src="https://s2.loli.net/2022/05/01/mR5xl6pfdzYutrT.png" alt=""></li><li>漏了一张选地点的，往中国一点默认上海就行，这张图自己设置就行<img src="https://s2.loli.net/2022/05/01/ixDcg6n8bOaFrVP.png" alt=""></li><li>然后会提醒重启，有一个界面会告诉你拔掉 U 盘，按 enter 键继续，之后就会以上图设置的账户登陆</li></ol></li></ol></li></ul><h3 id="reference-link" tabindex="-1">reference link <a class="header-anchor" href="#reference-link" aria-label="Permalink to &quot;reference link&quot;">​</a></h3><ol><li><a href="https://zhuanlan.zhihu.com/p/355314438" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/355314438</a></li><li><a href="https://zhuanlan.zhihu.com/p/407175785" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/407175785</a></li><li><a href="https://blog.csdn.net/codeHonghu/article/details/111940656" target="_blank" rel="noreferrer">https://blog.csdn.net/codeHonghu/article/details/111940656</a> - good</li></ol><h2 id="arrangement-steps" tabindex="-1">arrangement steps <a class="header-anchor" href="#arrangement-steps" aria-label="Permalink to &quot;arrangement steps&quot;">​</a></h2><ol><li><p>修改软件源，在 software&amp;updates..，修改命令行复制粘贴快捷键</p></li><li><p>改系统配置</p></li><li><p>修改软件源，在 software&amp;updates..，在第一页download from，选择other，然后可选best server，完成后踩咯所 修改命令行复制粘贴快捷键，打开terminal-&gt;preference-&gt;shortcut</p></li><li><p>改系统配置，使得不用每次用命令都要输密码[[配置中一些小问题]]</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gedit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/sudoers</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>安装软件 [[ubuntu安装记录#1 Chinese input method]]</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ibus-pinyin</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>[[ubuntu安装记录#3 Obsidian]]</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xclip</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> thunderbird</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>[[ubuntu安装记录#5 截图软件]]可直接配置</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> flameshot</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>[[ubuntu安装记录#6 Zsh 安装]]</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> curl</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>[[ubuntu安装记录#6 Zsh 安装]]</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zsh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>[[ubuntu安装记录#7 Git 安装]]可直接配置</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>下载百度网盘 [[ubuntu安装记录#2 百度网盘]] 下载 ubuntu 文件夹，配置 [[ubuntu安装记录#3 Obsidian]] [[ubuntu安装记录#4 Picgo]]</p></li></ol><h3 id="_1-chinese-input-method" tabindex="-1">1. Chinese input method <a class="header-anchor" href="#_1-chinese-input-method" aria-label="Permalink to &quot;1. Chinese input method&quot;">​</a></h3><p>千万不要安装 fctix，装了重启直接卡死，我重装了两次才发现问题，直接安装 ibus-pinyin</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ibus-pinyin</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ibus-clutter</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>打开 language support，第一次安装会提示下载，同意即可 <img src="https://s2.loli.net/2022/05/01/3sOh7xnjtCXRz6i.png" alt="300"></p><p>重启，打开设置，chinese-&gt;chinese intelligent pinyin <img src="https://s2.loli.net/2022/05/01/n8J2FMjIXcwEP4t.png" alt="500"> 候选词变成 8 个 <img src="https://s2.loli.net/2022/05/01/X8x3rliuHYpRcqT.png" alt=""> 切换快捷键在设置 Keyboard Shortcuts 里，图示即默认 <img src="https://s2.loli.net/2022/05/01/73CFT1xJ865ocZH.png" alt="500"> 参考：<a href="https://www.cnblogs.com/yulongzhou/p/6345611.html#:~:text=%E5%AE%89%E8%A3%85ibus%20%E5%9C%A8%E8%BD%AF%E4%BB%B6%E4%B8%AD%E5%BF%83%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85%E5%8D%B3%E5%8F%AF%E6%88%96%E8%80%85sudo%20apt-get%20install%20ibus-pinyin,3%E3%80%81%E5%AE%89%E8%A3%85%E5%AE%8C%E4%B9%8B%E5%90%8E%E9%9C%80%E9%87%8D%E5%90%AF%E6%9C%BA%E5%99%A8%206%E3%80%81%E8%AE%BE%E7%BD%AE-%E6%96%87%E6%9C%AC%E8%BE%93%E5%85%A5-%E7%82%B9%E5%87%BB%E8%BE%93%E5%85%A5%E6%BA%90%E7%9A%84%E2%80%9C%2B%E2%80%9D%2C%E9%80%89%E6%8B%A9%E6%B1%89%E8%AF%AD%20%28Pinyin%29%20%28IBus%29%207%E3%80%81%E5%A6%82%E6%9E%9C%E8%BF%98%E6%B2%A1%E6%9C%89%E6%AD%A3%E5%B8%B8%E8%BE%93%E5%85%A5%E4%B8%AD%E6%96%87%EF%BC%8C%E5%B0%B1%E5%9C%A8%E5%B1%8F%E5%B9%95%E5%8F%B3%E4%B8%8A%E8%A7%92%E7%94%B5%E9%87%8F%E5%B7%A6%E8%BE%B9%E7%82%B9%E5%87%BB%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%8B%E5%B0%B1ok%E4%BA%86" target="_blank" rel="noreferrer">ubunut下安装ibus_pinyin中文输入法 - 学习那些事儿 - 博客园</a></p><h3 id="_2-百度网盘" tabindex="-1">2. 百度网盘 <a class="header-anchor" href="#_2-百度网盘" aria-label="Permalink to &quot;2. 百度网盘&quot;">​</a></h3><p><a href="https://pan.baidu.com/download" target="_blank" rel="noreferrer">百度网盘 客户端下载</a></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo dpkg -i ./baidunetdisk_4.3.0_amd64.deb</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3-obsidian" tabindex="-1">3. Obsidian <a class="header-anchor" href="#_3-obsidian" aria-label="Permalink to &quot;3. Obsidian&quot;">​</a></h3><h4 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h4><ol><li>Setting (left botton)-&gt; Community plugins -&gt; turn off the safe mode</li><li>Copy all the backup documents and unzip all the plugins into ./obsidian with setting up a new folder named <code>plugins</code></li><li>Setting (left botton)-&gt; Community plugins-&gt;turn on all the plugins</li></ol><h4 id="设置" tabindex="-1">设置 <a class="header-anchor" href="#设置" aria-label="Permalink to &quot;设置&quot;">​</a></h4><ol><li>About 里面可以改语言</li><li>核心插件打开：大纲、日记等</li><li>快捷键：</li></ol><h3 id="_4-picgo" tabindex="-1">4. Picgo <a class="header-anchor" href="#_4-picgo" aria-label="Permalink to &quot;4. Picgo&quot;">​</a></h3><p>[[图床设置]]</p><h3 id="_5-截图软件" tabindex="-1">5. 截图软件 <a class="header-anchor" href="#_5-截图软件" aria-label="Permalink to &quot;5. 截图软件&quot;">​</a></h3><p>[[简单安装软件]] ![[obsidian安装与配置#图床的使用]]</p><h3 id="_6-zsh-安装" tabindex="-1">6. Zsh 安装 <a class="header-anchor" href="#_6-zsh-安装" aria-label="Permalink to &quot;6. Zsh 安装&quot;">​</a></h3><p>[[zsh安装和设置]]</p><h3 id="_7-git-安装" tabindex="-1">7. Git 安装 <a class="header-anchor" href="#_7-git-安装" aria-label="Permalink to &quot;7. Git 安装&quot;">​</a></h3><p>[[git操作]]</p><h3 id="_8-美化" tabindex="-1">8. 美化 <a class="header-anchor" href="#_8-美化" aria-label="Permalink to &quot;8. 美化&quot;">​</a></h3><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gnome-tweaks</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://s2.loli.net/2022/05/06/gLBRxCMS87wXIm5.png" alt="500"><img src="https://s2.loli.net/2022/05/06/tjlenkQ9KMoA73I.png" alt="400"></p><h4 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-label="Permalink to &quot;Reference&quot;">​</a></h4><p><a href="https://zhuanlan.zhihu.com/p/401763253?utm_source=pocket_mylist" target="_blank" rel="noreferrer">Ubuntu 20.04 系统美化--探索之旅（桌面环境，登录界面，开机动画，引导界面） - 知乎</a></p><h2 id="delete-double-system" tabindex="-1">delete double system <a class="header-anchor" href="#delete-double-system" aria-label="Permalink to &quot;delete double system&quot;">​</a></h2><h3 id="change-grub-option" tabindex="-1">change grub option <a class="header-anchor" href="#change-grub-option" aria-label="Permalink to &quot;change grub option&quot;">​</a></h3><ol><li>boot interface</li><li>use easyUEFI</li></ol><h3 id="delete-the-disk-at-disk-manager" tabindex="-1">delete the disk at disk manager <a class="header-anchor" href="#delete-the-disk-at-disk-manager" aria-label="Permalink to &quot;delete the disk at disk manager&quot;">​</a></h3><p><img src="https://user-images.githubusercontent.com/48377634/166102114-06da85b6-5330-4d1f-b32e-f5c926d13dc9.png" alt="image"> 把ubuntu几个分区都删掉，小心不要删错</p><h3 id="delete-the-option-at-efi" tabindex="-1">delete the option at EFI <a class="header-anchor" href="#delete-the-option-at-efi" aria-label="Permalink to &quot;delete the option at EFI&quot;">​</a></h3><ol><li><p>输入【Win】+【R】，输入【diskpart】打开diskpart；</p></li><li><p>输入【list disk】，显示磁盘列表</p></li><li><p>输入【select disk 0】，选择磁盘0，即win10系统所在磁盘；</p></li><li><p>输入【list partition】，查看磁盘0的分区列表；</p></li><li><p>输入【select partition 3】，选择wind10启动引导项所在分区（即Type=System，容量一般较小为100M的那一个分区）；</p></li><li><p>为win10的EFI启动引导项所在分区分配盘符，输入【assign letter = p】，这里p为盘符名称，字母A~Z应该都可以，注意不要和已有盘符名重复即可；</p></li><li><p>以管理员方式运行记事本，打开p盘，EFI文件夹，删除ubuntu文件夹</p></li></ol><h3 id="reference-link-1" tabindex="-1">reference link <a class="header-anchor" href="#reference-link-1" aria-label="Permalink to &quot;reference link&quot;">​</a></h3><p><a href="https://www.cnblogs.com/arxive/p/11749770.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/arxive/p/11749770.html</a></p>',47),n=[l];function r(h,p,o,d,u,c){return e(),s("div",null,n)}const k=i(t,[["render",r]]);export{b as __pageData,k as default};
