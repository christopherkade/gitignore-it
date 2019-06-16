#! /usr/bin/env node

const prompts = require('prompts');

const { getFileNames, getFileType, writeFile, readFile } = require('./file_utils')

const start = async () => {
  const gitignores = await getFileNames('./gitignores')
  const gitignoreTypes = getFileType(gitignores)

  const { file } = await prompts({
    type: 'autocomplete',
    name: 'file',
    message: 'What type of .gitignore file do you need?',
    choices: gitignoreTypes,
    limit: 15,
  });

  // Get gitignore content based on the answer
  const gitignoreContent = await readFile(file + ".gitignore")
  // Create the .gitignore file
  await writeFile(".gitignore", gitignoreContent)
};

start()
