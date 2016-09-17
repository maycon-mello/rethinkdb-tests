import development from './dev.config';
import test from './test.config';

let env = process.env.NODE_ENV || 'development';
let config = { development, test };
let current = config[env];

console.log(`Current env: ${env}`);

if (!current) {
  console.log(`ENV config not found.`);
  process.exit(0);
}

export default current;
