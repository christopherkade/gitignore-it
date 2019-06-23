#! /usr/bin/env node

const prompts = require('prompts');

const {
  getGitignoreNames, getFileType, writeFile, readFile,
} = require('./file_utils');

(async () => {
  // Get .gitignore file names
  const gitignores = await getGitignoreNames()
  // Extract each .gitignore's type
  const gitignoreTypes = getFileType(gitignores)

  // Query the user
  const { file } = await prompts(
    [
      {
        type: 'confirm',
        name: 'confirmation',
        message: 'Would you like multiple .gitignore files?',
        initial: false,
      },
      {
        type: prev => (prev === false ? 'autocomplete' : 'autocompleteMultiselect'),
        name: 'file',
        message: 'What type of .gitignore file do you need?',
        choices: gitignoreTypes,
        min: 1,
        limit: 15,
      },
    ],
  )

  if (!file) {
    console.info('👋 No type selected, exiting.')
    return
  }

  // Get gitignore content based on the answer
  const gitignoreContent = await readFile(`${file}`)

  // Create the .gitignore file
  await writeFile('.gitignore', gitignoreContent)
})();
