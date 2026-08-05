/* Per-device opt-out so my own visits don't pollute the numbers.
   Open  https://talklein.dev/?analytics=off  once on each device/browser I use
   to stop counting; ?analytics=on re-enables it. The choice is stored in
   localStorage, so it survives future visits until the browser data is cleared. */

const KEY = 'analytics-optout';

function readParam() {
  try {
    const url = new URL(location.href);
    const value = url.searchParams.get('analytics');
    if (value !== 'off' && value !== 'on') return null;

    const off = value === 'off';
    if (off) localStorage.setItem(KEY, '1');
    else localStorage.removeItem(KEY);

    // Keep the flag out of the visible/shared URL.
    url.searchParams.delete('analytics');
    history.replaceState(null, '', url.pathname + url.search + url.hash);

    console.info(
      `[analytics] tracking ${off ? 'disabled' : 'enabled'} on this device` +
      (off ? ' (visit /?analytics=on to undo)' : '')
    );
    return off;
  } catch {
    return null;
  }
}

let cached;

export function isOptedOut() {
  if (cached === undefined) {
    const fromParam = readParam();
    if (fromParam !== null) {
      cached = fromParam;
    } else {
      try { cached = localStorage.getItem(KEY) === '1'; } catch { cached = false; }
    }
  }
  return cached;
}
