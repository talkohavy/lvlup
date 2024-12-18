---
"lvlup": patch
---

Bundling the package as esm now. As you cannot use both the global __dirname (which throws an error in ESM) & you cannot use import.meta.dirname (as it is undefined in commonjs), we must choose between bundling the package as esm or in commonjs. Since this is meant to remain a CLI tool, we figured there's no harm in keeping it as esm, to fit into today's modern world.
