import type {
  ChainIdentifier,
  RsbuildPluginAPI,
  Rspack,
  RspackChain,
} from '@rsbuild/core';
import { SCRIPT_REGEX, deepmerge } from '@rsbuild/shared';
import type { PluginPreactOptions } from '.';

const modifySwcLoaderOptions = ({
  chain,
  CHAIN_ID,
  modifier,
}: {
  chain: RspackChain;
  CHAIN_ID: ChainIdentifier;
  modifier: (config: Rspack.SwcLoaderOptions) => Rspack.SwcLoaderOptions;
}) => {
  const ruleIds = [CHAIN_ID.RULE.JS, CHAIN_ID.RULE.JS_DATA_URI];

  for (const ruleId of ruleIds) {
    if (chain.module.rules.has(ruleId)) {
      const rule = chain.module.rule(ruleId);
      if (rule.uses.has(CHAIN_ID.USE.SWC)) {
        rule.use(CHAIN_ID.USE.SWC).tap(modifier);
      }
    }
  }
};

export const applyBasicPreactSupport = (
  api: RsbuildPluginAPI,
  options: PluginPreactOptions,
) => {
  api.modifyBundlerChain(async (chain, { CHAIN_ID, isDev, isProd, target }) => {
    const config = api.getNormalizedConfig();
    const usingHMR = !isProd && config.dev.hmr && target === 'web';
    const reactOptions: Rspack.SwcLoaderTransformConfig['react'] = {
      development: isDev,
      refresh: usingHMR,
      runtime: 'automatic',
      importSource: 'preact',
    };

    modifySwcLoaderOptions({
      chain,
      CHAIN_ID,
      modifier: (opts) => {
        const extraOptions: Rspack.SwcLoaderOptions = {
          jsc: {
            parser: {
              syntax: 'typescript',
              // enable supports for JSX/TSX compilation
              tsx: true,
            },
            transform: {
              react: reactOptions,
            },
          },
        };

        return deepmerge(opts, extraOptions);
      },
    });

    if (!usingHMR) {
      return;
    }

    const { default: PrefreshRspackPlugin } = await import(
      'rspack-plugin-prefresh'
    );

    chain
      .plugin(CHAIN_ID.PLUGIN.PREACT_FAST_REFRESH)
      .use(PrefreshRspackPlugin, [
        {
          include: [SCRIPT_REGEX],
          ...options.prefreshOptions,
        },
      ]);
  });
};

export const applyReactAliases = (api: RsbuildPluginAPI) => {
  api.modifyRsbuildConfig((userConfig, { mergeRsbuildConfig }) => {
    return mergeRsbuildConfig(
      {
        source: {
          alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime',
          },
        },
      },
      userConfig,
    );
  });
};
