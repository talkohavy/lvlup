---
"lvlup": patch
---

Switched to the modern way of getting the __dirname. Instead of using the 'url' & 'path' modules, to then apply onto the import.meta.url, on node 20 there the new import.meta.filename & dirname attached.
