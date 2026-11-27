import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

function ensureNodeExtraCaCerts(): void {
  if (process.env.NODE_EXTRA_CA_CERTS) return;

  const pemEnv = process.env.SUPABASE_CA_CERT_PEM;
  const b64Env = process.env.SUPABASE_CA_CERT_BASE64;
  const localCertPath = path.join(process.cwd(), "prod-ca-2021.crt");

  if (pemEnv?.trim() || b64Env?.trim()) {
    const pem = pemEnv?.trim()
      ? pemEnv.replace(/\\n/g, "\n")
      : Buffer.from(b64Env!.trim(), "base64").toString("utf8");
    const target = path.join(os.tmpdir(), "supabase-prod-ca-2021.pem");
    fs.writeFileSync(target, pem, { mode: 0o600 });
    process.env.NODE_EXTRA_CA_CERTS = target;
    return;
  }

  if (fs.existsSync(localCertPath)) {
    process.env.NODE_EXTRA_CA_CERTS = localCertPath;
  }
}

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof postgres<Contract>>;
};

function createDb(): ReturnType<typeof postgres<Contract>> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL est manquant dans l'environnement serveur.");
  }

  ensureNodeExtraCaCerts();
  const contract = contractFromJson(contractJson);
  return postgres({ contract, url }) as unknown as ReturnType<typeof postgres<Contract>>;
}

export const db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
