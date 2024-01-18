/*
 Copyright (C) Federico Zivolo 2018
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */var e='undefined'!=typeof window&&'undefined'!=typeof document;const t=['Edge','Trident','Firefox'];let o=0;for(let n=0;n<t.length;n+=1)if(e&&0<=navigator.userAgent.indexOf(t[n])){o=1;break}function n(e){let t=!1;return()=>{t||(t=!0,window.Promise.resolve().then(()=>{t=!1,e()}))}}function i(e){let t=!1;return()=>{t||(t=!0,setTimeout(()=>{t=!1,e()},o))}}const r=e&&window.Promise;var p=r?n:i;function d(e){return e&&'[object Function]'==={}.toString.call(e)}function s(e,t){if(1!==e.nodeType)return[];const o=getComputedStyle(e,null);return t?o[t]:o}function f(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function a(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}const{overflow:t,overflowX:o,overflowY:n}=s(e);return /(auto|scroll|overlay)/.test(t+n+o)?e:a(f(e))}const l=e&&!!(window.MSInputMethodContext&&document.documentMode),m=e&&/MSIE 10/.test(navigator.userAgent);function h(e){return 11===e?l:10===e?m:l||m}function c(e){if(!e)return document.documentElement;const t=h(10)?document.body:null;let o=e.offsetParent;for(;o===t&&e.nextElementSibling;)o=(e=e.nextElementSibling).offsetParent;const n=o&&o.nodeName;return n&&'BODY'!==n&&'HTML'!==n?-1!==['TD','TABLE'].indexOf(o.nodeName)&&'static'===s(o,'position')?c(o):o:e?e.ownerDocument.documentElement:document.documentElement}function u(e){const{nodeName:t}=e;return'BODY'!==t&&('HTML'===t||c(e.firstElementChild)===e)}function g(e){return null===e.parentNode?e:g(e.parentNode)}function b(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;const o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?e:t,i=o?t:e,r=document.createRange();r.setStart(n,0),r.setEnd(i,0);const{commonAncestorContainer:p}=r;if(e!==p&&t!==p||n.contains(i))return u(p)?p:c(p);const d=g(e);return d.host?b(d.host,t):b(e,g(t).host)}function w(e,t='top'){const o='top'===t?'scrollTop':'scrollLeft',n=e.nodeName;if('BODY'===n||'HTML'===n){const t=e.ownerDocument.documentElement,n=e.ownerDocument.scrollingElement||t;return n[o]}return e[o]}function y(e,t,o=!1){const n=w(t,'top'),i=w(t,'left'),r=o?-1:1;return e.top+=n*r,e.bottom+=n*r,e.left+=i*r,e.right+=i*r,e}function E(e,t){const o='x'===t?'Left':'Top',n='Left'==o?'Right':'Bottom';return parseFloat(e[`border${o}Width`],10)+parseFloat(e[`border${n}Width`],10)}function x(e,t,o,n){return Math.max(t[`offset${e}`],t[`scroll${e}`],o[`client${e}`],o[`offset${e}`],o[`scroll${e}`],h(10)?o[`offset${e}`]+n[`margin${'Height'===e?'Top':'Left'}`]+n[`margin${'Height'===e?'Bottom':'Right'}`]:0)}function v(){const e=document.body,t=document.documentElement,o=h(10)&&getComputedStyle(t);return{height:x('Height',e,t,o),width:x('Width',e,t,o)}}var O=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var n in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e};function L(e){return O({},e,{right:e.left+e.width,bottom:e.top+e.height})}function S(e){let t={};try{if(h(10)){t=e.getBoundingClientRect();const o=w(e,'top'),n=w(e,'left');t.top+=o,t.left+=n,t.bottom+=o,t.right+=n}else t=e.getBoundingClientRect()}catch(t){}const o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},n='HTML'===e.nodeName?v():{},i=n.width||e.clientWidth||o.right-o.left,r=n.height||e.clientHeight||o.bottom-o.top;let p=e.offsetWidth-i,d=e.offsetHeight-r;if(p||d){const t=s(e);p-=E(t,'x'),d-=E(t,'y'),o.width-=p,o.height-=d}return L(o)}function T(e,t,o=!1){var n=Math.max;const i=h(10),r='HTML'===t.nodeName,p=S(e),d=S(t),f=a(e),l=s(t),m=parseFloat(l.borderTopWidth,10),c=parseFloat(l.borderLeftWidth,10);o&&'HTML'===t.nodeName&&(d.top=n(d.top,0),d.left=n(d.left,0));let u=L({top:p.top-d.top-m,left:p.left-d.left-c,width:p.width,height:p.height});if(u.marginTop=0,u.marginLeft=0,!i&&r){const e=parseFloat(l.marginTop,10),t=parseFloat(l.marginLeft,10);u.top-=m-e,u.bottom-=m-e,u.left-=c-t,u.right-=c-t,u.marginTop=e,u.marginLeft=t}return(i&&!o?t.contains(f):t===f&&'BODY'!==f.nodeName)&&(u=y(u,t)),u}function D(e,t=!1){var o=Math.max;const n=e.ownerDocument.documentElement,i=T(e,n),r=o(n.clientWidth,window.innerWidth||0),p=o(n.clientHeight,window.innerHeight||0),d=t?0:w(n),s=t?0:w(n,'left'),f={top:d-i.top+i.marginTop,left:s-i.left+i.marginLeft,width:r,height:p};return L(f)}function N(e){const t=e.nodeName;return'BODY'===t||'HTML'===t?!1:!('fixed'!==s(e,'position'))||N(f(e))}function C(e){if(!e||!e.parentElement||h())return document.documentElement;let t=e.parentElement;for(;t&&'none'===s(t,'transform');)t=t.parentElement;return t||document.documentElement}function P(e,t,o,n,i=!1){let r={top:0,left:0};const p=i?C(e):b(e,t);if('viewport'===n)r=D(p,i);else{let o;'scrollParent'===n?(o=a(f(t)),'BODY'===o.nodeName&&(o=e.ownerDocument.documentElement)):'window'===n?o=e.ownerDocument.documentElement:o=n;const d=T(o,p,i);if('HTML'===o.nodeName&&!N(p)){const{height:e,width:t}=v();r.top+=d.top-d.marginTop,r.bottom=e+d.top,r.left+=d.left-d.marginLeft,r.right=t+d.left}else r=d}return r.left+=o,r.top+=o,r.right-=o,r.bottom-=o,r}function B({width:e,height:t}){return e*t}function H(e,t,o,n,i,r=0){if(-1===e.indexOf('auto'))return e;const p=P(o,n,r,i),d={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},s=Object.keys(d).map((e)=>O({key:e},d[e],{area:B(d[e])})).sort((e,t)=>t.area-e.area),f=s.filter(({width:e,height:t})=>e>=o.clientWidth&&t>=o.clientHeight),a=0<f.length?f[0].key:s[0].key,l=e.split('-')[1];return a+(l?`-${l}`:'')}function W(e,t,o,n=null){const i=n?C(t):b(t,o);return T(o,i,n)}function k(e){const t=getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),n=parseFloat(t.marginLeft)+parseFloat(t.marginRight),i={width:e.offsetWidth+n,height:e.offsetHeight+o};return i}function A(e){const t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,(e)=>t[e])}function M(e,t,o){o=o.split('-')[0];const n=k(e),i={width:n.width,height:n.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',d=r?'left':'top',s=r?'height':'width',f=r?'width':'height';return i[p]=t[p]+t[s]/2-n[s]/2,i[d]=o===d?t[d]-n[f]:t[A(d)],i}function F(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function I(e,t,o){if(Array.prototype.findIndex)return e.findIndex((e)=>e[t]===o);const n=F(e,(e)=>e[t]===o);return e.indexOf(n)}function R(e,t,o){const n=void 0===o?e:e.slice(0,I(e,'name',o));return n.forEach((e)=>{e['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');const o=e['function']||e.fn;e.enabled&&d(o)&&(t.offsets.popper=L(t.offsets.popper),t.offsets.reference=L(t.offsets.reference),t=o(t,e))}),t}function U(){if(this.state.isDestroyed)return;let e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=W(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=H(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=M(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?'fixed':'absolute',e=R(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}function Y(e,t){return e.some(({name:e,enabled:o})=>o&&e===t)}function K(e){const t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1);for(let n=0;n<t.length;n++){const i=t[n],r=i?`${i}${o}`:e;if('undefined'!=typeof document.body.style[r])return r}return null}function j(){return this.state.isDestroyed=!0,Y(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.position='',this.popper.style.top='',this.popper.style.left='',this.popper.style.right='',this.popper.style.bottom='',this.popper.style.willChange='',this.popper.style[K('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function q(e){const t=e.ownerDocument;return t?t.defaultView:window}function G(e,t,o,n){const i='BODY'===e.nodeName,r=i?e.ownerDocument.defaultView:e;r.addEventListener(t,o,{passive:!0}),i||G(a(r.parentNode),t,o,n),n.push(r)}function z(e,t,o,n){o.updateBound=n,q(e).addEventListener('resize',o.updateBound,{passive:!0});const i=a(e);return G(i,'scroll',o.updateBound,o.scrollParents),o.scrollElement=i,o.eventsEnabled=!0,o}function V(){this.state.eventsEnabled||(this.state=z(this.reference,this.options,this.state,this.scheduleUpdate))}function _(e,t){return q(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach((e)=>{e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function X(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=_(this.reference,this.state))}function Q(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function J(e,t){Object.keys(t).forEach((o)=>{let n='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&Q(t[o])&&(n='px'),e.style[o]=t[o]+n})}function Z(e,t){Object.keys(t).forEach(function(o){const n=t[o];!1===n?e.removeAttribute(o):e.setAttribute(o,t[o])})}function $(e){return J(e.instance.popper,e.styles),Z(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&J(e.arrowElement,e.arrowStyles),e}function ee(e,t,o,n,i){const r=W(i,t,e,o.positionFixed),p=H(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),J(t,{position:o.positionFixed?'fixed':'absolute'}),o}function te(e,t){var o=Math.round,n=Math.floor;const{x:i,y:r}=t,{popper:p}=e.offsets,d=F(e.instance.modifiers,(e)=>'applyStyle'===e.name).gpuAcceleration;void 0!==d&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');const s=void 0===d?t.gpuAcceleration:d,f=c(e.instance.popper),a=S(f),l={position:p.position},m={left:n(p.left),top:o(p.top),bottom:o(p.bottom),right:n(p.right)},h='bottom'===i?'top':'bottom',u='right'===r?'left':'right',g=K('transform');let b,w;if(w='bottom'==h?-a.height+m.bottom:m.top,b='right'==u?-a.width+m.right:m.left,s&&g)l[g]=`translate3d(${b}px, ${w}px, 0)`,l[h]=0,l[u]=0,l.willChange='transform';else{const e='bottom'==h?-1:1,t='right'==u?-1:1;l[h]=w*e,l[u]=b*t,l.willChange=`${h}, ${u}`}const y={"x-placement":e.placement};return e.attributes=O({},y,e.attributes),e.styles=O({},l,e.styles),e.arrowStyles=O({},e.offsets.arrow,e.arrowStyles),e}function oe(e,t,o){const n=F(e,({name:e})=>e===t),i=!!n&&e.some((e)=>e.name===o&&e.enabled&&e.order<n.order);if(!i){const e=`\`${t}\``,n=`\`${o}\``;console.warn(`${n} modifier is required by ${e} modifier in order to work, be sure to include it before ${e}!`)}return i}function ne(e,t){if(!oe(e.instance.modifiers,'arrow','keepTogether'))return e;let o=t.element;if('string'==typeof o){if(o=e.instance.popper.querySelector(o),!o)return e;}else if(!e.instance.popper.contains(o))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;const n=e.placement.split('-')[0],{popper:i,reference:r}=e.offsets,p=-1!==['left','right'].indexOf(n),d=p?'height':'width',f=p?'Top':'Left',a=f.toLowerCase(),l=p?'left':'top',m=p?'bottom':'right',h=k(o)[d];r[m]-h<i[a]&&(e.offsets.popper[a]-=i[a]-(r[m]-h)),r[a]+h>i[m]&&(e.offsets.popper[a]+=r[a]+h-i[m]),e.offsets.popper=L(e.offsets.popper);const c=r[a]+r[d]/2-h/2,u=s(e.instance.popper),g=parseFloat(u[`margin${f}`],10),b=parseFloat(u[`border${f}Width`],10);let w=c-e.offsets.popper[a]-g-b;return w=Math.max(Math.min(i[d]-h,w),0),e.arrowElement=o,e.offsets.arrow={[a]:Math.round(w),[l]:''},e}function ie(e){if('end'===e)return'start';return'start'===e?'end':e}var re=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'];const pe=re.slice(3);function de(e,t=!1){const o=pe.indexOf(e),n=pe.slice(o+1).concat(pe.slice(0,o));return t?n.reverse():n}const se={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'};function fe(e,t){if(Y(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;const o=P(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed);let n=e.placement.split('-')[0],i=A(n),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case se.FLIP:p=[n,i];break;case se.CLOCKWISE:p=de(n);break;case se.COUNTERCLOCKWISE:p=de(n,!0);break;default:p=t.behavior;}return p.forEach((d,s)=>{if(n!==d||p.length===s+1)return e;n=e.placement.split('-')[0],i=A(n);const f=e.offsets.popper,a=e.offsets.reference,l=Math.floor,m='left'===n&&l(f.right)>l(a.left)||'right'===n&&l(f.left)<l(a.right)||'top'===n&&l(f.bottom)>l(a.top)||'bottom'===n&&l(f.top)<l(a.bottom),h=l(f.left)<l(o.left),c=l(f.right)>l(o.right),u=l(f.top)<l(o.top),g=l(f.bottom)>l(o.bottom),b='left'===n&&h||'right'===n&&c||'top'===n&&u||'bottom'===n&&g,w=-1!==['top','bottom'].indexOf(n),y=!!t.flipVariations&&(w&&'start'===r&&h||w&&'end'===r&&c||!w&&'start'===r&&u||!w&&'end'===r&&g);(m||b||y)&&(e.flipped=!0,(m||b)&&(n=p[s+1]),y&&(r=ie(r)),e.placement=n+(r?'-'+r:''),e.offsets.popper=O({},e.offsets.popper,M(e.instance.popper,e.offsets.reference,e.placement)),e=R(e.instance.modifiers,e,'flip'))}),e}function ae(e){const{popper:t,reference:o}=e.offsets,n=e.placement.split('-')[0],i=Math.floor,r=-1!==['top','bottom'].indexOf(n),p=r?'right':'bottom',d=r?'left':'top',s=r?'width':'height';return t[p]<i(o[d])&&(e.offsets.popper[d]=i(o[d])-t[s]),t[d]>i(o[p])&&(e.offsets.popper[d]=i(o[p])),e}function le(e,t,o,n){var i=Math.max;const r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),p=+r[1],d=r[2];if(!p)return e;if(0===d.indexOf('%')){let e;switch(d){case'%p':e=o;break;case'%':case'%r':default:e=n;}const i=L(e);return i[t]/100*p}if('vh'===d||'vw'===d){let e;return e='vh'===d?i(document.documentElement.clientHeight,window.innerHeight||0):i(document.documentElement.clientWidth,window.innerWidth||0),e/100*p}return p}function me(e,t,o,n){const i=[0,0],r=-1!==['right','left'].indexOf(n),p=e.split(/(\+|\-)/).map((e)=>e.trim()),d=p.indexOf(F(p,(e)=>-1!==e.search(/,|\s/)));p[d]&&-1===p[d].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');const s=/\s*,\s*|\s+/;let f=-1===d?[p]:[p.slice(0,d).concat([p[d].split(s)[0]]),[p[d].split(s)[1]].concat(p.slice(d+1))];return f=f.map((e,n)=>{const i=(1===n?!r:r)?'height':'width';let p=!1;return e.reduce((e,t)=>''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t),[]).map((e)=>le(e,i,t,o))}),f.forEach((e,t)=>{e.forEach((o,n)=>{Q(o)&&(i[t]+=o*('-'===e[n-1]?-1:1))})}),i}function he(e,{offset:t}){const{placement:o,offsets:{popper:n,reference:i}}=e,r=o.split('-')[0];let p;return p=Q(+t)?[+t,0]:me(t,n,i,r),'left'===r?(n.top+=p[0],n.left-=p[1]):'right'===r?(n.top+=p[0],n.left+=p[1]):'top'===r?(n.left+=p[0],n.top-=p[1]):'bottom'===r&&(n.left+=p[0],n.top+=p[1]),e.popper=n,e}function ce(e,t){let o=t.boundariesElement||c(e.instance.popper);e.instance.reference===o&&(o=c(o));const n=K('transform'),i=e.instance.popper.style,{top:r,left:p,[n]:d}=i;i.top='',i.left='',i[n]='';const s=P(e.instance.popper,e.instance.reference,t.padding,o,e.positionFixed);i.top=r,i.left=p,i[n]=d,t.boundaries=s;const f=t.priority;let a=e.offsets.popper;const l={primary(e){let o=a[e];return a[e]<s[e]&&!t.escapeWithReference&&(o=Math.max(a[e],s[e])),{[e]:o}},secondary(e){const o='right'===e?'left':'top';let n=a[o];return a[e]>s[e]&&!t.escapeWithReference&&(n=Math.min(a[o],s[e]-('right'===e?a.width:a.height))),{[o]:n}}};return f.forEach((e)=>{const t=-1===['left','top'].indexOf(e)?'secondary':'primary';a=O({},a,l[t](e))}),e.offsets.popper=a,e}function ue(e){const t=e.placement,o=t.split('-')[0],n=t.split('-')[1];if(n){const{reference:t,popper:i}=e.offsets,r=-1!==['bottom','top'].indexOf(o),p=r?'left':'top',d=r?'width':'height',s={start:{[p]:t[p]},end:{[p]:t[p]+t[d]-i[d]}};e.offsets.popper=O({},i,s[n])}return e}function ge(e){if(!oe(e.instance.modifiers,'hide','preventOverflow'))return e;const t=e.offsets.reference,o=F(e.instance.modifiers,(e)=>'preventOverflow'===e.name).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}function be(e){const t=e.placement,o=t.split('-')[0],{popper:n,reference:i}=e.offsets,r=-1!==['left','right'].indexOf(o),p=-1===['top','left'].indexOf(o);return n[r?'left':'top']=i[o]-(p?n[r?'width':'height']:0),e.placement=A(t),e.offsets.popper=L(n),e}var we={shift:{order:100,enabled:!0,fn:ue},offset:{order:200,enabled:!0,fn:he,offset:0},preventOverflow:{order:300,enabled:!0,fn:ce,priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:ae},arrow:{order:500,enabled:!0,fn:ne,element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:fe,behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:be},hide:{order:800,enabled:!0,fn:ge},computeStyle:{order:850,enabled:!0,fn:te,gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:$,onLoad:ee,gpuAcceleration:void 0}},ye={placement:'bottom',positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:()=>{},onUpdate:()=>{},modifiers:we};class Ee{constructor(e,t,o={}){this.scheduleUpdate=()=>requestAnimationFrame(this.update),this.update=p(this.update.bind(this)),this.options=O({},Ee.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(O({},Ee.Defaults.modifiers,o.modifiers)).forEach((e)=>{this.options.modifiers[e]=O({},Ee.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map((e)=>O({name:e},this.options.modifiers[e])).sort((e,t)=>e.order-t.order),this.modifiers.forEach((e)=>{e.enabled&&d(e.onLoad)&&e.onLoad(this.reference,this.popper,this.options,e,this.state)}),this.update();const n=this.options.eventsEnabled;n&&this.enableEventListeners(),this.state.eventsEnabled=n}update(){return U.call(this)}destroy(){return j.call(this)}enableEventListeners(){return V.call(this)}disableEventListeners(){return X.call(this)}}Ee.Utils=('undefined'==typeof window?global:window).PopperUtils,Ee.placements=re,Ee.Defaults=ye;export default Ee;
//# sourceMappingURL=popper.min.js.map

/*!
  * Bootstrap v5.1.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap=e()}(this,(function(){"use strict";const t=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i="#"+i.split("#")[1]),e=i&&"#"!==i?i.trim():null}return e},e=e=>{const i=t(e);return i&&document.querySelector(i)?i:null},i=e=>{const i=t(e);return i?document.querySelector(i):null},n=t=>{t.dispatchEvent(new Event("transitionend"))},s=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),o=t=>s(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(t):null,r=(t,e,i)=>{Object.keys(i).forEach(n=>{const o=i[n],r=e[n],a=r&&s(r)?"element":null==(l=r)?""+l:{}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();var l;if(!new RegExp(o).test(a))throw new TypeError(`${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${o}".`)})},a=t=>!(!s(t)||0===t.getClientRects().length)&&"visible"===getComputedStyle(t).getPropertyValue("visibility"),l=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),c=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?c(t.parentNode):null},h=()=>{},d=t=>{t.offsetHeight},u=()=>{const{jQuery:t}=window;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},f=[],p=()=>"rtl"===document.documentElement.dir,m=t=>{var e;e=()=>{const e=u();if(e){const i=t.NAME,n=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=n,t.jQueryInterface)}},"loading"===document.readyState?(f.length||document.addEventListener("DOMContentLoaded",()=>{f.forEach(t=>t())}),f.push(e)):e()},g=t=>{"function"==typeof t&&t()},_=(t,e,i=!0)=>{if(!i)return void g(t);const s=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const n=Number.parseFloat(e),s=Number.parseFloat(i);return n||s?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(e)+5;let o=!1;const r=({target:i})=>{i===e&&(o=!0,e.removeEventListener("transitionend",r),g(t))};e.addEventListener("transitionend",r),setTimeout(()=>{o||n(e)},s)},b=(t,e,i,n)=>{let s=t.indexOf(e);if(-1===s)return t[!i&&n?t.length-1:0];const o=t.length;return s+=i?1:-1,n&&(s=(s+o)%o),t[Math.max(0,Math.min(s,o-1))]},v=/[^.]*(?=\..*)\.|.*/,y=/\..*/,w=/::\d+$/,E={};let A=1;const T={mouseenter:"mouseover",mouseleave:"mouseout"},O=/^(mouseenter|mouseleave)/i,C=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function k(t,e){return e&&`${e}::${A++}`||t.uidEvent||A++}function L(t){const e=k(t);return t.uidEvent=e,E[e]=E[e]||{},E[e]}function x(t,e,i=null){const n=Object.keys(t);for(let s=0,o=n.length;s<o;s++){const o=t[n[s]];if(o.originalHandler===e&&o.delegationSelector===i)return o}return null}function D(t,e,i){const n="string"==typeof e,s=n?i:e;let o=I(t);return C.has(o)||(o=t),[n,s,o]}function S(t,e,i,n,s){if("string"!=typeof e||!t)return;if(i||(i=n,n=null),O.test(e)){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};n?n=t(n):i=t(i)}const[o,r,a]=D(e,i,n),l=L(t),c=l[a]||(l[a]={}),h=x(c,r,o?i:null);if(h)return void(h.oneOff=h.oneOff&&s);const d=k(r,e.replace(v,"")),u=o?function(t,e,i){return function n(s){const o=t.querySelectorAll(e);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(let a=o.length;a--;)if(o[a]===r)return s.delegateTarget=r,n.oneOff&&P.off(t,s.type,e,i),i.apply(r,[s]);return null}}(t,i,n):function(t,e){return function i(n){return n.delegateTarget=t,i.oneOff&&P.off(t,n.type,e),e.apply(t,[n])}}(t,i);u.delegationSelector=o?i:null,u.originalHandler=r,u.oneOff=s,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o)}function N(t,e,i,n,s){const o=x(e[i],n,s);o&&(t.removeEventListener(i,o,Boolean(s)),delete e[i][o.uidEvent])}function I(t){return t=t.replace(y,""),T[t]||t}const P={on(t,e,i,n){S(t,e,i,n,!1)},one(t,e,i,n){S(t,e,i,n,!0)},off(t,e,i,n){if("string"!=typeof e||!t)return;const[s,o,r]=D(e,i,n),a=r!==e,l=L(t),c=e.startsWith(".");if(void 0!==o){if(!l||!l[r])return;return void N(t,l,r,o,s?i:null)}c&&Object.keys(l).forEach(i=>{!function(t,e,i,n){const s=e[i]||{};Object.keys(s).forEach(o=>{if(o.includes(n)){const n=s[o];N(t,e,i,n.originalHandler,n.delegationSelector)}})}(t,l,i,e.slice(1))});const h=l[r]||{};Object.keys(h).forEach(i=>{const n=i.replace(w,"");if(!a||e.includes(n)){const e=h[i];N(t,l,r,e.originalHandler,e.delegationSelector)}})},trigger(t,e,i){if("string"!=typeof e||!t)return null;const n=u(),s=I(e),o=e!==s,r=C.has(s);let a,l=!0,c=!0,h=!1,d=null;return o&&n&&(a=n.Event(e,i),n(t).trigger(a),l=!a.isPropagationStopped(),c=!a.isImmediatePropagationStopped(),h=a.isDefaultPrevented()),r?(d=document.createEvent("HTMLEvents"),d.initEvent(s,l,!0)):d=new CustomEvent(e,{bubbles:l,cancelable:!0}),void 0!==i&&Object.keys(i).forEach(t=>{Object.defineProperty(d,t,{get:()=>i[t]})}),h&&d.preventDefault(),c&&t.dispatchEvent(d),d.defaultPrevented&&void 0!==a&&a.preventDefault(),d}},j=new Map;var M={set(t,e,i){j.has(t)||j.set(t,new Map);const n=j.get(t);n.has(e)||0===n.size?n.set(e,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)},get:(t,e)=>j.has(t)&&j.get(t).get(e)||null,remove(t,e){if(!j.has(t))return;const i=j.get(t);i.delete(e),0===i.size&&j.delete(t)}};class H{constructor(t){(t=o(t))&&(this._element=t,M.set(this._element,this.constructor.DATA_KEY,this))}dispose(){M.remove(this._element,this.constructor.DATA_KEY),P.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach(t=>{this[t]=null})}_queueCallback(t,e,i=!0){_(t,e,i)}static getInstance(t){return M.get(o(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.1.0"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return"bs."+this.NAME}static get EVENT_KEY(){return"."+this.DATA_KEY}}const B=(t,e="hide")=>{const n="click.dismiss"+t.EVENT_KEY,s=t.NAME;P.on(document,n,`[data-bs-dismiss="${s}"]`,(function(n){if(["A","AREA"].includes(this.tagName)&&n.preventDefault(),l(this))return;const o=i(this)||this.closest("."+s);t.getOrCreateInstance(o)[e]()}))};class R extends H{static get NAME(){return"alert"}close(){if(P.trigger(this._element,"close.bs.alert").defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback(()=>this._destroyElement(),this._element,t)}_destroyElement(){this._element.remove(),P.trigger(this._element,"closed.bs.alert"),this.dispose()}static jQueryInterface(t){return this.each((function(){const e=R.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}B(R,"close"),m(R);class W extends H{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each((function(){const e=W.getOrCreateInstance(this);"toggle"===t&&e[t]()}))}}function z(t){return"true"===t||"false"!==t&&(t===Number(t).toString()?Number(t):""===t||"null"===t?null:t)}function q(t){return t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase())}P.on(document,"click.bs.button.data-api",'[data-bs-toggle="button"]',t=>{t.preventDefault();const e=t.target.closest('[data-bs-toggle="button"]');W.getOrCreateInstance(e).toggle()}),m(W);const F={setDataAttribute(t,e,i){t.setAttribute("data-bs-"+q(e),i)},removeDataAttribute(t,e){t.removeAttribute("data-bs-"+q(e))},getDataAttributes(t){if(!t)return{};const e={};return Object.keys(t.dataset).filter(t=>t.startsWith("bs")).forEach(i=>{let n=i.replace(/^bs/,"");n=n.charAt(0).toLowerCase()+n.slice(1,n.length),e[n]=z(t.dataset[i])}),e},getDataAttribute:(t,e)=>z(t.getAttribute("data-bs-"+q(e))),offset(t){const e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},position:t=>({top:t.offsetTop,left:t.offsetLeft})},U={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter(t=>t.matches(e)),parents(t,e){const i=[];let n=t.parentNode;for(;n&&n.nodeType===Node.ELEMENT_NODE&&3!==n.nodeType;)n.matches(e)&&i.push(n),n=n.parentNode;return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(t=>t+':not([tabindex^="-"])').join(", ");return this.find(e,t).filter(t=>!l(t)&&a(t))}},$={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},V={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},K="next",X="prev",Y="left",Q="right",G={ArrowLeft:Q,ArrowRight:Y};class Z extends H{constructor(t,e){super(t),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._indicatorsElement=U.findOne(".carousel-indicators",this._element),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent),this._addEventListeners()}static get Default(){return $}static get NAME(){return"carousel"}next(){this._slide(K)}nextWhenVisible(){!document.hidden&&a(this._element)&&this.next()}prev(){this._slide(X)}pause(t){t||(this._isPaused=!0),U.findOne(".carousel-item-next, .carousel-item-prev",this._element)&&(n(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null}cycle(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config&&this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))}to(t){this._activeElement=U.findOne(".active.carousel-item",this._element);const e=this._getItemIndex(this._activeElement);if(t>this._items.length-1||t<0)return;if(this._isSliding)return void P.one(this._element,"slid.bs.carousel",()=>this.to(t));if(e===t)return this.pause(),void this.cycle();const i=t>e?K:X;this._slide(i,this._items[t])}_getConfig(t){return t={...$,...F.getDataAttributes(this._element),..."object"==typeof t?t:{}},r("carousel",t,V),t}_handleSwipe(){const t=Math.abs(this.touchDeltaX);if(t<=40)return;const e=t/this.touchDeltaX;this.touchDeltaX=0,e&&this._slide(e>0?Q:Y)}_addEventListeners(){this._config.keyboard&&P.on(this._element,"keydown.bs.carousel",t=>this._keydown(t)),"hover"===this._config.pause&&(P.on(this._element,"mouseenter.bs.carousel",t=>this.pause(t)),P.on(this._element,"mouseleave.bs.carousel",t=>this.cycle(t))),this._config.touch&&this._touchSupported&&this._addTouchEventListeners()}_addTouchEventListeners(){const t=t=>{!this._pointerEvent||"pen"!==t.pointerType&&"touch"!==t.pointerType?this._pointerEvent||(this.touchStartX=t.touches[0].clientX):this.touchStartX=t.clientX},e=t=>{this.touchDeltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this.touchStartX},i=t=>{!this._pointerEvent||"pen"!==t.pointerType&&"touch"!==t.pointerType||(this.touchDeltaX=t.clientX-this.touchStartX),this._handleSwipe(),"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(t=>this.cycle(t),500+this._config.interval))};U.find(".carousel-item img",this._element).forEach(t=>{P.on(t,"dragstart.bs.carousel",t=>t.preventDefault())}),this._pointerEvent?(P.on(this._element,"pointerdown.bs.carousel",e=>t(e)),P.on(this._element,"pointerup.bs.carousel",t=>i(t)),this._element.classList.add("pointer-event")):(P.on(this._element,"touchstart.bs.carousel",e=>t(e)),P.on(this._element,"touchmove.bs.carousel",t=>e(t)),P.on(this._element,"touchend.bs.carousel",t=>i(t)))}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=G[t.key];e&&(t.preventDefault(),this._slide(e))}_getItemIndex(t){return this._items=t&&t.parentNode?U.find(".carousel-item",t.parentNode):[],this._items.indexOf(t)}_getItemByOrder(t,e){const i=t===K;return b(this._items,e,i,this._config.wrap)}_triggerSlideEvent(t,e){const i=this._getItemIndex(t),n=this._getItemIndex(U.findOne(".active.carousel-item",this._element));return P.trigger(this._element,"slide.bs.carousel",{relatedTarget:t,direction:e,from:n,to:i})}_setActiveIndicatorElement(t){if(this._indicatorsElement){const e=U.findOne(".active",this._indicatorsElement);e.classList.remove("active"),e.removeAttribute("aria-current");const i=U.find("[data-bs-target]",this._indicatorsElement);for(let e=0;e<i.length;e++)if(Number.parseInt(i[e].getAttribute("data-bs-slide-to"),10)===this._getItemIndex(t)){i[e].classList.add("active"),i[e].setAttribute("aria-current","true");break}}}_updateInterval(){const t=this._activeElement||U.findOne(".active.carousel-item",this._element);if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}_slide(t,e){const i=this._directionToOrder(t),n=U.findOne(".active.carousel-item",this._element),s=this._getItemIndex(n),o=e||this._getItemByOrder(i,n),r=this._getItemIndex(o),a=Boolean(this._interval),l=i===K,c=l?"carousel-item-start":"carousel-item-end",h=l?"carousel-item-next":"carousel-item-prev",u=this._orderToDirection(i);if(o&&o.classList.contains("active"))return void(this._isSliding=!1);if(this._isSliding)return;if(this._triggerSlideEvent(o,u).defaultPrevented)return;if(!n||!o)return;this._isSliding=!0,a&&this.pause(),this._setActiveIndicatorElement(o),this._activeElement=o;const f=()=>{P.trigger(this._element,"slid.bs.carousel",{relatedTarget:o,direction:u,from:s,to:r})};if(this._element.classList.contains("slide")){o.classList.add(h),d(o),n.classList.add(c),o.classList.add(c);const t=()=>{o.classList.remove(c,h),o.classList.add("active"),n.classList.remove("active",h,c),this._isSliding=!1,setTimeout(f,0)};this._queueCallback(t,n,!0)}else n.classList.remove("active"),o.classList.add("active"),this._isSliding=!1,f();a&&this.cycle()}_directionToOrder(t){return[Q,Y].includes(t)?p()?t===Y?X:K:t===Y?K:X:t}_orderToDirection(t){return[K,X].includes(t)?p()?t===X?Y:Q:t===X?Q:Y:t}static carouselInterface(t,e){const i=Z.getOrCreateInstance(t,e);let{_config:n}=i;"object"==typeof e&&(n={...n,...e});const s="string"==typeof e?e:n.slide;if("number"==typeof e)i.to(e);else if("string"==typeof s){if(void 0===i[s])throw new TypeError(`No method named "${s}"`);i[s]()}else n.interval&&n.ride&&(i.pause(),i.cycle())}static jQueryInterface(t){return this.each((function(){Z.carouselInterface(this,t)}))}static dataApiClickHandler(t){const e=i(this);if(!e||!e.classList.contains("carousel"))return;const n={...F.getDataAttributes(e),...F.getDataAttributes(this)},s=this.getAttribute("data-bs-slide-to");s&&(n.interval=!1),Z.carouselInterface(e,n),s&&Z.getInstance(e).to(s),t.preventDefault()}}P.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",Z.dataApiClickHandler),P.on(window,"load.bs.carousel.data-api",()=>{const t=U.find('[data-bs-ride="carousel"]');for(let e=0,i=t.length;e<i;e++)Z.carouselInterface(t[e],Z.getInstance(t[e]))}),m(Z);const J={toggle:!0,parent:null},tt={toggle:"boolean",parent:"(null|element)"};class et extends H{constructor(t,i){super(t),this._isTransitioning=!1,this._config=this._getConfig(i),this._triggerArray=[];const n=U.find('[data-bs-toggle="collapse"]');for(let t=0,i=n.length;t<i;t++){const i=n[t],s=e(i),o=U.find(s).filter(t=>t===this._element);null!==s&&o.length&&(this._selector=s,this._triggerArray.push(i))}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return J}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t,e=[];if(this._config.parent){const t=U.find(".collapse .collapse",this._config.parent);e=U.find(".show, .collapsing",this._config.parent).filter(e=>!t.includes(e))}const i=U.findOne(this._selector);if(e.length){const n=e.find(t=>i!==t);if(t=n?et.getInstance(n):null,t&&t._isTransitioning)return}if(P.trigger(this._element,"show.bs.collapse").defaultPrevented)return;e.forEach(e=>{i!==e&&et.getOrCreateInstance(e,{toggle:!1}).hide(),t||M.set(e,"bs.collapse",null)});const n=this._getDimension();this._element.classList.remove("collapse"),this._element.classList.add("collapsing"),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const s="scroll"+(n[0].toUpperCase()+n.slice(1));this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove("collapsing"),this._element.classList.add("collapse","show"),this._element.style[n]="",P.trigger(this._element,"shown.bs.collapse")},this._element,!0),this._element.style[n]=this._element[s]+"px"}hide(){if(this._isTransitioning||!this._isShown())return;if(P.trigger(this._element,"hide.bs.collapse").defaultPrevented)return;const t=this._getDimension();this._element.style[t]=this._element.getBoundingClientRect()[t]+"px",d(this._element),this._element.classList.add("collapsing"),this._element.classList.remove("collapse","show");const e=this._triggerArray.length;for(let t=0;t<e;t++){const e=this._triggerArray[t],n=i(e);n&&!this._isShown(n)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove("collapsing"),this._element.classList.add("collapse"),P.trigger(this._element,"hidden.bs.collapse")},this._element,!0)}_isShown(t=this._element){return t.classList.contains("show")}_getConfig(t){return(t={...J,...F.getDataAttributes(this._element),...t}).toggle=Boolean(t.toggle),t.parent=o(t.parent),r("collapse",t,tt),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=U.find(".collapse .collapse",this._config.parent);U.find('[data-bs-toggle="collapse"]',this._config.parent).filter(e=>!t.includes(e)).forEach(t=>{const e=i(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))})}_addAriaAndCollapsedClass(t,e){t.length&&t.forEach(t=>{e?t.classList.remove("collapsed"):t.classList.add("collapsed"),t.setAttribute("aria-expanded",e)})}static jQueryInterface(t){return this.each((function(){const e={};"string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1);const i=et.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]()}}))}}P.on(document,"click.bs.collapse.data-api",'[data-bs-toggle="collapse"]',(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();const i=e(this);U.find(i).forEach(t=>{et.getOrCreateInstance(t,{toggle:!1}).toggle()})})),m(et);var it="top",nt="bottom",st="right",ot="left",rt=[it,nt,st,ot],at=rt.reduce((function(t,e){return t.concat([e+"-start",e+"-end"])}),[]),lt=[].concat(rt,["auto"]).reduce((function(t,e){return t.concat([e,e+"-start",e+"-end"])}),[]),ct=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function ht(t){return t?(t.nodeName||"").toLowerCase():null}function dt(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function ut(t){return t instanceof dt(t).Element||t instanceof Element}function ft(t){return t instanceof dt(t).HTMLElement||t instanceof HTMLElement}function pt(t){return"undefined"!=typeof ShadowRoot&&(t instanceof dt(t).ShadowRoot||t instanceof ShadowRoot)}var mt={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var i=e.styles[t]||{},n=e.attributes[t]||{},s=e.elements[t];ft(s)&&ht(s)&&(Object.assign(s.style,i),Object.keys(n).forEach((function(t){var e=n[t];!1===e?s.removeAttribute(t):s.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,i={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,i.popper),e.styles=i,e.elements.arrow&&Object.assign(e.elements.arrow.style,i.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],s=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:i[t]).reduce((function(t,e){return t[e]="",t}),{});ft(n)&&ht(n)&&(Object.assign(n.style,o),Object.keys(s).forEach((function(t){n.removeAttribute(t)})))}))}},requires:["computeStyles"]};function gt(t){return t.split("-")[0]}var _t=Math.round;function bt(t,e){void 0===e&&(e=!1);var i=t.getBoundingClientRect(),n=1,s=1;return ft(t)&&e&&(n=i.width/t.offsetWidth||1,s=i.height/t.offsetHeight||1),{width:_t(i.width/n),height:_t(i.height/s),top:_t(i.top/s),right:_t(i.right/n),bottom:_t(i.bottom/s),left:_t(i.left/n),x:_t(i.left/n),y:_t(i.top/s)}}function vt(t){var e=bt(t),i=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-i)<=1&&(i=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:i,height:n}}function yt(t,e){var i=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(i&&pt(i)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function wt(t){return dt(t).getComputedStyle(t)}function Et(t){return["table","td","th"].indexOf(ht(t))>=0}function At(t){return((ut(t)?t.ownerDocument:t.document)||window.document).documentElement}function Tt(t){return"html"===ht(t)?t:t.assignedSlot||t.parentNode||(pt(t)?t.host:null)||At(t)}function Ot(t){return ft(t)&&"fixed"!==wt(t).position?t.offsetParent:null}function Ct(t){for(var e=dt(t),i=Ot(t);i&&Et(i)&&"static"===wt(i).position;)i=Ot(i);return i&&("html"===ht(i)||"body"===ht(i)&&"static"===wt(i).position)?e:i||function(t){var e=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&ft(t)&&"fixed"===wt(t).position)return null;for(var i=Tt(t);ft(i)&&["html","body"].indexOf(ht(i))<0;){var n=wt(i);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return i;i=i.parentNode}return null}(t)||e}function kt(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}var Lt=Math.max,xt=Math.min,Dt=Math.round;function St(t,e,i){return Lt(t,xt(e,i))}function Nt(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function It(t,e){return e.reduce((function(e,i){return e[i]=t,e}),{})}var Pt={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,i=t.state,n=t.name,s=t.options,o=i.elements.arrow,r=i.modifiersData.popperOffsets,a=gt(i.placement),l=kt(a),c=[ot,st].indexOf(a)>=0?"height":"width";if(o&&r){var h=function(t,e){return Nt("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:It(t,rt))}(s.padding,i),d=vt(o),u="y"===l?it:ot,f="y"===l?nt:st,p=i.rects.reference[c]+i.rects.reference[l]-r[l]-i.rects.popper[c],m=r[l]-i.rects.reference[l],g=Ct(o),_=g?"y"===l?g.clientHeight||0:g.clientWidth||0:0,b=p/2-m/2,v=h[u],y=_-d[c]-h[f],w=_/2-d[c]/2+b,E=St(v,w,y),A=l;i.modifiersData[n]=((e={})[A]=E,e.centerOffset=E-w,e)}},effect:function(t){var e=t.state,i=t.options.element,n=void 0===i?"[data-popper-arrow]":i;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&yt(e.elements.popper,n)&&(e.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},jt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Mt(t){var e,i=t.popper,n=t.popperRect,s=t.placement,o=t.offsets,r=t.position,a=t.gpuAcceleration,l=t.adaptive,c=t.roundOffsets,h=!0===c?function(t){var e=t.x,i=t.y,n=window.devicePixelRatio||1;return{x:Dt(Dt(e*n)/n)||0,y:Dt(Dt(i*n)/n)||0}}(o):"function"==typeof c?c(o):o,d=h.x,u=void 0===d?0:d,f=h.y,p=void 0===f?0:f,m=o.hasOwnProperty("x"),g=o.hasOwnProperty("y"),_=ot,b=it,v=window;if(l){var y=Ct(i),w="clientHeight",E="clientWidth";y===dt(i)&&"static"!==wt(y=At(i)).position&&(w="scrollHeight",E="scrollWidth"),y=y,s===it&&(b=nt,p-=y[w]-n.height,p*=a?1:-1),s===ot&&(_=st,u-=y[E]-n.width,u*=a?1:-1)}var A,T=Object.assign({position:r},l&&jt);return a?Object.assign({},T,((A={})[b]=g?"0":"",A[_]=m?"0":"",A.transform=(v.devicePixelRatio||1)<2?"translate("+u+"px, "+p+"px)":"translate3d("+u+"px, "+p+"px, 0)",A)):Object.assign({},T,((e={})[b]=g?p+"px":"",e[_]=m?u+"px":"",e.transform="",e))}var Ht={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,i=t.options,n=i.gpuAcceleration,s=void 0===n||n,o=i.adaptive,r=void 0===o||o,a=i.roundOffsets,l=void 0===a||a,c={placement:gt(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,Mt(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:r,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,Mt(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}},Bt={passive:!0},Rt={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,s=n.scroll,o=void 0===s||s,r=n.resize,a=void 0===r||r,l=dt(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach((function(t){t.addEventListener("scroll",i.update,Bt)})),a&&l.addEventListener("resize",i.update,Bt),function(){o&&c.forEach((function(t){t.removeEventListener("scroll",i.update,Bt)})),a&&l.removeEventListener("resize",i.update,Bt)}},data:{}},Wt={left:"right",right:"left",bottom:"top",top:"bottom"};function zt(t){return t.replace(/left|right|bottom|top/g,(function(t){return Wt[t]}))}var qt={start:"end",end:"start"};function Ft(t){return t.replace(/start|end/g,(function(t){return qt[t]}))}function Ut(t){var e=dt(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function $t(t){return bt(At(t)).left+Ut(t).scrollLeft}function Vt(t){var e=wt(t),i=e.overflow,n=e.overflowX,s=e.overflowY;return/auto|scroll|overlay|hidden/.test(i+s+n)}function Kt(t,e){var i;void 0===e&&(e=[]);var n=function t(e){return["html","body","#document"].indexOf(ht(e))>=0?e.ownerDocument.body:ft(e)&&Vt(e)?e:t(Tt(e))}(t),s=n===(null==(i=t.ownerDocument)?void 0:i.body),o=dt(n),r=s?[o].concat(o.visualViewport||[],Vt(n)?n:[]):n,a=e.concat(r);return s?a:a.concat(Kt(Tt(r)))}function Xt(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Yt(t,e){return"viewport"===e?Xt(function(t){var e=dt(t),i=At(t),n=e.visualViewport,s=i.clientWidth,o=i.clientHeight,r=0,a=0;return n&&(s=n.width,o=n.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(r=n.offsetLeft,a=n.offsetTop)),{width:s,height:o,x:r+$t(t),y:a}}(t)):ft(e)?function(t){var e=bt(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}(e):Xt(function(t){var e,i=At(t),n=Ut(t),s=null==(e=t.ownerDocument)?void 0:e.body,o=Lt(i.scrollWidth,i.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),r=Lt(i.scrollHeight,i.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),a=-n.scrollLeft+$t(t),l=-n.scrollTop;return"rtl"===wt(s||i).direction&&(a+=Lt(i.clientWidth,s?s.clientWidth:0)-o),{width:o,height:r,x:a,y:l}}(At(t)))}function Qt(t){return t.split("-")[1]}function Gt(t){var e,i=t.reference,n=t.element,s=t.placement,o=s?gt(s):null,r=s?Qt(s):null,a=i.x+i.width/2-n.width/2,l=i.y+i.height/2-n.height/2;switch(o){case it:e={x:a,y:i.y-n.height};break;case nt:e={x:a,y:i.y+i.height};break;case st:e={x:i.x+i.width,y:l};break;case ot:e={x:i.x-n.width,y:l};break;default:e={x:i.x,y:i.y}}var c=o?kt(o):null;if(null!=c){var h="y"===c?"height":"width";switch(r){case"start":e[c]=e[c]-(i[h]/2-n[h]/2);break;case"end":e[c]=e[c]+(i[h]/2-n[h]/2)}}return e}function Zt(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=void 0===n?t.placement:n,o=i.boundary,r=void 0===o?"clippingParents":o,a=i.rootBoundary,l=void 0===a?"viewport":a,c=i.elementContext,h=void 0===c?"popper":c,d=i.altBoundary,u=void 0!==d&&d,f=i.padding,p=void 0===f?0:f,m=Nt("number"!=typeof p?p:It(p,rt)),g="popper"===h?"reference":"popper",_=t.elements.reference,b=t.rects.popper,v=t.elements[u?g:h],y=function(t,e,i){var n="clippingParents"===e?function(t){var e=Kt(Tt(t)),i=["absolute","fixed"].indexOf(wt(t).position)>=0&&ft(t)?Ct(t):t;return ut(i)?e.filter((function(t){return ut(t)&&yt(t,i)&&"body"!==ht(t)})):[]}(t):[].concat(e),s=[].concat(n,[i]),o=s[0],r=s.reduce((function(e,i){var n=Yt(t,i);return e.top=Lt(n.top,e.top),e.right=xt(n.right,e.right),e.bottom=xt(n.bottom,e.bottom),e.left=Lt(n.left,e.left),e}),Yt(t,o));return r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}(ut(v)?v:v.contextElement||At(t.elements.popper),r,l),w=bt(_),E=Gt({reference:w,element:b,strategy:"absolute",placement:s}),A=Xt(Object.assign({},b,E)),T="popper"===h?A:w,O={top:y.top-T.top+m.top,bottom:T.bottom-y.bottom+m.bottom,left:y.left-T.left+m.left,right:T.right-y.right+m.right},C=t.modifiersData.offset;if("popper"===h&&C){var k=C[s];Object.keys(O).forEach((function(t){var e=[st,nt].indexOf(t)>=0?1:-1,i=[it,nt].indexOf(t)>=0?"y":"x";O[t]+=k[i]*e}))}return O}function Jt(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=i.boundary,o=i.rootBoundary,r=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?lt:l,h=Qt(n),d=h?a?at:at.filter((function(t){return Qt(t)===h})):rt,u=d.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=d);var f=u.reduce((function(e,i){return e[i]=Zt(t,{placement:i,boundary:s,rootBoundary:o,padding:r})[gt(i)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}var te={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0===r||r,l=i.fallbackPlacements,c=i.padding,h=i.boundary,d=i.rootBoundary,u=i.altBoundary,f=i.flipVariations,p=void 0===f||f,m=i.allowedAutoPlacements,g=e.options.placement,_=gt(g),b=l||(_!==g&&p?function(t){if("auto"===gt(t))return[];var e=zt(t);return[Ft(t),e,Ft(e)]}(g):[zt(g)]),v=[g].concat(b).reduce((function(t,i){return t.concat("auto"===gt(i)?Jt(e,{placement:i,boundary:h,rootBoundary:d,padding:c,flipVariations:p,allowedAutoPlacements:m}):i)}),[]),y=e.rects.reference,w=e.rects.popper,E=new Map,A=!0,T=v[0],O=0;O<v.length;O++){var C=v[O],k=gt(C),L="start"===Qt(C),x=[it,nt].indexOf(k)>=0,D=x?"width":"height",S=Zt(e,{placement:C,boundary:h,rootBoundary:d,altBoundary:u,padding:c}),N=x?L?st:ot:L?nt:it;y[D]>w[D]&&(N=zt(N));var I=zt(N),P=[];if(o&&P.push(S[k]<=0),a&&P.push(S[N]<=0,S[I]<=0),P.every((function(t){return t}))){T=C,A=!1;break}E.set(C,P)}if(A)for(var j=function(t){var e=v.find((function(e){var i=E.get(e);if(i)return i.slice(0,t).every((function(t){return t}))}));if(e)return T=e,"break"},M=p?3:1;M>0&&"break"!==j(M);M--);e.placement!==T&&(e.modifiersData[n]._skip=!0,e.placement=T,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function ee(t,e,i){return void 0===i&&(i={x:0,y:0}),{top:t.top-e.height-i.y,right:t.right-e.width+i.x,bottom:t.bottom-e.height+i.y,left:t.left-e.width-i.x}}function ie(t){return[it,st,nt,ot].some((function(e){return t[e]>=0}))}var ne={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,i=t.name,n=e.rects.reference,s=e.rects.popper,o=e.modifiersData.preventOverflow,r=Zt(e,{elementContext:"reference"}),a=Zt(e,{altBoundary:!0}),l=ee(r,n),c=ee(a,s,o),h=ie(l),d=ie(c);e.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:h,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":d})}},se={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.offset,o=void 0===s?[0,0]:s,r=lt.reduce((function(t,i){return t[i]=function(t,e,i){var n=gt(t),s=[ot,it].indexOf(n)>=0?-1:1,o="function"==typeof i?i(Object.assign({},e,{placement:t})):i,r=o[0],a=o[1];return r=r||0,a=(a||0)*s,[ot,st].indexOf(n)>=0?{x:a,y:r}:{x:r,y:a}}(i,e.rects,o),t}),{}),a=r[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=r}},oe={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,i=t.name;e.modifiersData[i]=Gt({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},re={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0!==r&&r,l=i.boundary,c=i.rootBoundary,h=i.altBoundary,d=i.padding,u=i.tether,f=void 0===u||u,p=i.tetherOffset,m=void 0===p?0:p,g=Zt(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:h}),_=gt(e.placement),b=Qt(e.placement),v=!b,y=kt(_),w="x"===y?"y":"x",E=e.modifiersData.popperOffsets,A=e.rects.reference,T=e.rects.popper,O="function"==typeof m?m(Object.assign({},e.rects,{placement:e.placement})):m,C={x:0,y:0};if(E){if(o||a){var k="y"===y?it:ot,L="y"===y?nt:st,x="y"===y?"height":"width",D=E[y],S=E[y]+g[k],N=E[y]-g[L],I=f?-T[x]/2:0,P="start"===b?A[x]:T[x],j="start"===b?-T[x]:-A[x],M=e.elements.arrow,H=f&&M?vt(M):{width:0,height:0},B=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},R=B[k],W=B[L],z=St(0,A[x],H[x]),q=v?A[x]/2-I-z-R-O:P-z-R-O,F=v?-A[x]/2+I+z+W+O:j+z+W+O,U=e.elements.arrow&&Ct(e.elements.arrow),$=U?"y"===y?U.clientTop||0:U.clientLeft||0:0,V=e.modifiersData.offset?e.modifiersData.offset[e.placement][y]:0,K=E[y]+q-V-$,X=E[y]+F-V;if(o){var Y=St(f?xt(S,K):S,D,f?Lt(N,X):N);E[y]=Y,C[y]=Y-D}if(a){var Q="x"===y?it:ot,G="x"===y?nt:st,Z=E[w],J=Z+g[Q],tt=Z-g[G],et=St(f?xt(J,K):J,Z,f?Lt(tt,X):tt);E[w]=et,C[w]=et-Z}}e.modifiersData[n]=C}},requiresIfExists:["offset"]};function ae(t,e,i){void 0===i&&(i=!1);var n,s,o=ft(e),r=ft(e)&&function(t){var e=t.getBoundingClientRect(),i=e.width/t.offsetWidth||1,n=e.height/t.offsetHeight||1;return 1!==i||1!==n}(e),a=At(e),l=bt(t,r),c={scrollLeft:0,scrollTop:0},h={x:0,y:0};return(o||!o&&!i)&&(("body"!==ht(e)||Vt(a))&&(c=(n=e)!==dt(n)&&ft(n)?{scrollLeft:(s=n).scrollLeft,scrollTop:s.scrollTop}:Ut(n)),ft(e)?((h=bt(e,!0)).x+=e.clientLeft,h.y+=e.clientTop):a&&(h.x=$t(a))),{x:l.left+c.scrollLeft-h.x,y:l.top+c.scrollTop-h.y,width:l.width,height:l.height}}var le={placement:"bottom",modifiers:[],strategy:"absolute"};function ce(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function he(t){void 0===t&&(t={});var e=t,i=e.defaultModifiers,n=void 0===i?[]:i,s=e.defaultOptions,o=void 0===s?le:s;return function(t,e,i){void 0===i&&(i=o);var s,r,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},le,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,h={state:a,setOptions:function(i){d(),a.options=Object.assign({},o,a.options,i),a.scrollParents={reference:ut(t)?Kt(t):t.contextElement?Kt(t.contextElement):[],popper:Kt(e)};var s,r,c=function(t){var e=function(t){var e=new Map,i=new Set,n=[];return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){i.has(t.name)||function t(s){i.add(s.name),[].concat(s.requires||[],s.requiresIfExists||[]).forEach((function(n){if(!i.has(n)){var s=e.get(n);s&&t(s)}})),n.push(s)}(t)})),n}(t);return ct.reduce((function(t,i){return t.concat(e.filter((function(t){return t.phase===i})))}),[])}((s=[].concat(n,a.options.modifiers),r=s.reduce((function(t,e){var i=t[e.name];return t[e.name]=i?Object.assign({},i,e,{options:Object.assign({},i.options,e.options),data:Object.assign({},i.data,e.data)}):e,t}),{}),Object.keys(r).map((function(t){return r[t]}))));return a.orderedModifiers=c.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,i=t.options,n=void 0===i?{}:i,s=t.effect;if("function"==typeof s){var o=s({state:a,name:e,instance:h,options:n});l.push(o||function(){})}})),h.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,i=t.popper;if(ce(e,i)){a.rects={reference:ae(e,Ct(i),"fixed"===a.options.strategy),popper:vt(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<a.orderedModifiers.length;n++)if(!0!==a.reset){var s=a.orderedModifiers[n],o=s.fn,r=s.options,l=void 0===r?{}:r,d=s.name;"function"==typeof o&&(a=o({state:a,options:l,name:d,instance:h})||a)}else a.reset=!1,n=-1}}},update:(s=function(){return new Promise((function(t){h.forceUpdate(),t(a)}))},function(){return r||(r=new Promise((function(t){Promise.resolve().then((function(){r=void 0,t(s())}))}))),r}),destroy:function(){d(),c=!0}};if(!ce(t,e))return h;function d(){l.forEach((function(t){return t()})),l=[]}return h.setOptions(i).then((function(t){!c&&i.onFirstUpdate&&i.onFirstUpdate(t)})),h}}var de=he(),ue=he({defaultModifiers:[Rt,oe,Ht,mt]}),fe=he({defaultModifiers:[Rt,oe,Ht,mt,se,te,re,Pt,ne]}),pe=Object.freeze({__proto__:null,popperGenerator:he,detectOverflow:Zt,createPopperBase:de,createPopper:fe,createPopperLite:ue,top:it,bottom:nt,right:st,left:ot,auto:"auto",basePlacements:rt,start:"start",end:"end",clippingParents:"clippingParents",viewport:"viewport",popper:"popper",reference:"reference",variationPlacements:at,placements:lt,beforeRead:"beforeRead",read:"read",afterRead:"afterRead",beforeMain:"beforeMain",main:"main",afterMain:"afterMain",beforeWrite:"beforeWrite",write:"write",afterWrite:"afterWrite",modifierPhases:ct,applyStyles:mt,arrow:Pt,computeStyles:Ht,eventListeners:Rt,flip:te,hide:ne,offset:se,popperOffsets:oe,preventOverflow:re});const me=new RegExp("ArrowUp|ArrowDown|Escape"),ge=p()?"top-end":"top-start",_e=p()?"top-start":"top-end",be=p()?"bottom-end":"bottom-start",ve=p()?"bottom-start":"bottom-end",ye=p()?"left-start":"right-start",we=p()?"right-start":"left-start",Ee={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},Ae={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"};class Te extends H{constructor(t,e){super(t),this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar()}static get Default(){return Ee}static get DefaultType(){return Ae}static get NAME(){return"dropdown"}toggle(){return this._isShown()?this.hide():this.show()}show(){if(l(this._element)||this._isShown(this._menu))return;const t={relatedTarget:this._element};if(P.trigger(this._element,"show.bs.dropdown",t).defaultPrevented)return;const e=Te.getParentFromElement(this._element);this._inNavbar?F.setDataAttribute(this._menu,"popper","none"):this._createPopper(e),"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&[].concat(...document.body.children).forEach(t=>P.on(t,"mouseover",h)),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add("show"),this._element.classList.add("show"),P.trigger(this._element,"shown.bs.dropdown",t)}hide(){if(l(this._element)||!this._isShown(this._menu))return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){P.trigger(this._element,"hide.bs.dropdown",t).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach(t=>P.off(t,"mouseover",h)),this._popper&&this._popper.destroy(),this._menu.classList.remove("show"),this._element.classList.remove("show"),this._element.setAttribute("aria-expanded","false"),F.removeDataAttribute(this._menu,"popper"),P.trigger(this._element,"hidden.bs.dropdown",t))}_getConfig(t){if(t={...this.constructor.Default,...F.getDataAttributes(this._element),...t},r("dropdown",t,this.constructor.DefaultType),"object"==typeof t.reference&&!s(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError("dropdown".toUpperCase()+': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');return t}_createPopper(t){if(void 0===pe)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let e=this._element;"parent"===this._config.reference?e=t:s(this._config.reference)?e=o(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference);const i=this._getPopperConfig(),n=i.modifiers.find(t=>"applyStyles"===t.name&&!1===t.enabled);this._popper=fe(e,this._menu,i),n&&F.setDataAttribute(this._menu,"popper","static")}_isShown(t=this._element){return t.classList.contains("show")}_getMenuElement(){return U.next(this._element,".dropdown-menu")[0]}_getPlacement(){const t=this._element.parentNode;if(t.classList.contains("dropend"))return ye;if(t.classList.contains("dropstart"))return we;const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?_e:ge:e?ve:be}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map(t=>Number.parseInt(t,10)):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return"static"===this._config.display&&(t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,..."function"==typeof this._config.popperConfig?this._config.popperConfig(t):this._config.popperConfig}}_selectMenuItem({key:t,target:e}){const i=U.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(a);i.length&&b(i,e,"ArrowDown"===t,!i.includes(e)).focus()}static jQueryInterface(t){return this.each((function(){const e=Te.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}static clearMenus(t){if(t&&(2===t.button||"keyup"===t.type&&"Tab"!==t.key))return;const e=U.find('[data-bs-toggle="dropdown"]');for(let i=0,n=e.length;i<n;i++){const n=Te.getInstance(e[i]);if(!n||!1===n._config.autoClose)continue;if(!n._isShown())continue;const s={relatedTarget:n._element};if(t){const e=t.composedPath(),i=e.includes(n._menu);if(e.includes(n._element)||"inside"===n._config.autoClose&&!i||"outside"===n._config.autoClose&&i)continue;if(n._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;"click"===t.type&&(s.clickEvent=t)}n._completeHide(s)}}static getParentFromElement(t){return i(t)||t.parentNode}static dataApiKeydownHandler(t){if(/input|textarea/i.test(t.target.tagName)?"Space"===t.key||"Escape"!==t.key&&("ArrowDown"!==t.key&&"ArrowUp"!==t.key||t.target.closest(".dropdown-menu")):!me.test(t.key))return;const e=this.classList.contains("show");if(!e&&"Escape"===t.key)return;if(t.preventDefault(),t.stopPropagation(),l(this))return;const i=this.matches('[data-bs-toggle="dropdown"]')?this:U.prev(this,'[data-bs-toggle="dropdown"]')[0],n=Te.getOrCreateInstance(i);if("Escape"!==t.key)return"ArrowUp"===t.key||"ArrowDown"===t.key?(e||n.show(),void n._selectMenuItem(t)):void(e&&"Space"!==t.key||Te.clearMenus());n.hide()}}P.on(document,"keydown.bs.dropdown.data-api",'[data-bs-toggle="dropdown"]',Te.dataApiKeydownHandler),P.on(document,"keydown.bs.dropdown.data-api",".dropdown-menu",Te.dataApiKeydownHandler),P.on(document,"click.bs.dropdown.data-api",Te.clearMenus),P.on(document,"keyup.bs.dropdown.data-api",Te.clearMenus),P.on(document,"click.bs.dropdown.data-api",'[data-bs-toggle="dropdown"]',(function(t){t.preventDefault(),Te.getOrCreateInstance(this).toggle()})),m(Te);class Oe{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,"paddingRight",e=>e+t),this._setElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top","paddingRight",e=>e+t),this._setElementAttributes(".sticky-top","marginRight",e=>e-t)}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const n=this.getWidth();this._applyManipulationCallback(t,t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+n)return;this._saveInitialAttribute(t,e);const s=window.getComputedStyle(t)[e];t.style[e]=i(Number.parseFloat(s))+"px"})}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,"paddingRight"),this._resetElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top","paddingRight"),this._resetElementAttributes(".sticky-top","marginRight")}_saveInitialAttribute(t,e){const i=t.style[e];i&&F.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,t=>{const i=F.getDataAttribute(t,e);void 0===i?t.style.removeProperty(e):(F.removeDataAttribute(t,e),t.style[e]=i)})}_applyManipulationCallback(t,e){s(t)?e(t):U.find(t,this._element).forEach(e)}isOverflowing(){return this.getWidth()>0}}const Ce={className:"modal-backdrop",isVisible:!0,isAnimated:!1,rootElement:"body",clickCallback:null},ke={className:"string",isVisible:"boolean",isAnimated:"boolean",rootElement:"(element|string)",clickCallback:"(function|null)"};class Le{constructor(t){this._config=this._getConfig(t),this._isAppended=!1,this._element=null}show(t){this._config.isVisible?(this._append(),this._config.isAnimated&&d(this._getElement()),this._getElement().classList.add("show"),this._emulateAnimation(()=>{g(t)})):g(t)}hide(t){this._config.isVisible?(this._getElement().classList.remove("show"),this._emulateAnimation(()=>{this.dispose(),g(t)})):g(t)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_getConfig(t){return(t={...Ce,..."object"==typeof t?t:{}}).rootElement=o(t.rootElement),r("backdrop",t,ke),t}_append(){this._isAppended||(this._config.rootElement.append(this._getElement()),P.on(this._getElement(),"mousedown.bs.backdrop",()=>{g(this._config.clickCallback)}),this._isAppended=!0)}dispose(){this._isAppended&&(P.off(this._element,"mousedown.bs.backdrop"),this._element.remove(),this._isAppended=!1)}_emulateAnimation(t){_(t,this._getElement(),this._config.isAnimated)}}const xe={trapElement:null,autofocus:!0},De={trapElement:"element",autofocus:"boolean"};class Se{constructor(t){this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}activate(){const{trapElement:t,autofocus:e}=this._config;this._isActive||(e&&t.focus(),P.off(document,".bs.focustrap"),P.on(document,"focusin.bs.focustrap",t=>this._handleFocusin(t)),P.on(document,"keydown.tab.bs.focustrap",t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,P.off(document,".bs.focustrap"))}_handleFocusin(t){const{target:e}=t,{trapElement:i}=this._config;if(e===document||e===i||i.contains(e))return;const n=U.focusableChildren(i);0===n.length?i.focus():"backward"===this._lastTabNavDirection?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?"backward":"forward")}_getConfig(t){return t={...xe,..."object"==typeof t?t:{}},r("focustrap",t,De),t}}const Ne={backdrop:!0,keyboard:!0,focus:!0},Ie={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean"};class Pe extends H{constructor(t,e){super(t),this._config=this._getConfig(e),this._dialog=U.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollBar=new Oe}static get Default(){return Ne}static get NAME(){return"modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||P.trigger(this._element,"show.bs.modal",{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isAnimated()&&(this._isTransitioning=!0),this._scrollBar.hide(),document.body.classList.add("modal-open"),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),P.on(this._dialog,"mousedown.dismiss.bs.modal",()=>{P.one(this._element,"mouseup.dismiss.bs.modal",t=>{t.target===this._element&&(this._ignoreBackdropClick=!0)})}),this._showBackdrop(()=>this._showElement(t)))}hide(){if(!this._isShown||this._isTransitioning)return;if(P.trigger(this._element,"hide.bs.modal").defaultPrevented)return;this._isShown=!1;const t=this._isAnimated();t&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),this._focustrap.deactivate(),this._element.classList.remove("show"),P.off(this._element,"click.dismiss.bs.modal"),P.off(this._dialog,"mousedown.dismiss.bs.modal"),this._queueCallback(()=>this._hideModal(),this._element,t)}dispose(){[window,this._dialog].forEach(t=>P.off(t,".bs.modal")),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Le({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Se({trapElement:this._element})}_getConfig(t){return t={...Ne,...F.getDataAttributes(this._element),..."object"==typeof t?t:{}},r("modal",t,Ie),t}_showElement(t){const e=this._isAnimated(),i=U.findOne(".modal-body",this._dialog);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0,i&&(i.scrollTop=0),e&&d(this._element),this._element.classList.add("show"),this._queueCallback(()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,P.trigger(this._element,"shown.bs.modal",{relatedTarget:t})},this._dialog,e)}_setEscapeEvent(){this._isShown?P.on(this._element,"keydown.dismiss.bs.modal",t=>{this._config.keyboard&&"Escape"===t.key?(t.preventDefault(),this.hide()):this._config.keyboard||"Escape"!==t.key||this._triggerBackdropTransition()}):P.off(this._element,"keydown.dismiss.bs.modal")}_setResizeEvent(){this._isShown?P.on(window,"resize.bs.modal",()=>this._adjustDialog()):P.off(window,"resize.bs.modal")}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove("modal-open"),this._resetAdjustments(),this._scrollBar.reset(),P.trigger(this._element,"hidden.bs.modal")})}_showBackdrop(t){P.on(this._element,"click.dismiss.bs.modal",t=>{this._ignoreBackdropClick?this._ignoreBackdropClick=!1:t.target===t.currentTarget&&(!0===this._config.backdrop?this.hide():"static"===this._config.backdrop&&this._triggerBackdropTransition())}),this._backdrop.show(t)}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(P.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented)return;const{classList:t,scrollHeight:e,style:i}=this._element,n=e>document.documentElement.clientHeight;!n&&"hidden"===i.overflowY||t.contains("modal-static")||(n||(i.overflowY="hidden"),t.add("modal-static"),this._queueCallback(()=>{t.remove("modal-static"),n||this._queueCallback(()=>{i.overflowY=""},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;(!i&&t&&!p()||i&&!t&&p())&&(this._element.style.paddingLeft=e+"px"),(i&&!t&&!p()||!i&&t&&p())&&(this._element.style.paddingRight=e+"px")}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=Pe.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}P.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',(function(t){const e=i(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),P.one(e,"show.bs.modal",t=>{t.defaultPrevented||P.one(e,"hidden.bs.modal",()=>{a(this)&&this.focus()})}),Pe.getOrCreateInstance(e).toggle(this)})),B(Pe),m(Pe);const je={backdrop:!0,keyboard:!0,scroll:!1},Me={backdrop:"boolean",keyboard:"boolean",scroll:"boolean"};class He extends H{constructor(t,e){super(t),this._config=this._getConfig(e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get NAME(){return"offcanvas"}static get Default(){return je}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||P.trigger(this._element,"show.bs.offcanvas",{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._element.style.visibility="visible",this._backdrop.show(),this._config.scroll||(new Oe).hide(),this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add("show"),this._queueCallback(()=>{this._config.scroll||this._focustrap.activate(),P.trigger(this._element,"shown.bs.offcanvas",{relatedTarget:t})},this._element,!0))}hide(){this._isShown&&(P.trigger(this._element,"hide.bs.offcanvas").defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.remove("show"),this._backdrop.hide(),this._queueCallback(()=>{this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._element.style.visibility="hidden",this._config.scroll||(new Oe).reset(),P.trigger(this._element,"hidden.bs.offcanvas")},this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_getConfig(t){return t={...je,...F.getDataAttributes(this._element),..."object"==typeof t?t:{}},r("offcanvas",t,Me),t}_initializeBackDrop(){return new Le({className:"offcanvas-backdrop",isVisible:this._config.backdrop,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:()=>this.hide()})}_initializeFocusTrap(){return new Se({trapElement:this._element})}_addEventListeners(){P.on(this._element,"keydown.dismiss.bs.offcanvas",t=>{this._config.keyboard&&"Escape"===t.key&&this.hide()})}static jQueryInterface(t){return this.each((function(){const e=He.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}P.on(document,"click.bs.offcanvas.data-api",'[data-bs-toggle="offcanvas"]',(function(t){const e=i(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this))return;P.one(e,"hidden.bs.offcanvas",()=>{a(this)&&this.focus()});const n=U.findOne(".offcanvas.show");n&&n!==e&&He.getInstance(n).hide(),He.getOrCreateInstance(e).toggle(this)})),P.on(window,"load.bs.offcanvas.data-api",()=>U.find(".offcanvas.show").forEach(t=>He.getOrCreateInstance(t).show())),B(He),m(He);const Be=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Re=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,We=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,ze=(t,e)=>{const i=t.nodeName.toLowerCase();if(e.includes(i))return!Be.has(i)||Boolean(Re.test(t.nodeValue)||We.test(t.nodeValue));const n=e.filter(t=>t instanceof RegExp);for(let t=0,e=n.length;t<e;t++)if(n[t].test(i))return!0;return!1};function qe(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const n=(new window.DOMParser).parseFromString(t,"text/html"),s=Object.keys(e),o=[].concat(...n.body.querySelectorAll("*"));for(let t=0,i=o.length;t<i;t++){const i=o[t],n=i.nodeName.toLowerCase();if(!s.includes(n)){i.remove();continue}const r=[].concat(...i.attributes),a=[].concat(e["*"]||[],e[n]||[]);r.forEach(t=>{ze(t,a)||i.removeAttribute(t.nodeName)})}return n.body.innerHTML}const Fe=new Set(["sanitize","allowList","sanitizeFn"]),Ue={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(array|string|function)",container:"(string|element|boolean)",fallbackPlacements:"array",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",allowList:"object",popperConfig:"(null|object|function)"},$e={AUTO:"auto",TOP:"top",RIGHT:p()?"left":"right",BOTTOM:"bottom",LEFT:p()?"right":"left"},Ve={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:[0,0],container:!1,fallbackPlacements:["top","right","bottom","left"],boundary:"clippingParents",customClass:"",sanitize:!0,sanitizeFn:null,allowList:{"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},popperConfig:null},Ke={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"};class Xe extends H{constructor(t,e){if(void 0===pe)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this._config=this._getConfig(e),this.tip=null,this._setListeners()}static get Default(){return Ve}static get NAME(){return"tooltip"}static get Event(){return Ke}static get DefaultType(){return Ue}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(t){if(this._isEnabled)if(t){const e=this._initializeOnDelegatedTarget(t);e._activeTrigger.click=!e._activeTrigger.click,e._isWithActiveTrigger()?e._enter(null,e):e._leave(null,e)}else{if(this.getTipElement().classList.contains("show"))return void this._leave(null,this);this._enter(null,this)}}dispose(){clearTimeout(this._timeout),P.off(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.tip&&this.tip.remove(),this._popper&&this._popper.destroy(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this.isWithContent()||!this._isEnabled)return;const t=P.trigger(this._element,this.constructor.Event.SHOW),e=c(this._element),i=null===e?this._element.ownerDocument.documentElement.contains(this._element):e.contains(this._element);if(t.defaultPrevented||!i)return;const n=this.getTipElement(),s=(t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t})(this.constructor.NAME);n.setAttribute("id",s),this._element.setAttribute("aria-describedby",s),this._config.animation&&n.classList.add("fade");const o="function"==typeof this._config.placement?this._config.placement.call(this,n,this._element):this._config.placement,r=this._getAttachment(o);this._addAttachmentClass(r);const{container:a}=this._config;M.set(n,this.constructor.DATA_KEY,this),this._element.ownerDocument.documentElement.contains(this.tip)||(a.append(n),P.trigger(this._element,this.constructor.Event.INSERTED)),this._popper?this._popper.update():this._popper=fe(this._element,n,this._getPopperConfig(r)),n.classList.add("show");const l=this._resolvePossibleFunction(this._config.customClass);l&&n.classList.add(...l.split(" ")),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach(t=>{P.on(t,"mouseover",h)});const d=this.tip.classList.contains("fade");this._queueCallback(()=>{const t=this._hoverState;this._hoverState=null,P.trigger(this._element,this.constructor.Event.SHOWN),"out"===t&&this._leave(null,this)},this.tip,d)}hide(){if(!this._popper)return;const t=this.getTipElement();if(P.trigger(this._element,this.constructor.Event.HIDE).defaultPrevented)return;t.classList.remove("show"),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach(t=>P.off(t,"mouseover",h)),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1;const e=this.tip.classList.contains("fade");this._queueCallback(()=>{this._isWithActiveTrigger()||("show"!==this._hoverState&&t.remove(),this._cleanTipClass(),this._element.removeAttribute("aria-describedby"),P.trigger(this._element,this.constructor.Event.HIDDEN),this._popper&&(this._popper.destroy(),this._popper=null))},this.tip,e),this._hoverState=""}update(){null!==this._popper&&this._popper.update()}isWithContent(){return Boolean(this.getTitle())}getTipElement(){if(this.tip)return this.tip;const t=document.createElement("div");t.innerHTML=this._config.template;const e=t.children[0];return this.setContent(e),e.classList.remove("fade","show"),this.tip=e,this.tip}setContent(t){this._sanitizeAndSetContent(t,this.getTitle(),".tooltip-inner")}_sanitizeAndSetContent(t,e,i){const n=U.findOne(i,t);e||!n?this.setElementContent(n,e):n.remove()}setElementContent(t,e){if(null!==t)return s(e)?(e=o(e),void(this._config.html?e.parentNode!==t&&(t.innerHTML="",t.append(e)):t.textContent=e.textContent)):void(this._config.html?(this._config.sanitize&&(e=qe(e,this._config.allowList,this._config.sanitizeFn)),t.innerHTML=e):t.textContent=e)}getTitle(){const t=this._element.getAttribute("data-bs-original-title")||this._config.title;return this._resolvePossibleFunction(t)}updateAttachment(t){return"right"===t?"end":"left"===t?"start":t}_initializeOnDelegatedTarget(t,e){return e||this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map(t=>Number.parseInt(t,10)):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return"function"==typeof t?t.call(this._element):t}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"onChange",enabled:!0,phase:"afterWrite",fn:t=>this._handlePopperPlacementChange(t)}],onFirstUpdate:t=>{t.options.placement!==t.placement&&this._handlePopperPlacementChange(t)}};return{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_addAttachmentClass(t){this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t)}`)}_getAttachment(t){return $e[t.toUpperCase()]}_setListeners(){this._config.trigger.split(" ").forEach(t=>{if("click"===t)P.on(this._element,this.constructor.Event.CLICK,this._config.selector,t=>this.toggle(t));else if("manual"!==t){const e="hover"===t?this.constructor.Event.MOUSEENTER:this.constructor.Event.FOCUSIN,i="hover"===t?this.constructor.Event.MOUSELEAVE:this.constructor.Event.FOCUSOUT;P.on(this._element,e,this._config.selector,t=>this._enter(t)),P.on(this._element,i,this._config.selector,t=>this._leave(t))}}),this._hideModalHandler=()=>{this._element&&this.hide()},P.on(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this._config.selector?this._config={...this._config,trigger:"manual",selector:""}:this._fixTitle()}_fixTitle(){const t=this._element.getAttribute("title"),e=typeof this._element.getAttribute("data-bs-original-title");(t||"string"!==e)&&(this._element.setAttribute("data-bs-original-title",t||""),!t||this._element.getAttribute("aria-label")||this._element.textContent||this._element.setAttribute("aria-label",t),this._element.setAttribute("title",""))}_enter(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),e.getTipElement().classList.contains("show")||"show"===e._hoverState?e._hoverState="show":(clearTimeout(e._timeout),e._hoverState="show",e._config.delay&&e._config.delay.show?e._timeout=setTimeout(()=>{"show"===e._hoverState&&e.show()},e._config.delay.show):e.show())}_leave(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusout"===t.type?"focus":"hover"]=e._element.contains(t.relatedTarget)),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState="out",e._config.delay&&e._config.delay.hide?e._timeout=setTimeout(()=>{"out"===e._hoverState&&e.hide()},e._config.delay.hide):e.hide())}_isWithActiveTrigger(){for(const t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1}_getConfig(t){const e=F.getDataAttributes(this._element);return Object.keys(e).forEach(t=>{Fe.has(t)&&delete e[t]}),(t={...this.constructor.Default,...e,..."object"==typeof t&&t?t:{}}).container=!1===t.container?document.body:o(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),r("tooltip",t,this.constructor.DefaultType),t.sanitize&&(t.template=qe(t.template,t.allowList,t.sanitizeFn)),t}_getDelegateConfig(){const t={};for(const e in this._config)this.constructor.Default[e]!==this._config[e]&&(t[e]=this._config[e]);return t}_cleanTipClass(){const t=this.getTipElement(),e=new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`,"g"),i=t.getAttribute("class").match(e);null!==i&&i.length>0&&i.map(t=>t.trim()).forEach(e=>t.classList.remove(e))}_getBasicClassPrefix(){return"bs-tooltip"}_handlePopperPlacementChange(t){const{state:e}=t;e&&(this.tip=e.elements.popper,this._cleanTipClass(),this._addAttachmentClass(this._getAttachment(e.placement)))}static jQueryInterface(t){return this.each((function(){const e=Xe.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(Xe);const Ye={...Xe.Default,placement:"right",offset:[0,8],trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'},Qe={...Xe.DefaultType,content:"(string|element|function)"},Ge={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"};class Ze extends Xe{static get Default(){return Ye}static get NAME(){return"popover"}static get Event(){return Ge}static get DefaultType(){return Qe}isWithContent(){return this.getTitle()||this._getContent()}setContent(t){this._sanitizeAndSetContent(t,this.getTitle(),".popover-header"),this._sanitizeAndSetContent(t,this._getContent(),".popover-body")}_getContent(){return this._resolvePossibleFunction(this._config.content)}_getBasicClassPrefix(){return"bs-popover"}static jQueryInterface(t){return this.each((function(){const e=Ze.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(Ze);const Je={offset:10,method:"auto",target:""},ti={offset:"number",method:"string",target:"(string|element)"},ei=".nav-link, .list-group-item, .dropdown-item";class ii extends H{constructor(t,e){super(t),this._scrollElement="BODY"===this._element.tagName?window:this._element,this._config=this._getConfig(e),this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,P.on(this._scrollElement,"scroll.bs.scrollspy",()=>this._process()),this.refresh(),this._process()}static get Default(){return Je}static get NAME(){return"scrollspy"}refresh(){const t=this._scrollElement===this._scrollElement.window?"offset":"position",i="auto"===this._config.method?t:this._config.method,n="position"===i?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),U.find(ei,this._config.target).map(t=>{const s=e(t),o=s?U.findOne(s):null;if(o){const t=o.getBoundingClientRect();if(t.width||t.height)return[F[i](o).top+n,s]}return null}).filter(t=>t).sort((t,e)=>t[0]-e[0]).forEach(t=>{this._offsets.push(t[0]),this._targets.push(t[1])})}dispose(){P.off(this._scrollElement,".bs.scrollspy"),super.dispose()}_getConfig(t){return(t={...Je,...F.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}}).target=o(t.target)||document.documentElement,r("scrollspy",t,ti),t}_getScrollTop(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop}_getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}_getOffsetHeight(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height}_process(){const t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),i=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=i){const t=this._targets[this._targets.length-1];this._activeTarget!==t&&this._activate(t)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(let e=this._offsets.length;e--;)this._activeTarget!==this._targets[e]&&t>=this._offsets[e]&&(void 0===this._offsets[e+1]||t<this._offsets[e+1])&&this._activate(this._targets[e])}}_activate(t){this._activeTarget=t,this._clear();const e=ei.split(",").map(e=>`${e}[data-bs-target="${t}"],${e}[href="${t}"]`),i=U.findOne(e.join(","),this._config.target);i.classList.add("active"),i.classList.contains("dropdown-item")?U.findOne(".dropdown-toggle",i.closest(".dropdown")).classList.add("active"):U.parents(i,".nav, .list-group").forEach(t=>{U.prev(t,".nav-link, .list-group-item").forEach(t=>t.classList.add("active")),U.prev(t,".nav-item").forEach(t=>{U.children(t,".nav-link").forEach(t=>t.classList.add("active"))})}),P.trigger(this._scrollElement,"activate.bs.scrollspy",{relatedTarget:t})}_clear(){U.find(ei,this._config.target).filter(t=>t.classList.contains("active")).forEach(t=>t.classList.remove("active"))}static jQueryInterface(t){return this.each((function(){const e=ii.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}P.on(window,"load.bs.scrollspy.data-api",()=>{U.find('[data-bs-spy="scroll"]').forEach(t=>new ii(t))}),m(ii);class ni extends H{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains("active"))return;let t;const e=i(this._element),n=this._element.closest(".nav, .list-group");if(n){const e="UL"===n.nodeName||"OL"===n.nodeName?":scope > li > .active":".active";t=U.find(e,n),t=t[t.length-1]}const s=t?P.trigger(t,"hide.bs.tab",{relatedTarget:this._element}):null;if(P.trigger(this._element,"show.bs.tab",{relatedTarget:t}).defaultPrevented||null!==s&&s.defaultPrevented)return;this._activate(this._element,n);const o=()=>{P.trigger(t,"hidden.bs.tab",{relatedTarget:this._element}),P.trigger(this._element,"shown.bs.tab",{relatedTarget:t})};e?this._activate(e,e.parentNode,o):o()}_activate(t,e,i){const n=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?U.children(e,".active"):U.find(":scope > li > .active",e))[0],s=i&&n&&n.classList.contains("fade"),o=()=>this._transitionComplete(t,n,i);n&&s?(n.classList.remove("show"),this._queueCallback(o,t,!0)):o()}_transitionComplete(t,e,i){if(e){e.classList.remove("active");const t=U.findOne(":scope > .dropdown-menu .active",e.parentNode);t&&t.classList.remove("active"),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}t.classList.add("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),d(t),t.classList.contains("fade")&&t.classList.add("show");let n=t.parentNode;if(n&&"LI"===n.nodeName&&(n=n.parentNode),n&&n.classList.contains("dropdown-menu")){const e=t.closest(".dropdown");e&&U.find(".dropdown-toggle",e).forEach(t=>t.classList.add("active")),t.setAttribute("aria-expanded",!0)}i&&i()}static jQueryInterface(t){return this.each((function(){const e=ni.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}P.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this)||ni.getOrCreateInstance(this).show()})),m(ni);const si={animation:"boolean",autohide:"boolean",delay:"number"},oi={animation:!0,autohide:!0,delay:5e3};class ri extends H{constructor(t,e){super(t),this._config=this._getConfig(e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get DefaultType(){return si}static get Default(){return oi}static get NAME(){return"toast"}show(){P.trigger(this._element,"show.bs.toast").defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove("hide"),d(this._element),this._element.classList.add("show"),this._element.classList.add("showing"),this._queueCallback(()=>{this._element.classList.remove("showing"),P.trigger(this._element,"shown.bs.toast"),this._maybeScheduleHide()},this._element,this._config.animation))}hide(){this._element.classList.contains("show")&&(P.trigger(this._element,"hide.bs.toast").defaultPrevented||(this._element.classList.add("showing"),this._queueCallback(()=>{this._element.classList.add("hide"),this._element.classList.remove("showing"),this._element.classList.remove("show"),P.trigger(this._element,"hidden.bs.toast")},this._element,this._config.animation)))}dispose(){this._clearTimeout(),this._element.classList.contains("show")&&this._element.classList.remove("show"),super.dispose()}_getConfig(t){return t={...oi,...F.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}},r("toast",t,this.constructor.DefaultType),t}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide()}_setListeners(){P.on(this._element,"mouseover.bs.toast",t=>this._onInteraction(t,!0)),P.on(this._element,"mouseout.bs.toast",t=>this._onInteraction(t,!1)),P.on(this._element,"focusin.bs.toast",t=>this._onInteraction(t,!0)),P.on(this._element,"focusout.bs.toast",t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each((function(){const e=ri.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return B(ri),m(ri),{Alert:R,Button:W,Carousel:Z,Collapse:et,Dropdown:Te,Modal:Pe,Offcanvas:He,Popover:Ze,ScrollSpy:ii,Tab:ni,Toast:ri,Tooltip:Xe}}));
//# sourceMappingURL=bootstrap.bundle.min.js.map
"function"!=typeof Object.create&&(Object.create=function(t){function o(){}return o.prototype=t,new o}),function(t,o,i,s){"use strict";var n={_positionClasses:["bottom-left","bottom-right","top-right","top-left","bottom-center","top-center","mid-center"],_defaultIcons:["success","error","info","warning"],init:function(o,i){this.prepareOptions(o,t.toast.options),this.process()},prepareOptions:function(o,i){var s={};"string"==typeof o||o instanceof Array?s.text=o:s=o,this.options=t.extend({},i,s)},process:function(){this.setup(),this.addToDom(),this.position(),this.bindToast(),this.animate()},setup:function(){var o="";if(this._toastEl=this._toastEl||t("<div></div>",{class:"jq-toast-single"}),o+='<span class="jq-toast-loader"></span>',this.options.allowToastClose&&(o+='<span class="close-jq-toast-single">&times;</span>'),this.options.text instanceof Array){this.options.heading&&(o+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),o+='<ul class="jq-toast-ul">';for(var i=0;i<this.options.text.length;i++)o+='<li class="jq-toast-li" id="jq-toast-item-'+i+'">'+this.options.text[i]+"</li>";o+="</ul>"}else this.options.heading&&(o+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),o+=this.options.text;this._toastEl.html(o),!1!==this.options.bgColor&&this._toastEl.css("background-color",this.options.bgColor),!1!==this.options.textColor&&this._toastEl.css("color",this.options.textColor),this.options.textAlign&&this._toastEl.css("text-align",this.options.textAlign),!1!==this.options.icon&&(this._toastEl.addClass("jq-has-icon"),-1!==t.inArray(this.options.icon,this._defaultIcons)&&this._toastEl.addClass("jq-icon-"+this.options.icon)),!1!==this.options.class&&this._toastEl.addClass(this.options.class)},position:function(){"string"==typeof this.options.position&&-1!==t.inArray(this.options.position,this._positionClasses)?"bottom-center"===this.options.position?this._container.css({left:t(o).outerWidth()/2-this._container.outerWidth()/2,bottom:20}):"top-center"===this.options.position?this._container.css({left:t(o).outerWidth()/2-this._container.outerWidth()/2,top:20}):"mid-center"===this.options.position?this._container.css({left:t(o).outerWidth()/2-this._container.outerWidth()/2,top:t(o).outerHeight()/2-this._container.outerHeight()/2}):this._container.addClass(this.options.position):"object"==typeof this.options.position?this._container.css({top:this.options.position.top?this.options.position.top:"auto",bottom:this.options.position.bottom?this.options.position.bottom:"auto",left:this.options.position.left?this.options.position.left:"auto",right:this.options.position.right?this.options.position.right:"auto"}):this._container.addClass("bottom-left")},bindToast:function(){var t=this;this._toastEl.on("afterShown",function(){t.processLoader()}),this._toastEl.find(".close-jq-toast-single").on("click",function(o){o.preventDefault(),"fade"===t.options.showHideTransition?(t._toastEl.trigger("beforeHide"),t._toastEl.fadeOut(function(){t._toastEl.trigger("afterHidden")})):"slide"===t.options.showHideTransition?(t._toastEl.trigger("beforeHide"),t._toastEl.slideUp(function(){t._toastEl.trigger("afterHidden")})):(t._toastEl.trigger("beforeHide"),t._toastEl.hide(function(){t._toastEl.trigger("afterHidden")}))}),"function"==typeof this.options.beforeShow&&this._toastEl.on("beforeShow",function(){t.options.beforeShow(t._toastEl)}),"function"==typeof this.options.afterShown&&this._toastEl.on("afterShown",function(){t.options.afterShown(t._toastEl)}),"function"==typeof this.options.beforeHide&&this._toastEl.on("beforeHide",function(){t.options.beforeHide(t._toastEl)}),"function"==typeof this.options.afterHidden&&this._toastEl.on("afterHidden",function(){t.options.afterHidden(t._toastEl)}),"function"==typeof this.options.onClick&&this._toastEl.on("click",function(){t.options.onClick(t._toastEl)})},addToDom:function(){var o=t(".jq-toast-wrap");if(0===o.length?(o=t("<div></div>",{class:"jq-toast-wrap",role:"alert","aria-live":"polite"}),t("body").append(o)):this.options.stack&&!isNaN(parseInt(this.options.stack,10))||o.empty(),o.find(".jq-toast-single:hidden").remove(),o.append(this._toastEl),this.options.stack&&!isNaN(parseInt(this.options.stack),10)){var i=o.find(".jq-toast-single").length-this.options.stack;i>0&&t(".jq-toast-wrap").find(".jq-toast-single").slice(0,i).remove()}this._container=o},canAutoHide:function(){return!1!==this.options.hideAfter&&!isNaN(parseInt(this.options.hideAfter,10))},processLoader:function(){if(!this.canAutoHide()||!1===this.options.loader)return!1;var t=this._toastEl.find(".jq-toast-loader"),o=(this.options.hideAfter-400)/1e3+"s",i=this.options.loaderBg,s=t.attr("style")||"";s=s.substring(0,s.indexOf("-webkit-transition")),s+="-webkit-transition: width "+o+" ease-in;                       -o-transition: width "+o+" ease-in;                       transition: width "+o+" ease-in;                       background-color: "+i+";",t.attr("style",s).addClass("jq-toast-loaded")},animate:function(){t=this;if(this._toastEl.hide(),this._toastEl.trigger("beforeShow"),"fade"===this.options.showHideTransition.toLowerCase()?this._toastEl.fadeIn(function(){t._toastEl.trigger("afterShown")}):"slide"===this.options.showHideTransition.toLowerCase()?this._toastEl.slideDown(function(){t._toastEl.trigger("afterShown")}):this._toastEl.show(function(){t._toastEl.trigger("afterShown")}),this.canAutoHide()){var t=this;o.setTimeout(function(){"fade"===t.options.showHideTransition.toLowerCase()?(t._toastEl.trigger("beforeHide"),t._toastEl.fadeOut(function(){t._toastEl.trigger("afterHidden")})):"slide"===t.options.showHideTransition.toLowerCase()?(t._toastEl.trigger("beforeHide"),t._toastEl.slideUp(function(){t._toastEl.trigger("afterHidden")})):(t._toastEl.trigger("beforeHide"),t._toastEl.hide(function(){t._toastEl.trigger("afterHidden")}))},this.options.hideAfter)}},reset:function(o){"all"===o?t(".jq-toast-wrap").remove():this._toastEl.remove()},update:function(t){this.prepareOptions(t,this.options),this.setup(),this.bindToast()},close:function(){this._toastEl.find(".close-jq-toast-single").click()}};t.toast=function(t){var o=Object.create(n);return o.init(t,this),{reset:function(t){o.reset(t)},update:function(t){o.update(t)},close:function(){o.close()}}},t.toast.options={text:"",heading:"",showHideTransition:"fade",allowToastClose:!0,hideAfter:3e3,loader:!0,loaderBg:"#9EC600",stack:5,position:"bottom-left",bgColor:!1,textColor:!1,textAlign:"left",icon:!1,beforeShow:function(){},afterShown:function(){},beforeHide:function(){},afterHidden:function(){},onClick:function(){}}}(jQuery,window,document);

/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

; (function () {
	/*jshint eqeqeq:false curly:false latedef:false */
	"use strict";

	function setup($) {
		$.fn._fadeIn = $.fn.fadeIn;

		var noOp = $.noop || function () { };

		// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
		// confusing userAgent strings on Vista)
		var msie = /MSIE/.test(navigator.userAgent);
		var ie6 = /MSIE 6.0/.test(navigator.userAgent) && ! /MSIE 8.0/.test(navigator.userAgent);
		var mode = document.documentMode || 0;
		var setExpr = $.isFunction(document.createElement('div').style.setExpression);

		// global $ methods for blocking/unblocking the entire page
		$.blockUI = function (opts) { install(window, opts); };
		$.unblockUI = function (opts) { remove(window, opts); };

		// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
		$.growlUI = function (title, message, timeout, onClose) {
			var $m = $('<div class="growlUI"></div>');
			if (title) $m.append('<h1>' + title + '</h1>');
			if (message) $m.append('<h2>' + message + '</h2>');
			if (timeout === undefined) timeout = 3000;

			// Added by konapun: Set timeout to 30 seconds if this growl is moused over, like normal toast notifications
			var callBlock = function (opts) {
				opts = opts || {};

				$.blockUI({
					message: $m,
					fadeIn: typeof opts.fadeIn !== 'undefined' ? opts.fadeIn : 700,
					fadeOut: typeof opts.fadeOut !== 'undefined' ? opts.fadeOut : 1000,
					timeout: typeof opts.timeout !== 'undefined' ? opts.timeout : timeout,
					centerY: false,
					showOverlay: false,
					onUnblock: onClose,
					css: $.blockUI.defaults.growlCSS
				});
			};

			callBlock();
			var nonmousedOpacity = $m.css('opacity');
			$m.mouseover(function () {
				callBlock({
					fadeIn: 0,
					timeout: 30000
				});

				var displayBlock = $('.blockMsg');
				displayBlock.stop(); // cancel fadeout if it has started
				displayBlock.fadeTo(300, 1); // make it easier to read the message by removing transparency
			}).mouseout(function () {
				$('.blockMsg').fadeOut(1000);
			});
			// End konapun additions
		};

		// plugin method for blocking element content
		$.fn.block = function (opts) {
			if (this[0] === window) {
				$.blockUI(opts);
				return this;
			}
			var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
			this.each(function () {
				var $el = $(this);
				if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked'))
					return;
				$el.unblock({ fadeOut: 0 });
			});

			return this.each(function () {
				if ($.css(this, 'position') == 'static') {
					this.style.position = 'relative';
					$(this).data('blockUI.static', true);
				}
				this.style.zoom = 1; // force 'hasLayout' in ie
				install(this, opts);
			});
		};

		// plugin method for unblocking element content
		$.fn.unblock = function (opts) {
			if (this[0] === window) {
				$.unblockUI(opts);
				return this;
			}
			return this.each(function () {
				remove(this, opts);
			});
		};

		$.blockUI.version = 2.70; // 2nd generation blocking at no extra cost!

		// override these in your code to change the default behavior and style
		$.blockUI.defaults = {
			// message displayed when blocking (use null for no message)
			message: '<h1>Please wait...</h1>',

			title: null,		// title string; only used when theme == true
			draggable: true,	// only used when theme == true (requires jquery-ui.js to be loaded)

			theme: false, // set to true to use with jQuery UI themes

			// styles for the message when blocking; if you wish to disable
			// these and use an external stylesheet then do this in your code:
			// $.blockUI.defaults.css = {};
			css: {
				padding: 0,
				margin: 0,
				width: '30%',
				top: '40%',
				left: '35%',
				textAlign: 'center',
				color: '#000',
				border: '3px solid #aaa',
				backgroundColor: '#fff',
				cursor: 'wait'
			},

			// minimal style set used when themes are used
			themedCSS: {
				width: '30%',
				top: '40%',
				left: '35%'
			},

			// styles for the overlay
			overlayCSS: {
				backgroundColor: '#000',
				opacity: 0.6,
				cursor: 'wait'
			},

			// style to replace wait cursor before unblocking to correct issue
			// of lingering wait cursor
			cursorReset: 'default',

			// styles applied when using $.growlUI
			growlCSS: {
				width: '350px',
				top: '10px',
				left: '',
				right: '10px',
				border: 'none',
				padding: '5px',
				opacity: 0.6,
				cursor: 'default',
				color: '#fff',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				'border-radius': '10px'
			},

			// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
			// (hat tip to Jorge H. N. de Vasconcelos)
			/*jshint scripturl:true */
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

			// force usage of iframe in non-IE browsers (handy for blocking applets)
			forceIframe: false,

			// z-index for the blocking overlay
			baseZ: 1000,

			// set these to true to have the message automatically centered
			centerX: true, // <-- only effects element blocking (page block controlled via css above)
			centerY: true,

			// allow body element to be stetched in ie6; this makes blocking look better
			// on "short" pages.  disable if you wish to prevent changes to the body height
			allowBodyStretch: true,

			// enable if you want key and mouse events to be disabled for content that is blocked
			bindEvents: true,

			// be default blockUI will supress tab navigation from leaving blocking content
			// (if bindEvents is true)
			constrainTabKey: true,

			// fadeIn time in millis; set to 0 to disable fadeIn on block
			fadeIn: 200,

			// fadeOut time in millis; set to 0 to disable fadeOut on unblock
			fadeOut: 400,

			// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
			timeout: 0,

			// disable if you don't want to show the overlay
			showOverlay: true,

			// if true, focus will be placed in the first available input field when
			// page blocking
			focusInput: true,

			// elements that can receive focus
			focusableElements: ':input:enabled:visible',

			// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
			// no longer needed in 2012
			// applyPlatformOpacityRules: true,

			// callback method invoked when fadeIn has completed and blocking message is visible
			onBlock: null,

			// callback method invoked when unblocking has completed; the callback is
			// passed the element that has been unblocked (which is the window object for page
			// blocks) and the options that were passed to the unblock call:
			//	onUnblock(element, options)
			onUnblock: null,

			// callback method invoked when the overlay area is clicked.
			// setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
			onOverlayClick: null,

			// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
			quirksmodeOffsetHack: 4,

			// class name of the message block
			blockMsgClass: 'blockMsg',

			// if it is already blocked, then ignore it (don't unblock and reblock)
			ignoreIfBlocked: false
		};

		// private data and functions follow...

		var pageBlock = null;
		var pageBlockEls = [];

		function install(el, opts) {
			var css, themedCSS;
			var full = (el == window);
			var msg = (opts && opts.message !== undefined ? opts.message : undefined);
			opts = $.extend({}, $.blockUI.defaults, opts || {});

			if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked'))
				return;

			opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
			css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
			if (opts.onOverlayClick)
				opts.overlayCSS.cursor = 'pointer';

			themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
			msg = msg === undefined ? opts.message : msg;

			// remove the current block (if there is one)
			if (full && pageBlock)
				remove(window, { fadeOut: 0 });

			// if an existing element is being used as the blocking content then we capture
			// its current place in the DOM (and current display style) so we can restore
			// it when we unblock
			if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
				var node = msg.jquery ? msg[0] : msg;
				var data = {};
				$(el).data('blockUI.history', data);
				data.el = node;
				data.parent = node.parentNode;
				data.display = node.style.display;
				data.position = node.style.position;
				if (data.parent)
					data.parent.removeChild(node);
			}

			$(el).data('blockUI.onUnblock', opts.onUnblock);
			var z = opts.baseZ;

			// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
			// layer1 is the iframe layer which is used to supress bleed through of underlying content
			// layer2 is the overlay layer which has opacity and a wait cursor (by default)
			// layer3 is the message content that is displayed while blocking
			var lyr1, lyr2, lyr3, s;
			if (msie || opts.forceIframe)
				lyr1 = $('<iframe class="blockUI" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>');
			else
				lyr1 = $('<div class="blockUI" style="display:none"></div>');

			if (opts.theme)
				lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (z++) + ';display:none"></div>');
			else
				lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

			if (opts.theme && full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">';
				if (opts.title) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
				}
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			}
			else if (opts.theme) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">';
				if (opts.title) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
				}
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			}
			else if (full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>';
			}
			else {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>';
			}
			lyr3 = $(s);

			// if we have a message, style it
			if (msg) {
				if (opts.theme) {
					lyr3.css(themedCSS);
					lyr3.addClass('ui-widget-content');
				}
				else
					lyr3.css(css);
			}

			// style the overlay
			if (!opts.theme /*&& (!opts.applyPlatformOpacityRules)*/)
				lyr2.css(opts.overlayCSS);
			lyr2.css('position', full ? 'fixed' : 'absolute');

			// make iframe layer transparent in IE
			if (msie || opts.forceIframe)
				lyr1.css('opacity', 0.0);

			//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
			var layers = [lyr1, lyr2, lyr3], $par = full ? $('body') : $(el);
			$.each(layers, function () {
				this.appendTo($par);
			});

			if (opts.theme && opts.draggable && $.fn.draggable) {
				lyr3.draggable({
					handle: '.ui-dialog-titlebar',
					cancel: 'li'
				});
			}

			// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
			var expr = setExpr && (!$.support.boxModel || $('object,embed', full ? null : el).length > 0);
			if (ie6 || expr) {
				// give body 100% height
				if (full && opts.allowBodyStretch && $.support.boxModel)
					$('html,body').css('height', '100%');

				// fix ie6 issue when blocked element has a border width
				if ((ie6 || !$.support.boxModel) && !full) {
					var t = sz(el, 'borderTopWidth'), l = sz(el, 'borderLeftWidth');
					var fixT = t ? '(0 - ' + t + ')' : 0;
					var fixL = l ? '(0 - ' + l + ')' : 0;
				}

				// simulate fixed position
				$.each(layers, function (i, o) {
					var s = o[0].style;
					s.position = 'absolute';
					if (i < 2) {
						if (full)
							s.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:' + opts.quirksmodeOffsetHack + ') + "px"');
						else
							s.setExpression('height', 'this.parentNode.offsetHeight + "px"');
						if (full)
							s.setExpression('width', 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');
						else
							s.setExpression('width', 'this.parentNode.offsetWidth + "px"');
						if (fixL) s.setExpression('left', fixL);
						if (fixT) s.setExpression('top', fixT);
					}
					else if (opts.centerY) {
						if (full) s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
						s.marginTop = 0;
					}
					else if (!opts.centerY && full) {
						var top = (opts.css && opts.css.top) ? parseInt(opts.css.top, 10) : 0;
						var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + top + ') + "px"';
						s.setExpression('top', expression);
					}
				});
			}

			// show the message
			if (msg) {
				if (opts.theme)
					lyr3.find('.ui-widget-content').append(msg);
				else
					lyr3.append(msg);
				if (msg.jquery || msg.nodeType)
					$(msg).show();
			}

			if ((msie || opts.forceIframe) && opts.showOverlay)
				lyr1.show(); // opacity is zero
			if (opts.fadeIn) {
				var cb = opts.onBlock ? opts.onBlock : noOp;
				var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
				var cb2 = msg ? cb : noOp;
				if (opts.showOverlay)
					lyr2._fadeIn(opts.fadeIn, cb1);
				if (msg)
					lyr3._fadeIn(opts.fadeIn, cb2);
			}
			else {
				if (opts.showOverlay)
					lyr2.show();
				if (msg)
					lyr3.show();
				if (opts.onBlock)
					opts.onBlock.bind(lyr3)();
			}

			// bind key and mouse events
			bind(1, el, opts);

			if (full) {
				pageBlock = lyr3[0];
				pageBlockEls = $(opts.focusableElements, pageBlock);
				if (opts.focusInput)
					setTimeout(focus, 20);
			}
			else
				center(lyr3[0], opts.centerX, opts.centerY);

			if (opts.timeout) {
				// auto-unblock
				var to = setTimeout(function () {
					if (full)
						$.unblockUI(opts);
					else
						$(el).unblock(opts);
				}, opts.timeout);
				$(el).data('blockUI.timeout', to);
			}
		}

		// remove the block
		function remove(el, opts) {
			var count;
			var full = (el == window);
			var $el = $(el);
			var data = $el.data('blockUI.history');
			var to = $el.data('blockUI.timeout');
			if (to) {
				clearTimeout(to);
				$el.removeData('blockUI.timeout');
			}
			opts = $.extend({}, $.blockUI.defaults, opts || {});
			bind(0, el, opts); // unbind events

			if (opts.onUnblock === null) {
				opts.onUnblock = $el.data('blockUI.onUnblock');
				$el.removeData('blockUI.onUnblock');
			}

			var els;
			if (full) // crazy selector to handle odd field errors in ie6/7
				els = $('body').children().filter('.blockUI').add('body > .blockUI');
			else
				els = $el.find('>.blockUI');

			// fix cursor issue
			if (opts.cursorReset) {
				if (els.length > 1)
					els[1].style.cursor = opts.cursorReset;
				if (els.length > 2)
					els[2].style.cursor = opts.cursorReset;
			}

			if (full)
				pageBlock = pageBlockEls = null;

			if (opts.fadeOut) {
				count = els.length;
				els.stop().fadeOut(opts.fadeOut, function () {
					if (--count === 0)
						reset(els, data, opts, el);
				});
			}
			else
				reset(els, data, opts, el);
		}

		// move blocking element back into the DOM where it started
		function reset(els, data, opts, el) {
			var $el = $(el);
			if ($el.data('blockUI.isBlocked'))
				return;

			els.each(function (i, o) {
				// remove via DOM calls so we don't lose event handlers
				if (this.parentNode)
					this.parentNode.removeChild(this);
			});

			if (data && data.el) {
				data.el.style.display = data.display;
				data.el.style.position = data.position;
				data.el.style.cursor = 'default'; // #59
				if (data.parent)
					data.parent.appendChild(data.el);
				$el.removeData('blockUI.history');
			}

			if ($el.data('blockUI.static')) {
				$el.css('position', 'static'); // #22
			}

			if (typeof opts.onUnblock == 'function')
				opts.onUnblock(el, opts);

			// fix issue in Safari 6 where block artifacts remain until reflow
			var body = $(document.body), w = body.width(), cssW = body[0].style.width;
			body.width(w - 1).width(w);
			body[0].style.width = cssW;
		}

		// bind/unbind the handler
		function bind(b, el, opts) {
			var full = el == window, $el = $(el);

			// don't bother unbinding if there is nothing to unbind
			if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
				return;

			$el.data('blockUI.isBlocked', b);

			// don't bind events when overlay is not in use or if bindEvents is false
			if (!full || !opts.bindEvents || (b && !opts.showOverlay))
				return;

			// bind anchors and inputs for mouse and key events
			var events = 'mousedown mouseup keydown keypress keyup touchstart touchend touchmove';
			if (b)
				$(document).bind(events, opts, handler);
			else
				$(document).unbind(events, handler);

			// former impl...
			//		var $e = $('a,:input');
			//		b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
		}

		// event handler to suppress keyboard/mouse events when blocking
		function handler(e) {
			// allow tab navigation (conditionally)
			if (e.type === 'keydown' && e.keyCode && e.keyCode == 9) {
				if (pageBlock && e.data.constrainTabKey) {
					var els = pageBlockEls;
					var fwd = !e.shiftKey && e.target === els[els.length - 1];
					var back = e.shiftKey && e.target === els[0];
					if (fwd || back) {
						setTimeout(function () { focus(back); }, 10);
						return false;
					}
				}
			}
			var opts = e.data;
			var target = $(e.target);
			if (target.hasClass('blockOverlay') && opts.onOverlayClick)
				opts.onOverlayClick(e);

			// allow events within the message content
			if (target.parents('div.' + opts.blockMsgClass).length > 0)
				return true;

			// allow events for content that is not being blocked
			return target.parents().children().filter('div.blockUI').length === 0;
		}

		function focus(back) {
			if (!pageBlockEls)
				return;
			var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
			if (e)
				e.focus();
		}

		function center(el, x, y) {
			var p = el.parentNode, s = el.style;
			var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p, 'borderLeftWidth');
			var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p, 'borderTopWidth');
			if (x) s.left = l > 0 ? (l + 'px') : '0';
			if (y) s.top = t > 0 ? (t + 'px') : '0';
		}

		function sz(el, p) {
			return parseInt($.css(el, p), 10) || 0;
		}

	}


	/*global define:true */
	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		define(['jquery'], setup);
	} else {
		setup(jQuery);
	}

})();
/**
 * show toaster [Success, Warning, Error, Information]
 * @param {any} type
 * @param {any} text
 * @param {any} timeOut
 */
