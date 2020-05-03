import Debug from 'debug';
import pkg from '@/../package.json';

// add package-name as prefix to debugger namespace
export default (namespace) => Debug(`${pkg.name}:${namespace}`);
