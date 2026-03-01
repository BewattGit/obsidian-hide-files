import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

// 插件配置接口
interface HideFilesPluginSettings {
    hidden: boolean;           // 当前是否隐藏
    hiddenList: string[];      // 隐藏的文件/文件夹路径列表
}

const DEFAULT_SETTINGS: HideFilesPluginSettings = {
    hidden: true,
    hiddenList: [],
};

export default class HideFilesPlugin extends Plugin {
    settings: HideFilesPluginSettings;
    private observer: MutationObserver | null = null;

    async onload() {
        await this.loadSettings();

        // 注册右键菜单
        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file) => {
                menu.addItem((item) => {
                    const isHidden = this.settings.hiddenList.includes(file.path);

                    if (isHidden) {
                        item.setTitle('Show')
                            .setIcon('eye')
                            .onClick(() => this.unhidePath(file.path));
                    } else {
                        item.setTitle('Hide')
                            .setIcon('eye-off')
                            .onClick(() => this.hidePath(file.path));
                    }
                });
            })
        );

        // 初始化隐藏状态 - 使用 MutationObserver 监听文件浏览器 DOM 变化
        this.app.workspace.onLayoutReady(() => {
            this.setupFileExplorerObserver();
            // 立即处理已存在的节点
            this.applyHiddenStateToExistingFiles();
        });

        // 添加侧边栏图标
        this.addRibbonIcon('eye-off', 'Toggle hidden files', () => {
            this.toggleVisibility();
        });

        // 添加命令
        this.addCommand({
            id: 'toggle-visibility',
            name: 'Toggle hidden files visibility',
            callback: () => this.toggleVisibility(),
        });

        // 添加设置页面
        this.addSettingTab(new HideFilesSettingTab(this.app, this));
    }

    // 隐藏文件/文件夹
    async hidePath(path: string) {
        if (!this.settings.hiddenList.includes(path)) {
            this.settings.hiddenList.push(path);
            this.changePathVisibility(path, this.settings.hidden);
            await this.saveSettings();
        }
    }

    // 取消隐藏
    async unhidePath(path: string) {
        const index = this.settings.hiddenList.indexOf(path);
        if (index > -1) {
            this.settings.hiddenList.splice(index, 1);
            this.changePathVisibility(path, false);
            await this.saveSettings();
        }
    }

    // 改变文件可见性 (核心 DOM 操作)
    changePathVisibility(path: string, hide: boolean) {
        const escapedPath = CSS.escape(path);
        const element = document.querySelector(`[data-path="${escapedPath}"]`);

        if (!element) return;

        const parent = element.parentElement;
        if (parent) {
            parent.style.display = hide ? 'none' : '';
        }
    }

    // 设置文件浏览器 DOM 观察器
    setupFileExplorerObserver() {
        // 先断开已有的观察器
        if (this.observer) {
            this.observer.disconnect();
        }

        // 查找文件浏览器容器
        const fileExplorer = document.querySelector('.nav-files-container');
        if (!fileExplorer) return;

        // 创建观察器
        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    this.handleNewNodes(mutation.addedNodes);
                }
            }
        });

        // 开始观察
        this.observer.observe(fileExplorer, {
            childList: true,
            subtree: true,
        });
    }

    // 处理新添加的节点
    handleNewNodes(nodes: NodeList) {
        nodes.forEach((node) => {
            if (node instanceof HTMLElement) {
                // 检查节点本身是否有 data-path 属性
                const path = node.getAttribute('data-path');
                if (path && this.settings.hiddenList.includes(path)) {
                    this.changePathVisibility(path, this.settings.hidden);
                }

                // 检查子节点
                const children = node.querySelectorAll('[data-path]');
                children.forEach((child) => {
                    const childPath = child.getAttribute('data-path');
                    if (childPath && this.settings.hiddenList.includes(childPath)) {
                        this.changePathVisibility(childPath, this.settings.hidden);
                    }
                });
            }
        });
    }

    // 对已存在的文件应用隐藏状态
    applyHiddenStateToExistingFiles() {
        // 使用 requestAnimationFrame 确保 DOM 已渲染
        requestAnimationFrame(() => {
            for (const path of this.settings.hiddenList) {
                this.changePathVisibility(path, this.settings.hidden);
            }
        });
    }

    // 切换显示/隐藏状态
    async toggleVisibility() {
        this.settings.hidden = !this.settings.hidden;
        await this.saveSettings();

        // 更新 ribbon 图标
        this.updateRibbonIcon();

        // 更新所有隐藏文件的显示状态
        for (const path of this.settings.hiddenList) {
            this.changePathVisibility(path, this.settings.hidden);
        }
    }

    // 更新 ribbon 图标
    updateRibbonIcon() {
        const iconEl = document.querySelector('.workspace-ribbon .clickable-icon[aria-label*="Toggle hidden"]');
        if (!iconEl) return;

        const iconName = this.settings.hidden ? 'eye-off' : 'eye';
        const tooltipText = this.settings.hidden ? 'Show hidden files' : 'Hide files';

        // 获取 lucide 图标 SVG
        const iconMap: Record<string, string> = {
            'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
            'eye-off': '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'
        };

        // 更新 SVG 内容
        const svgEl = iconEl.querySelector('svg');
        if (svgEl) {
            svgEl.innerHTML = iconMap[iconName];
        }

        // 更新 tooltip
        iconEl.setAttribute('aria-label', tooltipText);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    onunload() {
        // 断开观察器
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        // 清理：恢复所有隐藏文件的显示
        for (const path of this.settings.hiddenList) {
            this.changePathVisibility(path, false);
        }
    }
}

// 设置页面
class HideFilesSettingTab extends PluginSettingTab {
    plugin: HideFilesPlugin;

    constructor(app: App, plugin: HideFilesPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        // 隐藏列表管理
        new Setting(containerEl)
            .setName('Hidden Files List')
            .setDesc('Files and folders currently hidden')
            .addTextArea((text) =>
                text
                    .setPlaceholder('One path per line')
                    .setValue(this.plugin.settings.hiddenList.join('\n'))
                    .onChange(async (value) => {
                        this.plugin.settings.hiddenList = value
                            .split('\n')
                            .filter(line => line.trim() !== '');
                        await this.plugin.saveSettings();
                    })
            );

        // 清空按钮
        new Setting(containerEl)
            .setName('Clear All')
            .setDesc('Remove all hidden files')
            .addButton((button) =>
                button
                    .setButtonText('Clear Hidden List')
                    .setCta()
                    .onClick(async () => {
                        this.plugin.settings.hiddenList = [];
                        await this.plugin.saveSettings();
                        this.display();
                    })
            );
    }
}
