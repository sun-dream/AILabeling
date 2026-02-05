# ESLint 配置模板 (HTML/JS 项目专用)

这是一套专为 **传统 HTML + JS 项目** 设计的轻量级代码规范配置模板。
旨在帮助无构建工具的 Web 项目快速接入代码检测与自动修复功能。

## 目录结构

```text
eslint_template_html/
├── package.json       # 依赖定义与脚本命令
├── .eslintrc.js       # ESLint 核心规则配置
└── .eslintignore      # 忽略文件列表
```

## 如何使用

### 1. 复制文件
将本目录下的以下三个文件复制到您的目标项目根目录：
- `package.json`
- `.eslintrc.js`
- `.eslintignore`

### 2. 安装依赖
在目标项目根目录下打开终端，运行：

```bash
npm install
```

### 3. 运行检测与修复

**检测代码规范：**
```bash
npm run lint
```
*这会扫描目录下所有的 .js 文件以及 .html 文件中的 `<script>` 标签内容。*

**自动修复代码（推荐）：**
```bash
npm run lint:fix
```
*这会自动修复缩进、分号、引号等格式问题，相当于“自动补全/格式化”。*

## 配置说明

- **环境支持**：已启用 `browser` (浏览器环境) 和 `es2021` (现代 JS 语法)。
- **HTML 支持**：通过 `eslint-plugin-html` 插件，可以直接检测 HTML 文件内的 JS 代码。
- **规则定制**：
    - 缩进：4 空格
    - 引号：单引号
    - 分号：强制使用
    - 允许 `console.log`
    - 允许未使用的变量（仅警告，不报错）

如需修改规则，请编辑 `.eslintrc.js` 文件中的 `rules` 字段。
