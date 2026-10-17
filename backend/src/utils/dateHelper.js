export function isValidSlotString(slot) {
  if (!slot || typeof slot !== 'string' || slot.trim().length === 0) {
    return false;
  }
  // Max slot string length 100 chars (e.g. "Tuesday 4:00 PM EST")
  return slot.trim().length <= 100;
}

export function sanitizeProposedSlots(slots) {
  if (!Array.isArray(slots)) {
    return [];
  }
  return slots
    .filter(isValidSlotString)
    .map((s) => s.trim())
    .slice(0, 5); // Max 5 candidate slots
}
