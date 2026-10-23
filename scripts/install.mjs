const ID='coc7-universal-occupations';
const PACKS=[['classic','CoC7 Universal - Classic Occupations'],['modern','CoC7 Universal - Modern Occupations'],['additional-skills','CoC7 Universal - Additional Skills']];
async function install(){
 if(!game.user.isGM)throw Error('GM access required');
 const results={};
 for(const [era,label] of PACKS){
  const data=await (await fetch(`modules/${ID}/data/${era}.json`)).json();
  let pack=game.packs.find(p=>p.metadata.label===label&&p.documentName==='Item');
  if(!pack)pack=await CompendiumCollection.createCompendium({label,name:`coc7-universal-${era}`,type:'Item',package:'world',system:'CoC7'});
  if(pack.locked)await pack.configure({locked:false});
  const index=await pack.getIndex();const existing=new Map(index.map(x=>[x.name.toLowerCase(),x._id]));
  let created=0,updated=0;
  for(const item of data){
   const oldId=existing.get(item.name.toLowerCase());
   if(oldId){const current=await pack.getDocument(oldId);await current.update({img:item.img,system:item.system,flags:item.flags});updated++;}
   else{await pack.importDocument(new Item.implementation(item,{temporary:true}));created++;}
  }
  results[era]={total:data.length,created,updated};
 }
 console.table(results);ui.notifications.info('Universal Occupations v0.7 compendiums updated. World Items untouched.');return results;
}
Hooks.once('ready',()=>{game.modules.get(ID).api={install};});
