/** Site-wide constants: brand tokens (mirrors the app's Manifiesto palette) + links. */

/** Manifiesto palette — kept in sync with the desktop app's dark theme. */
export const C = {
  acc: "#c4f82a", // lime accent
  ink: "#0a0a0a", // near-black ink / page bg
  paper: "#ededea", // off-white text
  text: "#cfcfca", // body text
  dim: "#a9a9a3", // muted text
  faint: "#76766f", // captions
  faint2: "#54544f", // faintest
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
