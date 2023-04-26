const { optimize } = require('svgo');
const { readFileSync, writeFileSync } = require('node:fs');

async function run() {
  const input = readFileSync(`./input.svg`, { encoding: 'utf8' });
  const result = optimize(input, {
    path: './input.svg',
  });
  const optimizedSvgString = result.data;
  writeFileSync('output.svg', optimizedSvgString, { encoding: 'utf-8' });
  writeFileSync('output.svg.txt', optimizedSvgString, { encoding: 'utf-8' });
}

run();
