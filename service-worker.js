(function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s="249e")})({"249e":function(e,t,n){"use strict";n.r(t);n("5948");const s=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n},r=s;class c extends Error{constructor(e,t){const n=r(e,t);super(n),this.name=e,this.details=t}}const a=new Set;const o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},i=e=>[o.prefix,e,o.suffix].filter(e=>e&&e.length>0).join("-"),l=e=>{for(const t of Object.keys(o))e(t)},h={updateDetails:e=>{l(t=>{"string"===typeof e[t]&&(o[t]=e[t])})},getGoogleAnalyticsName:e=>e||i(o.googleAnalytics),getPrecacheName:e=>e||i(o.precache),getPrefix:()=>o.prefix,getRuntimeName:e=>e||i(o.runtime),getSuffix:()=>o.suffix};async function u(){for(const e of a)await e()}const f=e=>{const t=new URL(String(e),location.href);return t.href.replace(new RegExp("^"+location.origin),"")},d={filter:(e,t)=>e.filter(e=>t in e)},p=async({request:e,mode:t,plugins:n=[]})=>{const s=d.filter(n,"cacheKeyWillBeUsed");let r=e;for(const c of s)r=await c["cacheKeyWillBeUsed"].call(c,{mode:t,request:r}),"string"===typeof r&&(r=new Request(r));return r},y=async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,c=!1;for(const a of s)if("cacheWillUpdate"in a){c=!0;const t=a["cacheWillUpdate"];if(r=await t.call(a,{request:e,response:r,event:n}),!r)break}return c||(r=r&&200===r.status?r:void 0),r||null},g=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const c=await self.caches.open(e),a=await p({plugins:r,request:t,mode:"read"});let o=await c.match(a,s);for(const i of r)if("cachedResponseWillBeUsed"in i){const t=i["cachedResponseWillBeUsed"];o=await t.call(i,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:a})}return o},w=async({cacheName:e,request:t,response:n,event:s,plugins:r=[],matchOptions:a})=>{const o=await p({plugins:r,request:t,mode:"write"});if(!n)throw new c("cache-put-with-no-response",{url:f(o.url)});const i=await y({event:s,plugins:r,response:n,request:o});if(!i)return void 0;const l=await self.caches.open(e),h=d.filter(r,"cacheDidUpdate"),w=h.length>0?await g({cacheName:e,matchOptions:a,request:o}):null;try{await l.put(o,i)}catch(m){throw"QuotaExceededError"===m.name&&await u(),m}for(const c of h)await c["cacheDidUpdate"].call(c,{cacheName:e,event:s,oldResponse:w,newResponse:i,request:o})},m={put:w,match:g};let _;function v(){if(void 0===_){const t=new Response("");if("body"in t)try{new Response(t.body),_=!0}catch(e){_=!1}_=!1}return _}class R{constructor(e,t,{onupgradeneeded:n,onversionchange:s}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=n,this._onversionchange=s||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let n=!1;setTimeout(()=>{n=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const s=indexedDB.open(this._name,this._version);s.onerror=()=>t(s.error),s.onupgradeneeded=e=>{n?(s.transaction.abort(),s.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},s.onsuccess=()=>{const t=s.result;n?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){const s=await this.getAllMatching(e,{query:t,count:n,includeKeys:!0});return s.map(e=>e.key)}async getAllMatching(e,{index:t,query:n=null,direction:s="next",count:r,includeKeys:c=!1}={}){return await this.transaction([e],"readonly",(a,o)=>{const i=a.objectStore(e),l=t?i.index(t):i,h=[],u=l.openCursor(n,s);u.onsuccess=()=>{const e=u.result;e?(h.push(c?e:e.value),r&&h.length>=r?o(h):e.continue()):o(h)}})}async transaction(e,t,n){return await this.open(),await new Promise((s,r)=>{const c=this._db.transaction(e,t);c.onabort=()=>r(c.error),c.oncomplete=()=>s(),n(c,e=>s(e))})}async _call(e,t,n,...s){const r=(n,r)=>{const c=n.objectStore(t),a=c[e].apply(c,s);a.onsuccess=()=>r(a.result)};return await this.transaction([t],n,r)}close(){this._db&&(this._db.close(),this._db=null)}}R.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[G,J]of Object.entries(b))for(const e of J)e in IDBObjectStore.prototype&&(R.prototype[e]=async function(t,...n){return await this._call(e,t,G,...n)});const U=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"===typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=d.filter(s,"fetchDidFail"),a=r.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t["requestWillFetch"],r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(i){throw new c("plugin-error-request-will-fetch",{thrownError:i})}const o=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e["fetchDidSucceed"].call(e,{event:n,request:o,response:r}));return r}catch(l){0;for(const e of r)await e["fetchDidFail"].call(e,{error:l,event:n,originalRequest:a.clone(),request:o.clone()});throw l}},T={fetch:U};async function q(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,c=v()?n.body:await n.blob();return new Response(c,r)}function K(){self.addEventListener("activate",()=>self.clients.claim())}function L(){self.addEventListener("install",()=>self.skipWaiting())}n("3168");const x=[],C={get(){return x},add(e){x.push(...e)}};const M="__WB_REVISION__";function N(e){if(!e)throw new c("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new c("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set(M,t),{cacheKey:s.href,url:r.href}}class O{constructor(e){this._cacheName=h.getPrecacheName(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"===typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=N(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new c("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new c("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),c=await r.keys(),a=new Set(c.map(e=>e.url));for(const[l,h]of this._urlsToCacheKeys)a.has(h)?s.push(l):n.push({cacheKey:h,url:l});const o=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),c=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:c,event:e,integrity:r,plugins:t,url:s})});await Promise.all(o);const i=n.map(e=>e.url);return{updatedURLs:i,notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:a}){const o=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let i,l=await T.fetch({event:s,plugins:r,request:o});for(const c of r||[])"cacheWillUpdate"in c&&(i=c);const h=i?await i.cacheWillUpdate({event:s,request:o,response:l}):l.status<400;if(!h)throw new c("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await q(l)),await m.put({event:s,plugins:r,response:l,request:e===t?o:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){const e=await self.caches.open(this._cacheName);return e.match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new c("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){const n=this.getCacheKeyForURL(e);if(!n)throw new c("non-precached-url",{url:e});const s=this.createHandler(t),r=new Request(e);return()=>s({request:r})}}let P;const E=()=>(P||(P=new O),P);function S(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}function*W(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=S(c,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:c});for(const t of e)yield t.href}}const k=(e,t)=>{const n=E(),s=n.getURLsToCacheKeys();for(const r of W(e,t)){const e=s.get(r);if(e)return e}},j=({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=h.getPrecacheName();self.addEventListener("fetch",c=>{const a=k(c.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!a)return void 0;let o=self.caches.open(r).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(o)})};let I=!1;function A(e){I||(j(e),I=!0)}const B=e=>{const t=E(),n=C.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},D=e=>{const t=E();e.waitUntil(t.activate())};function F(e){const t=E();t.addToCacheList(e),e.length>0&&(self.addEventListener("install",B),self.addEventListener("activate",D))}function H(e,t){F(e),A(t)}self.addEventListener("message",(function(e){if(e.data)switch(e.data){case"skipWaiting":L();break;default:break}})),K(),H([{'revision':'f4e3edb53349945387e617abbd0fd231','url':'/404.html'},{'revision':'7dd6db281593d2faf3f499a87f26f040','url':'/css/about.5db09f4e.css'},{'revision':'a4cfe845f6a745883440f761c49e3a76','url':'/css/admin-categories.7a325499.css'},{'revision':'53c1d8178e0b448a31a7a786afa21857','url':'/css/admin-rentable.779342b0.css'},{'revision':'2f5c9aeb1dae65f75d0f3cb42ea6a12b','url':'/css/admin-rentables.644de9e4.css'},{'revision':'0bcd85fe64858d1c76621269b0d2d732','url':'/css/admin-users.415592c2.css'},{'revision':'88a3d971c1b6260dff3b298160838baf','url':'/css/admin.57245cde.css'},{'revision':'bffaeda6afdb87a24532edf6ad25fa4e','url':'/css/app.3df2aa15.css'},{'revision':'3e5f01c33fee9d455ce06e7fead9c06e','url':'/css/auth-callback-error.aac4f7fd.css'},{'revision':'abaa8a001564fbe4a229ddf7fe827266','url':'/css/booking-create.1799a180.css'},{'revision':'b4a8648198f2c144117c0d43c36c0405','url':'/css/chunk-vendors.39b842e3.css'},{'revision':'17434afc47380a4d08f99eceef9e1624','url':'/css/home.d832a507.css'},{'revision':'37528cb929828d5363234add2e624c30','url':'/css/notFound.cda59c4e.css'},{'revision':'97b1aca54dccd20c31df911252b7e456','url':'/env-config.js'},{'revision':'3c6879c4f342203d099bdd66dce6d396','url':'/fonts/fa-regular-400.3c6879c4.woff'},{'revision':'49f00693b0e5d45097832ef5ea1bc541','url':'/fonts/fa-regular-400.49f00693.ttf'},{'revision':'4a74738e7728e93c4394b8604081da62','url':'/fonts/fa-regular-400.4a74738e.woff2'},{'revision':'b01516c1808be557667befec76cd6318','url':'/fonts/fa-regular-400.b01516c1.eot'},{'revision':'205f07b3883c484f27f40d21a92950d4','url':'/fonts/fa-solid-900.205f07b3.ttf'},{'revision':'4451e1d86df7491dd874f2c41eee1053','url':'/fonts/fa-solid-900.4451e1d8.woff'},{'revision':'8ac3167427b1d5d2967646bd8f7a0587','url':'/fonts/fa-solid-900.8ac31674.eot'},{'revision':'8e1ed89b6ccb8ce41faf5cb672677105','url':'/fonts/fa-solid-900.8e1ed89b.woff2'},{'revision':'3602b7e8b2cb1462b0bef9738757ef8a','url':'/img/fa-regular-400.3602b7e8.svg'},{'revision':'664de3932dd6291b4b8a8c0ddbcb4c61','url':'/img/fa-solid-900.664de393.svg'},{'revision':'2e2df5d9cb222086932ad29ada3311e9','url':'/index.html'},{'revision':'13de9ab2c5212bbcc2ab39234c23b020','url':'/js/about.b994854b.js'},{'revision':'c328399a39815663c1dd528d63ef4127','url':'/js/admin-categories.df78c009.js'},{'revision':'32779e7ed2c8ec243725d77d3cd2735e','url':'/js/admin-rentable.8b8a1eab.js'},{'revision':'d4c1d20f5fff60d8ef673cab14edd230','url':'/js/admin-rentables.2aa390db.js'},{'revision':'eafc12d22be134eb0cb6c00d4849d961','url':'/js/admin-users.a3c1eca9.js'},{'revision':'9591a15de65103bb94bd61aa64776098','url':'/js/admin.dd10624e.js'},{'revision':'c801c9716571527e0de0c6edfcf42265','url':'/js/app.570ac261.js'},{'revision':'19f5a3fa6c0f7f4e33b62d408193dc6e','url':'/js/auth-callback-error.72ce060c.js'},{'revision':'7c23c71ee12cb6f7acc8885312738f01','url':'/js/auth-callback.4a8f3bd7.js'},{'revision':'b41a7d5f139156d6ae54c015429b4fc5','url':'/js/booking-create.a6a15f02.js'},{'revision':'287cf0e6e44e6c076749a7e59f5290c6','url':'/js/chunk-vendors.a06ae3ac.js'},{'revision':'4b8aa93198bf61655dcecbeca59d4eee','url':'/js/home.3902b28f.js'},{'revision':'a10bf06d668b778ae525d02925e24090','url':'/js/notFound.b663a098.js'},{'revision':'b22d286c72524b0a97f5ae98362aa994','url':'/manifest.json'},{'revision':'b6216d61c03e6ce0c9aea6ca7808f7ca','url':'/robots.txt'}])},3168:function(e,t,n){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(s){}},5948:function(e,t,n){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(s){}}});
//# sourceMappingURL=service-worker.js.map