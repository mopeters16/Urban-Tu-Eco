
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    // Toggle dropdown menu
    menuButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
        menuButton.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            menuButton.classList.remove('active');
        }
    });
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Install Prompt
let deferredPrompt;
const installContainer = document.getElementById('installContainer');
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installContainer.style.display = 'block';
});

installButton.addEventListener('click', () => {
  installContainer.style.display = 'none';
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted install');
    } else {
      console.log('User dismissed install');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', () => {
  installContainer.style.display = 'none';
  deferredPrompt = null;
});