-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "urlImg" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    CONSTRAINT "Comida_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comida" ("categoriaId", "id", "preco", "titulo", "urlImg") SELECT "categoriaId", "id", "preco", "titulo", "urlImg" FROM "Comida";
DROP TABLE "Comida";
ALTER TABLE "new_Comida" RENAME TO "Comida";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
