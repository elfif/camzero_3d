const { watch } = require("node:fs");
const { execSync } = require("node:child_process");

const file = process.argv[2] || "models/backplate.js";
let debounce = null;

function build() {
  console.log(`\n[watch] ${file} changed — rebuilding...`);
  try {
    execSync(`node build.js "${file}"`, { stdio: "inherit" });
    console.log("[watch] Done. Waiting for changes...");
  } catch {
    console.error("[watch] Build failed.");
  }
}

build();

watch(file, () => {
  clearTimeout(debounce);
  debounce = setTimeout(build, 200);
});
