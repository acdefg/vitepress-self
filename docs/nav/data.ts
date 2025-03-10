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
        icon: '/icons/chip.png',
        title: '数字IC',
        link: '../categories/digital/index',
      },
    ],
  },
  {
    title: '小应用开发',
    items: [
      {
        icon: '/icons/tomato.png',
        title: 'pomodoro clock',
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
      {
        icon:'https://statics.moonshot.cn/kimi-chat/favicon.ico',
        title: 'Kimi Chat',
        desc: '快速简单，很多时候不太聪明',
        link: 'https://kimi.moonshot.cn/',
      }
    ],
  },

  {
    
    title: '待学习清单',
    items: [
      {
        icon: '/icons/bilibili.png',
        title: '拜托三连了！这绝对是全B站最用心（没有之一）的Lr公开课程，调光调色就靠它！',
        desc: '摄影，调色，有空就看看',
        link: 'https://www.bilibili.com/video/BV1g64y1474s?spm_id_from=333.788.player.switch&vd_source=f8bf73f9a2b495eaf6f8446fa6016bc7&p=2',
      },
      {
        icon: '/icons/bilibili.png',
        title: '零基础AI全栈开发系列',
        desc: '时间短，内容简单，搞清楚概念就行',
        link: 'https://www.bilibili.com/video/BV18M4m1C7tD/?spm_id_from=333.788.top_right_bar_window_history.content.click&vd_source=f8bf73f9a2b495eaf6f8446fa6016bc7',
      }
    ],
  },
  
  {
  title: '在线工具',
  items: [
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
        title: '在线latex公式编辑器',
        desc: 'markdown公式转word用这个',
        link: 'https://www.latexlive.com/',
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
