import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '博客主页', link: '/index', activeMatch: '/index' },
  {
    text: '页面分类',
    items: [
      { text: 'ubuntu修缮记录', link: '/categories/ubuntu/index', activeMatch: '/categories/ubuntu/' },
      { text: '提效记录', link: '/categories/提效技能/index', activeMatch: '/categories/提效技能/' },
      { text: '数字IC', link: '/categories/digital/index', activeMatch: '/categories/digital/' },
      { text: '"杂碎"逆袭史', link: '/categories/fragments/index', activeMatch: '/categories/fragments/' },
    ],
    activeMatch: '/catagory/'
  },
  { text: '我的标签', link: '/tags',activeMatch: '/tags' },
  { text: '常用导航', link: '/nav/', activeMatch: '/nav/'},
  {
    text: '关于',
    link: '/about',
    activeMatch: '/about' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
},
]
