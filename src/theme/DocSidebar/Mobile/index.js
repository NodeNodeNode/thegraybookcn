import React, {useState} from 'react';
import clsx from 'clsx';
import {NavbarSecondaryMenuFiller, ThemeClassNames} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import SidebarFilter, {filterSidebar} from '@site/src/components/SidebarFilter';

// 从 theme-classic 3.10 的 DocSidebar/Mobile 弹出，只多了顶部的筛选框。
// 移动端侧边栏渲染在导航栏的二级菜单里，包一层 wrapper 塞不进去，只能弹出。
// 升级 Docusaurus 时对照原文件看一眼。
function DocSidebarMobileSecondaryMenu({sidebar, path}) {
  const mobileSidebar = useNavbarMobileSidebar();
  const [query, setQuery] = useState('');
  const items = filterSidebar(sidebar, query);
  return (
    <>
      <SidebarFilter value={query} onChange={setQuery} empty={query.trim() && !items.length} />
      <ul key={query.trim()} className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={items}
          activePath={path}
          onItemClick={(item) => {
            // Mobile sidebar should only be closed if the category has a link
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
}

function DocSidebarMobile(props) {
  return <NavbarSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />;
}

export default React.memo(DocSidebarMobile);