function showToaster(type, text, timeOut = 5000) {
    $.toast({
        heading: type,
        text: text,
        position: 'bottom-right',
        icon: type === 'Information' ? 'info' : type.toLowerCase(),
        hideAfter: timeOut
    });
}
/**
 * map object from server responsed to control inputs on View
 * @param {any} modelView
 * @returns
 */
function mapObjectToControlView(modelView) {

    if (typeof modelView !== 'object') {
        return;
    }

    for (const property in modelView) {

        if (modelView.hasOwnProperty(property)) {

            const [firstCharacter, ...restChar] = property; //name

            const capitalText = `${firstCharacter.toLocaleUpperCase()}${restChar.join('')}`;

            $(`#${capitalText}`).val(modelView[property]);
        }
    }
}

function formatCurrencyVN(value) {
    return value.toLocaleString("vi-VN", {
        style: 'currency',
        currency: 'VND'
    });
}

(function () {

    $.blockUI.defaults.message = `<div class="sk-circle">
                                      <div class="sk-circle1 sk-child"></div>
                                      <div class="sk-circle2 sk-child"></div>
                                      <div class="sk-circle3 sk-child"></div>
                                      <div class="sk-circle4 sk-child"></div>
                                      <div class="sk-circle5 sk-child"></div>
                                      <div class="sk-circle6 sk-child"></div>
                                      <div class="sk-circle7 sk-child"></div>
                                      <div class="sk-circle8 sk-child"></div>
                                      <div class="sk-circle9 sk-child"></div>
                                      <div class="sk-circle10 sk-child"></div>
                                      <div class="sk-circle11 sk-child"></div>
                                      <div class="sk-circle12 sk-child"></div>
                                    </div>`;

    $.blockUI.defaults.css = {
        padding: 0,
        margin: 0,
        width: '30%',
        top: '40%',
        left: '35%',
        textAlign: 'center',
        color: '#000',
        border: 'none',
        backgroundColor: 'none',
        cursor: 'wait'
    }

})();
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$(document).on('click', '.btn-add-cart', function () {

    $.blockUI();

    const code = $(this).data('code');

    $.ajax({
        url: '/cart/add',
        method: 'POST',
        data: { bookCode: code, quantity: 1 },
        success: function (count) {
            if (count === -1) {
                showToaster('Error', 'Add cart failed.');
            }
            else {
                $('.cart-number').text(count);
                showToaster('Success', 'Add cart successful');
            }

            $.unblockUI();
        }
    });

});

