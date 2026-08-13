/**
 * 本文件由 `npm run gb:gen-sidebar` 从上游 toc.md 生成，不要手改。
 * 每个上游顶级板块一个具名 sidebar，与头部导航一一对应。
 * 中文标签维护在 translation/sidebar-labels.json，重新生成不会覆盖。
 * 未翻译的页面不出现在这里；要显示为英文外链请加 --with-untranslated。
 */
module.exports = {
  "reference": [
    {
      "type": "category",
      "label": "开始",
      "items": [
        {
          "type": "doc",
          "id": "reference/getting-started/cc/introduction-for-creative-coders",
          "label": "写给 creative coders"
        },
        {
          "type": "category",
          "label": "写给 vvvv beta 用户",
          "items": [
            {
              "type": "doc",
              "id": "reference/getting-started/beta/user-interface",
              "label": "用户界面"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/beta/documentstructure",
              "label": "文档结构"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/beta/language",
              "label": "语言差异"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/beta/evaluation",
              "label": "求值"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/beta/nodes",
              "label": "节点差异"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/beta/vl-templates",
              "label": "VL 模板"
            }
          ],
          "link": {
            "type": "doc",
            "id": "reference/getting-started/beta/introduction-for-vvvv-beta-users"
          }
        },
        {
          "type": "category",
          "label": "写给 .NET 开发者",
          "items": [
            {
              "type": "doc",
              "id": "reference/getting-started/dotnet/concepts",
              "label": "C# 概念"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/dotnet/keywords",
              "label": "C# 关键字"
            },
            {
              "type": "doc",
              "id": "reference/getting-started/dotnet/contextual-keywords",
              "label": "C# 上下文关键字"
            }
          ],
          "link": {
            "type": "doc",
            "id": "reference/getting-started/dotnet/introduction-for-dotnet-programmers"
          }
        }
      ],
      "link": {
        "type": "doc",
        "id": "reference/getting-started/overview"
      }
    },
    {
      "type": "category",
      "label": "开发环境",
      "items": [
        {
          "type": "doc",
          "id": "reference/hde/overview",
          "label": "概览"
        },
        {
          "type": "doc",
          "id": "reference/hde/project_structure",
          "label": "文件结构"
        },
        {
          "type": "doc",
          "id": "reference/hde/navigating_a_project",
          "label": "文件导航"
        },
        {
          "type": "doc",
          "id": "reference/hde/packman",
          "label": "包管理器"
        },
        {
          "type": "doc",
          "id": "reference/hde/the_nodebrowser",
          "label": "节点浏览器"
        },
        {
          "type": "category",
          "label": "通道浏览器",
          "items": [
            {
              "type": "doc",
              "id": "reference/hde/presets",
              "label": "预设与过渡"
            },
            {
              "type": "doc",
              "id": "reference/hde/bindings",
              "label": "绑定"
            }
          ],
          "link": {
            "type": "doc",
            "id": "reference/hde/the_channelbrowser"
          }
        },
        {
          "type": "doc",
          "id": "reference/hde/finders",
          "label": "查找"
        },
        {
          "type": "category",
          "label": "调试",
          "items": [
            {
              "type": "doc",
              "id": "reference/hde/debugging-buildresult",
              "label": "构建结果"
            },
            {
              "type": "doc",
              "id": "reference/hde/debugging-apphealth",
              "label": "应用健康"
            },
            {
              "type": "doc",
              "id": "reference/hde/debugging-log",
              "label": "日志"
            }
          ],
          "link": {
            "type": "doc",
            "id": "reference/hde/debugging"
          }
        },
        {
          "type": "doc",
          "id": "reference/hde/extensions",
          "label": "扩展"
        },
        {
          "type": "doc",
          "id": "reference/hde/managing-nugets",
          "label": "管理 NuGet"
        },
        {
          "type": "doc",
          "id": "reference/hde/showandtell",
          "label": "分享作品"
        },
        {
          "type": "doc",
          "id": "reference/hde/exporting",
          "label": "导出应用"
        },
        {
          "type": "doc",
          "id": "reference/hde/documentation",
          "label": "文档窗口"
        },
        {
          "type": "doc",
          "id": "reference/hde/solution-explorer",
          "label": "方案浏览器"
        },
        {
          "type": "doc",
          "id": "reference/hde/settings",
          "label": "设置"
        },
        {
          "type": "doc",
          "id": "reference/hde/themes",
          "label": "主题"
        },
        {
          "type": "doc",
          "id": "reference/hde/findinghelp",
          "label": "寻求帮助"
        },
        {
          "type": "doc",
          "id": "reference/hde/keyboard-shortcuts",
          "label": "快捷键"
        },
        {
          "type": "doc",
          "id": "reference/hde/commandline-arguments",
          "label": "命令行参数"
        }
      ],
      "link": {
        "type": "doc",
        "id": "reference/hde/gui"
      }
    },
    {
      "type": "category",
      "label": "编程语言",
      "items": [
        {
          "type": "doc",
          "id": "reference/language/patches",
          "label": "草图"
        },
        {
          "type": "doc",
          "id": "reference/language/patch-explorer",
          "label": "草图浏览器"
        },
        {
          "type": "doc",
          "id": "reference/language/nodes",
          "label": "节点"
        },
        {
          "type": "doc",
          "id": "reference/language/links",
          "label": "连线"
        },
        {
          "type": "doc",
          "id": "reference/language/ioboxes",
          "label": "IOBoxes"
        },
        {
          "type": "doc",
          "id": "reference/language/operations",
          "label": "运算器"
        },
        {
          "type": "doc",
          "id": "reference/language/properties",
          "label": "参数"
        },
        {
          "type": "doc",
          "id": "reference/language/execution-order",
          "label": "执行顺序"
        },
        {
          "type": "doc",
          "id": "reference/language/categories",
          "label": "目录"
        },
        {
          "type": "doc",
          "id": "reference/language/conditions",
          "label": "条件"
        },
        {
          "type": "doc",
          "id": "reference/language/loops",
          "label": "循环"
        },
        {
          "type": "doc",
          "id": "reference/language/cache",
          "label": "Cache 区块"
        },
        {
          "type": "doc",
          "id": "reference/language/exception-handling",
          "label": "异常处理"
        },
        {
          "type": "doc",
          "id": "reference/language/enumerations",
          "label": "枚举"
        },
        {
          "type": "doc",
          "id": "reference/language/delegates",
          "label": "Delegate"
        },
        {
          "type": "doc",
          "id": "reference/language/frames",
          "label": "边框"
        },
        {
          "type": "doc",
          "id": "reference/language/groups",
          "label": "group patch"
        },
        {
          "type": "doc",
          "id": "reference/language/compilation",
          "label": "编译"
        },
        {
          "type": "doc",
          "id": "reference/language/namings",
          "label": "命名约定"
        }
      ],
      "link": {
        "type": "doc",
        "id": "reference/language/language"
      }
    },
    {
      "type": "category",
      "label": "节点库",
      "items": [
        {
          "type": "doc",
          "id": "reference/libraries/referencing",
          "label": "引用节点库"
        },
        {
          "type": "category",
          "label": "核心库",
          "items": [
            {
              "type": "doc",
              "id": "reference/libraries/collections",
              "label": "集合"
            },
            {
              "type": "doc",
              "id": "reference/libraries/reactive",
              "label": "响应式"
            },
            {
              "type": "doc",
              "id": "reference/libraries/serialization",
              "label": "序列化"
            },
            {
              "type": "doc",
              "id": "reference/libraries/json",
              "label": "JSON"
            },
            {
              "type": "doc",
              "id": "reference/libraries/xml",
              "label": "XML"
            }
          ]
        },
        {
          "type": "category",
          "label": "3D 图形",
          "items": [
            {
              "type": "doc",
              "id": "reference/libraries/3d/rendering",
              "label": "渲染"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/models",
              "label": "模型与网格"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/geometry",
              "label": "多边形"
            },
            {
              "type": "doc",
              "id": "reference/best-practice/text-rendering",
              "label": "文字渲染"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/transparency",
              "label": "透明"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/shaders",
              "label": "着色器"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/texturefx",
              "label": "TextureFX"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/editing-shaders",
              "label": "编辑着色器"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/virtual-reality",
              "label": "虚拟现实"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/graphics-cards",
              "label": "显卡"
            },
            {
              "type": "doc",
              "id": "reference/libraries/3d/gpu-debugging",
              "label": "GPU 调试"
            }
          ],
          "link": {
            "type": "doc",
            "id": "reference/libraries/graphics-3d"
          }
        },
        {
          "type": "doc",
          "id": "reference/libraries/on-demand",
          "label": "按需开发"
        }
      ],
      "link": {
        "type": "doc",
        "id": "reference/libraries/overview"
      }
    },
    {
      "type": "category",
      "label": "扩展 vvvv",
      "items": [
        {
          "type": "doc",
          "id": "reference/extending/using-net-libraries",
          "label": "使用 .NET 库"
        },
        {
          "type": "doc",
          "id": "reference/extending/code-editors",
          "label": "选一个代码编辑器"
        },
        {
          "type": "doc",
          "id": "reference/extending/writing-nodes",
          "label": "使用 C# 编写节点"
        },
        {
          "type": "doc",
          "id": "reference/extending/custom-regions",
          "label": "自定义区块"
        },
        {
          "type": "doc",
          "id": "reference/extending/contributing",
          "label": "为已有节点库贡献"
        },
        {
          "type": "doc",
          "id": "reference/extending/creating",
          "label": "创建新节点库"
        },
        {
          "type": "doc",
          "id": "reference/extending/forwarding",
          "label": "转发 .NET 库"
        },
        {
          "type": "doc",
          "id": "reference/extending/node-factories",
          "label": "节点工厂"
        },
        {
          "type": "doc",
          "id": "reference/extending/aspects",
          "label": "Aspect"
        },
        {
          "type": "doc",
          "id": "reference/extending/design-guidelines",
          "label": "设计指南"
        },
        {
          "type": "doc",
          "id": "reference/extending/providing-help",
          "label": "提供帮助文档"
        },
        {
          "type": "doc",
          "id": "reference/extending/publishing",
          "label": "发布 NuGet"
        },
        {
          "type": "doc",
          "id": "reference/extending/editor-extensions",
          "label": "创建编辑器扩展"
        }
      ],
      "link": {
        "type": "doc",
        "id": "reference/extending/overview"
      }
    },
    {
      "type": "category",
      "label": "最佳实践",
      "items": [
        {
          "type": "doc",
          "id": "reference/best-practice/vvvv-on-arm",
          "label": "在 Arm CPU 上运行"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/vvvv-on-mac",
          "label": "在 Mac 上运行"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/video-playback",
          "label": "播放视频"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/video-capture",
          "label": "采集视频输入"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/video-recording",
          "label": "录成视频"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/video-synchronization",
          "label": "视频同步"
        },
        {
          "type": "link",
          "label": "文字渲染",
          "href": "/best-practice/text-rendering"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/raspberry-pi",
          "label": "部署到树莓派"
        },
        {
          "type": "doc",
          "id": "reference/best-practice/version-control",
          "label": "用 Git 做版本管理"
        }
      ],
      "link": {
        "type": "doc",
        "id": "reference/best-practice/overview"
      }
    }
  ],
  "explanations": [
    {
      "type": "doc",
      "id": "introduction/language",
      "label": "这门语言"
    },
    {
      "type": "category",
      "label": "看待事物",
      "items": [
        {
          "type": "doc",
          "id": "introduction/lo_0_dataHubs",
          "label": "数据与数据枢纽"
        },
        {
          "type": "doc",
          "id": "introduction/lo_1_data",
          "label": "数据与数据类型"
        },
        {
          "type": "doc",
          "id": "introduction/lo_2_dataflow",
          "label": "数据流"
        },
        {
          "type": "doc",
          "id": "introduction/lo_3_defAndUse",
          "label": "定义与使用"
        },
        {
          "type": "doc",
          "id": "introduction/lo_4_lookingAtNodes",
          "label": "节点"
        },
        {
          "type": "doc",
          "id": "introduction/lo_5_Runtime",
          "label": "运行中的系统"
        },
        {
          "type": "doc",
          "id": "introduction/lo_6_regions",
          "label": "区块"
        },
        {
          "type": "doc",
          "id": "introduction/lo_7_catAndVers",
          "label": "目录与版本"
        },
        {
          "type": "doc",
          "id": "introduction/lo_8_docAndscope",
          "label": "文档、依赖与作用域"
        },
        {
          "type": "category",
          "label": "基本节点与数据类型",
          "items": [
            {
              "type": "doc",
              "id": "introduction/lo_9_0_numericValues",
              "label": "数值"
            },
            {
              "type": "doc",
              "id": "introduction/lo_9_1_text",
              "label": "文本"
            },
            {
              "type": "doc",
              "id": "introduction/lo_9_2_Spreads",
              "label": "Spread 与其他集合"
            }
          ],
          "link": {
            "type": "doc",
            "id": "introduction/lo_9__basictypes"
          }
        }
      ],
      "link": {
        "type": "doc",
        "id": "introduction/looking-at-things"
      }
    },
    {
      "type": "category",
      "label": "再谈数据",
      "items": [
        {
          "type": "doc",
          "id": "introduction/mut",
          "label": "数据与可变性"
        },
        {
          "type": "doc",
          "id": "introduction/mut2",
          "label": "数据流与可变性"
        },
        {
          "type": "doc",
          "id": "introduction/mut3",
          "label": "检测变化"
        },
        {
          "type": "doc",
          "id": "introduction/mut4",
          "label": "不可变数据的构建器"
        },
        {
          "type": "doc",
          "id": "introduction/subtypes",
          "label": "子类型"
        }
      ]
    }
  ],
  "changelog": [
    {
      "type": "doc",
      "id": "changelog/7.x",
      "label": "7.x"
    },
    {
      "type": "doc",
      "id": "changelog/6.x",
      "label": "6.x"
    },
    {
      "type": "doc",
      "id": "changelog/5.x",
      "label": "5.x"
    },
    {
      "type": "doc",
      "id": "changelog/2021.4",
      "label": "2021.4"
    },
    {
      "type": "doc",
      "id": "changelog/2021.3",
      "label": "2021.3"
    },
    {
      "type": "doc",
      "id": "changelog/2020.2",
      "label": "2020.2"
    },
    {
      "type": "doc",
      "id": "changelog/2020.1",
      "label": "2020.1"
    },
    {
      "type": "doc",
      "id": "changelog/nuget-compatibility-chart",
      "label": "NuGet 兼容性对照表"
    }
  ],
  "roadmap": [
    {
      "type": "doc",
      "id": "roadmap/planned",
      "label": "计划中的版本"
    },
    {
      "type": "doc",
      "id": "roadmap/further",
      "label": "更远的议程"
    },
    {
      "type": "doc",
      "id": "roadmap/past",
      "label": "过往版本与博客"
    }
  ]
};
