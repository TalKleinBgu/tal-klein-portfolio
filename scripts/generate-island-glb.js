const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const blenderScript = path.join(__dirname, 'build_island_blender.py');
const candidates = [
  process.env.BLENDER_PATH,
  'C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe',
  'blender'
].filter(Boolean);

let lastError;
for (const executable of candidates) {
  if (executable !== 'blender' && !fs.existsSync(executable)) continue;
  const result = spawnSync(executable, ['--background', '--python', blenderScript], {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  if (!result.error) process.exit(result.status ?? 1);
  lastError = result.error;
}

console.error('Blender was not found. Set BLENDER_PATH or install Blender 5.2.');
if (lastError) console.error(lastError.message);
process.exit(1);
