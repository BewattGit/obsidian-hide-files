# Hide Files - Obsidian Plugin

Hide files and folders in Obsidian's file explorer with a simple right-click.

---

## ✨ Features

- 🔒 **Right-click to hide** - Hide any file or folder with a simple right-click
- 👁️ **Ribbon toggle** - Show/hide all hidden files with the sidebar icon
- ⚡ **Instant toggle** - Switch between visible and hidden states instantly
- 💾 **Persistent settings** - Your hidden files list is saved automatically
- 🎯 **Precise control** - Manage each hidden file path in the settings page

---

## 📦 Installation

### Method 1: Community Plugins (Recommended)

1. Open Obsidian **Settings**
2. Go to **Community plugins**
3. Click **Browse**
4. Search for **"Hide Files"**
5. Click **Install**
6. **Enable** the plugin after installation

### Method 2: Manual Install

1. Download the latest release from [Releases](https://github.com/Bewatt/obsidian-hide-files/releases)
2. Extract the following files to your vault:
   ```
   YourVault/.obsidian/plugins/hide-files/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```
3. Enable the plugin in Obsidian Settings

### Method 3: BRAT Plugin (For beta updates)

1. Install the [Obsidian BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
2. Open BRAT settings and click **Add beta plugin**
3. Enter the repository URL: `https://github.com/Bewatt/obsidian-hide-files`
4. Click **Add Plugin**

---

## 📖 Usage

### Hide a File/Folder

1. **Right-click** on any file or folder in the file explorer
2. Select **Hide**
3. The file disappears instantly (but still exists)

### Unhide a File

1. Navigate to where the hidden file was
2. **Right-click** on that location
3. Select **Unhide**

### Toggle All Hidden Files

- Click the **eye icon** 👁️ in the left sidebar
- 👁️ Open eye = Files are visible
- 👁️‍🗨️ Eye with slash = Files are hidden

---

## ⚙️ Settings

In **Settings → Hide Files**:

| Option | Description |
|--------|-------------|
| **Hidden Files List** | View and edit the list of hidden files (one path per line) |
| **Clear All** | Clear all hidden file records with one click |

---

## 💡 Use Cases

- 📝 Hide temporary files or drafts
- 🗂️ Hide system files (like `.git` folder)
- 🔐 Hide private notes
- 🧹 Keep your workspace clean
- 📚 Hide reference libraries

---

## 🛠️ Technical Info

| Item | Value |
|------|-------|
| Version | 1.0.0 |
| Min Obsidian Version | 0.14.6 |
| Author | Bewatt |
| License | MIT |
| Source Code | [GitHub](https://github.com/Bewatt/obsidian-hide-files) |

---

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

Thanks to the following projects for inspiration:

- [file-hider](https://github.com/Eldritch-Oliver/file-hider)
- [obsidian-hide-folders](https://github.com/JonasDoesThings/obsidian-hide-folders)

---

**Last Updated**: 2026-02-26
