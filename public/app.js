const lessons=[
 {n:1,level:'A1',title:'Begrüßung & Menschen',goal:'20 grundlegende Wörter für erste Gespräche.',words:[['hallo','hello','سلام'],['guten Morgen','good morning','صبح بخیر'],['danke','thank you','ممنون'],['bitte','please / you are welcome','لطفاً / خواهش می‌کنم'],['ja','yes','بله'],['nein','no','نه'],['ich','I','من'],['du','you (informal)','تو'],['der Name','name','نام'],['wohnen','to live','ساکن بودن'],['kommen','to come','آمدن'],['sein','to be','بودن'],['haben','to have','داشتن'],['sprechen','to speak','صحبت کردن'],['lernen','to learn','یاد گرفتن'],['gut','good','خوب'],['heute','today','امروز'],['hier','here','اینجا'],['wo','where','کجا'],['wer','who','چه کسی']],quiz:[{q:'Was bedeutet „wohnen“?',type:'single',a:['to live','to learn','to speak'],correct:[0]},{q:'Wähle alle Verben.',type:'multi',a:['sein','haben','heute','sprechen'],correct:[0,1,3]},{q:'Wie sagt man „thank you“ auf Deutsch?',type:'text',correctText:'danke',acceptedText:['danke','danke schon','danke schön','vielen dank','danke vielmals']}]},
 {n:2,level:'A1',title:'Familie & Alltag',goal:'Menschen, Dinge und tägliche Handlungen beschreiben.',words:[['die Familie','family','خانواده'],['die Mutter','mother','مادر'],['der Vater','father','پدر'],['das Kind','child','کودک'],['essen','to eat','خوردن'],['trinken','to drink','نوشیدن'],['gehen','to go','رفتن'],['machen','to do / make','انجام دادن'],['arbeiten','to work','کار کردن'],['zu Hause','at home','در خانه']],quiz:[{q:'Was bedeutet „trinken“?',type:'single',a:['to drink','to eat','to work'],correct:[0]},{q:'Wähle die Familienwörter.',type:'multi',a:['die Mutter','gehen','der Vater','das Kind'],correct:[0,2,3]}]}
];
lessons.push({n:3,level:'A2',title:'Reise, Zeit & Gesundheit',goal:'Über Pläne und Wohlbefinden sprechen.',words:[['reisen','to travel','سفر کردن'],['gestern','yesterday','دیروز'],['morgen','tomorrow','فردا'],['krank','ill','بیمار'],['helfen','to help','کمک کردن']],quiz:[{q:'Was bedeutet „reisen“?',type:'single',a:['to travel','to help','to need'],correct:[0]}]},{n:4,level:'B1',title:'Beruf & Meinung',goal:'Erfahrungen erklären und begründet argumentieren.',words:[['die Erfahrung','experience','تجربه'],['entscheiden','to decide','تصمیم گرفتن'],['erklären','to explain','توضیح دادن'],['die Meinung','opinion','نظر'],['verbessern','to improve','بهبود دادن']],quiz:[{q:'Was bedeutet „verbessern“?',type:'single',a:['to improve','to decide','to explain'],correct:[0]}]},{n:5,level:'B2',title:'Gesellschaft & präzise Sprache',goal:'Komplexe Themen differenziert beschreiben.',words:[['die Herausforderung','challenge','چالش'],['ermöglichen','to enable','ممکن ساختن'],['nachhaltig','sustainable','پایدار'],['überzeugen','to convince','متقاعد کردن']],quiz:[{q:'Was bedeutet „überzeugen“?',type:'single',a:['to convince','to increase','to enable'],correct:[0]}]},{n:6,level:'C1',title:'Stil, Nuancen & Beruf',goal:'Präzise, professionelle Sprache einsetzen.',words:[['berücksichtigen','to take into account','در نظر گرفتن'],['die Zielsetzung','objective','هدف‌گذاری'],['angemessen','appropriate','مناسب'],['die Rückmeldung','feedback','بازخورد']],quiz:[{q:'Was bedeutet „berücksichtigen“?',type:'single',a:['to take into account','to give feedback','to require'],correct:[0]}]},{n:7,level:'Danach',title:'Sätze & Gespräche',goal:'Wortschatz in echten Situationen verwenden.',words:[['Könnten Sie das bitte erklären?','Could you please explain that?','ممکن است لطفاً آن را توضیح دهید؟'],['Ich bin der Meinung, dass …','I am of the opinion that …','من معتقدم که …'],['Was würden Sie empfehlen?','What would you recommend?','شما چه توصیه‌ای می‌کنید؟']],quiz:[{q:'Wie beginnt man eine höfliche Bitte?',type:'single',a:['Könnten Sie …?','Du musst …','Nein.'],correct:[0]}]});const roadmap=[['A1','600 Kernwörter · Alltag, Familie, Zeit, Einkaufen, einfache Grammatik'],['A2','700 Wörter · Arbeit, Reisen, Gesundheit, Vergangenheit, Meinungen'],['B1','900 Wörter · Wohnen, Beruf, Medien, Argumentieren, Nebensätze'],['B2','900 Wörter · Gesellschaft, Technik, abstrakte Verben, präzise Ausdrucksweise'],['C1','700 Wörter · akademisch/beruflich, Idiomatik, Stil und Nuancen'],['Danach','Sätze, Hör-/Leseverständnis, Dialoge und praktische Gespräche']];
let state={completed:[],due:[]};let current=1;
const $=s=>document.querySelector(s); const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
async function api(path,body){const r=await fetch(path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});return r.json()}
function lesson(){return lessons.find(x=>x.n===current)||lessons[0]}
function renderLearn(){const l=lesson(), complete=state.completed.includes(l.n);$('#learn').innerHTML=`<article class="card"><span class="tag">${l.level} · Lektion ${l.n}</span><h2>${l.title}</h2><p>${l.goal}</p><div class="progress"><i style="width:${(state.completed.length/lessons.length)*100}%"></i></div><p class="meta">${state.completed.length} von ${lessons.length} aktuell verfügbaren Lektionen abgeschlossen</p><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${l.words.map((w,i)=>`<tr><td><strong>${escape(w[0])}</strong></td><td>${escape(w[1])}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><button class="primary" onclick="showQuiz()">${complete?'Quiz erneut machen':'Zum Quiz'}</button></article><div id="quiz"></div>`}
function showQuizLegacy(){const l=lesson();$('#quiz').innerHTML=`<article class="card"><h2>Kurzer Check</h2>${l.quiz.map((q,i)=>`<fieldset data-q="${i}"><legend>${i+1}. ${q.q}</legend>${q.type==='text'?'<input aria-label="Antwort" type="text">':q.a.map((a,j)=>`<label class="quiz-option"><input type="${q.type==='multi'?'checkbox':'radio'}" name="q${i}" value="${j}"> ${a}</label>`).join('')}</fieldset>`).join('')}<button class="primary" onclick="submitQuiz()">Antworten prüfen</button><div id="feedback"></div></article>`;$('#quiz').scrollIntoView({behavior:'smooth'})}
async function submitQuizLegacy(){const l=lesson();let ok=0;let answers=[];l.quiz.forEach((q,i)=>{let got=q.type==='text'?[$(`#quiz [data-q="${i}"] input`).value.trim().toLowerCase()]:[...document.querySelectorAll(`#quiz [data-q="${i}"] input:checked`)].map(x=>+x.value);let good=q.type==='text'?(q.acceptedText||[q.correctText]).includes(got[0]):JSON.stringify(got.sort())===JSON.stringify(q.correct);answers.push(good);if(good)ok++});const passed=ok===l.quiz.length;$('#feedback').innerHTML=`<div class="feedback ${passed?'good':'bad'}">${passed?'Sehr gut! Lektion abgeschlossen.':'Bitte noch einmal ansehen: Frage '+answers.map((good,i)=>good?null:i+1).filter(Boolean).join(', ')+'.'} (${ok}/${l.quiz.length})</div>`;l.words.forEach((w,i)=>api('/api/review',{id:`${l.n}-${i}`,correct:passed}));if(passed){state=await api('/api/complete',{lesson:l.n});$('#status').textContent='Fortschritt gespeichert';renderLearn();setTimeout(()=>showQuiz(),30)}}
function renderReview(){let list=[];state.due.forEach(id=>{let [ln,wi]=id.split('-').map(Number),l=lessons.find(x=>x.n===ln);if(l&&l.words[wi])list.push({id,w:l.words[wi]})});$('#review').innerHTML=`<article class="card"><h2>Wiederholen</h2><p>${list.length?'Diese Wörter sind heute fällig.':'Heute ist nichts fällig. Nach jeder Lektion plant die App die nächste Wiederholung automatisch.'}</p>${list.map(x=>`<div class="card"><strong>${x.w[0]}</strong> — ${x.w[1]} — <span class="fa">${x.w[2]}</span><p><button onclick="review('${x.id}',true)">Ich wusste es</button> <button onclick="review('${x.id}',false)">Noch üben</button></p></div>`).join('')}</article>`}
async function review(id,correct){state=await api('/api/review',{id,correct});renderReview();updateHeader()}
function renderRoadmap(){$('#roadmap').innerHTML=`<article class="card"><h2>Endlicher Lernweg</h2><p>Wir bauen einen nützlichen Kernwortschatz von ungefähr <strong>3.800 Wörtern und Verben</strong> auf — nicht eine endlose Wortliste. Danach verschiebt sich der Schwerpunkt bewusst auf Sätze und Gespräche.</p><ol class="roadmap">${roadmap.map(r=>`<li><strong>${r[0]}</strong><br><span class="meta">${r[1]}</span></li>`).join('')}</ol></article>`}
function updateHeader(){$('#dueBadge').textContent=state.due.length?state.due.length:'';$('#status').textContent=`${state.completed.length}/${lessons.length} Lektionen`}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));$(`#${b.dataset.view}`).classList.remove('hidden');b.classList.add('active');if(b.dataset.view==='review')renderReview()});
(async()=>{state=await api('/api/state');current=Math.min(state.lastLesson||1,lessons.length);updateHeader();renderLearn();renderReview();renderRoadmap()})();



