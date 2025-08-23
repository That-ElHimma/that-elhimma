// sanitize-node-core-deps.js
const fs = require('fs');
const path = require('path');

function tryReadJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

function writeJSON(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('Updated', p);
}

function removeNodeKeysFromDeps(obj) {
  const depFields = ['dependencies','devDependencies','peerDependencies','optionalDependencies'];
  let changed = false;
  depFields.forEach(f => {
    if (obj && obj[f]) {
      Object.keys(obj[f]).forEach(k => {
        if (k.startsWith('node:')) {
          delete obj[f][k];
          changed = true;
          console.log('Removed key', k, 'from', f);
        }
      });
      if (obj[f] && Object.keys(obj[f]).length === 0) delete obj[f];
    }
  });
  return changed;
}

function sanitizePackageJson(filePath) {
  const abs = path.resolve(filePath);
  const json = tryReadJSON(abs);
  if (!json) {
    console.log('No valid JSON at', filePath);
    return;
  }
  let changed = removeNodeKeysFromDeps(json);

  // package-lock (v2/v3) has top-level "dependencies" too
  if (json.dependencies) {
    Object.keys(json.dependencies).forEach(k => {
      if (k.startsWith('node:')) {
        delete json.dependencies[k];
        changed = true;
        console.log('Removed', k, 'from top-level dependencies');
      }
    });
  }

  // package-lock v3 has "packages" map where keys may start with 'node:'
  if (json.packages) {
    Object.keys(json.packages).forEach(k => {
      if (k.startsWith('node:')) {
        delete json.packages[k];
        changed = true;
        console.log('Removed', k, 'from packages');
      }
    });
  }

  if (changed) writeJSON(abs, json);
  else console.log('No node: keys found in', filePath);
}

['package.json', 'package-lock.json'].forEach(sanitizePackageJson);
