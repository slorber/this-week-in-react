import crypto from "crypto";

export function readEnvVariable(name: string) {
  const value = process.env[name];
  if (typeof value === "undefined") {
    throw new Error(
      `Missing env variable value for ${name} and no default value fallback provided`,
    );
  }
  return value;
}

export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Merge multiple lists of QS params
// Last params wins/overrides first params
export function mergeParams(paramsList: URLSearchParams[]): URLSearchParams {
  const allEntries = paramsList
    .flatMap((params) => Array.from(params.entries()))
    // A defined param value should override null/undefined values
    // But we don't want null/undefined to override a defined value
    .filter(([, value]) => {
      return value !== null && typeof value !== "undefined";
    });
  return new URLSearchParams(Object.fromEntries(allEntries));
}
