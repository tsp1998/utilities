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
  let featureName = 'release/8.3.0'
  
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

  console.log(`bugfix/${jiraId + '-' + branchName}`)
  console.log(`git push origin bugfix/${jiraId + '-' + branchName}`)
  console.log(`${jiraId.toUpperCase()} ${toTitleCase(jiraHeading)}`)
  console.log(`git flow bugfix start ${jiraId + '-' + branchName} ${featureName}`)
  console.log(`git flow bugfix finish ${jiraId + '-' + branchName}`)

} catch (error) {
  console.log(`error`, error)  
}