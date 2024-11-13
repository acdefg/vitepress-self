import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head } from './configs'

import { themeConfig } from './configs/theme';

//RSS
import { RssPlugin, RSSOptions } from 'vitepress-plugin-rss'
const baseUrl = 'https://ljc0606.cn'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

const RSS: RSSOptions = {
  title: 'CC\'s blog',
  baseUrl,
  copyright: 'Copyright (c) 2024-present, cici',
}

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: 'CC\'s Blog',
  description: '学习笔记，碎片整理',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig,

  vite: {
    plugins: [MarkdownPreview(),
              RssPlugin(RSS)],
  },
})