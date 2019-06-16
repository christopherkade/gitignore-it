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
  const { file } = await prompts({
    type: 'autocomplete',
    name: 'file',
    message: 'What type of .gitignore file do you need?',
    choices: gitignoreTypes,
    limit: 15,
  })

  // Get gitignore content based on the answer
  const gitignoreContent = await readFile(`${file}.gitignore`)
  // Create the .gitignore file
  await writeFile('.gitignore', gitignoreContent)
})();
