# Hide Files - Obsidian 插件

通过简单的右键点击，在 Obsidian 的文件浏览器中隐藏文件和文件夹。

---

## ✨ 功能特性

- 🔒 **右键隐藏** - 右键点击任意文件/文件夹即可隐藏
- 👁️ **侧边栏切换** - 点击侧边栏图标快速显示/隐藏所有隐藏的文件
- ⚡ **即时切换** - 在可见和隐藏状态之间瞬间切换
- 💾 **持久化设置** - 你的隐藏文件列表会自动保存
- 🎯 **精确控制** - 在设置页面中精确管理每个隐藏的文件路径

---

## 📦 安装方式

### 方式 1：社区插件市场（推荐）

1. 打开 Obsidian **设置**
2. 进入 **第三方插件**
3. 点击 **浏览**
4. 搜索 **"Hide Files"**
5. 点击 **安装**
6. 安装完成后 **启用** 插件

### 方式 2：手动安装

1. 从 [Releases](https://github.com/Bewatt/obsidian-hide-files/releases) 下载最新版本
2. 解压以下文件到你的仓库目录：
   ```
   你的仓库/.obsidian/plugins/hide-files/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```
3. 在 Obsidian 设置中启用插件

### 方式 3：BRAT 插件（适合测试更新）

1. 安装 [Obsidian BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 打开 BRAT 设置，点击 **Add beta plugin**
3. 输入仓库 URL：`https://github.com/Bewatt/obsidian-hide-files`
4. 点击 **Add Plugin**

---

## 📖 使用说明

### 隐藏文件/文件夹

1. 在文件浏览器中 **右键点击** 想要隐藏的文件或文件夹
2. 选择 **隐藏**
3. 文件立即消失（但实际仍存在）

### 显示隐藏的文件

1. 在文件浏览器中找到隐藏文件原来的位置
2. **右键点击** 该位置
3. 选择 **显示**

### 切换所有隐藏文件

- 点击左侧侧边栏的 **眼睛图标** 👁️
- 👁️ 完整眼睛 = 文件可见状态
- 👁️‍🗨️ 带斜杠眼睛 = 文件已隐藏

---

## ⚙️ 设置

在 **设置 → Hide Files** 中：

| 选项 | 说明 |
|------|------|
| **Hidden Files List** | 查看和编辑隐藏文件列表（每行一个路径） |
| **Clear All** | 一键清空所有隐藏记录 |

---

## 💡 使用场景

- 📝 隐藏临时文件或草稿
- 🗂️ 隐藏系统文件（如 `.git` 文件夹）
- 🔐 隐藏私密笔记
- 🧹 保持工作区整洁
- 📚 隐藏参考资料库

---

## 🛠️ 技术信息

| 项目 | 值 |
|------|-----|
| 版本 | 1.0.0 |
| 最低 Obsidian 版本 | 0.14.6 |
| 作者 | Bewatt |
| 许可证 | MIT |
| 源代码 | [GitHub](https://github.com/Bewatt/obsidian-hide-files) |

---

## 📜 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

感谢以下项目提供的灵感：

- [file-hider](https://github.com/Eldritch-Oliver/file-hider)
- [obsidian-hide-folders](https://github.com/JonasDoesThings/obsidian-hide-folders)

---

**最后更新**: 2026-02-26
