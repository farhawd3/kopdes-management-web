import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import postcss from 'postcss';
const files = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
    );
const names = new Set(['dark']),
  prefixes = new Set(),
  suffixes = new Set();
for (const file of files('src').filter((file) => /\.tsx?$/.test(file))) {
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  function visit(node) {
    if (
      ts.isStringLiteralLike(node) ||
      node.kind === ts.SyntaxKind.TemplateHead ||
      node.kind === ts.SyntaxKind.TemplateMiddle ||
      node.kind === ts.SyntaxKind.TemplateTail
    ) {
      for (const token of node.text.match(/[\w-]+/g) || []) {
        names.add(token);
        if (token.endsWith('-')) prefixes.add(token);
        if (token.startsWith('-')) suffixes.add(token);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
const live = (name) =>
  names.has(name) ||
  [...prefixes].some((prefix) => name.startsWith(prefix)) ||
  [...suffixes].some((suffix) => name.endsWith(suffix));
/** Selector kompleks tetap dipertahankan; fragmen kelas dinamis ikut dianggap aktif. */
export function pruneCss(source) {
  const root = postcss.parse(source),
    removed = new Set();
  root.walkRules((rule) => {
    const selectors = rule.selectors.filter((selector) => {
      if (/:(is|not|where|has)\(|\\/.test(selector)) return true;
      const dead = [...selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)]
        .map((match) => match[1])
        .filter((name) => !live(name));
      for (const name of dead) removed.add(name);
      return dead.length === 0;
    });
    if (selectors.length) rule.selectors = selectors;
    else rule.remove();
  });
  root.walkAtRules((rule) => {
    if (rule.nodes?.length === 0) rule.remove();
  });
  return { css: root.toString(), removed: [...removed].sort() };
}
if (process.argv.includes('--write'))
  for (const file of ['src/app/personal.css', 'src/app/globals.css']) {
    const result = pruneCss(fs.readFileSync(file, 'utf8'));
    fs.writeFileSync(file, result.css);
    console.log(`${file}: ${result.removed.length} kelas tanpa pemanggil dihapus`);
  }
