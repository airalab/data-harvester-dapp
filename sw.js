if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,o)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let s={};const c=e=>n(e,d),a={module:{uri:d},exports:s,require:c};i[d]=Promise.all(r.map((e=>a[e]||c(e)))).then((e=>(o(...e),s)))}}define(["./workbox-32a34f02"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"app-icon-120.png",revision:"516517de2e1220d4cd30bb99a4195440"},{url:"app-icon-192.png",revision:"f0850ed1d910e8163ff4e29fc4352181"},{url:"app-icon-256.png",revision:"0662f94dccaa699d97cb8094a45b646c"},{url:"app-icon-512-rounded.png",revision:"b59e6f7dbda7cc3d252bee7b44860bbe"},{url:"app-icon-512.png",revision:"a81e4a750dba21d1d1e151fe3e6bbc2d"},{url:"assets/index-D_LbcjR5.js",revision:null},{url:"assets/index-Dh3yILlI.css",revision:null},{url:"assets/owlcat_map_3_edit-CzVS6vU_.png",revision:null},{url:"assets/RobotoFlex-VariableFont-UlS6svKA.woff2",revision:null},{url:"data/data.json",revision:"34042d47f62a40acea9f8efeb78f6d30"},{url:"data/wifi_list.json",revision:"f155045ce348af93964c9f6c9974afc0"},{url:"favicon.ico",revision:"eb8eb7608efb4a5925990c49fc6a389e"},{url:"icons/collected.svg",revision:"0385c1d077fbd84e8446ef690395066f"},{url:"icons/wifi.svg",revision:"e95de045d36b2041d9752e34d7173c0e"},{url:"index.html",revision:"2307bdb48dd242a0d625631d74c58795"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"turtlebot-4.png",revision:"50916d81a8691c87af76a6ba24fb7dfd"},{url:"app-icon-512.png",revision:"a81e4a750dba21d1d1e151fe3e6bbc2d"},{url:"app-icon-512-rounded.png",revision:"b59e6f7dbda7cc3d252bee7b44860bbe"},{url:"app-icon-256.png",revision:"0662f94dccaa699d97cb8094a45b646c"},{url:"app-icon-192.png",revision:"f0850ed1d910e8163ff4e29fc4352181"},{url:"manifest.webmanifest",revision:"c68b2ddc61a04500f68ea29813bf0d13"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
