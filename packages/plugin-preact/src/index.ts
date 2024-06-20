import type { RsbuildPlugin } from '@rsbuild/core';
import { applyBasicPreactSupport, applyReactAliases } from './preact';

export type PluginPreactOptions = {
  /**
   * Whether to aliases `react`, `react-dom` to `preact/compat`
   * @default true
   */
  reactAliasesEnabled?: boolean;
};

export const PLUGIN_PREACT_NAME = 'rsbuild:preact';

export const pluginPreact = (
  options: PluginPreactOptions = {},
): RsbuildPlugin => ({
  name: PLUGIN_PREACT_NAME,

  setup(api) {
    applyBasicPreactSupport(api);

    const { reactAliasesEnabled = true } = options;

    if (reactAliasesEnabled) {
      applyReactAliases(api);
    }
  },
});
