// Send message when click on browser icon
chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, {
      'message': 'clicked_browser_action'
    })
  })
})

// Listen on messages
chrome.runtime.onMessage.addListener(message => {
  if (message) {
    if (message.type === 'notification') {
      chrome.notifications.create(
        {
          type: 'basic',
          iconUrl: message.icon,
          title: message.title,
          message: message.content
        }
      )
    }
  }
})
