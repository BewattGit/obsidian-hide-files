import esbuild from 'esbuild';
import { readFileSync } from 'fs';

const isDevMode = process.argv.includes('--dev');

esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian'],
  format: 'cjs',
  platform: 'browser',
  target: 'ES2020',
  outfile: isDevMode ? 'main.js' : 'dist/main.js',
  sourcemap: isDevMode ? 'inline' : false,
  minify: !isDevMode,
  watch: isDevMode ? {
    onRebuild(error) {
      if (error) console.error('Watch build failed:', error);
      else console.log('Watch build succeeded');
    }
  } : undefined,
}).catch(() => process.exit(1));
