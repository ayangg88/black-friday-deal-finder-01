import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repo = fileURLToPath(new URL('.', import.meta.url));
const destination = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const appSource = join(repo, 'app');
const appDestination = join(destination, 'app');
const shotsSource = join(repo, 'screenshots');
const shotsDestination = join(destination, 'screenshots');

mkdirSync(destination, { recursive: true });
cpSync(appSource, appDestination, { recursive: true });
mkdirSync(shotsDestination, { recursive: true });
if (existsSync(shotsSource)) cpSync(shotsSource, shotsDestination, { recursive: true });

const dossier = buildDossier(destination, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(destination, 'dossier.json'), dossier);
