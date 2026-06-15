/** Site-wide constants: brand tokens (mirrors the app's Manifiesto palette) + links. */

/** Manifiesto palette — kept in sync with the desktop app's dark theme. */
export const C = {
  acc: "#c4f82a", // lime accent
  ink: "#0a0a0a", // near-black ink / page bg
  paper: "#ededea", // off-white text
  text: "#cfcfca", // body text
  dim: "#b4b4ad", // muted text (lightened for AA contrast)
  faint: "#8f8f86", // captions (lightened for AA contrast)
  faint2: "#6e6e66", // faintest decorative / least-important text
  rule: "#1f1f1c", // section hairlines
  rule2: "#2a2a27", // component borders
  panel2: "#0d0d0c", // alternating section bg
  bar0: "#1c1c1a", // empty progress track
} as const;

export const sans =
  "'Geist Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
export const mono = "'Geist Mono Variable', ui-monospace, SFMono-Regular, monospace";

/** Repos + install endpoints. */
export const REPO_URL = "https://github.com/eriklueh/microset";
export const LANDING_REPO_URL = "https://github.com/eriklueh/microset-landing";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
/** Stable-named asset uploaded to every release, so this link survives version bumps. */
export const DOWNLOAD_URL = `${REPO_URL}/releases/latest/download/microset-setup-x64.exe`;
export const CLONE_CMD = "git clone https://github.com/eriklueh/microset";
export const INSTALLER_SIZE = "~3 MB";
