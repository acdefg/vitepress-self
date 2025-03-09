import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: '知识仓库导航',
    items: [
      {
        icon: '/logo.png',
        title: '数字IC',
        link: '../categories/digital/index',
      },
    ],
  },
  {
    title: '小应用开发',
    items: [
      {
        icon: '/logo.png',
        title: 'pomodoro',
        link: '../pomodoro',
      },
    ],
  },
  {
    title: 'AI 导航',
    items: [
      {
        icon: '/icons/chatgpt.png',
        title: 'ChatGPT（经典）',
        link: 'https://chat.openai.com/chat',
      },
      {
        icon: 'https://cloud.siliconflow.cn/favicon.ico',
        title: 'Siliconflow(收费DEEP SEEK)',
        desc: '多种大模型部署，可提供外接api',
        link: 'https://cloud.siliconflow.cn/playground/chat',
      },
      {
        icon: 'https://lambdalabs.com/hubfs/1.%20Branding%20(Lambda)/Lambda%20Logos/lambda_favicon.png',
        title: 'Lambdalabs(免费DEEP SEEK)',
        desc: '界面简单粗暴，需要翻墙',
        link: 'https://lambda.chat/',
      },
      {
        icon: 'https://www.midjourney.com/apple-touch-icon.png',
        title: 'Midjourney（绘画）',
        desc: '待学习。。。',
        link: 'https://www.midjourney.com',
      },
      {
        icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
        title: 'Beautiful.ai（PPT）',
        desc: '待学习。。。',
        link: 'https://www.beautiful.ai',
      },
    ],
  },

  {
    
    title: '常用网站',
    items: [
      {
        icon: 'https://qwerty.fe-mm.com/apple-touch-icon.png',
        title: 'Qwerty Learner',
        desc: '为键盘工作者设计的单词记忆与英语肌肉记忆锻炼软件',
        link: 'https://qwerty.fe-mm.com',
      },
      {
        icon: 'https://caniuse.com/img/favicon-128.png',
        title: 'Can I use',
        desc: '前端 API 兼容性查询',
        link: 'https://caniuse.com',
      },
      {
        icon: 'https://tinypng.com/images/apple-touch-icon.png',
        title: 'TinyPNG',
        desc: '在线图片压缩工具',
        link: 'https://tinypng.com',
      },
      {
        icon: 'https://devtool.tech/logo.svg',
        title: '开发者武器库',
        desc: '开发者武器库，做开发者最专业最好用的专业工具箱',
        link: 'https://devtool.tech',
      },
      {
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        desc: '开发人员的工具箱',
        link: 'https://tool.lu',
      },
      {
        icon: '/icons/json-cn.ico',
        title: 'Json 中文网',
        desc: 'JSON 在线解析及格式化验证',
        link: 'https://www.json.cn',
      },
    ],
  },
  
]
