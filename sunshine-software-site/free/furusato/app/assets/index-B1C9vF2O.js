(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1.021,t=.9,n=.2,r=2e3,i={single:{national:0,local:0},spouse_no_income:{national:38e4,local:33e4},spouse_no_income_child1_hs:{national:76e4,local:66e4},spouse_no_income_child1_univ:{national:101e4,local:78e4},spouse_no_income_child2_hs_univ:{national:139e4,local:111e4}},a={single:`独身、または配偶者に収入がある夫婦`,spouse_no_income:`夫婦（配偶者に収入なし・子なし）`,spouse_no_income_child1_hs:`夫婦＋子1人（高校生）`,spouse_no_income_child1_univ:`夫婦＋子1人（大学生）`,spouse_no_income_child2_hs_univ:`夫婦＋子2人（高校生・大学生）`};function o(e){return e<=0?0:e<=1625e3?55e4:e<=18e5?Math.round(e*.4-1e5):e<=36e5?Math.round(e*.3+8e4):e<=66e5?Math.round(e*.2+44e4):e<=85e5?Math.round(e*.1+11e5):195e4}function s(e){return Math.round(e*.15)}var c=48e4,l=43e4;function u(e){return e<=195e4?.05:e<=33e5?.1:e<=695e4?.2:e<=9e6?.23:e<=18e6?.33:e<=4e7?.4:.45}function d(e){return e<0?0:e}function f(a){let{annualIncome:f,familyType:p}=a,m=i[p],h=d(f-o(f)),g=s(f),_=d(h-g-c-m.national),v=d(h-g-l-m.local),y=Math.floor(_/1e3)*1e3,b=Math.floor(v/1e3)*1e3,x=u(y),S=Math.floor(b*.1),C=t-x*e,w=C>0&&S>0?S*n/C+r:0;return{donationLimit:Math.floor(d(w)/100)*100,employmentIncome:h,taxableIncomeNational:y,taxableIncomeLocal:b,nationalTaxRate:x,localIncomeLeviedTax:S}}var p=`furusato-sim.v1`;function m(){try{let e=localStorage.getItem(p);if(!e)return{records:[]};let t=JSON.parse(e);return Array.isArray(t.records)?t:{records:[]}}catch{return{records:[]}}}function h(e){localStorage.setItem(p,JSON.stringify(e))}function g(){return m().records.slice().sort((e,t)=>t.savedAt.localeCompare(e.savedAt))}function _(e){let t=m(),n={...e,id:crypto.randomUUID(),savedAt:new Date().toISOString()};return t.records.push(n),h(t),n}function v(e){let t=m();t.records=t.records.filter(t=>t.id!==e),h(t)}function y(){h({records:[]})}function b(){return JSON.stringify(m(),null,2)}function x(e){let t=e.charCodeAt(0)===65279?e.slice(1):e,n=JSON.parse(t);if(!Array.isArray(n.records))throw Error(`invalid format`);let r=m(),i=new Set(r.records.map(e=>e.id)),a=0;for(let e of n.records)i.has(e.id)||(r.records.push(e),i.add(e.id),a+=1);return h(r),a}var S=[`保存日時`,`年収(円)`,`家族構成`,`控除上限額(円)`,`メモ`];function C(e){return/[",\n]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function w(e,t){let n=[S];for(let r of e)n.push([r.savedAt,String(r.annualIncome),t[r.familyType],String(r.result.donationLimit),r.memo]);return`﻿`+n.map(e=>e.map(C).join(`,`)).join(`\r
`)}function T(e,t,n){let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}function E(e,t){return`${e}-${new Date().toISOString().slice(0,10)}.${t}`}var D=`modulepreload`,O=function(e,t){return new URL(e,t).href},k={},A=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=O(t,n),t=s(t),t in k)return;k[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:D,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},j=new Intl.NumberFormat(`ja-JP`);function M(){return Object.keys(a).map(e=>`<option value="${e}">${a[e]}</option>`).join(``)}function N(e){return e.length===0?`<p class="result-note">保存された記録はまだありません。</p>`:`
    <table class="records">
      <thead>
        <tr><th>保存日時</th><th>年収</th><th>家族構成</th><th>上限額</th><th></th></tr>
      </thead>
      <tbody>${e.map(e=>`
      <tr data-id="${e.id}">
        <td>${new Date(e.savedAt).toLocaleString(`ja-JP`)}</td>
        <td>${j.format(e.annualIncome)}円</td>
        <td>${a[e.familyType]}</td>
        <td>${j.format(e.result.donationLimit)}円</td>
        <td><button class="delete-record" data-id="${e.id}" type="button">削除</button></td>
      </tr>`).join(``)}</tbody>
    </table>
  `}function P(){let e=document.getElementById(`app`);if(!e)return;let t=g();e.innerHTML=`
    <header class="app-header">
      <h1>ふるさと納税 控除上限額シミュレーター</h1>
      <p class="tagline">年収と家族構成から、ふるさと納税の控除上限額（概算）をその場で計算します。</p>
      <div class="badges">
        <span class="badge">登録不要</span>
        <span class="badge">データはブラウザ内のみ・外部送信なし</span>
        <span class="badge">オフライン対応（一度開けば通信不要）</span>
      </div>
    </header>

    <section class="card">
      <form id="sim-form">
        <label for="income">年収（給与収入額・円）</label>
        <input id="income" name="income" type="number" min="0" step="10000" inputmode="numeric" placeholder="例: 5000000" required />

        <label for="family">家族構成</label>
        <select id="family" name="family">${M()}</select>

        <div class="button-row">
          <button class="primary" type="submit">計算する</button>
        </div>
      </form>
    </section>

    <section class="card" id="result-card" hidden>
      <label>控除上限額（概算・年間）</label>
      <p class="result-amount" id="result-amount">-</p>
      <p class="result-note" id="result-detail"></p>
      <div class="button-row">
        <button id="save-btn" type="button">この結果を保存する</button>
      </div>
    </section>

    <section class="card">
      <h2 class="records-title">保存した記録</h2>
      <div id="records-area">${N(t)}</div>
      <div class="button-row">
        <button id="export-csv" type="button">CSVでエクスポート</button>
        <button id="export-json" type="button">JSONでエクスポート（バックアップ）</button>
        <label for="import-json" class="import-label">
          <button id="import-json-btn" type="button">JSONをインポート</button>
        </label>
        <input id="import-json" type="file" accept="application/json" hidden />
        <button id="clear-records" type="button">全件削除</button>
      </div>
    </section>

    <section class="card disclaimer">
      <p><strong>ご利用にあたって（免責事項）</strong></p>
      <p>
        本ツールが示す金額は、一般的な給与所得者を想定した簡易モデルによる概算です。
        医療費控除・iDeCo・生命保険料控除・住宅ローン控除・調整控除など個別の事情により
        実際の控除上限額は変動します。正確な金額は、お住まいの自治体・税務署・税理士等に
        ご確認ください。本ツールは専門家による助言に代わるものではありません。
      </p>
      <p>
        計算式の根拠: 総務省「ふるさと納税のしくみ｜税金の控除について」
        （控除上限額 ≒ 住民税所得割額 × 20% ÷ (90% − 所得税率 × 1.021) + 2,000円）。
        算出日時点（2026年）の制度・税率表に基づきます。
      </p>
      <p>
        入力した年収・家族構成などのデータは、このブラウザの localStorage にのみ保存され、
        サーバーや外部サービスへ送信されることはありません。
      </p>
    </section>

    <footer class="app-footer">
      <p>ふるさと納税 控除上限額シミュレーター &mdash; データはあなたのブラウザ内だけに保存されます。</p>
    </footer>
  `,F()}function F(){let e=document.getElementById(`sim-form`),t=document.getElementById(`result-card`),n=document.getElementById(`result-amount`),r=document.getElementById(`result-detail`),i=document.getElementById(`save-btn`),o=null;e?.addEventListener(`submit`,e=>{e.preventDefault();let i=document.getElementById(`income`),a=document.getElementById(`family`),s=Math.max(0,Math.round(Number(i.value)||0)),c=a.value,l=f({annualIncome:s,familyType:c});o={annualIncome:s,familyType:c},t&&(t.hidden=!1),n&&(n.textContent=`${j.format(l.donationLimit)} 円`),r&&(r.textContent=`所得税率(概算): ${(l.nationalTaxRate*100).toFixed(0)}% / 住民税所得割額(概算): ${j.format(l.localIncomeLeviedTax)}円`)});let s=()=>{let e=document.getElementById(`records-area`);e&&(e.innerHTML=N(g()))};i?.addEventListener(`click`,()=>{if(!o)return;let e=f(o);_({annualIncome:o.annualIncome,familyType:o.familyType,result:e,memo:``}),s()}),document.getElementById(`records-area`)?.addEventListener(`click`,e=>{let t=e.target;if(t.classList.contains(`delete-record`)){let e=t.getAttribute(`data-id`);e&&(v(e),s())}}),document.getElementById(`export-csv`)?.addEventListener(`click`,()=>{let e=w(g(),a);T(E(`furusato-records`,`csv`),e,`text/csv;charset=utf-8`)}),document.getElementById(`export-json`)?.addEventListener(`click`,()=>{let e=b();T(E(`furusato-backup`,`json`),e,`application/json;charset=utf-8`)}),document.getElementById(`import-json-btn`)?.addEventListener(`click`,()=>{document.getElementById(`import-json`)?.click()}),document.getElementById(`import-json`)?.addEventListener(`change`,async e=>{let t=e.target,n=t.files?.[0];if(!n)return;let r=await n.text();try{let e=x(r);alert(`${e}件の記録をインポートしました。`),s()}catch{alert(`インポートに失敗しました。ファイル形式を確認してください。`)}t.value=``}),document.getElementById(`clear-records`)?.addEventListener(`click`,()=>{confirm(`保存された記録をすべて削除します。よろしいですか？`)&&(y(),s())})}P(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{A(async()=>{let{registerSW:e}=await import(`./virtual_pwa-register-QDVMbcNK.js`);return{registerSW:e}},[],import.meta.url).then(({registerSW:e})=>e({immediate:!0}))});export{A as t};