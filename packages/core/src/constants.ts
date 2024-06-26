import { join } from 'node:path';
import type { RsbuildTarget } from '@rsbuild/shared';

// Paths
// loaders will be emitted to the same folder of the main bundle
export const ROOT_DIST_DIR = 'dist';
export const HTML_DIST_DIR = '/';
export const SERVER_DIST_DIR = 'server';
export const SERVICE_WORKER_DIST_DIR = 'worker';
export const JS_DIST_DIR = 'static/js';
export const CSS_DIST_DIR = 'static/css';
export const SVG_DIST_DIR = 'static/svg';
export const FONT_DIST_DIR = 'static/font';
export const WASM_DIST_DIR = 'static/wasm';
export const IMAGE_DIST_DIR = 'static/image';
export const MEDIA_DIST_DIR = 'static/media';
export const LOADER_PATH = join(__dirname);
export const STATIC_PATH = join(__dirname, '../static');
export const COMPILED_PATH = join(__dirname, '../compiled');
export const TS_CONFIG_FILE = 'tsconfig.json';

// Defaults
export const DEFAULT_PORT = 3000;
export const DEFAULT_DATA_URL_SIZE = 4096;
export const DEFAULT_MOUNT_ID = 'root';
export const DEFAULT_DEV_HOST = '0.0.0.0';

// RegExp
export const HTML_REGEX = /\.html$/;
export const CSS_REGEX = /\.css$/;

// Plugins
export const PLUGIN_SWC_NAME = 'rsbuild:swc';
export const PLUGIN_CSS_NAME = 'rsbuild:css';

// Extensions
export const FONT_EXTENSIONS = ['woff', 'woff2', 'eot', 'ttf', 'otf', 'ttc'];
export const IMAGE_EXTENSIONS = [
  'png',
  'jpg',
  'jpeg',
  'pjpeg',
  'pjp',
  'gif',
  'bmp',
  'webp',
  'ico',
  'apng',
  'avif',
  'tif',
  'tiff',
  'jfif',
];
export const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov'];
export const AUDIO_EXTENSIONS = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'opus'];

export const TARGET_ID_MAP: Record<RsbuildTarget, string> = {
  web: 'Client',
  node: 'Server',
  'web-worker': 'Web Worker',
  'service-worker': 'Service Worker',
};
