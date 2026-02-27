import { App, PluginSettingTab, Setting } from 'obsidian';
import HideFilesPlugin from './main';

/**
 * 设置页面模块
 * 提供隐藏列表的管理界面
 */
export class HideFilesSettingTab extends PluginSettingTab {
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
            .setDesc('Files and folders currently hidden (one path per line)')
            .addTextArea((text) =>
                text
                    .setPlaceholder('folder/file.md')
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
            .setDesc('Remove all files from the hidden list')
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

        // 默认隐藏状态设置
        new Setting(containerEl)
            .setName('Default Hidden State')
            .setDesc('When enabled, hidden files are not shown in the file explorer')
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.hidden)
                    .onChange(async (value) => {
                        this.plugin.settings.hidden = value;
                        await this.plugin.saveSettings();
                        // 更新所有文件的显示状态
                        for (const path of this.plugin.settings.hiddenList) {
                            this.plugin.changePathVisibility(path, value);
                        }
                    })
            );
    }
}
