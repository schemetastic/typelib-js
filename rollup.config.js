
import { minify } from 'rollup-plugin-esbuild';
import banner from 'rollup-plugin-banner';
const pkg = require('./package.json');

const headerLong = `/*
** ${pkg.name} | Version ${pkg.version}
** ${pkg.description}
** © ${pkg.author.name} | License: ${pkg.license}
*/`;

const headerShort = `${pkg.name} | V ${pkg.version} | Author: © ${pkg.author.name} | License: ${pkg.license}`;

export default {
    input: 'src/typelib.js',
    output: [
        // Immediately invoked function expression
        {
            file: 'dist/typelib.js',
            format: 'iife',
            name: "typelib",
            banner: headerLong,
        },
        // IIFE Min
        {
            file: 'dist/typelib.min.js',
            format: 'iife',
            name: "typelib",
            plugins: [
                minify(),
                banner(headerShort)
            ]
        },
        // Common JS
        {
            file: 'dist/typelib.cjs',
            format: 'cjs',
            banner: headerLong
        },
        // EcmaScript Module
        {
            file: 'dist/typelib.mjs',
            format: 'es',
            banner: headerLong
        }
    ]
};

