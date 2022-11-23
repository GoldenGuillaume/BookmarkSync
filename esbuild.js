import * as dotenv from 'dotenv';
import { build, buildSync } from 'esbuild';

dotenv.config();

const config = {
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV != 'production',
    splitting: true,
    format: 'esm',
    target: ['esnext']
};

if (process.env.NODE_ENV == 'production') {
    build({
        ...config
    }).catch(() => process.exit(1));
} else {
    const results = buildSync({
        ...config
    });
    console.log(results);
    console.log(process.env.NODE_ENV);
}


