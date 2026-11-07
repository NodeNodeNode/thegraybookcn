import React from 'react';
import styles from './styles.module.css';

// 侧边栏筛选，对应上游官网的「Filter by title」。
// 中文标签和英文原名（customProps.en，gb:gen-sidebar 生成）都参与匹配 ——
// 读者手里拿着官网的英文页名，得能直接搜到对应的中文页。

const textOf = (item) => `${item.label ?? ''} ${item.customProps?.en ?? ''}`.toLowerCase();

/** 空格分隔的每个词都要命中。分类自身命中则整组保留；否则只留命中的子项。命中的分类一律展开。 */
export function filterSidebar(items, query) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return items;
  const hit = (item) => words.every((w) => textOf(item).includes(w));
  const walk = (list) =>
    list.flatMap((item) => {
      if (item.type === 'category') {
        if (hit(item)) return [{...item, collapsed: false}];
        const kids = walk(item.items);
        return kids.length ? [{...item, items: kids, collapsed: false}] : [];
      }
      return hit(item) ? [item] : [];
    });
  return walk(items);
}

export default function SidebarFilter({value, onChange, empty}) {
  return (
    <div className={styles.wrap}>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onChange('')}
        placeholder="筛选目录（中英文均可）"
        aria-label="按标题筛选侧边栏，中英文均可"
      />
      {empty && <p className={styles.empty}>没有匹配的页面</p>}
    </div>
  );
}
