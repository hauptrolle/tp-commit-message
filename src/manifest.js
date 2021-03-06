
module.exports = {
  name: 'TP Commit Message Generator',
  version: '1.0.0',
  description: 'Chrome Extension to get commit messages from Target Process',
  author: 'Achim Rolle',
  homepage_url: 'https://github.com/hauptrolle',
  manifest_version: 2,
  icons: { '16': 'icons/16.png', '128': 'icons/128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'background',
    'storage',
    'notifications',
  ],
  browser_action: {
    default_icon: 'icons/16.png',
  },
  commands: {
    _execute_browser_action: {
      suggested_key: {
        windows: 'Ctrl+X',
        mac: 'Alt+X'
      },
    }
  },
  background: {
    page: 'pages/background.html',
    persistent: true,
  },
  options_page: 'pages/options.html',
  content_scripts: [{
    js: [
      'js/manifest.js',
      'js/vendor.js',
      'js/inject.js'
    ],
    matches: ['<all_urls>'],
    all_frames: true
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
}
