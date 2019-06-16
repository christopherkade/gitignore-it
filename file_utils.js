const { promisify } = require("util")
const fs = require("fs")

/**
 * Returns an array of the names of the files contained in folderPath
 */
const getFileNames = async (folderPath) => {
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
const getFileType = (files) => {
  return files.map(file => {
    return {
      title: file.split(".")[0]
    }
  })
}

const writeFile = async (file, content) => {
  const asyncWriteFile = promisify(fs.writeFile)
  await asyncWriteFile(file, content)
    .then(console.info("📄 .gitignore created successfully"))
    .catch(e => console.error(e))
}

const readFile = async (file) => {
  const asyncReadFile = promisify(fs.readFile)
  return await asyncReadFile("gitignores/" + file, { encoding: 'utf-8' })
    .catch(e => console.error(e))
}

module.exports = {
  getFileNames,
  getFileType,
  writeFile,
  readFile
}
