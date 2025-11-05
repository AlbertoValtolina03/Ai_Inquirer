import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Restituisce lo stato della modalità demo.
 * @returns Promise<boolean> - true se demo attiva, false se disattiva o errore
 */
export async function isDemoMode(): Promise<boolean> {
  try {
    const demo = await prisma.demoMode.findUnique({
      where: { id: 1 }, // assume un solo record per la demo
    });

    if (!demo) return false; // se non esiste, consideriamo demo disattiva
    return demo.demo_mode;
  } catch (err) {
    console.error("Errore controllo demo mode:", err);
    return false; // in caso di errore, consideriamo demo disattiva
  }
}
