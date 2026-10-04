import fs from 'node:fs';
import postcss from 'postcss';

/** Hanya hapus deklarasi identik yang ditimpa selector identik pada konteks yang sama. */
export function cleanCss(source) {
 const root=postcss.parse(source),seen=new Map();
 let removed=0;
 root.walkRules(rule=>{
  const ancestors=[];let parent=rule.parent;
  while(parent?.type!=='root'){ancestors.unshift(parent.name+':'+parent.params);parent=parent.parent;}
  const context=ancestors.join('|')+'|'+rule.selector;
  for(const declaration of [...rule.nodes]) {
   if(declaration.type!=='decl')continue;
   const key=context+'|'+declaration.prop;
   const previous=seen.get(key);
   if(previous && previous.parent!==rule && previous.value===declaration.value && (!previous.important || declaration.important)) {previous.remove();removed++;}
   seen.set(key,declaration);
  }
 });
 root.walkRules(rule=>{if(!rule.nodes.some(node=>node.type==='decl'||node.type==='rule'||node.type==='atrule'))rule.remove();});
 const dead=/\.(dash-stat-(?:card|top|label|value|sub|icon-wrap|icon))(?![\w-])/;
 root.walkRules(rule=>{const selectors=rule.selectors.filter(selector=>selector.includes(':is(')||selector.includes(':not(')||!dead.test(selector));if(!selectors.length)rule.remove();else rule.selectors=selectors;});
 return {css:root.toString(),removed};
}
if(process.argv.includes('--write'))for(const file of ['src/app/personal.css','src/app/globals.css','src/app/ui.css']){const result=cleanCss(fs.readFileSync(file,'utf8'));fs.writeFileSync(file,result.css);console.log(file+': '+result.removed+' deklarasi identik dihapus');}
