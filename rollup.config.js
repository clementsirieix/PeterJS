import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default [
    {
        input: pkg.src,
        output: {
            file: pkg.main,
            format: 'cjs',
            indent: false,
        },
        external: [ ...Object.keys(pkg.dependencies || {}) ],
        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                    },
                    exclude: [
                        'node_modules',
                        'src/**/*.spec.ts'
                    ],
                },
            }),
        ],
    },
    {
        input: pkg.src,
        output: {
            file: pkg.module,
            format: 'es',
            indent: false,
        },
        external: [ ...Object.keys(pkg.dependencies || {}) ],
        plugins: [ typescript() ],
    },
    {
        input: pkg.src,
        output: {
          file: pkg.unpkg,
          format: 'umd',
          name: 'Peter-generator',
          indent: false,
        },
        plugins: [
            typescript(),
            nodeResolve({ jsnext: true }),
        ]
    },
    {
        input: pkg.src,
        output: {
          file: 'dist/peter-generator.min.js',
          format: 'umd',
          name: 'Peter-generator',
          indent: false,
        },
        plugins: [
            typescript(),
            nodeResolve({ jsnext: true }),
            terser({
                compress: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false,
                },
            }),
        ]
    },
]
