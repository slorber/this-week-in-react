import crypto from "crypto";

export function readEnvVariable(name: string) {
  const value = process.env[name];
  if (typeof value === "undefined") {
    throw new Error(
      `Missing env variable value for ${name} and no default value fallback provided`
    );
  }
  return value;
}

export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Merge multiple lists of QS params
// Last params wins/overrides first params
export function mergeParams(qsParamsList: URLSearchParams[]): URLSearchParams {
  const entries: Record<string, string> = {};
  qsParamsList.forEach((qsParams) => ({
    ...entries,
    ...Object.fromEntries(qsParams),
  }));
  return new URLSearchParams(entries);
}
