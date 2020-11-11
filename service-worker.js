(function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s="249e")})({"0719":function(e,t,n){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(s){}},"249e":function(e,t,n){"use strict";n.r(t);n("0719");Error;new Set;"undefined"!==typeof registration&&registration.scope;class s{constructor(e,t,{onupgradeneeded:n,onversionchange:s}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=n,this._onversionchange=s||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let n=!1;setTimeout(()=>{n=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const s=indexedDB.open(this._name,this._version);s.onerror=()=>t(s.error),s.onupgradeneeded=e=>{n?(s.transaction.abort(),s.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},s.onsuccess=()=>{const t=s.result;n?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){const s=await this.getAllMatching(e,{query:t,count:n,includeKeys:!0});return s.map(e=>e.key)}async getAllMatching(e,{index:t,query:n=null,direction:s="next",count:r,includeKeys:c=!1}={}){return await this.transaction([e],"readonly",(a,o)=>{const i=a.objectStore(e),l=t?i.index(t):i,h=[],u=l.openCursor(n,s);u.onsuccess=()=>{const e=u.result;e?(h.push(c?e:e.value),r&&h.length>=r?o(h):e.continue()):o(h)}})}async transaction(e,t,n){return await this.open(),await new Promise((s,r)=>{const c=this._db.transaction(e,t);c.onabort=()=>r(c.error),c.oncomplete=()=>s(),n(c,e=>s(e))})}async _call(e,t,n,...s){const r=(n,r)=>{const c=n.objectStore(t),a=c[e].apply(c,s);a.onsuccess=()=>r(a.result)};return await this.transaction([t],n,r)}close(){this._db&&(this._db.close(),this._db=null)}}s.prototype.OPEN_TIMEOUT=2e3;const r={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[G,J]of Object.entries(r))for(const e of J)e in IDBObjectStore.prototype&&(s.prototype[e]=async function(t,...n){return await this._call(e,t,G,...n)});function c(){self.addEventListener("activate",()=>self.clients.claim())}function a(){self.addEventListener("install",()=>self.skipWaiting())}n("3168");const o=[],i={get(){return o},add(e){o.push(...e)}};n("f794");const l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},h=e=>[l.prefix,e,l.suffix].filter(e=>e&&e.length>0).join("-"),u=e=>{for(const t of Object.keys(l))e(t)},f={updateDetails:e=>{u(t=>{"string"===typeof e[t]&&(l[t]=e[t])})},getGoogleAnalyticsName:e=>e||h(l.googleAnalytics),getPrecacheName:e=>e||h(l.precache),getPrefix:()=>l.prefix,getRuntimeName:e=>e||h(l.runtime),getSuffix:()=>l.suffix},d=e=>{const t=new URL(String(e),location.href);return t.href.replace(new RegExp("^"+location.origin),"")},p=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n},y=p;class g extends Error{constructor(e,t){const n=y(e,t);super(n),this.name=e,this.details=t}}const w=new Set;async function m(){for(const e of w)await e()}const _={filter:(e,t)=>e.filter(e=>t in e)},v=async({request:e,mode:t,plugins:n=[]})=>{const s=_.filter(n,"cacheKeyWillBeUsed");let r=e;for(const c of s)r=await c["cacheKeyWillBeUsed"].call(c,{mode:t,request:r}),"string"===typeof r&&(r=new Request(r));return r},R=async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,c=!1;for(const a of s)if("cacheWillUpdate"in a){c=!0;const t=a["cacheWillUpdate"];if(r=await t.call(a,{request:e,response:r,event:n}),!r)break}return c||(r=r&&200===r.status?r:void 0),r||null},b=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const c=await self.caches.open(e),a=await v({plugins:r,request:t,mode:"read"});let o=await c.match(a,s);for(const i of r)if("cachedResponseWillBeUsed"in i){const t=i["cachedResponseWillBeUsed"];o=await t.call(i,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:a})}return o},U=async({cacheName:e,request:t,response:n,event:s,plugins:r=[],matchOptions:c})=>{const a=await v({plugins:r,request:t,mode:"write"});if(!n)throw new g("cache-put-with-no-response",{url:d(a.url)});const o=await R({event:s,plugins:r,response:n,request:a});if(!o)return void 0;const i=await self.caches.open(e),l=_.filter(r,"cacheDidUpdate"),h=l.length>0?await b({cacheName:e,matchOptions:c,request:a}):null;try{await i.put(a,o)}catch(u){throw"QuotaExceededError"===u.name&&await m(),u}for(const f of l)await f["cacheDidUpdate"].call(f,{cacheName:e,event:s,oldResponse:h,newResponse:o,request:a})},T={put:U,match:b},q=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"===typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=_.filter(s,"fetchDidFail"),c=r.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t["requestWillFetch"],r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(o){throw new g("plugin-error-request-will-fetch",{thrownError:o})}const a=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e["fetchDidSucceed"].call(e,{event:n,request:a,response:r}));return r}catch(i){0;for(const e of r)await e["fetchDidFail"].call(e,{error:i,event:n,originalRequest:c.clone(),request:a.clone()});throw i}},K={fetch:q};let L;function x(){if(void 0===L){const t=new Response("");if("body"in t)try{new Response(t.body),L=!0}catch(e){L=!1}L=!1}return L}async function C(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,c=x()?n.body:await n.blob();return new Response(c,r)}const M="__WB_REVISION__";function N(e){if(!e)throw new g("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new g("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set(M,t),{cacheKey:s.href,url:r.href}}class O{constructor(e){this._cacheName=f.getPrecacheName(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"===typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=N(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new g("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new g("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),c=await r.keys(),a=new Set(c.map(e=>e.url));for(const[l,h]of this._urlsToCacheKeys)a.has(h)?s.push(l):n.push({cacheKey:h,url:l});const o=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),c=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:c,event:e,integrity:r,plugins:t,url:s})});await Promise.all(o);const i=n.map(e=>e.url);return{updatedURLs:i,notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:c}){const a=new Request(t,{integrity:c,cache:n,credentials:"same-origin"});let o,i=await K.fetch({event:s,plugins:r,request:a});for(const h of r||[])"cacheWillUpdate"in h&&(o=h);const l=o?await o.cacheWillUpdate({event:s,request:a,response:i}):i.status<400;if(!l)throw new g("bad-precaching-response",{url:t,status:i.status});i.redirected&&(i=await C(i)),await T.put({event:s,plugins:r,response:i,request:e===t?a:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){const e=await self.caches.open(this._cacheName);return e.match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new g("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){const n=this.getCacheKeyForURL(e);if(!n)throw new g("non-precached-url",{url:e});const s=this.createHandler(t),r=new Request(e);return()=>s({request:r})}}let E;const P=()=>(E||(E=new O),E);function S(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}function*k(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=S(c,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:c});for(const t of e)yield t.href}}const W=(e,t)=>{const n=P(),s=n.getURLsToCacheKeys();for(const r of k(e,t)){const e=s.get(r);if(e)return e}},j=({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=f.getPrecacheName();self.addEventListener("fetch",c=>{const a=W(c.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!a)return void 0;let o=self.caches.open(r).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(o)})};let I=!1;function A(e){I||(j(e),I=!0)}const B=e=>{const t=P(),n=i.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},D=e=>{const t=P();e.waitUntil(t.activate())};function F(e){const t=P();t.addToCacheList(e),e.length>0&&(self.addEventListener("install",B),self.addEventListener("activate",D))}function H(e,t){F(e),A(t)}self.addEventListener("message",(function(e){if(e.data)switch(e.data){case"skipWaiting":a();break;default:break}})),c(),H([{'revision':'7c3102404db81bad2ba6524343924b60','url':'/css/about.1df964d0.css'},{'revision':'80382a6a242b093213cde0dd88a36a7a','url':'/css/admin-categories.5ea19cc5.css'},{'revision':'57489783cdf2dfe29bbf1c3ffbcd5565','url':'/css/admin-rentable.245b771c.css'},{'revision':'e5729ce685f758db252d36c8e633b78a','url':'/css/admin-rentables.3b4f075d.css'},{'revision':'658be568e026f17414fc9007cd1d07de','url':'/css/admin-users.81676fa1.css'},{'revision':'d3040a97321344a72d2e1db0492ffbf2','url':'/css/admin.eb61ce80.css'},{'revision':'ac9e811418c7e8ef7063b978869ac464','url':'/css/app.571481c1.css'},{'revision':'7bf8ed5ee0c4dcfeb4c3f06824bd1cb1','url':'/css/booking-create.5ba36b87.css'},{'revision':'b4a8648198f2c144117c0d43c36c0405','url':'/css/chunk-vendors.39b842e3.css'},{'revision':'3bce8c27ed0f92b4ec0e82ad07dcaa71','url':'/css/home.eca71ac1.css'},{'revision':'80808af904cb485baf1fbb2b9d789afb','url':'/css/notFound.644700d9.css'},{'revision':'7d973666fbb0b434b6288f1e33dfe688','url':'/env-config.js'},{'revision':null,'url':'/env-config.js'},{'revision':'3c6879c4f342203d099bdd66dce6d396','url':'/fonts/fa-regular-400.3c6879c4.woff'},{'revision':'49f00693b0e5d45097832ef5ea1bc541','url':'/fonts/fa-regular-400.49f00693.ttf'},{'revision':'4a74738e7728e93c4394b8604081da62','url':'/fonts/fa-regular-400.4a74738e.woff2'},{'revision':'b01516c1808be557667befec76cd6318','url':'/fonts/fa-regular-400.b01516c1.eot'},{'revision':'205f07b3883c484f27f40d21a92950d4','url':'/fonts/fa-solid-900.205f07b3.ttf'},{'revision':'4451e1d86df7491dd874f2c41eee1053','url':'/fonts/fa-solid-900.4451e1d8.woff'},{'revision':'8ac3167427b1d5d2967646bd8f7a0587','url':'/fonts/fa-solid-900.8ac31674.eot'},{'revision':'8e1ed89b6ccb8ce41faf5cb672677105','url':'/fonts/fa-solid-900.8e1ed89b.woff2'},{'revision':'3602b7e8b2cb1462b0bef9738757ef8a','url':'/img/fa-regular-400.3602b7e8.svg'},{'revision':'664de3932dd6291b4b8a8c0ddbcb4c61','url':'/img/fa-solid-900.664de393.svg'},{'revision':'819516db8241a0141f17d23f37845b59','url':'/index.html'},{'revision':'d48c6061130e33fdb10ab5c466e80e9b','url':'/js/about.1ae11ce1.js'},{'revision':'201f1bebb52ec35cc3faf8474626ff66','url':'/js/admin-categories.cef9974a.js'},{'revision':'6da069267daf7190d74ef428ac5a7725','url':'/js/admin-rentable.95abbe4c.js'},{'revision':'911842eecd01bd25f4a6e82b14524e05','url':'/js/admin-rentables.8e21ab31.js'},{'revision':'add3b02b52a7abfed6a00a6f7ac4ffaa','url':'/js/admin-users.414a13a8.js'},{'revision':'ab7b1abd5412af5a048787e4dc1005d9','url':'/js/admin.a3753b38.js'},{'revision':'204db6f6b15e2e3da6e2d30aec0c8b73','url':'/js/app.2d543e41.js'},{'revision':'0cfcad864cda092843b20dff13862753','url':'/js/booking-create.822dc251.js'},{'revision':'46eab6dbb8d8dfe61917ce206d7d0811','url':'/js/chunk-vendors.5839002f.js'},{'revision':'74e45da1b4312480954ace9cab9ef9db','url':'/js/home.3ef4eb7d.js'},{'revision':'c018b09f67b06ccde267285835eff66a','url':'/js/notFound.3096b393.js'},{'revision':'b22d286c72524b0a97f5ae98362aa994','url':'/manifest.json'},{'revision':'b6216d61c03e6ce0c9aea6ca7808f7ca','url':'/robots.txt'}])},3168:function(e,t,n){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(s){}},f794:function(e,t,n){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(s){}}});
//# sourceMappingURL=service-worker.js.map