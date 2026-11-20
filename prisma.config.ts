import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./prisma/contract.prisma",
    db: {
      // Utiliser la connexion directe (session mode, port 5432) pour les migrations
      // Le pooler pgBouncer (port 6543) ne supporte pas les migrations
      connection: process.env['DIRECT_URL'] ?? process.env['DATABASE_URL']!,
    },
  }),
});
