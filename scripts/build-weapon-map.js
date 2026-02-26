#!/usr/bin/env node

// Usage: node scripts/build-weapon-map.js <path-to-items-folder>
//
// Reads all .json files from the squad-json items folder,
// extracts class_name -> name mappings, and writes weapon-map.js

import { readdir, readFile, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const itemsDir = process.argv[2];
if (!itemsDir) {
  console.error("Usage: node scripts/build-weapon-map.js <path-to-items-folder>");
  process.exit(1);
}

const resolvedDir = resolve(itemsDir);
const files = (await readdir(resolvedDir)).filter((f) => f.endsWith(".json"));

console.log(`Found ${files.length} JSON files in ${resolvedDir}`);

const map = {};
let skipped = 0;

for (const file of files) {
  try {
    const raw = await readFile(join(resolvedDir, file), "utf-8");
    const data = JSON.parse(raw);

    const className = data.class_name;
    const name = data.name;
    if (!className || !name) {
      skipped++;
      continue;
    }

    // Strip trailing _C suffix (e.g. BP_AK74_Pro_C -> BP_AK74_Pro)
    const key = className.replace(/_C$/, "");
    map[key] = name;
  } catch {
    skipped++;
  }
}

const sortedKeys = Object.keys(map).sort();
const entries = sortedKeys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(map[k])}`);

const output = `const weaponMap = {
${entries.join(",\n")},
};

export function resolveWeaponName(raw) {
  return weaponMap[raw] || raw.replace(/^BP_/, "");
}
`;

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const outPath = join(scriptDir, "..", "weapon-map.js");
await writeFile(outPath, output);

console.log(`Wrote ${sortedKeys.length} mappings to ${outPath} (skipped ${skipped})`);
