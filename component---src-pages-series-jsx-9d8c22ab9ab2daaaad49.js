(self.webpackChunkgatsby_starter_hoodie=self.webpackChunkgatsby_starter_hoodie||[]).push([[126],{5144:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return M}});var n=e(1333),o=e.n(n),i=e(5497),a=e.n(i),s=e(854),u=e.n(s),c=e(2093),f=e.n(c),l=e(8821),p=e.n(l),d=e(9899),h=e.n(d),v=e(6540),g=e(1510),y=e(5482),m=e(6288),x=e(2912),b=e(3472),_=e.n(b),A=e(7350),w=e.n(A),j=e(4794);const W=g.default.div.withConfig({displayName:"SeriesList__SeriesListWrapper",componentId:"sc-1c0vrq-0"})(["margin:40px -5px 0;display:flex;flex-wrap:wrap;"]),I=g.default.div.withConfig({displayName:"SeriesList__SeriesColumn",componentId:"sc-1c0vrq-1"})(["flex-basis:33.33%;@media (max-width:1024px){flex-basis:50%;}@media (max-width:768px){flex-basis:100%;}"]),E=g.default.div.withConfig({displayName:"SeriesList__SeriesCard",componentId:"sc-1c0vrq-2"})(["margin:0 5px 10px;padding:20px;border-radius:5px;box-shadow:",";background:",";"],(t=>t.theme.colors.boxShadow),(t=>t.theme.colors.cardBackground)),O=g.default.div.withConfig({displayName:"SeriesList__SeriesInform",componentId:"sc-1c0vrq-3"})(["display:flex;align-items:center;color:",";& > span{margin:0 5px;}"],(t=>t.theme.colors.tertiaryText)),R=g.default.p.withConfig({displayName:"SeriesList__Date",componentId:"sc-1c0vrq-4"})(["font-size:14.4px;"]),k=g.default.p.withConfig({displayName:"SeriesList__PostCount",componentId:"sc-1c0vrq-5"})(["font-size:14.4px;"]);var S=t=>{let{seriesList:r}=t;const{0:e,1:n}=(0,v.useState)(12),o=w()((()=>{document.documentElement.scrollHeight-document.documentElement.scrollTop<=document.documentElement.clientHeight+100&&e<r.length&&setTimeout((()=>n(e+12)),300)}),250);return(0,v.useEffect)((()=>(window.addEventListener("scroll",o),()=>{window.removeEventListener("scroll",o)})),[e,r]),(0,v.useEffect)((()=>{n(100)}),[r]),v.createElement(W,null,r.slice(0,e).map(((t,r)=>v.createElement(I,{key:r},v.createElement(E,null,v.createElement(x.A,{size:"md"},v.createElement(j.Link,{to:`/series/${_()(t.name,/\s/g,"-")}`},t.name)),v.createElement(O,null,v.createElement(k,null,t.posts.length," Posts"),v.createElement("span",null,"·"),v.createElement(R,null,"Last updated on ",t.lastUpdated)))))))};const B=g.default.div.withConfig({displayName:"NoContent__Wrapper",componentId:"sc-334ac1-0"})(["display:flex;align-items:center;justify-content:center;flex-direction:column;height:150px;font-size:24px;font-weight:bold;color:",";"],(t=>t.theme.colors.tertiaryText));var C=t=>{let{name:r}=t;return v.createElement(B,null,"There is no ",r,".")},F=e(1960);const L=g.default.div.withConfig({displayName:"series__SeriesWrapper",componentId:"sc-gipkj1-0"})(["margin:20px 0 60px;"]);var M=t=>{let{data:r}=t;const e=r.allMarkdownRemark.nodes,n=h()(p()((t=>({...t.frontmatter,slug:t.fields.slug}))),f()("series"),p()((t=>({name:t[0].series,posts:t,lastUpdated:t[0].date}))),u()((t=>new Date(t.lastUpdated))),a()((t=>t.name)),o())(e);return v.createElement(m.A,null,v.createElement(y.A,{title:F.title,description:F.description,url:F.siteUrl}),v.createElement(L,null,n.length>0&&v.createElement(x.A,{size:"sm"},"There are ",n.length," series."),0===n.length&&v.createElement(C,{name:"series"}),v.createElement(S,{seriesList:n})))}},980:function(t,r,e){var n=e(9344),o=e(4033);function i(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}i.prototype=n(o.prototype),i.prototype.constructor=i,t.exports=i},8398:function(t,r,e){var n=e(9344),o=e(4033);function i(t,r){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!r,this.__index__=0,this.__values__=void 0}i.prototype=n(o.prototype),i.prototype.constructor=i,t.exports=i},3945:function(t){t.exports=function(t,r,e,n){for(var o=-1,i=null==t?0:t.length;++o<i;){var a=t[o];r(n,a,e(a),t)}return n}},8491:function(t){t.exports=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t}},5325:function(t,r,e){var n=e(6131);t.exports=function(t,r){return!!(null==t?0:t.length)&&n(t,r,0)>-1}},6547:function(t,r,e){var n=e(3360),o=e(5288),i=Object.prototype.hasOwnProperty;t.exports=function(t,r,e){var a=t[r];i.call(t,r)&&o(a,e)&&(void 0!==e||r in t)||n(t,r,e)}},2429:function(t,r,e){var n=e(909);t.exports=function(t,r,e,o){return n(t,(function(t,n,i){r(o,t,e(t),i)})),o}},4733:function(t,r,e){var n=e(1791),o=e(5950);t.exports=function(t,r){return t&&n(r,o(r),t)}},3838:function(t,r,e){var n=e(1791),o=e(7241);t.exports=function(t,r){return t&&n(r,o(r),t)}},3360:function(t,r,e){var n=e(3243);t.exports=function(t,r,e){"__proto__"==r&&n?n(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e}},9999:function(t,r,e){var n=e(7217),o=e(8491),i=e(6547),a=e(4733),s=e(3838),u=e(3290),c=e(3007),f=e(2271),l=e(8948),p=e(2),d=e(3349),h=e(5861),v=e(6189),g=e(7199),y=e(5529),m=e(6449),x=e(3656),b=e(7730),_=e(3805),A=e(8440),w=e(5950),j=e(7241),W="[object Arguments]",I="[object Function]",E="[object Object]",O={};O[W]=O["[object Array]"]=O["[object ArrayBuffer]"]=O["[object DataView]"]=O["[object Boolean]"]=O["[object Date]"]=O["[object Float32Array]"]=O["[object Float64Array]"]=O["[object Int8Array]"]=O["[object Int16Array]"]=O["[object Int32Array]"]=O["[object Map]"]=O["[object Number]"]=O[E]=O["[object RegExp]"]=O["[object Set]"]=O["[object String]"]=O["[object Symbol]"]=O["[object Uint8Array]"]=O["[object Uint8ClampedArray]"]=O["[object Uint16Array]"]=O["[object Uint32Array]"]=!0,O["[object Error]"]=O[I]=O["[object WeakMap]"]=!1,t.exports=function t(r,e,R,k,S,B){var C,F=1&e,L=2&e,M=4&e;if(R&&(C=S?R(r,k,S,B):R(r)),void 0!==C)return C;if(!_(r))return r;var P=m(r);if(P){if(C=v(r),!F)return c(r,C)}else{var D=h(r),T=D==I||"[object GeneratorFunction]"==D;if(x(r))return u(r,F);if(D==E||D==W||T&&!S){if(C=L||T?{}:y(r),!F)return L?l(r,s(C,r)):f(r,a(C,r))}else{if(!O[D])return S?r:{};C=g(r,D,F)}}B||(B=new n);var q=B.get(r);if(q)return q;B.set(r,C),A(r)?r.forEach((function(n){C.add(t(n,e,R,n,r,B))})):b(r)&&r.forEach((function(n,o){C.set(o,t(n,e,R,o,r,B))}));var z=P?void 0:(M?L?d:p:L?j:w)(r);return o(z||r,(function(n,o){z&&(n=r[o=n]),i(C,o,t(n,e,R,o,r,B))})),C}},9344:function(t,r,e){var n=e(3805),o=Object.create,i=function(){function t(){}return function(r){if(!n(r))return{};if(o)return o(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();t.exports=i},6574:function(t,r,e){var n=e(909);t.exports=function(t,r){var e=[];return n(t,(function(t,n,o){r(t,n,o)&&e.push(t)})),e}},2523:function(t){t.exports=function(t,r,e,n){for(var o=t.length,i=e+(n?1:-1);n?i--:++i<o;)if(r(t[i],i,t))return i;return-1}},6131:function(t,r,e){var n=e(2523),o=e(5463),i=e(6959);t.exports=function(t,r,e){return r==r?i(t,r,e):n(t,o,e)}},9172:function(t,r,e){var n=e(5861),o=e(346);t.exports=function(t){return o(t)&&"[object Map]"==n(t)}},5463:function(t){t.exports=function(t){return t!=t}},6038:function(t,r,e){var n=e(5861),o=e(346);t.exports=function(t){return o(t)&&"[object Set]"==n(t)}},2903:function(t,r,e){var n=e(3805),o=e(5527),i=e(181),a=Object.prototype.hasOwnProperty;t.exports=function(t){if(!n(t))return i(t);var r=o(t),e=[];for(var s in t)("constructor"!=s||!r&&a.call(t,s))&&e.push(s);return e}},4033:function(t){t.exports=function(){}},8882:function(t,r,e){var n=e(3488),o=e(8152),i=o?function(t,r){return o.set(t,r),t}:n;t.exports=i},9653:function(t,r,e){var n=e(7828);t.exports=function(t){var r=new t.constructor(t.byteLength);return new n(r).set(new n(t)),r}},3290:function(t,r,e){t=e.nmd(t);var n=e(9325),o=r&&!r.nodeType&&r,i=o&&t&&!t.nodeType&&t,a=i&&i.exports===o?n.Buffer:void 0,s=a?a.allocUnsafe:void 0;t.exports=function(t,r){if(r)return t.slice();var e=t.length,n=s?s(e):new t.constructor(e);return t.copy(n),n}},6169:function(t,r,e){var n=e(9653);t.exports=function(t,r){var e=r?n(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)}},3201:function(t){var r=/\w*$/;t.exports=function(t){var e=new t.constructor(t.source,r.exec(t));return e.lastIndex=t.lastIndex,e}},3736:function(t,r,e){var n=e(1873),o=n?n.prototype:void 0,i=o?o.valueOf:void 0;t.exports=function(t){return i?Object(i.call(t)):{}}},1961:function(t,r,e){var n=e(9653);t.exports=function(t,r){var e=r?n(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}},1596:function(t){var r=Math.max;t.exports=function(t,e,n,o){for(var i=-1,a=t.length,s=n.length,u=-1,c=e.length,f=r(a-s,0),l=Array(c+f),p=!o;++u<c;)l[u]=e[u];for(;++i<s;)(p||i<a)&&(l[n[i]]=t[i]);for(;f--;)l[u++]=t[i++];return l}},3320:function(t){var r=Math.max;t.exports=function(t,e,n,o){for(var i=-1,a=t.length,s=-1,u=n.length,c=-1,f=e.length,l=r(a-u,0),p=Array(l+f),d=!o;++i<l;)p[i]=t[i];for(var h=i;++c<f;)p[h+c]=e[c];for(;++s<u;)(d||i<a)&&(p[h+n[s]]=t[i++]);return p}},3007:function(t){t.exports=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r}},1791:function(t,r,e){var n=e(6547),o=e(3360);t.exports=function(t,r,e,i){var a=!e;e||(e={});for(var s=-1,u=r.length;++s<u;){var c=r[s],f=i?i(e[c],t[c],c,e,t):void 0;void 0===f&&(f=t[c]),a?o(e,c,f):n(e,c,f)}return e}},2271:function(t,r,e){var n=e(1791),o=e(4664);t.exports=function(t,r){return n(t,o(t),r)}},8948:function(t,r,e){var n=e(1791),o=e(6375);t.exports=function(t,r){return n(t,o(t),r)}},8523:function(t){t.exports=function(t,r){for(var e=t.length,n=0;e--;)t[e]===r&&++n;return n}},2e3:function(t,r,e){var n=e(3945),o=e(2429),i=e(5389),a=e(6449);t.exports=function(t,r){return function(e,s){var u=a(e)?n:o,c=r?r():{};return u(e,t,i(s,2),c)}}},1842:function(t,r,e){var n=e(2819),o=e(9325);t.exports=function(t,r,e){var i=1&r,a=n(t);return function r(){return(this&&this!==o&&this instanceof r?a:t).apply(i?e:this,arguments)}}},2819:function(t,r,e){var n=e(9344),o=e(3805);t.exports=function(t){return function(){var r=arguments;switch(r.length){case 0:return new t;case 1:return new t(r[0]);case 2:return new t(r[0],r[1]);case 3:return new t(r[0],r[1],r[2]);case 4:return new t(r[0],r[1],r[2],r[3]);case 5:return new t(r[0],r[1],r[2],r[3],r[4]);case 6:return new t(r[0],r[1],r[2],r[3],r[4],r[5]);case 7:return new t(r[0],r[1],r[2],r[3],r[4],r[5],r[6])}var e=n(t.prototype),i=t.apply(e,r);return o(i)?i:e}}},4697:function(t,r,e){var n=e(1033),o=e(2819),i=e(7471),a=e(8073),s=e(1287),u=e(6306),c=e(9325);t.exports=function(t,r,e){var f=o(t);return function o(){for(var l=arguments.length,p=Array(l),d=l,h=s(o);d--;)p[d]=arguments[d];var v=l<3&&p[0]!==h&&p[l-1]!==h?[]:u(p,h);return(l-=v.length)<e?a(t,r,i,o.placeholder,void 0,p,v,void 0,void 0,e-l):n(this&&this!==c&&this instanceof o?f:t,this,p)}}},6929:function(t,r,e){var n=e(8398),o=e(8816),i=e(7381),a=e(2284),s=e(6449),u=e(5087);t.exports=function(t){return o((function(r){var e=r.length,o=e,c=n.prototype.thru;for(t&&r.reverse();o--;){var f=r[o];if("function"!=typeof f)throw new TypeError("Expected a function");if(c&&!l&&"wrapper"==a(f))var l=new n([],!0)}for(o=l?o:e;++o<e;){f=r[o];var p=a(f),d="wrapper"==p?i(f):void 0;l=d&&u(d[0])&&424==d[1]&&!d[4].length&&1==d[9]?l[a(d[0])].apply(l,d[3]):1==f.length&&u(f)?l[p]():l.thru(f)}return function(){var t=arguments,n=t[0];if(l&&1==t.length&&s(n))return l.plant(n).value();for(var o=0,i=e?r[o].apply(this,t):n;++o<e;)i=r[o].call(this,i);return i}}))}},7471:function(t,r,e){var n=e(1596),o=e(3320),i=e(8523),a=e(2819),s=e(8073),u=e(1287),c=e(8294),f=e(6306),l=e(9325);t.exports=function t(r,e,p,d,h,v,g,y,m,x){var b=128&e,_=1&e,A=2&e,w=24&e,j=512&e,W=A?void 0:a(r);return function I(){for(var E=arguments.length,O=Array(E),R=E;R--;)O[R]=arguments[R];if(w)var k=u(I),S=i(O,k);if(d&&(O=n(O,d,h,w)),v&&(O=o(O,v,g,w)),E-=S,w&&E<x){var B=f(O,k);return s(r,e,t,I.placeholder,p,O,B,y,m,x-E)}var C=_?p:this,F=A?C[r]:r;return E=O.length,y?O=c(O,y):j&&E>1&&O.reverse(),b&&m<E&&(O.length=m),this&&this!==l&&this instanceof I&&(F=W||a(F)),F.apply(C,O)}}},4168:function(t,r,e){var n=e(1033),o=e(2819),i=e(9325);t.exports=function(t,r,e,a){var s=1&r,u=o(t);return function r(){for(var o=-1,c=arguments.length,f=-1,l=a.length,p=Array(l+c),d=this&&this!==i&&this instanceof r?u:t;++f<l;)p[f]=a[f];for(;c--;)p[f++]=arguments[++o];return n(d,s?e:this,p)}}},8073:function(t,r,e){var n=e(5087),o=e(4641),i=e(981);t.exports=function(t,r,e,a,s,u,c,f,l,p){var d=8&r;r|=d?32:64,4&(r&=~(d?64:32))||(r&=-4);var h=[t,r,s,d?u:void 0,d?c:void 0,d?void 0:u,d?void 0:c,f,l,p],v=e.apply(void 0,h);return n(t)&&o(v,h),v.placeholder=a,i(v,t,r)}},6977:function(t,r,e){var n=e(8882),o=e(1842),i=e(4697),a=e(7471),s=e(4168),u=e(7381),c=e(3209),f=e(4641),l=e(981),p=e(1489),d=Math.max;t.exports=function(t,r,e,h,v,g,y,m){var x=2&r;if(!x&&"function"!=typeof t)throw new TypeError("Expected a function");var b=h?h.length:0;if(b||(r&=-97,h=v=void 0),y=void 0===y?y:d(p(y),0),m=void 0===m?m:p(m),b-=v?v.length:0,64&r){var _=h,A=v;h=v=void 0}var w=x?void 0:u(t),j=[t,r,e,h,v,_,A,g,y,m];if(w&&c(j,w),t=j[0],r=j[1],e=j[2],h=j[3],v=j[4],!(m=j[9]=void 0===j[9]?x?0:t.length:d(j[9]-b,0))&&24&r&&(r&=-25),r&&1!=r)W=8==r||16==r?i(t,r,m):32!=r&&33!=r||v.length?a.apply(void 0,j):s(t,r,e,h);else var W=o(t,r,e);return l((w?n:f)(W,j),t,r)}},8816:function(t,r,e){var n=e(5970),o=e(6757),i=e(2865);t.exports=function(t){return i(o(t,void 0,n),t+"")}},3349:function(t,r,e){var n=e(2199),o=e(6375),i=e(7241);t.exports=function(t){return n(t,i,o)}},7381:function(t,r,e){var n=e(8152),o=e(3950),i=n?function(t){return n.get(t)}:o;t.exports=i},2284:function(t,r,e){var n=e(4629),o=Object.prototype.hasOwnProperty;t.exports=function(t){for(var r=t.name+"",e=n[r],i=o.call(n,r)?e.length:0;i--;){var a=e[i],s=a.func;if(null==s||s==t)return a.name}return r}},1287:function(t){t.exports=function(t){return t.placeholder}},8879:function(t,r,e){var n=e(4335)(Object.getPrototypeOf,Object);t.exports=n},6375:function(t,r,e){var n=e(4528),o=e(8879),i=e(4664),a=e(3345),s=Object.getOwnPropertySymbols?function(t){for(var r=[];t;)n(r,i(t)),t=o(t);return r}:a;t.exports=s},5251:function(t){var r=/\{\n\/\* \[wrapped with (.+)\] \*/,e=/,? & /;t.exports=function(t){var n=t.match(r);return n?n[1].split(e):[]}},6189:function(t){var r=Object.prototype.hasOwnProperty;t.exports=function(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&r.call(t,"index")&&(n.index=t.index,n.input=t.input),n}},7199:function(t,r,e){var n=e(9653),o=e(6169),i=e(3201),a=e(3736),s=e(1961);t.exports=function(t,r,e){var u=t.constructor;switch(r){case"[object ArrayBuffer]":return n(t);case"[object Boolean]":case"[object Date]":return new u(+t);case"[object DataView]":return o(t,e);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return s(t,e);case"[object Map]":case"[object Set]":return new u;case"[object Number]":case"[object String]":return new u(t);case"[object RegExp]":return i(t);case"[object Symbol]":return a(t)}}},5529:function(t,r,e){var n=e(9344),o=e(8879),i=e(5527);t.exports=function(t){return"function"!=typeof t.constructor||i(t)?{}:n(o(t))}},2060:function(t){var r=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;t.exports=function(t,e){var n=e.length;if(!n)return t;var o=n-1;return e[o]=(n>1?"& ":"")+e[o],e=e.join(n>2?", ":" "),t.replace(r,"{\n/* [wrapped with "+e+"] */\n")}},5087:function(t,r,e){var n=e(980),o=e(7381),i=e(2284),a=e(3758);t.exports=function(t){var r=i(t),e=a[r];if("function"!=typeof e||!(r in n.prototype))return!1;if(t===e)return!0;var s=o(e);return!!s&&t===s[0]}},3209:function(t,r,e){var n=e(1596),o=e(3320),i=e(6306),a="__lodash_placeholder__",s=128,u=Math.min;t.exports=function(t,r){var e=t[1],c=r[1],f=e|c,l=f<131,p=c==s&&8==e||c==s&&256==e&&t[7].length<=r[8]||384==c&&r[7].length<=r[8]&&8==e;if(!l&&!p)return t;1&c&&(t[2]=r[2],f|=1&e?0:4);var d=r[3];if(d){var h=t[3];t[3]=h?n(h,d,r[4]):d,t[4]=h?i(t[3],a):r[4]}return(d=r[5])&&(h=t[5],t[5]=h?o(h,d,r[6]):d,t[6]=h?i(t[5],a):r[6]),(d=r[7])&&(t[7]=d),c&s&&(t[8]=null==t[8]?r[8]:u(t[8],r[8])),null==t[9]&&(t[9]=r[9]),t[0]=r[0],t[1]=f,t}},8152:function(t,r,e){var n=e(8303),o=n&&new n;t.exports=o},181:function(t){t.exports=function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r}},4629:function(t){t.exports={}},8294:function(t,r,e){var n=e(3007),o=e(361),i=Math.min;t.exports=function(t,r){for(var e=t.length,a=i(r.length,e),s=n(t);a--;){var u=r[a];t[a]=o(u,e)?s[u]:void 0}return t}},6306:function(t){var r="__lodash_placeholder__";t.exports=function(t,e){for(var n=-1,o=t.length,i=0,a=[];++n<o;){var s=t[n];s!==e&&s!==r||(t[n]=r,a[i++]=n)}return a}},4641:function(t,r,e){var n=e(8882),o=e(1811)(n);t.exports=o},981:function(t,r,e){var n=e(5251),o=e(2060),i=e(2865),a=e(5948);t.exports=function(t,r,e){var s=r+"";return i(t,o(s,a(n(s),e)))}},6959:function(t){t.exports=function(t,r,e){for(var n=e-1,o=t.length;++n<o;)if(t[n]===r)return n;return-1}},5948:function(t,r,e){var n=e(8491),o=e(5325),i=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]];t.exports=function(t,r){return n(i,(function(e){var n="_."+e[0];r&e[1]&&!o(t,n)&&t.push(n)})),t.sort()}},257:function(t,r,e){var n=e(980),o=e(8398),i=e(3007);t.exports=function(t){if(t instanceof n)return t.clone();var r=new o(t.__wrapped__,t.__chain__);return r.__actions__=i(t.__actions__),r.__index__=t.__index__,r.__values__=t.__values__,r}},4626:function(t,r,e){var n=e(6977);t.exports=function(t,r,e){return r=e?void 0:r,r=t&&null==r?t.length:r,n(t,128,void 0,void 0,void 0,void 0,r)}},2629:function(t,r,e){var n=e(9999);t.exports=function(t){return n(t,4)}},9747:function(t,r,e){var n=e(6977);function o(t,r,e){var i=n(t,8,void 0,void 0,void 0,void 0,void 0,r=e?void 0:r);return i.placeholder=o.placeholder,i}o.placeholder={},t.exports=o},7612:function(t,r,e){var n=e(9770),o=e(6574),i=e(5389),a=e(6449);t.exports=function(t,r){return(a(t)?n:o)(t,i(r,3))}},5970:function(t,r,e){var n=e(3120);t.exports=function(t){return(null==t?0:t.length)?n(t,1):[]}},9870:function(t,r,e){var n=e(6929)();t.exports=n},3424:function(t,r,e){var n=e(6962),o=e(2874),i=Array.prototype.push;function a(t,r){return 2==r?function(r,e){return t(r,e)}:function(r){return t(r)}}function s(t){for(var r=t?t.length:0,e=Array(r);r--;)e[r]=t[r];return e}function u(t,r){return function(){var e=arguments.length;if(e){for(var n=Array(e);e--;)n[e]=arguments[e];var o=n[0]=r.apply(void 0,n);return t.apply(void 0,n),o}}}t.exports=function t(r,e,c,f){var l="function"==typeof e,p=e===Object(e);if(p&&(f=c,c=e,e=void 0),null==c)throw new TypeError;f||(f={});var d={cap:!("cap"in f)||f.cap,curry:!("curry"in f)||f.curry,fixed:!("fixed"in f)||f.fixed,immutable:!("immutable"in f)||f.immutable,rearg:!("rearg"in f)||f.rearg},h=l?c:o,v="curry"in f&&f.curry,g="fixed"in f&&f.fixed,y="rearg"in f&&f.rearg,m=l?c.runInContext():void 0,x=l?c:{ary:r.ary,assign:r.assign,clone:r.clone,curry:r.curry,forEach:r.forEach,isArray:r.isArray,isError:r.isError,isFunction:r.isFunction,isWeakMap:r.isWeakMap,iteratee:r.iteratee,keys:r.keys,rearg:r.rearg,toInteger:r.toInteger,toPath:r.toPath},b=x.ary,_=x.assign,A=x.clone,w=x.curry,j=x.forEach,W=x.isArray,I=x.isError,E=x.isFunction,O=x.isWeakMap,R=x.keys,k=x.rearg,S=x.toInteger,B=x.toPath,C=R(n.aryMethod),F={castArray:function(t){return function(){var r=arguments[0];return W(r)?t(s(r)):t.apply(void 0,arguments)}},iteratee:function(t){return function(){var r=arguments[1],e=t(arguments[0],r),n=e.length;return d.cap&&"number"==typeof r?(r=r>2?r-2:1,n&&n<=r?e:a(e,r)):e}},mixin:function(t){return function(r){var e=this;if(!E(e))return t(e,Object(r));var n=[];return j(R(r),(function(t){E(r[t])&&n.push([t,e.prototype[t]])})),t(e,Object(r)),j(n,(function(t){var r=t[1];E(r)?e.prototype[t[0]]=r:delete e.prototype[t[0]]})),e}},nthArg:function(t){return function(r){var e=r<0?1:S(r)+1;return w(t(r),e)}},rearg:function(t){return function(r,e){var n=e?e.length:0;return w(t(r,e),n)}},runInContext:function(e){return function(n){return t(r,e(n),f)}}};function L(t,r){if(d.cap){var e=n.iterateeRearg[t];if(e)return function(t,r){return q(t,(function(t){var e=r.length;return function(t,r){return 2==r?function(r,e){return t.apply(void 0,arguments)}:function(r){return t.apply(void 0,arguments)}}(k(a(t,e),r),e)}))}(r,e);var o=!l&&n.iterateeAry[t];if(o)return function(t,r){return q(t,(function(t){return"function"==typeof t?a(t,r):t}))}(r,o)}return r}function M(t,r,e){if(d.fixed&&(g||!n.skipFixed[t])){var o=n.methodSpread[t],a=o&&o.start;return void 0===a?b(r,e):function(t,r){return function(){for(var e=arguments.length,n=e-1,o=Array(e);e--;)o[e]=arguments[e];var a=o[r],s=o.slice(0,r);return a&&i.apply(s,a),r!=n&&i.apply(s,o.slice(r+1)),t.apply(this,s)}}(r,a)}return r}function P(t,r,e){return d.rearg&&e>1&&(y||!n.skipRearg[t])?k(r,n.methodRearg[t]||n.aryRearg[e]):r}function D(t,r){for(var e=-1,n=(r=B(r)).length,o=n-1,i=A(Object(t)),a=i;null!=a&&++e<n;){var s=r[e],u=a[s];null==u||E(u)||I(u)||O(u)||(a[s]=A(e==o?u:Object(u))),a=a[s]}return i}function T(r,e){var o=n.aliasToReal[r]||r,i=n.remap[o]||o,a=f;return function(r){var n=l?m:x,s=l?m[i]:e,u=_(_({},a),r);return t(n,o,s,u)}}function q(t,r){return function(){var e=arguments.length;if(!e)return t();for(var n=Array(e);e--;)n[e]=arguments[e];var o=d.rearg?0:e-1;return n[o]=r(n[o]),t.apply(void 0,n)}}function z(t,r,e){var o,i=n.aliasToReal[t]||t,a=r,c=F[i];return c?a=c(r):d.immutable&&(n.mutate.array[i]?a=u(r,s):n.mutate.object[i]?a=u(r,function(t){return function(r){return t({},r)}}(r)):n.mutate.set[i]&&(a=u(r,D))),j(C,(function(t){return j(n.aryMethod[t],(function(r){if(i==r){var e=n.methodSpread[i],s=e&&e.afterRearg;return o=s?M(i,P(i,a,t),t):P(i,M(i,a,t),t),o=function(t,r,e){return v||d.curry&&e>1?w(r,e):r}(0,o=L(i,o),t),!1}})),!o})),o||(o=a),o==r&&(o=v?w(o,1):function(){return r.apply(this,arguments)}),o.convert=T(i,r),o.placeholder=r.placeholder=e,o}if(!p)return z(e,c,h);var N=c,U=[];return j(C,(function(t){j(n.aryMethod[t],(function(t){var r=N[n.remap[t]||t];r&&U.push([t,z(t,r,N)])}))})),j(R(N),(function(t){var r=N[t];if("function"==typeof r){for(var e=U.length;e--;)if(U[e][0]==t)return;r.convert=T(t,r),U.push([t,r])}})),j(U,(function(t){N[t[0]]=t[1]})),N.convert=function(t){return N.runInContext.convert(t)(void 0)},N.placeholder=N,j(R(N),(function(t){j(n.realToAlias[t]||[],(function(r){N[r]=N[t]}))})),N}},6962:function(t,r){r.aliasToReal={each:"forEach",eachRight:"forEachRight",entries:"toPairs",entriesIn:"toPairsIn",extend:"assignIn",extendAll:"assignInAll",extendAllWith:"assignInAllWith",extendWith:"assignInWith",first:"head",conforms:"conformsTo",matches:"isMatch",property:"get",__:"placeholder",F:"stubFalse",T:"stubTrue",all:"every",allPass:"overEvery",always:"constant",any:"some",anyPass:"overSome",apply:"spread",assoc:"set",assocPath:"set",complement:"negate",compose:"flowRight",contains:"includes",dissoc:"unset",dissocPath:"unset",dropLast:"dropRight",dropLastWhile:"dropRightWhile",equals:"isEqual",identical:"eq",indexBy:"keyBy",init:"initial",invertObj:"invert",juxt:"over",omitAll:"omit",nAry:"ary",path:"get",pathEq:"matchesProperty",pathOr:"getOr",paths:"at",pickAll:"pick",pipe:"flow",pluck:"map",prop:"get",propEq:"matchesProperty",propOr:"getOr",props:"at",symmetricDifference:"xor",symmetricDifferenceBy:"xorBy",symmetricDifferenceWith:"xorWith",takeLast:"takeRight",takeLastWhile:"takeRightWhile",unapply:"rest",unnest:"flatten",useWith:"overArgs",where:"conformsTo",whereEq:"isMatch",zipObj:"zipObject"},r.aryMethod={1:["assignAll","assignInAll","attempt","castArray","ceil","create","curry","curryRight","defaultsAll","defaultsDeepAll","floor","flow","flowRight","fromPairs","invert","iteratee","memoize","method","mergeAll","methodOf","mixin","nthArg","over","overEvery","overSome","rest","reverse","round","runInContext","spread","template","trim","trimEnd","trimStart","uniqueId","words","zipAll"],2:["add","after","ary","assign","assignAllWith","assignIn","assignInAllWith","at","before","bind","bindAll","bindKey","chunk","cloneDeepWith","cloneWith","concat","conformsTo","countBy","curryN","curryRightN","debounce","defaults","defaultsDeep","defaultTo","delay","difference","divide","drop","dropRight","dropRightWhile","dropWhile","endsWith","eq","every","filter","find","findIndex","findKey","findLast","findLastIndex","findLastKey","flatMap","flatMapDeep","flattenDepth","forEach","forEachRight","forIn","forInRight","forOwn","forOwnRight","get","groupBy","gt","gte","has","hasIn","includes","indexOf","intersection","invertBy","invoke","invokeMap","isEqual","isMatch","join","keyBy","lastIndexOf","lt","lte","map","mapKeys","mapValues","matchesProperty","maxBy","meanBy","merge","mergeAllWith","minBy","multiply","nth","omit","omitBy","overArgs","pad","padEnd","padStart","parseInt","partial","partialRight","partition","pick","pickBy","propertyOf","pull","pullAll","pullAt","random","range","rangeRight","rearg","reject","remove","repeat","restFrom","result","sampleSize","some","sortBy","sortedIndex","sortedIndexOf","sortedLastIndex","sortedLastIndexOf","sortedUniqBy","split","spreadFrom","startsWith","subtract","sumBy","take","takeRight","takeRightWhile","takeWhile","tap","throttle","thru","times","trimChars","trimCharsEnd","trimCharsStart","truncate","union","uniqBy","uniqWith","unset","unzipWith","without","wrap","xor","zip","zipObject","zipObjectDeep"],3:["assignInWith","assignWith","clamp","differenceBy","differenceWith","findFrom","findIndexFrom","findLastFrom","findLastIndexFrom","getOr","includesFrom","indexOfFrom","inRange","intersectionBy","intersectionWith","invokeArgs","invokeArgsMap","isEqualWith","isMatchWith","flatMapDepth","lastIndexOfFrom","mergeWith","orderBy","padChars","padCharsEnd","padCharsStart","pullAllBy","pullAllWith","rangeStep","rangeStepRight","reduce","reduceRight","replace","set","slice","sortedIndexBy","sortedLastIndexBy","transform","unionBy","unionWith","update","xorBy","xorWith","zipWith"],4:["fill","setWith","updateWith"]},r.aryRearg={2:[1,0],3:[2,0,1],4:[3,2,0,1]},r.iterateeAry={dropRightWhile:1,dropWhile:1,every:1,filter:1,find:1,findFrom:1,findIndex:1,findIndexFrom:1,findKey:1,findLast:1,findLastFrom:1,findLastIndex:1,findLastIndexFrom:1,findLastKey:1,flatMap:1,flatMapDeep:1,flatMapDepth:1,forEach:1,forEachRight:1,forIn:1,forInRight:1,forOwn:1,forOwnRight:1,map:1,mapKeys:1,mapValues:1,partition:1,reduce:2,reduceRight:2,reject:1,remove:1,some:1,takeRightWhile:1,takeWhile:1,times:1,transform:2},r.iterateeRearg={mapKeys:[1],reduceRight:[1,0]},r.methodRearg={assignInAllWith:[1,0],assignInWith:[1,2,0],assignAllWith:[1,0],assignWith:[1,2,0],differenceBy:[1,2,0],differenceWith:[1,2,0],getOr:[2,1,0],intersectionBy:[1,2,0],intersectionWith:[1,2,0],isEqualWith:[1,2,0],isMatchWith:[2,1,0],mergeAllWith:[1,0],mergeWith:[1,2,0],padChars:[2,1,0],padCharsEnd:[2,1,0],padCharsStart:[2,1,0],pullAllBy:[2,1,0],pullAllWith:[2,1,0],rangeStep:[1,2,0],rangeStepRight:[1,2,0],setWith:[3,1,2,0],sortedIndexBy:[2,1,0],sortedLastIndexBy:[2,1,0],unionBy:[1,2,0],unionWith:[1,2,0],updateWith:[3,1,2,0],xorBy:[1,2,0],xorWith:[1,2,0],zipWith:[1,2,0]},r.methodSpread={assignAll:{start:0},assignAllWith:{start:0},assignInAll:{start:0},assignInAllWith:{start:0},defaultsAll:{start:0},defaultsDeepAll:{start:0},invokeArgs:{start:2},invokeArgsMap:{start:2},mergeAll:{start:0},mergeAllWith:{start:0},partial:{start:1},partialRight:{start:1},without:{start:1},zipAll:{start:0}},r.mutate={array:{fill:!0,pull:!0,pullAll:!0,pullAllBy:!0,pullAllWith:!0,pullAt:!0,remove:!0,reverse:!0},object:{assign:!0,assignAll:!0,assignAllWith:!0,assignIn:!0,assignInAll:!0,assignInAllWith:!0,assignInWith:!0,assignWith:!0,defaults:!0,defaultsAll:!0,defaultsDeep:!0,defaultsDeepAll:!0,merge:!0,mergeAll:!0,mergeAllWith:!0,mergeWith:!0},set:{set:!0,setWith:!0,unset:!0,update:!0,updateWith:!0}},r.realToAlias=function(){var t=Object.prototype.hasOwnProperty,e=r.aliasToReal,n={};for(var o in e){var i=e[o];t.call(n,i)?n[i].push(o):n[i]=[o]}return n}(),r.remap={assignAll:"assign",assignAllWith:"assignWith",assignInAll:"assignIn",assignInAllWith:"assignInWith",curryN:"curry",curryRightN:"curryRight",defaultsAll:"defaults",defaultsDeepAll:"defaultsDeep",findFrom:"find",findIndexFrom:"findIndex",findLastFrom:"findLast",findLastIndexFrom:"findLastIndex",getOr:"get",includesFrom:"includes",indexOfFrom:"indexOf",invokeArgs:"invoke",invokeArgsMap:"invokeMap",lastIndexOfFrom:"lastIndexOf",mergeAll:"merge",mergeAllWith:"mergeWith",padChars:"pad",padCharsEnd:"padEnd",padCharsStart:"padStart",propertyOf:"get",rangeStep:"range",rangeStepRight:"rangeRight",restFrom:"rest",spreadFrom:"spread",trimChars:"trim",trimCharsEnd:"trimEnd",trimCharsStart:"trimStart",zipAll:"zip"},r.skipFixed={castArray:!0,flow:!0,flowRight:!0,iteratee:!0,mixin:!0,rearg:!0,runInContext:!0},r.skipRearg={add:!0,assign:!0,assignIn:!0,bind:!0,bindKey:!0,concat:!0,difference:!0,divide:!0,eq:!0,gt:!0,gte:!0,isEqual:!0,lt:!0,lte:!0,matchesProperty:!0,merge:!0,multiply:!0,overArgs:!0,partial:!0,partialRight:!0,propertyOf:!0,random:!0,range:!0,rangeRight:!0,subtract:!0,zip:!0,zipObject:!0,zipObjectDeep:!0}},7934:function(t,r,e){t.exports={ary:e(4626),assign:e(4733),clone:e(2629),curry:e(9747),forEach:e(8491),isArray:e(6449),isError:e(3546),isFunction:e(1882),isWeakMap:e(7886),iteratee:e(3855),keys:e(8984),rearg:e(4195),toInteger:e(1489),toPath:e(2072)}},9920:function(t,r,e){var n=e(3424),o=e(7934);t.exports=function(t,r,e){return n(o,t,r,e)}},5497:function(t,r,e){var n=e(9920)("filter",e(7612));n.placeholder=e(2874),t.exports=n},9899:function(t,r,e){var n=e(9920)("flow",e(9870));n.placeholder=e(2874),t.exports=n},2093:function(t,r,e){var n=e(9920)("groupBy",e(2013));n.placeholder=e(2874),t.exports=n},8821:function(t,r,e){var n=e(9920)("map",e(5378));n.placeholder=e(2874),t.exports=n},2874:function(t){t.exports={}},1333:function(t,r,e){var n=e(9920)("reverse",e(7126));n.placeholder=e(2874),t.exports=n},854:function(t,r,e){var n=e(9920)("sortBy",e(3031));n.placeholder=e(2874),t.exports=n},2013:function(t,r,e){var n=e(3360),o=e(2e3),i=Object.prototype.hasOwnProperty,a=o((function(t,r,e){i.call(t,e)?t[e].push(r):n(t,e,[r])}));t.exports=a},3546:function(t,r,e){var n=e(2552),o=e(346),i=e(1331);t.exports=function(t){if(!o(t))return!1;var r=n(t);return"[object Error]"==r||"[object DOMException]"==r||"string"==typeof t.message&&"string"==typeof t.name&&!i(t)}},7730:function(t,r,e){var n=e(9172),o=e(7301),i=e(6009),a=i&&i.isMap,s=a?o(a):n;t.exports=s},1331:function(t,r,e){var n=e(2552),o=e(8879),i=e(346),a=Function.prototype,s=Object.prototype,u=a.toString,c=s.hasOwnProperty,f=u.call(Object);t.exports=function(t){if(!i(t)||"[object Object]"!=n(t))return!1;var r=o(t);if(null===r)return!0;var e=c.call(r,"constructor")&&r.constructor;return"function"==typeof e&&e instanceof e&&u.call(e)==f}},8440:function(t,r,e){var n=e(6038),o=e(7301),i=e(6009),a=i&&i.isSet,s=a?o(a):n;t.exports=s},7886:function(t,r,e){var n=e(5861),o=e(346);t.exports=function(t){return o(t)&&"[object WeakMap]"==n(t)}},3855:function(t,r,e){var n=e(9999),o=e(5389);t.exports=function(t){return o("function"==typeof t?t:n(t,1))}},7241:function(t,r,e){var n=e(695),o=e(2903),i=e(4894);t.exports=function(t){return i(t)?n(t,!0):o(t)}},5378:function(t,r,e){var n=e(4932),o=e(5389),i=e(5128),a=e(6449);t.exports=function(t,r){return(a(t)?n:i)(t,o(r,3))}},3950:function(t){t.exports=function(){}},4195:function(t,r,e){var n=e(6977),o=e(8816),i=o((function(t,r){return n(t,256,void 0,void 0,void 0,r)}));t.exports=i},3472:function(t,r,e){var n=e(3222);t.exports=function(){var t=arguments,r=n(t[0]);return t.length<3?r:r.replace(t[1],t[2])}},7126:function(t){var r=Array.prototype.reverse;t.exports=function(t){return null==t?t:r.call(t)}},7400:function(t,r,e){var n=e(9374),o=1/0;t.exports=function(t){return t?(t=n(t))===o||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0}},1489:function(t,r,e){var n=e(7400);t.exports=function(t){var r=n(t),e=r%1;return r==r?e?r-e:r:0}},2072:function(t,r,e){var n=e(4932),o=e(3007),i=e(6449),a=e(4394),s=e(1802),u=e(7797),c=e(3222);t.exports=function(t){return i(t)?n(t,u):a(t)?[t]:o(s(c(t)))}},3758:function(t,r,e){var n=e(980),o=e(8398),i=e(4033),a=e(6449),s=e(346),u=e(257),c=Object.prototype.hasOwnProperty;function f(t){if(s(t)&&!a(t)&&!(t instanceof n)){if(t instanceof o)return t;if(c.call(t,"__wrapped__"))return u(t)}return new o(t)}f.prototype=i.prototype,f.prototype.constructor=f,t.exports=f}}]);
//# sourceMappingURL=component---src-pages-series-jsx-9d8c22ab9ab2daaaad49.js.map