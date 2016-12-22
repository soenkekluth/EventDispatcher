import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
// import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/image-player.js',
  dest: pkg['main'],
  // format: 'es',
  format: 'iife',
  // format: 'iife',
  moduleName: 'ImagePlayer',
  // plugins: [
  //   babel({
  //     exclude: 'node_modules/**',
  //   }),
  // ],
  external: external,
  plugins: [
    babel(babelrc()),
    // istanbul({
    //   exclude: ['test/**/*', 'node_modules/**/*']
    // })
  ],
  // external: external,
  // targets: [
  //   {
  //     dest: pkg['main'],
  //     format: 'umd',
  //     moduleName: 'rollupStarterProject',
  //     sourceMap: true
  //   },
  //   {
  //     dest: pkg['jsnext:main'],
  //     format: 'cjs',
  //     sourceMap: true
  //   }
  // ]
};
