const esbuild = require('esbuild');

const buildOptions = {
    entryPoints: ['./src/extension.ts'],
    bundle: true,
    outfile: './out/extension.js',
    external: ['vscode'], // Don't bundle vscode API
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    sourcemap: true,
    minify: process.argv.includes('--minify'),
};

const buildScript = async () => {
    try {
        await esbuild.build(buildOptions);
        console.log('Build completed successfully!');
    } catch (err) {
        console.error('Build failed:', err);
        process.exit(1);
    }
};

const watchScript = async () => {
    const context = await esbuild.context(buildOptions);
    await context.watch();
    console.log('Watching for changes...');
};

if (process.argv.includes('--watch')) {
    watchScript();
} else {
    buildScript();
}