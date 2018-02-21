import copy from 'copy-to-clipboard'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'clicked_browser_action') {
    // Get options
    chrome.storage.sync.get([
      'selectedCardSelector',
      'openedCardSelector',
      'openedCardTypeSelector',
      'openedCardIdSelector',
      'openedCardNameSelector'
    ], response => {
      const {
        selectedCardSelector,
        openedCardSelector,
        openedCardTypeSelector,
        openedCardIdSelector,
        openedCardNameSelector
      } = response

      const selectedCard = document.querySelectorAll(selectedCardSelector)[0]
      const openedCard = document.querySelectorAll(openedCardSelector)[0]
      let messageData = {}

      if (selectedCard) {
        const parsedData = JSON.parse(selectedCard.dataset.cardData)
        messageData = {
          ...parsedData,
          id: `#${parsedData.id}`
        }
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
        formatMessage(messageData).then(message => {
          copy(message)
          console.log(message)
          showNotification('Copied', message, '../icons/128.png')
        })
      }
    })
  }
})

const formatMessage = data => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['showType', 'showId', 'showName'], response => {
      const { showType, showId, showName } = response
      const message = `${showType ? `[${data.type}] ` : ''}${showId ? `${data.id} - ` : ''}${showName ? `${data.name}` : ''}`
      resolve(message)
    })
  })
}

const showNotification = (title, message, icon) => {
  chrome.runtime.sendMessage({
    type: 'notification',
    title: title,
    icon: icon,
    content: message
  })
}
