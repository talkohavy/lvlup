# lvlup 🎩

<p align="center" >
  <img src="https://i.ibb.co/Z8cNZVZ/level-up.png" width="250" alt="lvlup logo" 
  style="background-color:white; border-radius:50%; box-shadow:0px 0px 5px 2px rgba(66,200,118,1);"
  />
</p>

A CLI tool to help you manage your package versions easily.

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

A single _change_ is an intent to release, stored as data, with the information we need to combine multiple changes and coordinate releases.

---

### Your new Workflow

A contributor runs:

```bash
npx lvlup add
```

and answers the prompted questions.

When the maintainer wants to release the package, they should run:

```bash
npx lvlup bump
```

followed by:

```bash
npx lvlup publish
```

The commands are explained further down below.

---

## Commands

### 1. `init`

```bash
lvlup init
```

This command sets up the `.lvlup` folder at the root of your project. It generates a `README.md` and a `config.json` file. The config file has to be found within the `.lvlup` dir in order for the tool to work. You should run the _init_ command once, when you are setting up `lvlup`.

### 2. `add`

```
lvlup add [FLAGS]
```

This command will ask you a series of questions. First, what semver bump type do you require (`major` | `minor` | `patch`), then it will ask for a summary of the changes. At the final step it will show the change metadata it will generate, and confirm that you want to add it.

Once confirmed, the change metadata will bw written as a Markdown file that contains the summary and YAML front matter which stores the package's name that will be released and the semver bump types for it.

A change that minor bumps `axios` would look like this:

```md
---
axios: minor
---

A description of the minor changes.
```

If you want to modify the md file after it's generated, it's completely fine. Or, if you want to write a change file yourself, that's also fine.

If you set the `commit.afterAdd` option in the config to `true`, the command will add the updated change files and then commit them.

- `--skip` - skips the confirmation step of "are you sure?" at the end.
- `--editor EditorType` - Choose an external editor as the means to write the change's description. EditorType can be one of: `vim` | `vi` | `nano` | `code` (code is for VsCode)

### 3. `bump`

```bash
lvlup bump
```

Updates the version of the package according to all changes found under `.lvlup` since the last release (WHETHER THEY ARE COMMITTED OR NOT ! ).

Will also create/append to a **CHANGELOG** file using the summaries from the change files.

We recommend making sure changes made from this command are merged back into the base branch before you run `publish`.

This command will **read**, and then **delete**, change files on disk, ensuring that they are only used once.

### 4. `publish`

```bash
lvlup publish
```

Publishes to NPM repo. Because this command assumes that last commit is the release commit you should not commit any changes between calling `bump` and `publish`. These commands are separate to enable you to check if release commit is accurate.

### 5. `status`

```bash
lvlup status
```

The status command provides information about the changes that currently exist in a nice tabular view.
