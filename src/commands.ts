import HideFilesPlugin from './main';

/**
 * 命令模块
 * 注册插件可用的命令
 */
export function registerCommands(plugin: HideFilesPlugin): void {
    // 切换隐藏/显示状态命令
    plugin.addCommand({
        id: 'toggle-visibility',
        name: 'Toggle visibility of hidden files',
        callback: () => plugin.toggleVisibility(),
    });

    // 显示所有隐藏文件命令
    plugin.addCommand({
        id: 'show-all-hidden',
        name: 'Show all hidden files',
        callback: () => plugin.showAll(),
    });

    // 隐藏所有隐藏文件命令
    plugin.addCommand({
        id: 'hide-all-hidden',
        name: 'Hide all hidden files',
        callback: () => plugin.hideAll(),
    });
}
