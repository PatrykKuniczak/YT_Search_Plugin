import * as fs from "fs";
import * as path from "path";
import colorLog from "../log";
import ManifestParser from "../manifest-parser";
import type { PluginOption } from "vite";

const { resolve } = path;

const distDir = resolve(__dirname, "..", "..", "dist");
const publicDir = resolve(__dirname, "..", "..", "public");

export default function makeManifest(
  manifest: chrome.runtime.ManifestV3,
  config: { isDev: boolean;}
): PluginOption {

  function makeManifest(to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, "manifest.json");

    fs.writeFileSync(
      manifestPath,
      ManifestParser.convertManifestToString(manifest)
    );

    colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
  }

  return {
    name: "make-manifest",
    buildStart() {
      if (config.isDev) {
        makeManifest(distDir);
      }
    },
    buildEnd() {
      if (config.isDev) {
        return;
      }
      makeManifest(publicDir);
    },
  };
}
