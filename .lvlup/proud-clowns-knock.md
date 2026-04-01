---
"lvlup": patch
---

Fix CHANGELOG.md not being added when running `lvlup bump`. The issue was that lvlup's lookup searches for "CHANGELOG.md" written exactly like that - with the right casing. Now, instead of assuming this exact casing, it searches the root project for ANY casing (by lowercasing & comparing), and then takes whatever it finds.
