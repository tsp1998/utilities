try {
  const jiraId = process.argv[2];
  const jiraHeading = process.argv.splice(3).join(' ');

  if (!jiraHeading || !jiraId) {
    throw new Error('Id and Heading should be provided')
  }

  const branchName = jiraHeading.replace(/[^a-zA-Z0-9\s]/g, '').replace(/ /g, '-')

  console.log(`bugfix/${jiraId + '-' + branchName}`)
  console.log(`git push origin bugfix/${jiraId + '-' + branchName}`)
  console.log(`${jiraId.toUpperCase()} ${jiraHeading.toUpperCase()}`)
  console.log(`git flow bugfix start ${jiraId + '-' + branchName} feature/8.3.0`)
  console.log(`git flow bugfix finish ${jiraId + '-' + branchName}`)

} catch (error) {
  console.log(`error`, error)  
}