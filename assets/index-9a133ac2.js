(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function E(){}function Oe(e){return e()}function Re(){return Object.create(null)}function O(e){e.forEach(Oe)}function pe(e){return typeof e=="function"}function me(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let $;function Ae(e,t){return $||($=document.createElement("a")),$.href=t,e===$.href}function ct(e){return Object.keys(e).length===0}function ut(e){return e&&pe(e.destroy)?e.destroy:E}const at=typeof window<"u";let ft=at?e=>requestAnimationFrame(e):E;const Fe=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;"WeakMap"in Fe;function T(e,t){e.appendChild(t)}function b(e,t,n){e.insertBefore(t,n||null)}function g(e){e.parentNode&&e.parentNode.removeChild(e)}function dt(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function k(e){return document.createElement(e)}function Pe(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function P(e){return document.createTextNode(e)}function I(){return P(" ")}function w(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function C(e){return function(t){return t.stopPropagation(),e.call(this,t)}}function d(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function _t(e){return Array.from(e.childNodes)}function Te(e,t){t=""+t,e.data!==t&&(e.data=t)}function fe(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}let x;function pt(){if(x===void 0){x=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{x=!0}}return x}function mt(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const i=k("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const o=pt();let r;return o?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=w(window,"message",l=>{l.source===i.contentWindow&&t()})):(i.src="about:blank",i.onload=()=>{r=w(i.contentWindow,"resize",t),t()}),T(e,i),()=>{(o||r&&i.contentWindow)&&r(),g(i)}}function ee(e,t,n){e.classList[n?"add":"remove"](t)}let Q;function J(e){Q=e}function Ue(){if(!Q)throw new Error("Function called outside component initialization");return Q}function ht(e){Ue().$$.on_mount.push(e)}function yt(e){Ue().$$.on_destroy.push(e)}function D(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(i=>i.call(this,t))}const V=[],de=[];let K=[];const Le=[],ze=Promise.resolve();let _e=!1;function We(){_e||(_e=!0,ze.then(Be))}function gt(){return We(),ze}function ne(e){K.push(e)}const ue=new Set;let j=0;function Be(){if(j!==0)return;const e=Q;do{try{for(;j<V.length;){const t=V[j];j++,J(t),bt(t.$$)}}catch(t){throw V.length=0,j=0,t}for(J(null),V.length=0,j=0;de.length;)de.pop()();for(let t=0;t<K.length;t+=1){const n=K[t];ue.has(n)||(ue.add(n),n())}K.length=0}while(V.length);for(;Le.length;)Le.pop()();_e=!1,ue.clear(),J(e)}function bt(e){if(e.fragment!==null){e.update(),O(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ne)}}function wt(e){const t=[],n=[];K.forEach(i=>e.indexOf(i)===-1?t.push(i):n.push(i)),n.forEach(i=>i()),K=t}const te=new Set;let W;function Ce(){W={r:0,c:[],p:W}}function Me(){W.r||O(W.c),W=W.p}function U(e,t){e&&e.i&&(te.delete(e),e.i(t))}function H(e,t,n,i){if(e&&e.o){if(te.has(e))return;te.add(e),W.c.push(()=>{te.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}const vt=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...vt];function je(e){e&&e.c()}function he(e,t,n,i){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),i||ne(()=>{const l=e.$$.on_mount.map(Oe).filter(pe);e.$$.on_destroy?e.$$.on_destroy.push(...l):O(l),e.$$.on_mount=[]}),r.forEach(ne)}function ye(e,t){const n=e.$$;n.fragment!==null&&(wt(n.after_update),O(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function kt(e,t){e.$$.dirty[0]===-1&&(V.push(e),We(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ge(e,t,n,i,o,r,l,f=[-1]){const u=Q;J(e);const c=e.$$={fragment:null,ctx:[],props:r,update:E,not_equal:o,bound:Re(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:Re(),dirty:f,skip_bound:!1,root:t.target||u.$$.root};l&&l(c.root);let _=!1;if(c.ctx=n?n(e,t.props||{},(p,h,...s)=>{const m=s.length?s[0]:h;return c.ctx&&o(c.ctx[p],c.ctx[p]=m)&&(!c.skip_bound&&c.bound[p]&&c.bound[p](m),_&&kt(e,p)),h}):[],c.update(),_=!0,O(c.before_update),c.fragment=i?i(c.ctx):!1,t.target){if(t.hydrate){const p=_t(t.target);c.fragment&&c.fragment.l(p),p.forEach(g)}else c.fragment&&c.fragment.c();t.intro&&U(e.$$.fragment),he(e,t.target,t.anchor,t.customElement),Be()}J(u)}class be{$destroy(){ye(this,1),this.$destroy=E}$on(t,n){if(!pe(n))return E;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}$set(t){this.$$set&&!ct(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Et(e){let t,n,i,o,r,l,f,u,c,_,p,h,s;return{c(){t=k("div"),n=k("div"),i=P(e[2]),o=I(),r=k("label"),l=k("input"),f=I(),u=k("span"),c=I(),_=k("div"),p=P(e[3]),d(n,"class","left-option svelte-1a1qoh6"),ee(n,"active",!e[0]),d(l,"type","checkbox"),d(l,"class","svelte-1a1qoh6"),d(u,"class","slider svelte-1a1qoh6"),d(r,"class","switch svelte-1a1qoh6"),d(_,"class","right-option svelte-1a1qoh6"),ee(_,"active",e[0]),d(t,"class","switch-wrapper svelte-1a1qoh6"),fe(t,"--color",e[1])},m(m,A){b(m,t,A),T(t,n),T(n,i),T(t,o),T(t,r),T(r,l),l.checked=e[0],T(r,f),T(r,u),T(t,c),T(t,_),T(_,p),h||(s=[w(l,"change",e[9]),w(l,"change",e[8]),w(l,"change",St),w(t,"mousedown",C(e[4])),w(t,"mouseup",C(e[5])),w(t,"touchstart",C(e[6])),w(t,"touchend",C(e[7]))],h=!0)},p(m,[A]){A&4&&Te(i,m[2]),A&1&&ee(n,"active",!m[0]),A&1&&(l.checked=m[0]),A&8&&Te(p,m[3]),A&1&&ee(_,"active",m[0]),A&2&&fe(t,"--color",m[1])},i:E,o:E,d(m){m&&g(t),h=!1,O(s)}}}const St=e=>e.target.blur();function Rt(e,t,n){let{checked:i=!1}=t,{color:o="var(--color-main)"}=t,{left:r="manual"}=t,{right:l="automatic"}=t;function f(s){D.call(this,e,s)}function u(s){D.call(this,e,s)}function c(s){D.call(this,e,s)}function _(s){D.call(this,e,s)}function p(s){D.call(this,e,s)}function h(){i=this.checked,n(0,i)}return e.$$set=s=>{"checked"in s&&n(0,i=s.checked),"color"in s&&n(1,o=s.color),"left"in s&&n(2,r=s.left),"right"in s&&n(3,l=s.right)},[i,o,r,l,f,u,c,_,p,h]}class At extends be{constructor(t){super(),ge(this,t,Rt,Et,me,{checked:0,color:1,left:2,right:3})}}function Tt(e){let t,n;return{c:E,m(i,o){t||(n=[w(window,"keydown",e[0]),w(window,"keyup",e[1])],t=!0)},p:E,i:E,o:E,d(i){t=!1,O(n)}}}function Lt(e,t,n){let{record:i}=t,{stopRecording:o}=t;function r(u){u.preventDefault(),i()}ht(()=>{const u=document.querySelector("main");return u.addEventListener("mousedown",r),u.addEventListener("mouseup",o),u.addEventListener("touchstart",r),u.addEventListener("touchend",o),()=>{u.removeEventListener("mousedown",r),u.removeEventListener("mouseup",o),u.removeEventListener("touchstart",r),u.removeEventListener("touchend",o)}});function l(u){u.code==="Space"&&i()}function f(u){u.code==="Space"&&o()}return e.$$set=u=>{"record"in u&&n(2,i=u.record),"stopRecording"in u&&n(3,o=u.stopRecording)},[l,f,i,o]}class Ct extends be{constructor(t){super(),ge(this,t,Lt,Tt,me,{record:2,stopRecording:3})}}const{cancelAnimationFrame:Mt}=Fe;function qe(e,t,n){const i=e.slice();return i[55]=t[n],i[57]=n,i}function De(e){let t,n;return t=new Ct({props:{record:e[16],stopRecording:e[17]}}),{c(){je(t.$$.fragment)},m(i,o){he(t,i,o),n=!0},p:E,i(i){n||(U(t.$$.fragment,i),n=!0)},o(i){H(t.$$.fragment,i),n=!1},d(i){ye(t,i)}}}function Ie(e){let t,n,i=!0,o=!1,r,l,f;function u(){Mt(r),t.paused||(r=ft(u),o=!0),e[33].call(t)}return{c(){t=k("audio"),Ae(t.src,n=e[8])||d(t,"src",n)},m(c,_){b(c,t,_),e[31](t),l||(f=[w(t,"play",e[32]),w(t,"pause",e[32]),w(t,"timeupdate",u),w(t,"ended",e[19]),ut(e[15].call(null,t))],l=!0)},p(c,_){_[0]&256&&!Ae(t.src,n=c[8])&&d(t,"src",n),_[0]&2&&i!==(i=c[1])&&t[i?"pause":"play"](),!o&&_[0]&128&&!isNaN(c[7])&&(t.currentTime=c[7]),o=!1},d(c){c&&g(t),e[31](null),l=!1,O(f)}}}function qt(e){let t,n;return{c(){t=k("b"),t.textContent="getUserMedia",n=P(" is not supported on your browser 😔")},m(i,o){b(i,t,o),b(i,n,o)},p:E,i:E,o:E,d(i){i&&g(t),i&&g(n)}}}function Dt(e){let t,n,i;return{c(){t=k("p"),t.textContent="You need to grant access to your microphone",n=I(),i=k("p"),i.textContent="Watch out for a dialog or microphone icon in the address bar",fe(t,"font-weight","bold")},m(o,r){b(o,t,r),b(o,n,r),b(o,i,r)},p:E,i:E,o:E,d(o){o&&g(t),o&&g(n),o&&g(i)}}}function It(e){let t,n,i,o,r,l;t=new At({props:{checked:e[4]}}),t.$on("change",e[20]);function f(s,m){return s[4]?Ft:Ot}let u=f(e),c=u(e);function _(s,m){if(s[10])return zt;if(!s[1]||s[11])return Ut;if(s[8])return Pt}let p=_(e),h=p&&p(e);return{c(){je(t.$$.fragment),n=I(),i=k("p"),c.c(),o=I(),r=k("div"),h&&h.c(),d(i,"id","instruction"),d(i,"class","svelte-1w98i0i"),d(r,"id","control-btns"),d(r,"class","svelte-1w98i0i")},m(s,m){he(t,s,m),b(s,n,m),b(s,i,m),c.m(i,null),b(s,o,m),b(s,r,m),h&&h.m(r,null),l=!0},p(s,m){const A={};m[0]&16&&(A.checked=s[4]),t.$set(A),u!==(u=f(s))&&(c.d(1),c=u(s),c&&(c.c(),c.m(i,null))),p===(p=_(s))&&h?h.p(s,m):(h&&h.d(1),h=p&&p(s),h&&(h.c(),h.m(r,null)))},i(s){l||(U(t.$$.fragment,s),l=!0)},o(s){H(t.$$.fragment,s),l=!1},d(s){ye(t,s),s&&g(n),s&&g(i),c.d(),s&&g(o),s&&g(r),h&&h.d()}}}function Nt(e){let t,n,i,o,r;return{c(){t=k("p"),t.textContent="Record yourself and listen to the echo",n=I(),i=k("button"),i.textContent="initialize",d(i,"id","init-btn"),d(i,"class","svelte-1w98i0i")},m(l,f){b(l,t,f),b(l,n,f),b(l,i,f),o||(r=w(i,"click",C(e[14])),o=!0)},p:E,i:E,o:E,d(l){l&&g(t),l&&g(n),l&&g(i),o=!1,r()}}}function Ot(e){let t,n,i,o,r;return{c(){t=P("Click / touch anywhere on the screen or press 'Space' "),n=k("u"),n.textContent="and hold",i=P(` to
                        record.`),o=k("br"),r=P(`
                        Release to stop recording and listen to playback in a loop.`)},m(l,f){b(l,t,f),b(l,n,f),b(l,i,f),b(l,o,f),b(l,r,f)},d(l){l&&g(t),l&&g(n),l&&g(i),l&&g(o),l&&g(r)}}}function Ft(e){let t,n,i;return{c(){t=P("Simply start speaking to start recording."),n=k("br"),i=P(`
                        Stop speaking to stop recording and listen to playback in a loop.`)},m(o,r){b(o,t,r),b(o,n,r),b(o,i,r)},d(o){o&&g(t),o&&g(n),o&&g(i)}}}function Pt(e){let t,n,i;return{c(){t=k("button"),t.textContent="▶︎ PLAY",d(t,"id","play-btn"),d(t,"class","svelte-1w98i0i")},m(o,r){b(o,t,r),n||(i=[w(t,"click",C(e[21])),w(t,"mousedown",C(e[26])),w(t,"mouseup",C(e[27])),w(t,"touchstart",C(e[28])),w(t,"touchend",C(e[29]))],n=!0)},p:E,d(o){o&&g(t),n=!1,O(i)}}}function Ut(e){let t,n,i;return{c(){t=k("button"),t.textContent="◼︎ STOP",d(t,"id","stop-btn"),d(t,"class","svelte-1w98i0i")},m(o,r){b(o,t,r),n||(i=[w(t,"click",C(e[18])),w(t,"mousedown",C(e[22])),w(t,"mouseup",C(e[23])),w(t,"touchstart",C(e[24])),w(t,"touchend",C(e[25]))],n=!0)},p:E,d(o){o&&g(t),n=!1,O(i)}}}function zt(e){let t;return{c(){t=k("div"),t.textContent="REC",d(t,"class","recording svelte-1w98i0i")},m(n,i){b(n,t,i)},p:E,d(n){n&&g(t)}}}function Ne(e){let t,n,i,o;return{c(){t=Pe("rect"),d(t,"width",e[12]),d(t,"height",n=e[55]/255*e[9]),d(t,"x",i=e[57]*e[12]),d(t,"y",o=e[9]-e[55]/255*e[9]),d(t,"fill","#ff3b00")},m(r,l){b(r,t,l)},p(r,l){l[0]&4096&&d(t,"width",r[12]),l[0]&544&&n!==(n=r[55]/255*r[9])&&d(t,"height",n),l[0]&4096&&i!==(i=r[57]*r[12])&&d(t,"x",i),l[0]&544&&o!==(o=r[9]-r[55]/255*r[9])&&d(t,"y",o)},d(r){r&&g(t)}}}function Wt(e){let t,n,i,o,r,l,f,u,c,_,p,h,s,m,A,v=e[2]&&!e[4]&&De(e),R=e[8]&&Ie(e);const z=[Nt,It,Dt,qt],q=[];function B(a,L){return a[2]?a[13]&&a[3]?1:a[13]&&!a[3]?2:3:0}f=B(e),u=q[f]=z[f](e);let F=e[5],S=[];for(let a=0;a<F.length;a+=1)S[a]=Ne(qe(e,F,a));return{c(){v&&v.c(),t=I(),R&&R.c(),n=I(),i=k("main"),o=k("div"),r=k("h1"),r.textContent="Svecho",l=I(),u.c(),c=I(),_=k("div"),p=Pe("svg");for(let a=0;a<S.length;a+=1)S[a].c();d(r,"class","svelte-1w98i0i"),d(o,"id","control"),d(o,"class","svelte-1w98i0i"),d(p,"xmlns","http://www.w3.org/2000/svg"),d(p,"class","svelte-1w98i0i"),d(_,"id","visual-wrapper"),d(_,"class","svelte-1w98i0i"),ne(()=>e[34].call(_)),d(i,"class","svelte-1w98i0i")},m(a,L){v&&v.m(a,L),b(a,t,L),R&&R.m(a,L),b(a,n,L),b(a,i,L),T(i,o),T(o,r),T(o,l),q[f].m(o,null),T(i,c),T(i,_),T(_,p);for(let N=0;N<S.length;N+=1)S[N]&&S[N].m(p,null);h=mt(_,e[34].bind(_)),s=!0,m||(A=w(window,"keydown",e[30]),m=!0)},p(a,L){a[2]&&!a[4]?v?(v.p(a,L),L[0]&20&&U(v,1)):(v=De(a),v.c(),U(v,1),v.m(t.parentNode,t)):v&&(Ce(),H(v,1,1,()=>{v=null}),Me()),a[8]?R?R.p(a,L):(R=Ie(a),R.c(),R.m(n.parentNode,n)):R&&(R.d(1),R=null);let N=f;if(f=B(a),f===N?q[f].p(a,L):(Ce(),H(q[N],1,1,()=>{q[N]=null}),Me(),u=q[f],u?u.p(a,L):(u=q[f]=z[f](a),u.c()),U(u,1),u.m(o,null)),L[0]&4640){F=a[5];let M;for(M=0;M<F.length;M+=1){const Y=qe(a,F,M);S[M]?S[M].p(Y,L):(S[M]=Ne(Y),S[M].c(),S[M].m(p,null))}for(;M<S.length;M+=1)S[M].d(1);S.length=F.length}},i(a){s||(U(v),U(u),s=!0)},o(a){H(v),H(u),s=!1},d(a){v&&v.d(a),a&&g(t),R&&R.d(a),a&&g(n),a&&g(i),q[f].d(),dt(S,a),h(),m=!1,A()}}}const ae=128,Bt=800,jt=500,Vt=50,Ht=600;function Kt(e,t,n){let i;const o=navigator.mediaDevices&&navigator.mediaDevices.getUserMedia,r=-45;let l=!1,f=!1,u=!1,c,_=[],p,h,s=[],m,A=[],v,R,z,q,B,F=!1,S=!1,a=!0;async function L(){p=new AudioContext,await N(),n(2,l=!0)}yt(()=>{clearInterval(oe),clearTimeout(G),clearTimeout(Z)});async function N(){try{const y=await navigator.mediaDevices.getUserMedia({audio:!0});n(3,f=!0),c=new MediaRecorder(y),c.onstart=()=>{},c.ondataavailable=ce=>{S?(_.push(ce.data),n(10,S=!1)):_=[]},c.onstop=async()=>{if(_.length===0)return;const ce=new Blob(_,{type:c.mimeType});_=[],z&&URL.revokeObjectURL(z),n(8,z=URL.createObjectURL(ce)),await gt(),await re()};const le=p.createMediaStreamSource(y);m=p.createAnalyser(),m.fftSize=ae,m.minDecibels=r,le.connect(m);const se=m.frequencyBinCount;A=new Uint8Array(se)}catch(y){console.error(`The following getUserMedia error occurred: ${y}`)}}function M(y){const le=p.createMediaElementSource(y);h=p.createAnalyser(),h.fftSize=ae,le.connect(h),h.connect(p.destination);const se=h.frequencyBinCount;n(5,s=new Uint8Array(se))}let Y;function we(){if(a){cancelAnimationFrame(Y),n(5,s=s.fill(0));return}h.getByteFrequencyData(s),n(5,s),Y=requestAnimationFrame(we)}let ve;function ke(){if(!u){cancelAnimationFrame(ve);return}m.getByteFrequencyData(A),F=A.some(y=>y>0),F?Ye():Ge(),ve=requestAnimationFrame(ke)}async function Ee(){S||(n(10,S=!0),ie(),!u&&c.state==="inactive"&&c.start())}function Se(){S&&(c.stop(),u&&c.start())}let X=null;function ie(){v&&(clearTimeout(X),n(11,X=null),v.pause(),n(7,R=0))}function Ve(){n(11,X=setTimeout(re,Bt))}let oe;function He(){oe=setInterval(Ke,jt)}function Ke(){S||(c.state==="recording"&&c.stop(),c.state==="inactive"&&c.start())}let G;function Ye(){clearTimeout(Z),Z=null,G||(G=setTimeout(()=>{Ee()},Vt))}let Z;function Ge(){clearTimeout(G),G=null,Z||(Z=setTimeout(()=>{Se()},Ht))}function Ze(y){n(4,u=y.target.checked),c.state==="recording"&&c.stop(),u?(c.start(),He(),ke()):clearInterval(oe)}async function re(){try{await v.play()}catch(y){console.error("ERROR playing audio",y)}}function Je(y){D.call(this,e,y)}function Qe(y){D.call(this,e,y)}function Xe(y){D.call(this,e,y)}function $e(y){D.call(this,e,y)}function xe(y){D.call(this,e,y)}function et(y){D.call(this,e,y)}function tt(y){D.call(this,e,y)}function nt(y){D.call(this,e,y)}const it=y=>{y.code==="Escape"&&ie()};function ot(y){de[y?"unshift":"push"](()=>{v=y,n(6,v)})}function rt(){a=this.paused,n(1,a)}function lt(){R=this.currentTime,n(7,R)}function st(){q=this.clientWidth,B=this.clientHeight,n(0,q),n(9,B)}return e.$$.update=()=>{e.$$.dirty[0]&1&&n(12,i=q/ae*2),e.$$.dirty[0]&2&&(a||we())},[q,a,l,f,u,s,v,R,z,B,S,X,i,o,L,M,Ee,Se,ie,Ve,Ze,re,Je,Qe,Xe,$e,xe,et,tt,nt,it,ot,rt,lt,st]}class Yt extends be{constructor(t){super(),ge(this,t,Kt,Wt,me,{},null,[-1,-1])}}new Yt({target:document.getElementById("app")});
