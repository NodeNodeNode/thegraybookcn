import React, {useState} from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import SidebarFilter, {filterSidebar} from '@site/src/components/SidebarFilter';

// 在原侧边栏上方加筛选框。key 随查询变化，让分类的展开状态按筛选结果重新初始化。
export default function ContentWrapper(props) {
  const [query, setQuery] = useState('');
  const sidebar = filterSidebar(props.sidebar, query);
  return (
    <>
      <SidebarFilter value={query} onChange={setQuery} empty={query.trim() && !sidebar.length} />
      <Content key={query.trim()} {...props} sidebar={sidebar} />
    </>
  );
}
