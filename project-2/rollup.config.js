import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import uglify from 'rollup-plugin-uglify';

const production = process.env.production || false;

export default {
  input: 'src/scripts/index.js',
  output: {
    file: 'dist/scripts/bundle.js',
    format: 'iife',
  },
  plugins: [
    progress(),
    postcss({
      extract: 'dist/styles/bundle.css',
      config: {ctx: {production: production}},
    }),
    resolve({browser: true, jsnext: true, main: true}),
    commonjs(),
    babel({exclude: 'node_modules/**'}),

    !production && serve({contentBase: 'dist', port: 3000}),
    !production && livereload('dist'),

    production && uglify(),
    production && filesize(),
  ],
};
