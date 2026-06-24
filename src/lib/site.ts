/** Site-wide constants: brand tokens (mirrors the app's Manifiesto palette) + links. */

/** "Marathon" palette — Manifiesto intensified: pure black + lime + HUD greys. */
export const C = {
  acc: "#c4f82a", // lime accent
  ink: "#000000", // pure black page bg (Marathon)
  paper: "#ededea", // off-white text
  text: "#cfcfca", // body text
  dim: "#b4b4ad", // muted text (lightened for AA contrast)
  faint: "#8f8f86", // captions (lightened for AA contrast)
  faint2: "#6e6e66", // faintest decorative / least-important text
  rule: "#1f1f1a", // section hairlines
  rule2: "#2a2a22", // component borders
  panel2: "#070705", // alternating section bg
  bar0: "#16160f", // empty progress track
  grid: "#141410", // background micro-text grid
  mark: "#242420", // registration marks / faint chrome
} as const;

export const sans =
  "'Geist Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
export const mono = "'Geist Mono Variable', ui-monospace, SFMono-Regular, monospace";
/** Pixel display font — DISPLAY ONLY (wordmark, hero highlight, big numerals). Mirrors the app. */
export const pixel = "'Geist Pixel', ui-monospace, monospace";

/** Repos + install endpoints. */
export const REPO_URL = "https://github.com/eriklueh/microset";
export const LANDING_REPO_URL = "https://github.com/eriklueh/microset-landing";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
/** Stable-named assets uploaded to every release, so these links survive version bumps.
 *  The release pipeline re-uploads the per-version bundles under these fixed names. */
export const DOWNLOAD_WIN = `${REPO_URL}/releases/latest/download/microset-setup-x64.exe`;
export const DOWNLOAD_LINUX = `${REPO_URL}/releases/latest/download/microset-x64.AppImage`;
/** Default download (Windows) for static links that don't detect the OS. */
export const DOWNLOAD_URL = DOWNLOAD_WIN;
export const CLONE_CMD = "git clone https://github.com/eriklueh/microset";
export const INSTALLER_SIZE = "~3 MB";
