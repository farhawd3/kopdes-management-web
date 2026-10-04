import fs from 'node:fs';
import postcss from 'postcss';

function fontToken(pixels) {
 if (pixels >= 20) return 'var(--fs-title)';
 if (pixels >= 16) return 'var(--fs-h2)';
 if (pixels >= 13.5) return 'var(--fs-body)';
 if (pixels >= 13) return 'var(--fs-label)';
 if (pixels >= 11.5) return 'var(--fs-caption)';
 return 'var(--fs-overline)';
}
function radiusToken(pixels) {
 if (pixels === 0) return '0';
 if (pixels >= 100) return 'var(--r-full)';
 if (pixels <= 7) return 'var(--r-sm)';
 if (pixels <= 12) return 'var(--r-md)';
 return 'var(--r-lg)';
}
export function normalizeCss(source) {
 const root=postcss.parse(source);
 let fonts=0,radii=0;
 root.walkDecls(declaration=>{
  const value=declaration.value.trim();
  if(declaration.prop==='font-size') {
   const alias=/^var\(--([^,)]+)(?:,[^)]+)?\)$/.exec(value)?.[1];
   if(alias && !alias.startsWith('fs-')) {
    const token=alias.includes('title') ? (alias.includes('page') ? 'title' : 'h2') : alias.includes('xs')||alias.includes('th-font') ? 'caption' : alias.includes('sm') ? 'label' : 'body';
    declaration.value=`var(--fs-${token})`;fonts++;
   }
   const numeric=/^([\d.]+)(px|rem|em)$/.exec(value);
   if(numeric && Number(numeric[1])>0) {declaration.value=fontToken(Number(numeric[1])*(numeric[2]==='px'?1:16));fonts++;}
   else if(value.startsWith('clamp(')) {const minimum=/clamp\(([\d.]+)px/.exec(value);if(minimum){declaration.value=fontToken(Number(minimum[1]));fonts++;}}
  }
  if(declaration.prop==='border-radius') {
   const alias=/^var\(--([^,)]+)(?:,[^)]+)?\)$/.exec(value)?.[1];
   if(alias && !alias.startsWith('r-')) {
    const token=alias.includes('pill') ? 'full' : alias.includes('lg')||alias.includes('xl')||alias==='table-radius' ? 'lg' : alias.includes('xs')||alias==='radius-sm' ? 'sm' : 'md';
    declaration.value=`var(--r-${token})`;radii++;
   }
   if(/^[\d.px%\s/]+$/.test(value)) {declaration.value=value.replace(/([\d.]+)(px|%)/g,(_match,number,unit)=>radiusToken(unit==='%'?9999:Number(number)));radii++;}
  }
 });
 return {css:root.toString(),fonts,radii};
}
if(process.argv.includes('--write'))for(const file of ['src/app/personal.css','src/app/globals.css']){const result=normalizeCss(fs.readFileSync(file,'utf8'));fs.writeFileSync(file,result.css);console.log(file+': '+result.fonts+' font, '+result.radii+' radius dinormalisasi');}
