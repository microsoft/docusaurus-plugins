import { createHash } from 'crypto';
import { LangOptions } from './types';
import { readFileSync } from 'fs-extra';

export default function hashCode(source: string, meta: string, options: LangOptions) {
  const hash = createHash('sha1');
  hash.update(source).update(meta).update(JSON.stringify(options));
  options.hashFiles?.forEach((file) => {
    hash.update(readFileSync(file));
  });
  return hash.digest('hex');
}
