import type { DefaultTheme } from 'vitepress';
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { nav } from './nav';
import { sidebar } from './sidebar';
import { algoliaSearchOptions } from './search/algolia-search';
//import { localSearchOptions } from './search/local-search';


export const themeConfig: DefaultTheme.Config = {
  i18nRouting: false,

  logo: '/logo.png',

  nav, // 导航栏配置
  sidebar, // 侧边栏配置

  outline: {
    level: 'deep', // 右侧大纲标题层级
    label: '目录', // 右侧大纲标题文本配置
  },
  
 
  footer: {
    message: '如有转载或 CV 的请标注本站原文地址',
    copyright: 'Copyright © 2019-present cici',
  },

  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium',
    },
  },

  // 文档页脚文本配置
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },

  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',

  // 搜索配置（二选一）
  search: {
    provider: 'algolia',
    options: algoliaSearchOptions,
    // 本地离线搜索
    // provider: 'local',
    // options: localSearchOptions
  },

  // 导航栏右侧社交链接配置
  socialLinks: [
    //{icon: { svg: 'svg icon'},link: 'rss url'},
    { icon: 'github', link: 'https://github.com/abc55667788' },
    {
      icon: {
        svg: `<svg width="33" height="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>CSDN</title>
                <style type="text/css">
                  .st0 { fill: #34343B; }
                  .st1 { fill: #D92E2E; }
                </style>
                <g id="CSDN">
                  <path class="st0" d="M319.7,292.5c1.1-8.1,2-16,3.3-23.9c0.5-3.2-0.1-4.7-3.4-5.1c-11.5-1.2-23-3-34.5-3.7
                    c-20.7-1.2-41.3-0.7-61.2,6.2c-10.4,3.6-19.9,8.7-27,17.5c-9.8,12.2-8.3,27.5,4,37.1c3.8,2.9,8,5.4,12.3,7.6
                    c12.6,6.3,26.4,9,40,12.4c4.4,1.1,8.9,2.4,13.1,4.2c4.4,1.9,5.8,5.5,3.7,9.8c-1.1,2.3-2.9,4.7-5,5.9c-3.9,2.1-8.1,3.8-12.4,4.6
                    c-12.5,2.4-25,1.4-37.5-0.4c-10-1.5-19.9-3.7-30-5.6c-0.9,7.3-1.7,15-3,22.5c-0.6,3.8,0.4,5.7,4.1,6.2c0.7,0.1,1.4,0.4,2.1,0.6
                    c27.9,7.5,56,7.9,84.2,1.8c12.5-2.7,24.2-7.4,33.6-16.6c6.9-6.7,10.7-14.8,10.1-24.6c-0.6-10.8-7.2-17.5-15.9-22.7
                    c-10.6-6.4-22.4-9.5-34.2-12.6c-8.5-2.3-17.1-4.3-25.3-7.3c-5.8-2.1-6.5-7.8-2.1-12.2c1.6-1.6,3.6-3.2,5.7-3.7
                    c6.1-1.5,12.4-3.4,18.7-3.6C282.1,286.4,300.7,288.6,319.7,292.5z"/>
                  <path class="st0" d="M620.9,388.8c0.2-1.4,0.5-2.7,0.7-4c1.5-14.6,3.1-29.3,4.5-43.9c1-10.9,2.5-21.9,2.5-32.8
                    c0-19-8.1-33.5-26.2-41.3c-10.6-4.6-21.8-6.2-33.1-6.7c-22.7-1-45,1.9-67.3,5.9c-2,0.4-2.5,1.2-2.6,3c-0.9,10.7-1.9,21.4-3,32.1
                    c-2.3,22.1-4.6,44.1-6.9,66.2c-0.7,7.1-1.5,14.3-2.2,21.6c12.8,0,25.1,0,37.5,0c0.2-0.5,0.4-0.8,0.4-1.2
                    c3.2-31.3,6.5-62.6,9.7-93.9c0.2-1.9,0.2-3.5,2.7-3.9c11-1.8,22.1-2.7,33.1-0.8c14.8,2.5,21.3,11.1,19.8,26
                    c-1.9,18.1-4,36.2-5.9,54.3c-0.7,6.4-1.3,12.9-2,19.5C595.5,388.8,608.1,388.8,620.9,388.8z"/>
                  <path class="st1" d="M164.6,361.7c-8.5,1-16.4,2.3-24.4,2.9c-15,1.2-29.9,1.4-44.3-4c-11.5-4.3-19.1-12.1-20.8-24.6
                    c-2.6-19,7.1-35.5,25-42.8c13-5.3,26.7-6.5,40.5-5.7c11.6,0.7,23.2,2.3,35,3.5c1.1-9.1,2.3-18.9,3.4-28.4c-0.5-0.4-0.7-0.6-0.9-0.7
                    c-0.9-0.3-1.8-0.6-2.8-0.7c-29-5.1-57.9-5.5-86.3,3.4c-18.9,5.9-35.8,15.3-47.7,31.7c-12.4,17.1-16.6,36.1-8.9,56.4
                    c5.6,14.7,17,24,30.8,30.5c14.2,6.7,29.3,9.6,44.8,10.3c17,0.8,34,0.6,50.7-3.1c1.2-0.3,2.9-1.6,3-2.6
                    C162.9,379.2,163.7,370.5,164.6,361.7z"/>
                  <path class="st0" d="M465.7,286.2c-9.4-11.5-22.4-16.8-36.3-20.3c-21.6-5.4-43.5-4.9-65.5-4.1c-6,0.2-12,0.8-18.2,1.3
                    c-4.3,42.1-8.6,83.8-13,125.9c1.2,0.2,2,0.4,2.8,0.5c20.4,2.5,40.9,3.3,61.4,1.8c11.1-0.8,22.4-2.5,33-5.8
                    c24.4-7.7,41.5-23.3,46.4-49.5C479.8,318.1,477.8,301,465.7,286.2z M417.6,358.6c-14.7,7-30.1,7.8-46.5,5.8
                    c2.5-25.5,5-50.6,7.5-75.9c1.7-0.2,3.4-0.5,5-0.5c13.4-0.4,26.8-0.5,39.4,5.2c8.7,4,14.2,10.6,16.3,19.9
                    C443.9,332.6,435.6,350,417.6,358.6z"/>
                  <path class="st0" d="M147.8,187.3c2.2,7.2,4.5,14.2,6.7,21.3c0.3,0.9,0.9,1.8,1.7,2.4c6.9,4.9,13.8,9.9,20.7,14.9
                    c3.6,2.6,7.2,5.2,10.9,7.7c9.6,6.4,19.1,6.2,28.9-0.1c3.4-2.4,7-4.6,10.3-7c12.5-8.7,25-17.4,37.6-26.1c6.9-4.8,9.2-11.3,7.2-19
                    c-3.4-12.7-6.9-25.4-10.3-38c-2.5-9.3-8.3-15.6-17.4-18.6c-10-3.3-20.2-3.8-30.6-3.5c-9.1,0.3-18.2,1.3-27.2,2.5
                    c-8.1,1.1-16.1,2.7-24.2,4.1c-7.2,1.2-13.3,4.6-17.2,11.2c-4,6.9-5.7,14.4-7.6,22c-1.9,7.5-3.5,15.1-5.1,22.7
                    C147.1,186.9,147.5,187.1,147.8,187.3z"/>
                </g>
              </svg>`
      },      
      link: 'https://www.csdn.net/'
    }
  ],

  // 自定义扩展: 文章元数据配置
  // @ts-ignore
  articleMetadataConfig: {
    author: 'CICI', // 文章全局默认作者名称
    authorLink: '/about', // 点击作者名时默认跳转的链接
    showViewCount: false, // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
  },
  // 自定义扩展: 文章版权配置
  copyrightConfig: {
    license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
    licenseLink: 'http://creativecommons.org/licenses/by-sa/4.0/'
  },

  comment: {
    repo: 'abc55667788/vitepress-cici-giscus',
    repoId: 'R_kgDONFp41w',
    category: 'Announcements',
    categoryId: 'DIC_kwDONFp4184CjrYQ',
  }
/*   // 自定义扩展: 评论配置
  commentConfig: {
    type: 'gitalk',
    showComment: true // 是否显示评论
  }, */
/*   // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: true, // 是否显示页脚
    icpRecordCode: '津ICP备2022005864号-2', // ICP备案号
    publicSecurityRecordCode: '津公网安备12011202000677号', // 联网备案号
    copyright: `Copyright © 2019-${new Date().getFullYear()} Charles7c` // 版权信息
  } */

}