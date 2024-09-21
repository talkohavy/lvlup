# lvlup

## 1.0.3

### Patch Changes

- lvlup will now tag your bump commit with the version number

## 1.0.2

### Patch Changes

- better explanation of the new workflow

## 1.0.1

### Patch Changes

- added an example image of the status command's output

## 1.0.0

### Major Changes

- First Major release of LvLup CLI tool

### Minor Changes

- added a blue status title

### Patch Changes

- fix status command: remove additional '...' from descriptions below 50 chars
- found some grammer issues in some prints
- using console-table-printer now as our table printer

## 0.0.38

### Patch Changes

- status should only display the filename, not its full path

## 0.0.37

### Patch Changes

- packageName inside of mdVersionFileTemplate must be wrapped in quotes because scoped packages begin with @ and gray matter can't parse it with out quotes
- print a new line break before printing the status table
- after logging the New package version, need to do stop the coloring

## 0.0.36

### Patch Changes

- init's last logger.info color was wrongfully positioned

## 0.0.35

### Patch Changes

- getAllMdVersionFiles now ignores the README.md file

## 0.0.34

### Patch Changes

- lvlup is now cross platform.

## 0.0.33

### Patch Changes

- ok NOWWWW the images will support dark mode on github

## 0.0.32

### Patch Changes

- updated the readme.md main image logo to fit in dark mode

## 0.0.31

### Patch Changes

- removed slashes before backticks inside default.README.md file

## 0.0.30

### Patch Changes

- README.md sourcePath was incorrect !@#$%^&\*()\_+

## 0.0.29

### Patch Changes

- both add & bump commands now support the commit option under the `config.json`

## 0.0.28

### Patch Changes

- respecting the add command

## 0.0.27

### Patch Changes

- colorSemverLevels colored only the first occurrence of semverLevel
- copying static files in a different way.
  build process has been updated to support copy of static files.

## 0.0.26

### Patch Changes

- bump command can now take into consideration new line items

## 0.0.25

### Patch Changes

- replaced positionals with flags in the help menu

## 0.0.24

### Patch Changes

- EditorTypes accidentally got into the choices for editor flag

## 0.0.23

### Patch Changes

- remaned positionals to blue colored Flags

## 0.0.22

### Patch Changes

- commit message cannot be empty, cannot be 2 or more consequtive spaces

## 0.0.21

### Patch Changes

- removed the link

## 0.0.20

### Patch Changes

- added keywords and updated the README.md file

## 0.0.19

### Patch Changes

- fixed some warningg suggested by mp pkg fix

## 0.0.18

### Patch Changes

- created a publish command

## 0.0.17

### Patch Changes

- added a link to the git repository

## 0.0.16

### Patch Changes

- added a status command

## 0.0.15

### Patch Changes

- added a new line for DEFAULT_CONFIG_JSON

## 0.0.14

### Patch Changes

- updated the DEFAULT_CONFIG_JSON & DEFAULT_README_MD

## 0.0.13

### Patch Changes

- the init command creates 2 files now: config.json & readme.md

## 0.0.12

### Patch Changes

- BUGFIX: version calculation was wrong

## 0.0.11

### Patch Changes

- back to smallest bundle size possible (no minify, only js files)

## 0.0.10

### Patch Changes

- trying to use rollup as bundler and terser as the minify`er

## 0.0.9

### Patch Changes

- IMPROVEMENT: made CLI weigh much less. removed .js.map files

## 0.0.8

### Patch Changes

- BUGFIX: version was again taked from the wrong place. it is now being hardcoded during build

## 0.0.7

### Patch Changes

- BUGFIX: my custom version flag should grab version from lvlup's version as a constant

## 0.0.6

### Patch Changes

- yargs should be a dependency and NOT a devDependency

## 0.0.5

### Patch Changes

- added an init command

## 0.0.4

### Patch Changes

- one file, many commands: init, add, bump, status & publish

## 0.0.3

### Patch Changes

- did not have the shabang set up porperly

## 0.0.2

### Patch Changes

- larer image in READMD.md

## 0.0.1

### Patch Changes

- new README.md file
