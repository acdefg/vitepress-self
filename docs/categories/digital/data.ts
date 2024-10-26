import type { NavLink } from '../../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA1: NavData[] = [
  {
    title: '知识仓库导航',
    items: [
      {
        icon: '/logo.png',
        title: '秋招整理',
        desc: '秋招知识以及面经整理',
        link: 'https://github.com/',
      },
      {
        icon: '/logo.png',
        title: '模块整理',
        desc: '一些用过的模块',
        link: '',
      },
    ],
  }
]