const practiceItems=[
 {kind:'Wort',de:'zuverlässig',en:'reliable',fa:'قابل اعتماد',note:'B1 · adjective'},
 {kind:'Satz',de:'Ich möchte einen Termin vereinbaren.',en:'I would like to make an appointment.',fa:'می‌خواهم یک وقت تعیین کنم.',note:'A2 · everyday conversation'},
 {kind:'Wort',de:'berücksichtigen',en:'to take into account',fa:'در نظر گرفتن',note:'C1 · verb'},
 {kind:'Satz',de:'Das hängt davon ab, welche Voraussetzungen erfüllt sind.',en:'That depends on which requirements are met.',fa:'بستگی دارد که چه پیش‌شرط‌هایی برآورده شده باشند.',note:'B2 · precise opinion'},
 {kind:'Wort',de:'nachhaltig',en:'sustainable',fa:'پایدار',note:'B2 · adjective'},
 {kind:'Satz',de:'Könnten Sie das bitte noch einmal erklären?',en:'Could you please explain that once more?',fa:'ممکن است لطفاً آن را یک بار دیگر توضیح دهید؟',note:'A1 · polite request'}
];
function renderPractice(){const host=$('#practice');if(!host)return;host.innerHTML=`<article class="card"><span class="tag">Gemischtes Training</span><h2>Wörter & Sätze</h2><p>Wechsle bewusst zwischen einzelnem Wortschatz und vollständigen Sätzen. Klicke auf eine Karte, um die Übersetzung zu zeigen.</p><div class="practice-grid">${practiceItems.map((x,i)=>`<button class="practice-card" onclick="flipPractice(${i})"><span class="tag">${x.kind} · ${x.note}</span><strong>${escape(x.de)}</strong><span id="practice-${i}" class="practice-answer">Übersetzung anzeigen</span></button>`).join('')}</div></article>`}
function flipPractice(i){const x=practiceItems[i],el=$(`#practice-${i}`);el.innerHTML=`<span>${escape(x.en)}</span><span class="fa">${escape(x.fa)}</span>`}
function toggleTheme(){const dark=document.body.dataset.theme!=='dark';document.body.dataset.theme=dark?'dark':'light';localStorage.setItem('deutsch-theme',document.body.dataset.theme);$('#themeToggle').textContent=dark?'☀️ Hell':'🌙 Dunkel'}
(function(){const theme=localStorage.getItem('deutsch-theme')||'light';document.body.dataset.theme=theme;const button=$('#themeToggle');if(button)button.textContent=theme==='dark'?'☀️ Hell':'🌙 Dunkel';renderPractice()})();


