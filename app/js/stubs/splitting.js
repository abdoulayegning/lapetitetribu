// Server-side stand-in for "splitting", which touches `document` at import time.
// Splitting is only ever called client-side (onMounted), so a no-op is enough.
export default function Splitting() {
  return []
}
