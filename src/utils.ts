/**
 * 工具函数模块
 */

/**
 * 转义路径以用于 CSS 选择器
 * Obsidian 的文件路径可能包含特殊字符，需要正确转义
 */
export function escapePathForSelector(path: string): string {
    return CSS.escape(path);
}

/**
 * 检查路径是否匹配模式（支持通配符）
 */
export function matchesPattern(path: string, pattern: string): boolean {
    // 精确匹配
    if (path === pattern) {
        return true;
    }

    // 支持 * 通配符
    if (pattern.includes('*')) {
        const regexPattern = pattern
            .replace(/[.+?^${}()|[\]\\]/g, '\\$&')  // 转义特殊字符
            .replace(/\*/g, '.*');  // * 替换为 .*
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(path);
    }

    return false;
}

/**
 * 检查文件是否应该被隐藏
 */
export function shouldHideFile(path: string, hiddenList: string[]): boolean {
    for (const hiddenPath of hiddenList) {
        // 精确匹配
        if (path === hiddenPath) {
            return true;
        }
        // 文件夹匹配（隐藏文件夹时，其子文件也应该隐藏）
        if (path.startsWith(hiddenPath + '/')) {
            return true;
        }
    }
    return false;
}

/**
 * 防抖函数
 * 用于处理大量文件时的性能优化
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<T>): void {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
