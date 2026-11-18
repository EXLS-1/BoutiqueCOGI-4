import { spawnSync } from "node:child_process";
import process from "node:process";

const mode = process.argv[2] ?? "plan";
if (!new Set(["plan", "apply"]).has(mode)) {
  console.error("Usage: node scripts/migrate-supabase.mjs [plan|apply]");
  process.exit(2);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL est requis. Configurez l'URL PostgreSQL de Supabase dans .env.");
  process.exit(2);
}

const command = process.platform === "win32" ? "prisma.cmd" : "prisma";
const result = spawnSync(command, ["migration", mode, "--schema", "prisma/contract.prisma", "--no-interactive"], { stdio: "inherit" });
if (result.error) console.error(`Impossible d'exécuter Prisma: ${result.error.message}`);
process.exit(result.status ?? 1);
