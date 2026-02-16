export function logInfo(message: string): void {
  // Centralized logger wrapper for future structured logging.
  console.info(`[INFO] ${message}`);
}

export function logWarn(message: string): void {
  console.warn(`[WARN] ${message}`);
}

export function logError(message: string): void {
  console.error(`[ERROR] ${message}`);
}
