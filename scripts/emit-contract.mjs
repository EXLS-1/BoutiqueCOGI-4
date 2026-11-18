import { spawnSync } from "node:child_process";
import process from "node:process";

const command = process.platform === "win32" ? "prisma.cmd" : "prisma";
const result = spawnSync(command, ["contract", "emit", "--schema", "prisma/contract.prisma", "--no-interactive"], { stdio: "inherit" });
if (result.error) console.error(`Impossible d'exécuter Prisma: ${result.error.message}`);
process.exit(result.status ?? 1);
