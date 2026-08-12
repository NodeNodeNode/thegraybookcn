import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import sections from '@site/translation/navbar-sections.json';
import styles from './index.module.css';

// 四个板块的说明与英文副标题。板块本身（有译文走站内、无译文跳上游）
// 由 gb:gen-sidebar 生成的 navbar-sections.json 决定，这里只补文案。
const BLURBS = {
  reference: {
    latin: 'reference',
    note: 'vvvv gamma 的参考手册。涵盖编辑器的使用、VL 语言特性、第三方库以及扩展开发。',
  },
  explanations: {
    latin: 'explanations',
    note: '概念讲解。数据流、看待事物的方式、可变性与泛型这些底层观念，适合入门时通读。',
  },
  changelog: {
    latin: 'changelog',
    note: '各版本的变更记录，以及 NuGet 兼容性对照。',
  },
  roadmap: {
    latin: 'roadmap',
    note: '已规划与设想中的方向。',
  },
};

function SectionHead({num, latin, title}) {
  return (
    <>
      <div className={styles.sectionWire}>
        <span className={styles.pin} />
        <span className={styles.sectionNum}>{num}</span>
        <span className={styles.sectionRule} />
        <span className={styles.sectionLatin}>{latin}</span>
      </div>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </>
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
        <span className={styles.heroWire} />
      </header>

      <main className={styles.page}>
        <section className={styles.section}>
          <SectionHead num="01" latin="documentation" title="文档" />
          <div className={styles.sectionBody}>
            <ul className={styles.entries}>
              {sections.map((s) => {
                const blurb = BLURBS[s.key] ?? {latin: s.key, note: ''};
                const internal = s.type === 'docSidebar';
                const body = (
                  <>
                    <span className={styles.pin} />
                    <span>
                      <span className={styles.entryTitle}>{s.label}</span>
                      <div className={styles.entryNote}>{blurb.note}</div>
                    </span>
                    <span className={styles.entryCount}>
                      {internal ? `${s.docCount} 页` : '原文'}
                    </span>
                  </>
                );
                return (
                  <li key={s.key} className={styles.entry}>
                    {internal ? (
                      <Link className={styles.entryLink} to={`/${s.key === 'reference' ? 'getting-started/' : s.key}`}>
                        {body}
                      </Link>
                    ) : (
                      <a
                        className={styles.entryLink}
                        href={s.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {body}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHead num="02" latin="about" title="关于" />
          <div className={styles.sectionBody}>
            <p className={styles.entryNote}>
              翻译的过程往往也是信息丢失的过程，很难精确地传递原本的意思。但本着深入浅出与抛砖引玉的信念，多少是个好的开始。
            </p>
            <p>
              <Link to="/intro">关于翻译</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
