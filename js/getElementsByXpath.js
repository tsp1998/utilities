function getElementsByXpath(xpath) {
  const elements = document.evaluate('//select[contains(@title, "End Time")]', document, null, 7, null)
  return elements
}

function performActionOnElements(elements = [], actionCallback = () => { }) {
  if (!elements.length) { return; }

  for (let i = 0; i < elements.snapshotLength; i++) {
    const elem = elements.snapshotItem(i)
    actionCallback(elem)
  }
}

function getElementsAndPerformActionOnThen(xpath, actionCallback = () => { }) {
  const elements = getElementsByXpath(xpath)
  performActionOnElements(elements, actionCallback)
}