if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>n(e,o),f={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-2dfdff9b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"874376f6977c56b5bec96d75fdfd104c"},{url:"assets/index-CAzJtAEE.js",revision:null},{url:"index.html",revision:"77e084f7f4e5aa92c6dd5aaefb7bf40a"},{url:"registerSW.js",revision:"daea614b9e747176694d70a990199266"},{url:"icons/icon-192x192.png",revision:"f2da49a70fb1ec05dc301877210d57c7"},{url:"icons/icon-512x512.png",revision:"d241eb67c516aad47d8131286fbe9f5e"},{url:"manifest.webmanifest",revision:"3bcdb9a8f11093adfdd2b0d458672335"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/\.(?:js|css|html|json|png|jpg|jpeg|svg)$/,new e.CacheFirst,"GET")}));
