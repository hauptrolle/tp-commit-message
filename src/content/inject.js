import copy from 'copy-to-clipboard'

console.log('inject tp-commit-message')
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'clicked_browser_action') {
    // todo: get selectors from options page

    // Selcted Card
    const selectedCardSelector = '[role="cell"] .tau-selected'
    const selectedCard = document.querySelectorAll(selectedCardSelector)[0]

    // Opened Card
    const openedCardSelector = '.tau-cover-view__content'
    const openedCardTypeSelector = '.tau-entity-icon'
    const openedCardIdSelector = '.entity-id__link'
    const openedCardNameSelector = '.view-header__entity-title'
    const openedCard = document.querySelectorAll(openedCardSelector)[0]

    let messageData = {}

    if (selectedCard) {
      messageData = JSON.parse(selectedCard.dataset.cardData)
    } else if (openedCard && openedCard.hasChildNodes()) {
      messageData = {
        type: document.querySelectorAll(openedCardSelector + ' ' + openedCardTypeSelector)[0].textContent,
        id: document.querySelectorAll(openedCardSelector + ' ' + openedCardIdSelector)[0].textContent,
        name: document.querySelectorAll(openedCardSelector + ' ' + openedCardNameSelector)[0].textContent
      }
    } else {
      // nothing selected or open ...
    }

    if (messageData.id) {
      const formattedMessage = formatMessage(messageData)
      copy(formattedMessage)
      console.log(formattedMessage)
      showNotification('Copied', formattedMessage, '../icons/128.png')
    }
  }
})

const formatMessage = data => `[${data.type}] #${data.id} - ${data.name}`

const showNotification = (title, message, icon) => {
  chrome.runtime.sendMessage({
    type: 'notification',
    title: title,
    icon: icon,
    content: message
  })
}
