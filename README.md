# lvlup 🎩

<p align="center">
  <img src="https://i.ibb.co/Z8cNZVZ/level-up.png" width="250" alt="lvlup logo" />
</p>

A CLI tool to help you manage your package versions easily.

**lvlup** helps you manage the versioning and changelog entries for your package.

## Getting Started

### Step 1: Install the package

First install the package by running:

```bash
npm install lvlup
```

### Step 2: Run the init command

When it's your first time using the CLI, you need to run the `init` command.

At the root of your project, run:

```bash
npx lvlup init
```

You are now ready to use the CLI tool 🙂

### Step 3: Add your first change

Run the following:

```bash
npx lvlup add
```

and follow the prompts.

---

## Core Concepts

The core concept that `lvlup` follows is that contributors to a repository should be able to declare an _intent to release_, and that multiple intents would then be calculated along with the package's current version to generate the next version.

A single _change_ is an intent to release stored as data, with the information we need to combine multiple changes and coordinate releases.

---

### Your new Workflow

A contributor runs:

```bash
npx lvlup add
```

and answers the provided questions.

When the maintainer wants to release packages, they should run:

```bash
npx lvlup bump
```

followed by:

```bash
npx lvlup publish
```

The commands are explained further below.

---

## Commands

### 1. `init`

```bash
lvlup init
```

This command sets up the `.lvlup` folder. It generates a README.md and a config.json file. The config file includes the default options. You should run this command once, when you are setting up `lvlup`.

To publish public packages to NPM, you'll need to edit `.lvlup/config.json` and change `"access": "restricted",` to `"access": "public",`. Read more about [access in config file options](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#access-restricted--public). The `publishConfig` of each `package.json` is also respected and takes a priority over the setting stored under `.lvlup/config.json`.

### 2. `add`

```
lvlup add [--empty] [--open]
```

This command will ask you a series of questions. First, what semver bump type do you require, then it will ask for a summary of the changes. At the final step it will show the change metadata it will generate, and confirm that you want to add it.

Once confirmed, the change metadata will bw written as a Markdown file that contains the summary and YAML front matter which stores the package's name that will be released and the semver bump types for it.

A change that minor bumps `axios` would look like this:

```md
---
axios: minor
---

A description of the minor changes.
```

If you want to modify the md file after it's generated, it's completely fine. Or, if you want to write a change file yourself, that's also fine.

If you set the `commit` option in the config, the command will add the updated changeset files and then commit them.

- `--open` - opens the created changeset in an external editor

### 3. `bump`

```bash
lvlup bump
```

Updates the version of the package according to all changes under `.lvlup` since the last release.

Will also create/append to a **CHANGELOG** file using the summaries from the changesets.

We recommend making sure changes made from this command are merged back into the base branch before you run `publish`.

This command will read then delete change files on disk, ensuring that they are only used once.

### 4. `publish`

```bash
lvlup publish [--otp={token}]
```

Publishes to NPM repo, and creates git tags. Because this command assumes that last commit is the release commit you should not commit any changes between calling `bump` and `publish`. These commands are separate to enable you to check if release commit is accurate.

- `--otp={token}` - allows you to provide an npm one-time password if you have auth and writes enabled on npm. The CLI also prompts for the OTP if it's not provided with the `--otp` option.

**NOTE:** You will still need to push your changes back to the base branch after this

```bash
git push --follow-tags
```

### 5. `status`

```bash
lvlup status
```

The status command provides information about the changes that currently exist.

<!-- - `--verbose` - use if you want to know the new versions, and get a link to the relevant changeset summary. -->
