// Isolated visual module for Codex integration; no backend or hidden-state access.
const available = ['tidal-elegance','solar-dawn','celestial-moonlit','art-nouveau'];
const rarities = ['crystal','gold','gold','silver','silver','silver'];
function node(tag, cls, parent, text){
 const e=document.createElement(tag); if(cls)e.className=cls;
 if(text!==undefined&&text!==null)e.textContent=String(text);
 parent?.append(e);return e;
}
const display=v=>v==null?'—':(typeof v==='number'?v.toLocaleString():String(v));
function stat(parent,label,value,symbol){
 const item=node('div','rs-trainer-card__stat',parent);
 node('span','rs-trainer-card__stat-icon',item,symbol).setAttribute('aria-hidden','true');
 const copy=node('span','rs-trainer-card__stat-copy',item);
 node('span','rs-trainer-card__stat-label',copy,label);
 node('strong','rs-trainer-card__stat-value',copy,display(value));
}
export function mountSagaTrainerCard(target,info={},options={}){
 if(!(target instanceof Element))throw new TypeError('Expected target DOM element');
 let theme=available.includes(options.frameStyle)?options.frameStyle:'tidal-elegance';
 const root=(options.assetRoot||'/assets/trainer-frames').replace(/\/$/,'');
 target.replaceChildren();
 const card=node('section','rs-trainer-card',target);
 card.dataset.frame=theme;
 card.dataset.useSiteAccent=String(!!options.useSiteAccent);
 card.setAttribute('aria-label',(info.name||'Trainer')+' profile');
 for(const where of ['left','right','lower']){
  node('div','rs-trainer-card__glass rs-trainer-card__glass--'+where,card).setAttribute('aria-hidden','true');
 }
 const art=node('img','rs-trainer-card__ornament',card);
 art.src=root+'/'+theme+'.svg';art.alt='';art.setAttribute('aria-hidden','true');
 node('h2','rs-trainer-card__name',card,info.name||'Trainer');
 const ident=node('div','rs-trainer-card__identity',card);
 const portrait=node('img','rs-trainer-card__portrait',ident);
 portrait.src=info.portraitUrl||options.defaultPortrait||'';
 portrait.alt=(info.name||'Trainer')+' avatar';
 node('span','rs-trainer-card__class',ident,info.trainerClass||'No Class');
 const left=node('div','rs-trainer-card__stats rs-trainer-card__stats--left',card);
 stat(left,'Balance',info.balance,'◉');
 stat(left,'Momentum',info.momentum,'↗');
 stat(left,'Badges',info.badges,'⬡');
 const right=node('div','rs-trainer-card__stats rs-trainer-card__stats--right',card);
 stat(right,'Series Record',info.seriesRecord??'0–0','♜');
 stat(right,'Overall Record',info.overallRecord??'0–0','★');
 stat(right,'Saga Points',info.sagaPoints,'✦');
 const lower=node('div','rs-trainer-card__lower',card);
 const perkPane=node('div','rs-trainer-card__lower-pane',lower);
 node('span','rs-trainer-card__lower-title',perkPane,'Perks');
 const perkSlots=node('div','rs-trainer-card__perk-slots',perkPane);
 rarities.forEach((tier,i)=>{
   const perk=info.perks?.[i];
   const b=node('button','rs-trainer-card__perk',perkSlots,perk?.icon||'◇');
   b.type='button';b.dataset.rarity=tier;
   b.title=perk?.description||perk?.name||'Empty '+tier+' perk';
   b.setAttribute('aria-label',perk?.name?tier+' perk: '+perk.name+'. '+(perk.description||''):'Empty '+tier+' perk slot');
 });
 const effectPane=node('div','rs-trainer-card__lower-pane',lower);
 node('span','rs-trainer-card__lower-title',effectPane,'Ongoing Effects');
 const effectList=node('div','rs-trainer-card__effects',effectPane);
 const effects=(info.effects||[]).filter(Boolean);
 if(!effects.length)node('span','rs-trainer-card__empty',effectList,'No active effects');
 effects.forEach(effect=>{
   const kind=effect.kind==='nerf'?'nerf':'buff';
   const b=node('button','rs-trainer-card__effect rs-trainer-card__effect--'+kind,effectList,effect.icon||(kind==='nerf'?'↓':'↑'));
   b.type='button';b.title=(effect.name||'Effect')+(effect.description?' — '+effect.description:'');
   b.setAttribute('aria-label',b.title);
 });
 return {element:card,setFrameStyle(next){
   if(!available.includes(next))throw new Error('Unknown trainer frame style: '+next);
   theme=next;card.dataset.frame=theme;art.src=root+'/'+theme+'.svg';
 }};
}
