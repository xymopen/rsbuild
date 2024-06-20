import type { RsbuildPlugin } from '@rsbuild/core';
import type { PluginOptions as PrefreshOptions } from 'rspack-plugin-prefresh';
import { applyBasicPreactSupport, applyReactAliases } from './preact';

export type PluginPreactOptions = {
  /**
   * Whether to aliases `react`, `react-dom` to `preact/compat`
   * @default true
   */
  reactAliasesEnabled?: boolean;
  /**
   * Options passed to `rspack-plugin-prefresh`
   * @see https://www.npmjs.com/package/rspack-plugin-prefresh
   */
  prefreshOptions?: PrefreshOptions;
};

export const PLUGIN_PREACT_NAME = 'rsbuild:preact';

export const pluginPreact = (
  options: PluginPreactOptions = {},
): RsbuildPlugin => ({
  name: PLUGIN_PREACT_NAME,

  setup(api) {
    if (api.context.bundlerType === 'rspack') {
      applyBasicPreactSupport(api, options);
    }

    const { reactAliasesEnabled = true } = options;

    if (reactAliasesEnabled) {
      applyReactAliases(api);
    }
  },
});
