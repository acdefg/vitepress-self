---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: CC's runlog
  text: 博客导航
  tagline: 学过，读过，debug过的碎片
  image:
    src: /logo.png
    alt: cici
  actions:
    - text: 博客导航
      link: https://notes.fe-mm.com
      theme: brand
    - text: 代码仓库
      link: /nav/
      theme: alt
features:
  - icon: 📖
    title: 知识仓库
    details: 整理日常学习的知识点<small>（数字IC、模拟IC、体系结构等）</small><br />积少成多，化零为整
    link:
    linkText: 知识库导航
  - icon: 🤖
    title: 项目整理
    details: 开源和DIY项目整理<br />实践出真知
    link:
    linkText: 项目目录
  - icon: 🔨
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link:
    linkText: 常用工具库
  - icon: 💯
    title: 阅读材料
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link:
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 120s 1s cubic-bezier(0.1, 0, 0.3, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
