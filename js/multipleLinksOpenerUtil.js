function getLinksOpenerCode(prefix = '') {
  try {
    let startIndex = 2;
    let links = process.argv.splice(startIndex) || [];

    if (links.length) {
      return `
      const links = [
        ${links.map(link => {
        if (link.indexOf(' ') > -1) {
          const separatedLinks = link.split(' ') || [];
          return separatedLinks.map(link => `${prefix ? `'${prefix + link}'` : `'${link}'`}`);
        } else {
          return `${prefix ? `'${prefix + link}'` : `'${link}'`}`;
        }
      })}
      ];

      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link && link.trim()) {
          setTimeout(() => window.open(link, '_blank'), i * 1000);
        }
      }
    `
    }

  } catch (error) {
    console.log(`error`, error)
  }
}

module.exports = getLinksOpenerCode