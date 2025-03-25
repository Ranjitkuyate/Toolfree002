// Propeller Ads Service Worker
// This file must be placed in the root directory of your website

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// Propeller Ads Push Notification Configuration
const PROPELLER_CONFIG = {
  serviceWorkerPath: '/sw.js',
  zoneId: '12345', // Replace with your actual Propeller Ads Zone ID
  pushNotifications: {
    enabled: true,
    maxPerDay: 3,
    minTimeBetween: 8 * 60 * 60, // 8 hours in seconds
    welcomeNotification: {
      title: 'Thanks for subscribing!',
      message: 'You will now receive updates about new tools and features.',
      icon: '/images/notification-icon.png'
    }
  }
};

// Handle push events
self.addEventListener('push', function(event) {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    const options = {
      body: data.message || 'Check out our latest tools!',
      icon: data.icon || '/images/notification-icon.png',
      badge: '/images/badge-icon.png',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'ToolsFree Online', options)
    );
  } catch (e) {
    console.error('Error showing notification:', e);
  }
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Propeller Ads tracking and analytics
self.addEventListener('fetch', function(event) {
  // Allow Propeller Ads tracking
  if (event.request.url.includes('propellerads.com') || 
      event.request.url.includes('propeller-tracking.com')) {
    return;
  }
  
  // Continue with normal fetch handling
  event.respondWith(
    fetch(event.request)
      .catch(function() {
        return caches.match(event.request);
      })
  );
});

console.log('Propeller Ads Service Worker Loaded');
