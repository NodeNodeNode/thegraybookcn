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
          "type": "category",
          "label": "核心库",
          "items": [
            {
              "type": "doc",
              "id": "reference/libraries/reactive",
              "label": "响应式"
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
              "id": "reference/libraries/3d/geometry",
              "label": "多边形"
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
            }
          ],
          "link": {
            "type": "doc",
            "id": "reference/libraries/graphics-3d"
          }
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
          "id": "reference/extending/writing-nodes",
          "label": "使用 C# 编写节点"
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
    }
  ]
};
