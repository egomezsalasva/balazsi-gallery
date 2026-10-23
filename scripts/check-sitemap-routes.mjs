import { existsSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(root, "src/app");
const SKIP = new Set(["/collect/checkout", "/collect/success"]);

const listed = JSON.parse(
  readFileSync(join(root, "src/config/staticSitemapRoutes.json"), "utf8"),
);

function collectRoutes(dir, urlPath = "") {
  const routes = [];

  if (existsSync(join(dir, "page.tsx")) || existsSync(join(dir, "page.jsx"))) {
    routes.push(urlPath);
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const { name } = entry;
    if (name.startsWith("_") || name.startsWith("@")) continue;
    if (name.startsWith("(")) {
      routes.push(...collectRoutes(join(dir, name), urlPath));
      continue;
    }
    if (name.startsWith("[")) continue;
    routes.push(...collectRoutes(join(dir, name), `${urlPath}/${name}`));
  }

  return routes;
}

const fromFs = collectRoutes(APP)
  .filter((path) => !SKIP.has(path))
  .sort();
const fromList = [...listed].sort();

const missing = fromFs.filter((r) => !fromList.includes(r));
const extra = fromList.filter((r) => !fromFs.includes(r));

if (missing.length || extra.length) {
  if (missing.length)
    console.error("In app but not in staticSitemapRoutes:", missing);
  if (extra.length) console.error("In staticSitemapRoutes but no page:", extra);
  process.exit(1);
}

console.log(`Sitemap static routes OK (${fromFs.length})`);
