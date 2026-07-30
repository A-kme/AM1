import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let localEnvLoaded = false;

export function getEnv(name, fallback = "") {
  loadLocalEnv();
  return process.env[name] || fallback;
}

export function requireEnv(name) {
  const value = getEnv(name);
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function loadLocalEnv() {
  if (localEnvLoaded) return;
  localEnvLoaded = true;

  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimQuotes(trimmed.slice(separator + 1).trim());
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function trimQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}
