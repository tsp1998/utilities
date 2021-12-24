const fs = require('fs')
const path = require('path')

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

try {
  let startIndex = 2;
  const value = process.argv[startIndex];
  let featureName = 'feature/user-management'
  
  if (value.match(/master|release|feature|develop/)) {
    startIndex++;
    featureName = value;
  }

  const jiraId = process.argv[startIndex];
  const jiraHeading = process.argv.splice(startIndex + 1).join(' ');

  if (!jiraHeading || !jiraId) {
    throw new Error('Id and Heading should be provided')
  }

  const branchName = jiraHeading.replace(/[^a-zA-Z0-9\s]/g, '').replace(/ /g, '-')
  let output = `
    git flow bugfix start ${jiraId + '-' + branchName} ${featureName}
    git commit
    ${jiraId.toUpperCase()} ${jiraHeading}
    git push origin bugfix/${jiraId + '-' + branchName}
    git flow bugfix finish ${jiraId + '-' + branchName}
    git push origin ${featureName}
    git push origin ${featureName} -f
    bugfix/${jiraId + '-' + branchName}
  `
  console.log(output)
  const gitFlowDataFilePath = path.resolve(__dirname, '..', 'data', 'gitFlow.txt')
  fs.readFile(gitFlowDataFilePath, (err, data) => {
    fs.writeFile(gitFlowDataFilePath, `${data}${output}\n`, (err) => {
      if (!err) { return console.log('Data written to file')}
      console.log('Data not written to file', err)
    })
  })
} catch (error) {
  console.log(`error`, error)  
}