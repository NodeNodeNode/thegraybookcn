import React from 'react';
import Original from '@theme-original/DocSidebarItem/Link';

// 把英文原名（customProps.en）作为 data-en 透传到 <a> 上，由 custom.css 用 ::after 显示成小字。
// 走属性而不是改 label：label 还被用在 aria 文案和 key 里，必须保持是字符串。
export default function LinkWrapper(props) {
  const en = props.item.customProps?.en;
  return <Original {...props} {...(en && {'data-en': en})} />;
}
