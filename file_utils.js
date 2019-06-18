const { promisify } = require('util')
const fs = require('fs')
const path = require('path');

// The folder's path containing all of our .gitignore files
const folderPath = path.join(__dirname, '/gitignores')

/**
 * Returns an array of the names of the files contained in folderPath
 */
const getGitignoreNames = async () => {
  const readdir = promisify(fs.readdir)
  const files = await readdir(folderPath).catch((err) => {
    console.error(`Error reading ${folderPath}: ${err}`)
  })

  return files
}

/**
 * Returns an array of file types based on the following format:
 * type.gitignore
 * @param {*} files
 */
const getFileType = files => files.map(file => ({
  title: file.split('.')[0],
  value: file.split('.')[0],
}))

/**
 * Write the .gitignore file content
 * @param  {*} file
 * @param  {*} content
 */
const writeFile = async (file, content) => {
  const asyncWriteFile = promisify(fs.writeFile)
  await asyncWriteFile(file, content)
    .then(console.info('📄 .gitignore created successfully'))
    .catch(e => console.error(e))
}

/**
 * Read a file content
 * @param  {*} files
 */
const readFile = async (files) => {
  const asyncReadFile = promisify(fs.readFile)

  if (files.includes(',')) {
    const filesToIterate = files.split(',')
    return Promise.all(filesToIterate.map(file => asyncReadFile(`${folderPath}/${file}.gitignore`, { encoding: 'utf-8' })))
      .catch(e => console.error(e))
  }

  return asyncReadFile(`${folderPath}/${files}.gitignore`, { encoding: 'utf-8' })
    .catch(e => console.error(e))
}

module.exports = {
  getGitignoreNames,
  getFileType,
  writeFile,
  readFile,
}
