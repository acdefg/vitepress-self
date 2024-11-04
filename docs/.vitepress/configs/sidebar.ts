import type { DefaultTheme } from 'vitepress';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { getChineseZodiac, getChineseZodiacAlias } from '../theme/utils';

const sync = fg.sync;

export const sidebar: DefaultTheme.Config['sidebar'] = getSidebarConfig('categories');

/**
 * 获取侧边栏配置，自动识别 categories 目录下的一级子文件夹
 * @param basePath 扫描基础路径
 * @returns {DefaultTheme.Sidebar}
 */
function getSidebarConfig(basePath: string): DefaultTheme.Config['sidebar'] {
  const sidebarConfig: DefaultTheme.Config['sidebar'] = {};

  // 获取 categories 目录下的一级子文件夹
  getDirectories(`docs/${basePath}/*`).forEach(({ name: category }) => {
    sidebarConfig[`/${basePath}/${category}/`] = getItemsByFirstLevel(`${basePath}/${category}`);
  });

  return sidebarConfig;
}

/**
 * 获取一级子目录下的文件和文件夹，生成侧边栏分组及标题
 * @param path 扫描基础路径
 * @returns {DefaultTheme.SidebarItem[]}
 */
function getItemsByFirstLevel(path: string): DefaultTheme.SidebarItem[] {
  const groups: DefaultTheme.SidebarItem[] = [];

  // 获取一级子目录下的文件夹
  getDirectories(`docs/${path}/*`).forEach(({ name: firstLevel }) => {
    const items: DefaultTheme.SidebarItem[] = [];

    // 获取所有文件
    sync(`docs/${path}/${firstLevel}/**/*.md`, { onlyFiles: true, objectMode: true }).forEach(article => {
      const { data } = matter.read(article.path);
      const relativePath = article.path.replace(/^docs\//, '').replace(/\.md$/, '');

      items.push({
        text: data.title || article.name.replace('.md', ''),
        link: `/${relativePath}`
      });
    });

    // 将文件夹作为分组
    groups.push({
      text: `${firstLevel} (${items.length}篇)`,
      items,
      collapsed: items.length < 2 || items.length > 20,
    });
  });

  return groups;
}

/**
 * 获取子目录
 * @param path 扫描路径
 * @returns 子目录列表
 */
function getDirectories(path: string) {
  return sync(path, { onlyDirectories: true, objectMode: true });
}

/**
 * 为侧边栏项添加序号样式
 * @param groups 分组数据
 */
function addOrderNumber(groups: DefaultTheme.SidebarItem[]): void {
  const colors = ['red', 'orange', 'yellow'];
  groups.forEach((group) => {
    group.items.forEach((item, index) => {
      const colorClass = `text-color-${colors[index] || 'gray'}`;
      item.text = `<div class="${colorClass} mr-[6px]" style="font-weight: 550; display: inline-block;">${index + 1}</div> ${item.text}`;
    });
  });
}
