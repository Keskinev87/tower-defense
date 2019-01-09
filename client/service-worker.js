// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'tdDemo-v1';
var cacheName = 'tdDemo-test';
var filesToCache = [
	'/index.html',
	'/css/style.css',
	'/scripts/game.js',
    '/scripts/level.js',
    '/scripts/tower.js',
    '/scripts/projectile.js',
    '/scripts/monster.js',
    '/scripts/ui.js',
    '/scripts/map.js',
    '/scripts/data.js',
    '/scripts/canvas.js',
    '/scripts/pathGenerator.js',
    '/images/map.png',
    '/images/pause_btn.png',
    '/images/archer.png',
    '/images/magic.png',
    '/images/grunt0.png',
    '/images/grunt1.png',
    '/images/spider0.png',
    '/images/spider1.png',
    '/images/knight0.png',
    '/images/knight1.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /* Fixes a corner case in which the app wasn't returning the latest data.*/
  return self.clients.claim();
});