let activeQuiz=[];
function shuffle(items){return [...items].sort(()=>Math.random()-.5)}
function allLearned(){const unlocked=Math.max(current,...(state.completed||[]),1);return lessons.filter(l=>l.n<=unlocked).flatMap(l=>l.words.map(w=>({de:w[0],en:w[1],fa:w[2],lesson:l.n})));}
function choicesFor(answer,field,pool){const distractors=shuffle(pool.filter(x=>x[field]!==answer[field])).map(x=>x[field]).filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);return shuffle([answer[field],...distractors]);}
function buildQuiz(){const pool=allLearned();const selected=shuffle(pool).slice(0,Math.min(3,pool.length));return selected.map((word,i)=>{if(i===2){return {q:`Schreibe auf Deutsch: „${word.en}“`,type:'text',correctText:word.de.toLowerCase(),acceptedText:[word.de.toLowerCase()]};}const field=i===0?'en':'de';const target=i===0?word.en:word.de;const options=choicesFor(word,field,pool);return {q:i===0?`Was bedeutet „${word.de}“?`:`Welche deutsche Übersetzung passt zu „${word.en}“?`,type:'single',a:options,correct:[options.indexOf(target)]};});}
function showQuiz(){const l=lesson();activeQuiz=buildQuiz();$('#quiz').innerHTML=`<article class="card"><h2>Kurzer Check</h2><p class="meta">Zufällige Fragen aus ${allLearned().length} bisher gelernten Wörtern und Sätzen.</p>${activeQuiz.map((q,i)=>`<fieldset data-q="${i}"><legend>${i+1}. ${q.q}</legend>${q.type==='text'?'<input aria-label="Antwort" type="text" autocomplete="off">':q.a.map((a,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}"> ${escape(a)}</label>`).join('')}</fieldset>`).join('')}<button class="primary" onclick="submitQuiz()">Antworten prüfen</button><button onclick="showQuiz()">Neue zufällige Fragen</button><div id="feedback"></div></article>`;$('#quiz').scrollIntoView({behavior:'smooth'});}
async function submitQuiz(){
 const l=lesson(),quiz=activeQuiz;let ok=0;
 quiz.forEach((q,i)=>{
  const field=$(`#quiz [data-q="${i}"]`);
  const got=q.type==='text'?[field.querySelector('input').value.trim().toLowerCase()]:[...field.querySelectorAll('input:checked')].map(x=>+x.value);
  const good=q.type==='text'?(q.acceptedText||[q.correctText]).includes(got[0]):JSON.stringify(got.sort())===JSON.stringify(q.correct);
  if(good)ok++;
  if(q.type==='text'){
   const input=field.querySelector('input');input.classList.add(good?'answer-correct':'answer-wrong');
   field.insertAdjacentHTML('beforeend',`<p class="answer-note ${good?'answer-correct':'answer-wrong'}">${good?'Richtig.':'Richtige Antwort: '+escape(q.correctText)}</p>`);
  }else{
   field.querySelectorAll('label.quiz-option').forEach((label,j)=>{const selected=label.querySelector('input').checked;if(q.correct.includes(j))label.classList.add('answer-correct');else if(selected)label.classList.add('answer-wrong');});
  }
 });
 const passed=ok===quiz.length;
 $('#feedback').innerHTML=`<p class="quiz-summary">${passed?'Alle Antworten sind richtig. Lektion abgeschlossen.':`Ergebnis: ${ok}/${quiz.length}. Die richtige Antwort ist grün markiert; eine falsche Auswahl rot.`}</p>`;
 l.words.forEach((w,i)=>api('/api/review',{id:`${l.n}-${i}`,correct:passed}));
 if(passed){state=await api('/api/complete',{lesson:l.n});current=Math.min(l.n+1,lessons.length);$('#status').textContent='Fortschritt gespeichert';renderLearn();}
}

const sentenceSets={1:[['Ich lerne heute Deutsch.','I am learning German today.','من امروز آلمانی یاد می‌گیرم.'],['Wo wohnst du?','Where do you live?','کجا زندگی می‌کنی؟']],2:[['Meine Familie ist zu Hause.','My family is at home.','خانواده من در خانه است.'],['Ich arbeite und lerne.','I work and learn.','من کار می‌کنم و یاد می‌گیرم.']],3:[['Morgen reise ich mit dem Zug.','Tomorrow I travel by train.','فردا با قطار سفر می‌کنم.'],['Ich brauche Hilfe, weil ich krank bin.','I need help because I am ill.','من کمک لازم دارم چون بیمار هستم.']],4:[['Meiner Meinung nach ist Erfahrung wichtig.','In my opinion, experience is important.','به نظر من تجربه مهم است.'],['Wir müssen die Entscheidung erklären.','We must explain the decision.','ما باید تصمیم را توضیح دهیم.']],5:[['Nachhaltige Lösungen ermöglichen Veränderung.','Sustainable solutions enable change.','راه‌حل‌های پایدار تغییر را ممکن می‌سازند.'],['Die Auswirkung dieser Herausforderung ist groß.','The impact of this challenge is large.','تأثیر این چالش زیاد است.']],6:[['Wir berücksichtigen die Zielsetzung angemessen.','We take the objective appropriately into account.','ما هدف‌گذاری را به‌طور مناسب در نظر می‌گیریم.'],['Ihre Rückmeldung ist wesentlich.','Your feedback is substantial.','بازخورد شما اساسی است.']],7:[['Könnten Sie das bitte erklären?','Could you please explain that?','ممکن است لطفاً آن را توضیح دهید؟'],['Was würden Sie empfehlen?','What would you recommend?','شما چه توصیه‌ای می‌کنید؟']]};
lessons.forEach(l=>l.sentences=sentenceSets[l.n]||[]);
function lessonItems(l){return [...l.words.map((w,i)=>({id:`${l.n}-w-${i}`,de:w[0],en:w[1],fa:w[2],kind:'Wort'})),...l.sentences.map((w,i)=>({id:`${l.n}-s-${i}`,de:w[0],en:w[1],fa:w[2],kind:'Satz'}))]}
buildQuiz=function(){const items=lessonItems(lesson()),count=Math.max(1,Math.ceil(items.length*.75)),targets=shuffle(items).slice(0,count);return targets.map(item=>{const choices=shuffle([item.en,...shuffle(items.filter(x=>x.en!==item.en)).map(x=>x.en).slice(0,3)]);return {q:`Was bedeutet „${item.de}“?`,type:'single',a:choices,correct:[choices.indexOf(item.en)],source:item};})}
renderLearn=function(){const l=lesson(),complete=state.completed.includes(l.n),sentences=l.sentences||[];$('#learn').innerHTML=`<article class="card"><span class="tag">${l.level} · Lektion ${l.n}</span><h2>${l.title}</h2><p>${l.goal}</p><div class="progress"><i style="width:${(state.completed.length/lessons.length)*100}%"></i></div><p class="meta">${state.completed.length} von ${lessons.length} Lektionen abgeschlossen · Quiz: mindestens 75% des Materials, über 90% zum Weitergehen.</p><h3>Wörter</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${l.words.map(w=>`<tr><td><strong>${escape(w[0])}</strong></td><td>${escape(w[1])}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><h3>Sätze mit den neuen Wörtern</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${sentences.map(w=>`<tr><td><strong>${escape(w[0])}</strong></td><td>${escape(w[1])}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><button class="primary" onclick="showQuiz()">${complete?'Quiz erneut machen':'Zum Quiz'}</button></article><div id="quiz"></div>`}
submitQuiz=async function(){const l=lesson(),quiz=activeQuiz;let ok=0;quiz.forEach((q,i)=>{const field=$(`#quiz [data-q="${i}"]`),got=[...field.querySelectorAll('input:checked')].map(x=>+x.value),good=JSON.stringify(got)===JSON.stringify(q.correct);if(good)ok++;field.querySelectorAll('label.quiz-option').forEach((label,j)=>{const selected=label.querySelector('input').checked;if(q.correct.includes(j))label.classList.add('answer-correct');else if(selected)label.classList.add('answer-wrong')});api('/api/review',{id:q.source.id,correct:good});});const score=ok/quiz.length,passed=score>.9;state=await api('/api/lesson-result',{lesson:l.n,score,total:quiz.length,passed});$('#feedback').innerHTML=`<p class="quiz-summary">${Math.round(score*100)}% — ${passed?'Lektion abgeschlossen. Die nächste Lektion ist freigeschaltet.':'Für die nächste Lektion brauchst du mehr als 90%. Falsche Antworten wurden für Wiederholung vorgemerkt.'}</p>`;updateHeader();if(passed){current=Math.min(l.n+1,lessons.length);setTimeout(renderLearn,700)}}
renderReview=function(){const catalog=lessons.flatMap(lessonItems),list=(state.due||[]).map(id=>catalog.find(x=>x.id===id)||null).filter(Boolean);$('#review').innerHTML=`<article class="card"><h2>Wiederholen</h2><p>${list.length?'Falsche oder fällige Inhalte für dein persönliches Wiederholungstraining.':'Heute ist nichts fällig.'}</p>${list.map(x=>`<div class="card"><span class="tag">${x.kind}</span><strong>${escape(x.de)}</strong><p>${escape(x.en)} · <span class="fa">${escape(x.fa)}</span></p><button onclick="review('${x.id}',true)">Ich wusste es</button> <button onclick="review('${x.id}',false)">Noch üben</button></div>`).join('')}</article>`}


function speakText(value,lang){const text=decodeURIComponent(value);if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=lang;window.speechSynthesis.speak(utterance)}
function optionFa(en){const item=lessonItems(lesson()).find(x=>x.en===en);return item?item.fa:''}
buildQuiz=function(){const items=lessonItems(lesson()),needed=Math.max(1,Math.ceil(items.length*.75)),selected=shuffle(items).slice(0,needed),questions=[];for(let i=0;i<selected.length;i++){const item=selected[i];if(i%4===3){questions.push({type:'text',q:`Schreibe auf Deutsch: „${item.en}“`,fa:item.fa,correctText:item.de.toLowerCase(),acceptedText:[item.de.toLowerCase()],sources:[item]});continue}if(i%4===2&&i+1<selected.length){const pair=selected[++i],wrong=shuffle(items.filter(x=>x.en!==item.en&&x.en!==pair.en)).slice(0,2),opts=shuffle([item,pair,...wrong]);questions.push({type:'multi',q:`Wähle alle richtigen Übersetzungen: „${item.de}“ und „${pair.de}“`,fa:`${item.fa} / ${pair.fa}`,a:opts.map(x=>x.en),correct:opts.map((x,j)=>x===item||x===pair?j:null).filter(x=>x!==null),sources:[item,pair]});continue}const opts=shuffle([item,...shuffle(items.filter(x=>x.en!==item.en)).slice(0,3)]);questions.push({type:'single',q:`Was bedeutet „${item.de}“?`,fa:item.fa,a:opts.map(x=>x.en),correct:[opts.findIndex(x=>x===item)],sources:[item]})}return questions}
showQuiz=function(){activeQuiz=buildQuiz();$('#quiz').innerHTML=`<article class="card"><h2>Kurzer Check</h2><p class="meta">Zufällig · mindestens 75% dieser Lektion · mehr als 90% zum Weitergehen</p>${activeQuiz.map((q,i)=>`<fieldset data-q="${i}"><legend>${i+1}. ${q.q}</legend>${q.type==='text'?'<input aria-label="Antwort" type="text" autocomplete="off">':q.a.map((a,j)=>`<label class="quiz-option"><input type="${q.type==='multi'?'checkbox':'radio'}" name="q${i}" value="${j}"> ${escape(a)}</label>`).join('')}</fieldset>`).join('')}<button class="primary" onclick="submitQuiz()">Antworten prüfen</button><button onclick="showQuiz()">Neue zufällige Fragen</button><div id="feedback"></div></article>`;$('#quiz').scrollIntoView({behavior:'smooth'})}
submitQuiz=async function(){const l=lesson(),pending=[];let ok=0;activeQuiz.forEach((q,i)=>{const field=$(`#quiz [data-q="${i}"]`),got=q.type==='text'?[field.querySelector('input').value.trim().toLowerCase()]:[...field.querySelectorAll('input:checked')].map(x=>+x.value),good=q.type==='text'?(q.acceptedText||[q.correctText]).includes(got[0]):JSON.stringify(got.sort())===JSON.stringify(q.correct);if(good)ok++;if(q.type==='text'){const input=field.querySelector('input');input.classList.add(good?'answer-correct':'answer-wrong');field.insertAdjacentHTML('beforeend',`<p class="answer-note ${good?'answer-correct':'answer-wrong'}">${good?'Richtig.':'Richtige Antwort: '+escape(q.correctText)}</p>`)}else{field.querySelectorAll('label.quiz-option').forEach((label,j)=>{if(q.correct.includes(j))label.classList.add('answer-correct');else if(label.querySelector('input').checked)label.classList.add('answer-wrong')})}field.querySelectorAll('input').forEach(input=>input.disabled=true);q.sources.forEach(x=>pending.push(api('/api/review',{id:x.id,correct:good})))});const score=ok/activeQuiz.length,passed=score>.9;await Promise.all(pending);state=await api('/api/lesson-result',{lesson:l.n,score,total:activeQuiz.length,passed});state=await api('/api/state');renderReview();$('#feedback').innerHTML=`<p class="quiz-summary">${Math.round(score*100)}% — ${passed?'Lektion abgeschlossen.':'Mehr als 90% sind nötig; falsche Antworten stehen jetzt unter Wiederholen.'}</p>${passed&&l.n<lessons.length?'<button class="primary" onclick="goNextLesson()">Nächste Lektion</button>':''}`;updateHeader()}
function goNextLesson(){current=Math.min(current+1,lessons.length);renderLearn();window.scrollTo({top:0,behavior:'smooth'})}
renderLearn=function(){const l=lesson(),complete=state.completed.includes(l.n),s=l.sentences||[],audio=(t,lang)=>`<button class="audio" aria-label="Anhören" onclick="speakText('${encodeURIComponent(t)}','${lang}')">🔊</button>`;$('#learn').innerHTML=`<article class="card"><span class="tag">${l.level} · Lektion ${l.n}</span><h2>${l.title}</h2><p>${l.goal}</p><div class="progress"><i style="width:${(state.completed.length/lessons.length)*100}%"></i></div><p class="meta">${state.completed.length}/${lessons.length} abgeschlossen · Quiz: ≥75% Abdeckung, >90% zum Weitergehen.</p><h3>Wörter</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${l.words.map(w=>`<tr><td><strong>${escape(w[0])}</strong> ${audio(w[0],'de-DE')}</td><td>${escape(w[1])} ${audio(w[1],'en-US')}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><h3>Sätze mit den neuen Wörtern</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${s.map(w=>`<tr><td><strong>${escape(w[0])}</strong> ${audio(w[0],'de-DE')}</td><td>${escape(w[1])} ${audio(w[1],'en-US')}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><button class="primary" onclick="showQuiz()">${complete?'Quiz erneut machen':'Zum Quiz'}</button></article><div id="quiz"></div>`}


let activeProfile=localStorage.getItem('deutsch-profile')||'learner1';
api=async function(path,body){const sep=path.includes('?')?'&':'?';const r=await fetch(`${path}${sep}profile=${activeProfile}`,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});return r.json()}
updateHeader=function(){const name=activeProfile==='learner1'?'Learner 1':'Learner 2';$('#dueBadge').textContent=state.due&&state.due.length?state.due.length:'';$('#status').textContent=`${name} · Lektion ${current}/${lessons.length} · ${state.completed.length}/${lessons.length} abgeschlossen`}
async function switchProfile(){activeProfile=$('#profileSelect').value;localStorage.setItem('deutsch-profile',activeProfile);state=await api('/api/state');current=Math.min(state.lastLesson||1,lessons.length);updateHeader();renderLearn();renderReview();renderRoadmap()}
(function(){const select=$('#profileSelect');if(select){select.value=activeProfile;select.onchange=switchProfile;switchProfile()}})();

const grammarByLesson={
1:{title:'Personalpronomen und sein',explanation:'Du lernst die Personalpronomen ich und du sowie die wichtigsten Formen von sein. Damit kannst du dich vorstellen und einfache Informationen geben.',examples:[['Ich bin Learner 1.','I am Learner 1.','من الکس هستم.'],['Du bist hier.','You are here.','تو اینجا هستی.'],['Wer bist du?','Who are you?','تو چه کسی هستی؟']]},
2:{title:'Der, die, das und einfache Sätze',explanation:'Nomen haben ein grammatisches Geschlecht. In einfachen Hauptsätzen steht das Verb normalerweise an zweiter Stelle.',examples:[['Die Mutter arbeitet zu Hause.','The mother works at home.','مادر در خانه کار می‌کند.'],['Der Vater trinkt Wasser.','The father drinks water.','پدر آب می‌نوشد.'],['Das Kind lernt Deutsch.','The child learns German.','کودک آلمانی یاد می‌گیرد.']]},
3:{title:'Zeitangaben und weil',explanation:'Zeitwörter wie gestern und morgen ordnen Ereignisse ein. Nach weil steht das Verb am Ende des Nebensatzes.',examples:[['Morgen reise ich nach Berlin.','Tomorrow I travel to Berlin.','فردا به برلین سفر می‌کنم.'],['Ich bleibe zu Hause, weil ich krank bin.','I stay at home because I am ill.','در خانه می‌مانم چون بیمار هستم.'],['Gestern habe ich Hilfe gebraucht.','Yesterday I needed help.','دیروز به کمک نیاز داشتم.']]},
4:{title:'Meinung ausdrücken und obwohl',explanation:'Mit Meiner Meinung nach formulierst du eine begründete Position. Obwohl leitet einen Gegensatz ein; das Verb steht am Ende des Nebensatzes.',examples:[['Meiner Meinung nach ist Erfahrung wichtig.','In my opinion, experience is important.','به نظر من تجربه مهم است.'],['Obwohl es schwierig ist, verbessere ich mich.','Although it is difficult, I improve.','با اینکه سخت است، پیشرفت می‌کنم.'],['Ich erkläre, warum ich so entscheide.','I explain why I decide that way.','توضیح می‌دهم چرا این‌گونه تصمیم می‌گیرم.']]},
5:{title:'Infinitiv mit zu und präzise Verbindungen',explanation:'Mit um ... zu drückst du ein Ziel aus. Allerdings verbindet Aussagen mit einer Einschränkung oder einem Gegensatz.',examples:[['Wir arbeiten daran, nachhaltiger zu leben.','We work on living more sustainably.','برای پایدارتر زندگی کردن تلاش می‌کنیم.'],['Die Lösung ermöglicht es, Energie zu sparen.','The solution makes it possible to save energy.','این راه‌حل امکان صرفه‌جویی در انرژی را فراهم می‌کند.'],['Die Idee ist gut, allerdings teuer.','The idea is good, however expensive.','ایده خوب است، اما گران است.']]},
6:{title:'Formeller Stil und Partizipien',explanation:'Auf C1 verwendest du präzise, formelle Formulierungen. Partizipien können Nomen genauer beschreiben.',examples:[['Die berücksichtigten Ziele sind eindeutig.','The objectives taken into account are unambiguous.','اهداف در نظر گرفته‌شده روشن هستند.'],['Hinsichtlich der Zielsetzung ist die Rückmeldung wesentlich.','Regarding the objective, the feedback is substantial.','در خصوص هدف‌گذاری، بازخورد اساسی است.'],['Die angemessen formulierte Antwort überzeugt.','The appropriately formulated answer convinces.','پاسخِ مناسب‌بیان‌شده قانع‌کننده است.']]},
7:{title:'Höfliche Fragen und Gesprächsbausteine',explanation:'Für Gespräche nutzt du höfliche Fragen und feste Redemittel. Könnten Sie ...? ist formell und höflich.',examples:[['Könnten Sie das bitte erklären?','Could you please explain that?','ممکن است لطفاً آن را توضیح دهید؟'],['Was würden Sie empfehlen?','What would you recommend?','شما چه توصیه‌ای می‌کنید؟'],['Ich bin der Meinung, dass wir warten sollten.','I am of the opinion that we should wait.','من معتقدم که باید صبر کنیم.']]}
};
function renderGrammar(){const g=grammarByLesson[current]||grammarByLesson[1];$('#grammar').innerHTML=`<article class="card"><span class="tag">${lesson().level} · Grammatik zu Lektion ${current}</span><h2>${g.title}</h2><p>${g.explanation}</p><h3>Beispiele</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${g.examples.map(x=>`<tr><td><strong>${escape(x[0])}</strong> <button class="audio" onclick="speakText('${encodeURIComponent(x[0])}','de-DE')">🔊</button></td><td>${escape(x[1])} <button class="audio" onclick="speakText('${encodeURIComponent(x[1])}','en-US')">🔊</button></td><td class="fa">${escape(x[2])}</td></tr>`).join('')}</tbody></table><p class="meta">Diese Grammatik gehört nur zur aktuellen Lektion. Weitere Themen werden freigeschaltet, wenn du im Lernweg weitergehst.</p></article>`}
const previousSwitchProfile=switchProfile;switchProfile=async function(){await previousSwitchProfile();renderGrammar()};
const previousRenderLearn=renderLearn;renderLearn=function(){previousRenderLearn();renderGrammar()};
const navGrammarWatcher=setInterval(()=>{const grammar=$('#grammar');if(grammar&&!grammar.innerHTML)renderGrammar();clearInterval(navGrammarWatcher)},100);

function closeQuiz(){const modal=$('#quizModal');if(modal)modal.remove()}
showQuiz=function(){activeQuiz=buildQuiz();closeQuiz();document.body.insertAdjacentHTML('beforeend',`<div id="quizModal" class="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quizTitle"><div class="quiz-dialog"><div class="quiz-dialog-head"><h2 id="quizTitle">Kurzer Check</h2><button class="modal-close" aria-label="Quiz schließen" onclick="closeQuiz()">×</button></div><p class="meta">Zufällig · mindestens 75% dieser Lektion · mehr als 90% zum Weitergehen</p><div id="quiz">${activeQuiz.map((q,i)=>`<fieldset data-q="${i}"><legend>${i+1}. ${q.q}</legend>${q.type==='text'?'<input aria-label="Antwort" type="text" autocomplete="off">':q.a.map((a,j)=>`<label class="quiz-option"><input type="${q.type==='multi'?'checkbox':'radio'}" name="q${i}" value="${j}"> ${escape(a)} <span class="fa">${escape(optionFa(a))}</span></label>`).join('')}</fieldset>`).join('')}<button class="primary" onclick="submitQuiz()">Antworten prüfen</button><button onclick="showQuiz()">Neue zufällige Fragen</button><div id="feedback"></div></div></div></div>`)}
goNextLesson=function(){closeQuiz();current=Math.min(current+1,lessons.length);renderLearn();window.scrollTo({top:0,behavior:'smooth'})}

function renderMixedInsideLearn(){const host=$('#learn');if(!host)return;host.insertAdjacentHTML('beforeend',`<article class="card"><span class="tag">Gemischtes Training</span><h2>Wörter & Sätze</h2><p>Wiederhole einzelne Wörter und ganze Sätze direkt im Lernbereich.</p><div class="practice-grid">${practiceItems.map((x,i)=>`<button class="practice-card" onclick="flipPractice(${i})"><span class="tag">${x.kind} · ${x.note}</span><strong>${escape(x.de)}</strong><span id="practice-${i}" class="practice-answer">Übersetzung anzeigen</span></button>`).join('')}</div></article>`)}
const lessonRenderWithPractice=renderLearn;renderLearn=function(){lessonRenderWithPractice();renderMixedInsideLearn()};
function openRoadmap(){document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));$('#roadmap').classList.remove('hidden');renderRoadmap();window.scrollTo({top:0,behavior:'smooth'})}

renderLearn=function(){const l=lesson(),complete=state.completed.includes(l.n),s=l.sentences||[],audio=(t,lang)=>`<button class="audio" aria-label="Anhören" onclick="speakText('${encodeURIComponent(t)}','${lang}')">🔊</button>`;$('#learn').innerHTML=`<article class="card"><span class="tag">${l.level} · Lektion ${l.n}</span><h2>${l.title}</h2><p>${l.goal}</p><div class="progress"><i style="width:${(state.completed.length/lessons.length)*100}%"></i></div><p class="meta">${state.completed.length}/${lessons.length} abgeschlossen · Quiz: ≥75% Abdeckung, >90% zum Weitergehen.</p><h3>Wörter</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${l.words.map(w=>`<tr><td><strong>${escape(w[0])}</strong> ${audio(w[0],'de-DE')}</td><td>${escape(w[1])} ${audio(w[1],'en-US')}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><h3>Sätze mit den neuen Wörtern</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${s.map(w=>`<tr><td><strong>${escape(w[0])}</strong> ${audio(w[0],'de-DE')}</td><td>${escape(w[1])} ${audio(w[1],'en-US')}</td><td class="fa">${escape(w[2])}</td></tr>`).join('')}</tbody></table><button class="primary" onclick="showQuiz()">${complete?'Quiz erneut machen':'Zum Quiz'}</button></article><div id="quiz-slot"></div>`;renderGrammar()}
function closeRoadmap(){const modal=$('#roadmapModal');if(modal)modal.remove()}
openRoadmap=function(){closeRoadmap();document.body.insertAdjacentHTML('beforeend',`<div id="roadmapModal" class="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="roadmapTitle"><div class="quiz-dialog"><div class="quiz-dialog-head"><h2 id="roadmapTitle">Endlicher Lernplan</h2><button class="modal-close" aria-label="Lernplan schließen" onclick="closeRoadmap()">×</button></div><p>Ein klarer Weg von A1 bis C1, danach Sätze und Gespräche.</p><ol class="roadmap">${roadmap.map(r=>`<li><strong>${r[0]}</strong><br><span class="meta">${r[1]}</span></li>`).join('')}</ol></div></div>`)}

let videoCatalog=[];
async function renderVideos(){const host=$('#videos');host.innerHTML='<article class="card"><h2>Video-Bibliothek</h2><p class="meta">Lade Videos aus Deutschkurs …</p></article>';try{videoCatalog=await api('/api/videos');showVideoList(videoCatalog)}catch(error){host.innerHTML=`<article class="card"><h2>Video-Bibliothek</h2><p>Videos konnten nicht geladen werden.</p></article>`}}
function showVideoList(items){const host=$('#videos');host.innerHTML=`<article class="card"><h2>Video-Bibliothek</h2><input class="video-search" placeholder="Videos durchsuchen" oninput="filterVideos(this.value)"><p class="meta">${items.length} Videos · Quelle: Deutschkurs</p><div class="video-list">${items.slice(0,250).map(v=>`<button class="video-item" onclick="playVideo('${encodeURIComponent(v.path)}','${escape(v.name).replace(/'/g,'&#39;')}')">▶ <span>${escape(v.name)}</span></button>`).join('')}</div></article>`}
function filterVideos(value){const needle=value.toLowerCase();showVideoList(videoCatalog.filter(v=>v.name.toLowerCase().includes(needle)))}
function playVideo(encoded,title){const path=decodeURIComponent(encoded);const old=$('#videoModal');if(old)old.remove();document.body.insertAdjacentHTML('beforeend',`<div id="videoModal" class="quiz-modal" role="dialog" aria-modal="true"><div class="quiz-dialog video-dialog"><div class="quiz-dialog-head"><h2>${title}</h2><button class="modal-close" onclick="document.querySelector('#videoModal').remove()">×</button></div><video controls autoplay playsinline src="/api/video?file=${encodeURIComponent(path)}"></video></div></div>`)}
const existingNavHandler=document.querySelectorAll('nav button');existingNavHandler.forEach(button=>{if(button.dataset.view==='videos')button.onclick=()=>{document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));$('#videos').classList.remove('hidden');button.classList.add('active');renderVideos()}});

let videoFolder='';
renderVideos=async function(folder=''){videoFolder=folder;const host=$('#videos');host.innerHTML='<article class="card"><h2>Video-Bibliothek</h2><p class="meta">Lade Ordner …</p></article>';try{const entries=await api('/api/video-folder?folder='+encodeURIComponent(folder));const crumbs=folder?folder.split('/'):[];host.innerHTML=`<article class="card"><h2>Video-Bibliothek</h2><p class="video-path">Deutschkurs${crumbs.length?' › '+escape(folder):''}</p>${folder?'<button onclick="openVideoFolder(videoFolder.split(\'/\').slice(0,-1).join(\'/\'))">← Übergeordneter Ordner</button>':''}<div class="video-list">${entries.map(e=>e.type==='folder'?`<button class="video-item folder-item" onclick="openVideoFolder('${encodeURIComponent(e.path)}')">📁 <span>${escape(e.name)}</span></button>`:`<button class="video-item" onclick="playVideo('${encodeURIComponent(e.path)}','${escape(e.name).replace(/'/g,'&#39;')}')">▶ <span>${escape(e.name)}</span></button>`).join('')||'<p>Keine Videos in diesem Ordner.</p>'}</div></article>`}catch(error){host.innerHTML='<article class="card"><h2>Video-Bibliothek</h2><p>Videos konnten nicht geladen werden.</p></article>'}}
function openVideoFolder(encoded){renderVideos(decodeURIComponent(encoded))}
playVideo=async function(encoded,title){const path=decodeURIComponent(encoded),old=$('#videoModal');if(old)old.remove();const progress=await api('/api/video-progress');const saved=progress[path]||{};document.body.insertAdjacentHTML('beforeend',`<div id="videoModal" class="quiz-modal" role="dialog" aria-modal="true"><div class="quiz-dialog video-dialog"><div class="quiz-dialog-head"><h2>${title}</h2><button class="modal-close" onclick="closeVideoPlayer()" aria-label="Video schließen">×</button></div><div id="coursePlayer" class="course-player"><video id="courseVideo" controls autoplay playsinline src="/api/video?file=${encodeURIComponent(path)}"></video><div class="video-skip-controls" aria-label="Video-Navigation"><button type="button" onclick="seekCourseVideo(-10)" aria-label="10 Sekunden zurück">↶ <span>10 Sek.</span></button><button type="button" onclick="seekCourseVideo(10)" aria-label="10 Sekunden vor">↷ <span>10 Sek.</span></button><button type="button" class="video-fullscreen" onclick="toggleCourseFullscreen()" aria-label="Video im Vollbild öffnen">⛶ <span>Vollbild</span></button></div></div><p class="meta">Der Fortschritt wird automatisch nur für dein aktuelles Profil gespeichert.</p></div></div>`);const video=$('#courseVideo');let last=0;video.addEventListener('loadedmetadata',()=>{if(saved.position&&saved.position<video.duration-5)video.currentTime=saved.position});video.addEventListener('timeupdate',()=>{if(video.currentTime-last>=10){last=video.currentTime;api('/api/video-progress',{path,position:video.currentTime,duration:video.duration})}});video.addEventListener('ended',()=>api('/api/video-progress',{path,position:0,duration:video.duration}))}
function seekCourseVideo(seconds){const video=$('#courseVideo');if(!video)return;const duration=Number.isFinite(video.duration)?video.duration:Infinity;video.currentTime=Math.max(0,Math.min(duration,video.currentTime+seconds));}
async function toggleCourseFullscreen(){const player=$('#coursePlayer');if(!player)return;const active=document.fullscreenElement||document.webkitFullscreenElement;if(active){const exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document);return}const open=player.requestFullscreen||player.webkitRequestFullscreen;if(open)await open.call(player);}
function closeVideoPlayer(){const video=$('#courseVideo');if(video){const src=new URL(video.src);const path=decodeURIComponent(src.searchParams.get('file')||'');api('/api/video-progress',{path,position:video.currentTime,duration:video.duration})}const modal=$('#videoModal');if(modal)modal.remove()}

const grammarTranslations={
1:{en:'Learn ich and du, and the most important forms of sein. Use them to introduce yourself and give simple information.',fa:'ضمیرهای ich و du و مهم‌ترین شکل‌های فعل sein را یاد می‌گیری. با آن‌ها می‌توانی خودت را معرفی کنی و اطلاعات ساده بدهی.'},
2:{en:'Every noun has a gender: der, die, or das. In a simple sentence, the verb usually comes in the second position.',fa:'هر اسم یک جنس دستوری دارد: der، die یا das. در یک جمله ساده، فعل معمولاً در جایگاه دوم قرار می‌گیرد.'},
3:{en:'Words such as gestern and morgen show time. After weil, the verb goes to the end of the second part of the sentence.',fa:'کلماتی مانند gestern و morgen زمان را نشان می‌دهند. بعد از weil، فعل به انتهای بخش دوم جمله می‌رود.'},
4:{en:'Use Meiner Meinung nach to give your opinion. Obwohl introduces a contrast, and its verb goes at the end.',fa:'از Meiner Meinung nach برای بیان نظر خود استفاده کن. Obwohl تضاد را معرفی می‌کند و فعل آن در انتها می‌آید.'},
5:{en:'Use um ... zu to show a goal. Allerdings adds a limitation or contrast to the sentence.',fa:'از um ... zu برای بیان هدف استفاده کن. Allerdings یک محدودیت یا تضاد به جمله اضافه می‌کند.'},
6:{en:'At C1, use clear formal language. Participles can describe a noun more precisely.',fa:'در سطح C1 از زبان رسمی و روشن استفاده کن. اسم مفعول‌ها می‌توانند یک اسم را دقیق‌تر توصیف کنند.'},
7:{en:'Use polite questions and ready-made phrases in conversations. Könnten Sie ...? is formal and polite.',fa:'در گفت‌وگوها از سؤال‌های مؤدبانه و عبارت‌های آماده استفاده کن. Könnten Sie ...? رسمی و مؤدبانه است.'}
};
Object.assign(grammarByLesson[1],{examples:[...grammarByLesson[1].examples,['Ich bin müde.','I am tired.','من خسته هستم.'],['Du bist mein Freund.','You are my friend.','تو دوست من هستی.']]});
Object.assign(grammarByLesson[2],{examples:[...grammarByLesson[2].examples,['Die Familie ist groß.','The family is big.','خانواده بزرگ است.'],['Das Kind spielt heute.','The child plays today.','کودک امروز بازی می‌کند.']]});
Object.assign(grammarByLesson[3],{examples:[...grammarByLesson[3].examples,['Heute lerne ich Deutsch.','Today I learn German.','امروز آلمانی یاد می‌گیرم.'],['Ich gehe nicht, weil es regnet.','I do not go because it is raining.','نمی‌روم چون باران می‌بارد.']]});
Object.assign(grammarByLesson[4],{examples:[...grammarByLesson[4].examples,['Meiner Meinung nach ist Deutsch interessant.','In my opinion, German is interesting.','به نظر من آلمانی جالب است.'],['Obwohl ich müde bin, lerne ich.','Although I am tired, I study.','با اینکه خسته هستم، درس می‌خوانم.']]});
Object.assign(grammarByLesson[5],{examples:[...grammarByLesson[5].examples,['Ich lerne, um besser zu sprechen.','I learn in order to speak better.','یاد می‌گیرم تا بهتر صحبت کنم.'],['Allerdings brauchen wir Zeit.','However, we need time.','با این حال، ما به زمان نیاز داریم.']]});
Object.assign(grammarByLesson[6],{examples:[...grammarByLesson[6].examples,['Die formulierte Frage ist eindeutig.','The formulated question is unambiguous.','سؤالِ بیان‌شده روشن است.'],['Die berücksichtigte Information hilft uns.','The information taken into account helps us.','اطلاعات در نظر گرفته‌شده به ما کمک می‌کند.']]});
Object.assign(grammarByLesson[7],{examples:[...grammarByLesson[7].examples,['Könnten Sie bitte langsamer sprechen?','Could you please speak more slowly?','ممکن است لطفاً آهسته‌تر صحبت کنید؟'],['Ich würde gern mehr wissen.','I would like to know more.','مایلم بیشتر بدانم.']]});
renderGrammar=function(){const g=grammarByLesson[current]||grammarByLesson[1],t=grammarTranslations[current]||grammarTranslations[1];$('#grammar').innerHTML=`<article class="card"><span class="tag">${lesson().level} · Grammatik zu Lektion ${current}</span><h2>${g.title}</h2><div class="grammar-explanation"><p><strong>Deutsch</strong><br>${escape(g.explanation)}</p><p><strong>English</strong><br>${escape(t.en)}</p><p class="fa"><strong>فارسی</strong><br>${escape(t.fa)}</p></div><h3>Beispiele</h3><table><thead><tr><th>Deutsch</th><th>English</th><th>فارسی</th></tr></thead><tbody>${g.examples.map(x=>`<tr><td><strong>${escape(x[0])}</strong> <button class="audio" onclick="speakText('${encodeURIComponent(x[0])}','de-DE')">🔊</button></td><td>${escape(x[1])} <button class="audio" onclick="speakText('${encodeURIComponent(x[1])}','en-US')">🔊</button></td><td class="fa">${escape(x[2])}</td></tr>`).join('')}</tbody></table><div class="grammar-explanation grammar-note"><p><strong>Deutsch</strong><br>Diese Grammatik gehört nur zur aktuellen Lektion.</p><p><strong>English</strong><br>This grammar belongs only to the current lesson.</p><p class="fa"><strong>فارسی</strong><br>این گرامر فقط مربوط به درس فعلی است.</p></div></article>`}


// Keep review state complete after one review action, so only the answered item disappears.
review=async function(id,correct){
  await api('/api/review',{id,correct});
  state=await api('/api/state');
  renderReview();
  updateHeader();
};

function openCurrentGrammar(){
  closeQuiz();
  document.querySelectorAll('.view').forEach(view=>view.classList.add('hidden'));
  document.querySelectorAll('nav button').forEach(button=>button.classList.remove('active'));
  $('#grammar').classList.remove('hidden');
  const grammarButton=[...document.querySelectorAll('nav button')].find(button=>button.dataset.view==='grammar');
  if(grammarButton)grammarButton.classList.add('active');
  renderGrammar();
  window.scrollTo({top:0,behavior:'smooth'});
}

function completeGrammarAndNext(){
  if(!state.completed.includes(current))return;
  current=Math.min(current+1,lessons.length);
  document.querySelectorAll('.view').forEach(view=>view.classList.add('hidden'));
  document.querySelectorAll('nav button').forEach(button=>button.classList.remove('active'));
  $('#learn').classList.remove('hidden');
  const learnButton=[...document.querySelectorAll('nav button')].find(button=>button.dataset.view==='learn');
  if(learnButton)learnButton.classList.add('active');
  renderLearn();
  window.scrollTo({top:0,behavior:'smooth'});
}

const renderGrammarWithLessonHandoff=renderGrammar;
renderGrammar=function(){
  renderGrammarWithLessonHandoff();
  const article=$('#grammar article');
  if(!article)return;
  if(state.completed.includes(current)&&current<lessons.length){
    article.insertAdjacentHTML('beforeend','<div class="grammar-next"><h3>Grammatik gelernt?</h3><p>Wenn du die Beispiele verstanden hast, fahre mit der nächsten Lektion fort.</p><button class="primary" onclick="completeGrammarAndNext()">Grammatik gelernt – nächste Lektion</button></div>');
  }else if(state.completed.includes(current)){
    article.insertAdjacentHTML('beforeend','<div class="grammar-next"><p>Du hast auch die Grammatik der letzten Lektion abgeschlossen.</p></div>');
  }
};

submitQuiz=async function(){
  const l=lesson(),pending=[];let ok=0;
  activeQuiz.forEach((q,i)=>{
    const field=$(`#quiz [data-q="${i}"]`);
    const got=q.type==='text'?[field.querySelector('input').value.trim().toLowerCase()]:[...field.querySelectorAll('input:checked')].map(input=>+input.value);
    const good=q.type==='text'?(q.acceptedText||[q.correctText]).includes(got[0]):JSON.stringify(got.sort())===JSON.stringify(q.correct);
    if(good)ok++;
    if(q.type==='text'){
      const input=field.querySelector('input');
      input.classList.add(good?'answer-correct':'answer-wrong');
      field.insertAdjacentHTML('beforeend',`<p class="answer-note ${good?'answer-correct':'answer-wrong'}">${good?'Richtig.':'Richtige Antwort: '+escape(q.correctText)}</p>`);
    }else{
      field.querySelectorAll('label.quiz-option').forEach((label,j)=>{
        if(q.correct.includes(j))label.classList.add('answer-correct');
        else if(label.querySelector('input').checked)label.classList.add('answer-wrong');
      });
    }
    field.querySelectorAll('input').forEach(input=>input.disabled=true);
    q.sources.forEach(source=>pending.push(api('/api/review',{id:source.id,correct:good})));
  });
  const score=ok/activeQuiz.length,passed=score>.9;
  await Promise.all(pending);
  await api('/api/lesson-result',{lesson:l.n,score,total:activeQuiz.length,passed});
  state=await api('/api/state');
  renderReview();
  $('#feedback').innerHTML=`<p class="quiz-summary">${Math.round(score*100)}% — ${passed?'Lektion abgeschlossen. Wiederhole jetzt die Grammatik dieser Lektion.':'Mehr als 90% sind nötig; falsche Antworten stehen jetzt unter Wiederholen.'}</p>${passed?'<button class="primary" onclick="openCurrentGrammar()">Grammatik zu dieser Lektion</button>':''}`;
  updateHeader();
};

// Load the expanded original course without changing the app's screens or interactions.
if(window.DEUTSCH_CURRICULUM){
  const course=window.DEUTSCH_CURRICULUM;
  lessons.splice(0,lessons.length,...course.units);
  roadmap.splice(0,roadmap.length,...course.roadmap);
  Object.keys(grammarByLesson).forEach(key=>delete grammarByLesson[key]);
  course.units.forEach(unit=>{
    const [title,en,fa]=unit.grammar;
    grammarByLesson[unit.n]={title,explanation:'In dieser Einheit lernst du '+title+'. Lies die Beispiele aufmerksam und achte auf die Satzstellung.',examples:unit.sentences};
    grammarTranslations[unit.n]={en,fa};
  });
}

// Integrate supplied source vocabularies into normal-sized, level-specific lessons.
if(window.DEUTSCH_CURRICULUM&&window.IMPORTED_VOCABULARY){
  const sequence=['A1','A2','B1','B2','C1'];
  const imported=window.IMPORTED_VOCABULARY;
  const extras=[];
  const groupKey=item=>`${item.level}|${item.source}`;
  sequence.forEach(level=>{
    extras.push(...window.DEUTSCH_CURRICULUM.units.filter(unit=>unit.level===level));
    const groups={};
    imported.filter(item=>item.level===level).forEach(item=>(groups[groupKey(item)]??=[]).push(item));
    Object.entries(groups).forEach(([key,items])=>{
      const [,source]=key.split('|');
      const words=items.filter(item=>item.kind==='word');
      const phrases=items.filter(item=>item.kind==='phrase');
      for(let offset=0,part=1;offset<words.length;offset+=12,part++){
        const batch=words.slice(offset,offset+12);
        const sentenceBatch=phrases.slice((part-1)*3,part*3);
        extras.push({
          level,
          title:`${level} · Zusatzwortschatz ${part}`,
          goal:`Quellenbasierter Wortschatz: ${source}.`,
          grammar:['Wortschatz festigen','Review the words and expressions in this set, then use them in a short context.','واژه‌ها و عبارت‌های این بخش را مرور کن و سپس آن‌ها را در یک بافت کوتاه به کار ببر.'],
          words:batch.map(item=>[item.de,item.en||'—',item.fa||'—']),
          sentences:sentenceBatch.map(item=>[item.de,item.en||'—',item.fa||'—'])
        });
      }
    });
  });
  extras.forEach((unit,index)=>unit.n=index+1);
  lessons.splice(0,lessons.length,...extras);
  Object.keys(grammarByLesson).forEach(key=>delete grammarByLesson[key]);
  extras.forEach(unit=>{
    const [title,en,fa]=unit.grammar;
    grammarByLesson[unit.n]={title,explanation:'In dieser Einheit lernst du '+title+'. Lies die Beispiele aufmerksam und achte auf die Satzstellung.',examples:unit.sentences.length?unit.sentences:[[unit.title,'Vocabulary review','مرور واژگان']]};
    grammarTranslations[unit.n]={en,fa};
  });
  roadmap.splice(0,roadmap.length,...sequence.map(level=>[level,`${extras.filter(unit=>unit.level===level).length} Lektionen · Kernkurs und zusätzlicher Wortschatz aus deinen Quellen`]));
}
