const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json');
const { Generator } = require('npm-dts');

new Generator({
    entry: "src/index.ts",
    output: "out/index.d.ts"
}).generate();

const sharedConfig = {
    entryPoint: ["src/index.ts"],
    bundle: true,
    minify: true,
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies))
};

build({
    ...sharedConfig,
    platform: 'node',
    outfile: "out/index.js"
});

build({
    ...sharedConfig,
    platform: 'neutral',
    format: "esm",
    outfile: "out/index.esm.js"
});