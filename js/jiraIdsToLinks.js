const getLinksOpenerCode = require('./utils/multipleLinksOpenerUtil')

try {
  const prefix = 'https://qualitia.atlassian.net/browse/';
  console.log(getLinksOpenerCode(prefix))
} catch (error) {
  console.log(`error`, error)
}