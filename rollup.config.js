
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
            name: 'type',
            banner: headerLong,
        },
        // IIFE Min
        {
            file: 'dist/typelib.min.js',
            format: 'iife',
            name: 'type',
            plugins: [
                minify(),
                banner(headerShort)
            ]
        },
        // Common JS
        {
            file: 'dist/typelib.cjs.js',
            format: 'cjs',
            exports: 'default',
            banner: headerLong
        },
        // CJS Min
        {
            file: 'dist/typelib.cjs.min.js',
            format: 'cjs',
            exports: 'default',
            plugins: [
                minify(),
                banner(headerShort)
            ]
        },
        // EcmaScript Module
        {
            file: 'dist/typelib.es.js',
            format: 'es',
            banner: headerLong
        },
        // ESM Min
        {
            file: 'dist/typelib.es.min.js',
            format: 'es',
            plugins: [
                minify(),
                banner(headerShort)
            ]
        }
    ]
};

