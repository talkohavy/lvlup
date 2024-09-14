# lvlup 🎩

<p align="center">
  <img src="https://i.ibb.co/3dqjJfw/lvlup-v1.png" width="250" alt="lvlup logo" />
</p>

A CLI tool to help you manage your package versions easily.

<p align="center">
  <img src="https://i.ibb.co/3y3tYQP/lvlup-help.png" width="1280" alt="lvlup help" />
</p>

## 1. Getting Started

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

### Step 3: Add your first experience

Run the following:

```bash
npx lvlup add
```

and follow the prompts.

---

## 2. Core Concepts

### `lvlup`

As the name of the package suggests, **LvLup** is all about leveling up your package. We took the boring concept of package versioning, and added a small form of gamification to it.

### `Experience`

An `experience` is a contributor's _intent to release_, stored as data within a file.

With `lvlup`, you essentially take a package, add some `experience` to it, and when it's ready - it levels up and bumps to the next level, i.e. the next version number.

Contributors to a repository should be able to declare an _intent to release_, creating `experience` file(s), and multiple `experience`s would then be used to calculate the next level (next version).

`lvlup` makes sure that an `experience` is only used once for the purpose of leveling up a package.

---

## 3. Your new Workflow

Your team just started working on a _to-be-released_ branch called `RELEASE-123` (made-up name).
A contributor branched out of `RELEASE-123`, and checked out to some `side-branch`. When this contributor is done working on a new feature, a bugfix, or a major change oin their `side-branch`, they should run:

```bash
npx lvlup add
```

and answer the prompted questions. An `experience` file is then created, holding the new information as data.

The `experience` file should be committed, and be included in the PR to be merged into branch `RELEASE-123`.

The `lvlup add` command can occur many times either by the same contributor (on the same `side-branch` branch), or by multiple contributors (on different side branches, also to be merged into `RELEASE-123`).

When the maintainer wants to release the package, after all desired PRs to `RELEASE-123` branch had been merged, they should checkout to the `HEAD` of `RELEASE-123`, and run:

```bash
npx lvlup bump
```

followed by the command:

```bash
npx lvlup publish
```

The mentioned commands are explained further down below.

---

## 4. Commands

### 1. `init`

```bash
lvlup init
```

This command sets up the `.lvlup` folder at the root of your project. It generates a `README.md` and a `config.json` file. The config file has to be found within the `.lvlup` dir in order for the tool to work. You should run the _init_ command once, when you are setting up `lvlup`.

### 2. `add`

```
lvlup add [FLAGS]
```

This command will ask you a series of questions. First, what semver bump type do you require (`major` | `minor` | `patch`), then it will ask for a summary of the changes. At the final step it will show the `experience`'s metadata to be generated, and confirm that you want to add it.

Once confirmed, `experience` file be written as a Markdown file that contains the summary and YAML front matter which stores the package's name that will be released and the semver bump types for it.

For example, an `experience` file that minor bumps `axios` would look like this:

```md
---
"axios": minor
---

A description of the minor changes.
```

If you want to modify the `experience` file after it's generated, it's completely fine. You can even write your own `experience` files yourself if you want, just don't forget to commit them.

Inside your `.lvlup/config.json`, if you were to set the `commit.afterAdd` option to `true`, the `add` command will create and also commit the `experience` file.

- `--skip` - skips the confirmation step of "are you sure?" at the end.
- `--editor EditorType` - Choose an external editor as the means to write the `experience`'s description. EditorType can be one of: `vim` | `vi` | `nano` | `code` (code is for VsCode)

### 3. `bump`

```bash
lvlup bump
```

Levels up your package.  
Updates the version of the package according to all `experience` files found under `.lvlup` since the last release (WHETHER THEY ARE COMMITTED OR NOT ! So make sure they are committed).

Will also create/append to a **CHANGELOG** file using the summaries from the `experience` files.

We recommend making sure changes made from this command are merged back into the main branch before you run `publish`.

This command will **read**, and then **delete**, `experience` files found on disk, ensuring that they are only used once.

### 4. `publish`

```bash
lvlup publish
```

Publishes the package to a dedicated registry. Because this command assumes that last commit is the release commit you should not commit any changes between calling `bump` and `publish`. These commands are separate to enable you to check if release commit is accurate.

### 5. `status`

```bash
lvlup status
```

The status command provides information about all the `experience` files that currently exist in a nice tabular view.

<p align="center">
  <img src="https://i.ibb.co/9y8gTDC/lvlup-status.png" width="1280" alt="lvlup status" />
</p>
