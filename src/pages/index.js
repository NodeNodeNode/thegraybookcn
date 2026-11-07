import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import sidebars from '@site/sidebars';
import sections from '@site/translation/navbar-sections.json';
import styles from './index.module.css';

// 四个板块的英文名与说明。说明只给名字看不出内容的板块 —— 参考手册有章节列表，其余两个顾名思义。
//板块本身（有译文走站内、无译文跳上游）
// 由 gb:gen-sidebar 生成的 navbar-sections.json 决定，这里只补文案。
const BLURBS = {
  reference: {en: 'Reference'},
  explanations: {
    en: 'Explanations',
    note: '数据流、看待事物的方式、可变性与泛型这些底层观念，适合入门时通读。',
  },
  changelog: {en: 'Changelog'},
  roadmap: {en: 'Roadmap'},
};

// 板块入口页。参考手册没有自己的封面，落在「开始」。
const sectionHref = (key) => `/${key === 'reference' ? 'getting-started/' : key}`;

const countDocs = (items) =>
  items.reduce((n, i) => n + (i.type === 'doc' ? 1 : 0) + (i.link ? 1 : 0) + (i.items ? countDocs(i.items) : 0), 0);

const firstDocId = (item) =>
  item.link?.id ?? (item.type === 'doc' ? item.id : item.items?.map(firstDocId).find(Boolean));

/** 参考手册的一级章节，直接取自侧边栏 —— 上游加了章节，首页自动跟上 */
function useChapters() {
  const docs = useAllDocsData().default.versions[0].docs;
  const pathOf = new Map(docs.map((d) => [d.id, d.path]));
  return (sidebars.reference ?? [])
    .filter((i) => i.type === 'category')
    .map((i) => ({label: i.label, en: i.customProps?.en, href: pathOf.get(firstDocId(i)), count: countDocs([i])}))
    .filter((c) => c.href);
}

/** 站内走 Link，整块未翻的板块跳上游 */
function EntryLink({section, className, children}) {
  return section.type === 'docSidebar' ? (
    <Link className={className} to={sectionHref(section.key)}>
      {children}
    </Link>
  ) : (
    <a className={className} href={section.href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

function CardHead({section, blurb}) {
  return (
    <>
      <span className={styles.cardTitle}>{section.label}</span>
      <span className={styles.cardMeta}>
        <span>{blurb.en}</span>
        <span>{section.type === 'docSidebar' ? `${section.docCount} 页` : '原文'}</span>
      </span>
      {blurb.note && <span className={styles.cardNote}>{blurb.note}</span>}
    </>
  );
}

/** 参考手册：大卡，里面列出章节直达。卡片本身不能整块做成链接，否则会嵌套 <a> */
function ReferenceCard({section, blurb}) {
  const chapters = useChapters();
  return (
    <div className={clsx(styles.card, styles.cardMain)}>
      <EntryLink section={section} className={styles.cardHeadLink}>
        <CardHead section={section} blurb={blurb} />
      </EntryLink>
      <ul className={styles.chapters}>
        {chapters.map((c) => (
          <li key={c.href}>
            <Link className={styles.chapter} to={c.href}>
              <span className={styles.chapterText}>
                <span className={styles.chapterLabel}>{c.label}</span>
                {c.en && <span className={styles.chapterEn}>{c.en}</span>}
              </span>
              <span className={styles.chapterCount}>{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({section, blurb, small}) {
  return (
    <EntryLink section={section} className={clsx(styles.card, styles.cardLink, small && styles.cardSmall)}>
      <CardHead section={section} blurb={blurb} />
    </EntryLink>
  );
}

export default function Home() {
  return (
    <Layout title="欢迎" description="vvvv gamma 中文文档 · 灰皮书">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>灰皮书</h1>
          <p className={styles.heroIntro}>
            vvvv gamma 官方文档{' '}
            <a href="https://thegraybook.vvvv.org/" rel="noopener noreferrer" target="_blank">
              the gray book
            </a>{' '}
            的中文站。分享资讯，方便华语世界的使用者学习交流。如果你有兴趣参与翻译，欢迎到{' '}
            <a
              href="https://github.com/NodeNodeNode/thegraybookcn"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>{' '}
            来。
          </p>
        </div>
      </header>

      <main className={styles.page}>
        {/* 「关于」不单列区块：页脚已有「关于翻译」，那句话也在 /intro 里 */}
        <section className={styles.section}>
          <div className={styles.cards}>
            {sections.map((section) => {
              const blurb = BLURBS[section.key] ?? {en: section.key};
              const area = styles[`area_${section.key}`];
              return (
                <div key={section.key} className={area}>
                  {section.key === 'reference' ? (
                    <ReferenceCard section={section} blurb={blurb} />
                  ) : (
                    <Card section={section} blurb={blurb} small={section.docCount < 10} />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Layout>
  );
}
