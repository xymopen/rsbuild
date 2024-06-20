import type { RsbuildConfig, RsbuildPluginAPI, Rspack } from '@rsbuild/core';

export const applyBasicPreactSupport = (api: RsbuildPluginAPI) => {
  api.modifyRsbuildConfig((userConfig, { mergeRsbuildConfig }) => {
    const reactOptions: Rspack.SwcLoaderTransformConfig['react'] = {
      development: process.env.NODE_ENV === 'development',
      runtime: 'automatic',
      importSource: 'preact',
    };

    const extraConfig: RsbuildConfig = {
      tools: {
        swc: {
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
        },
      },
    };

    return mergeRsbuildConfig(extraConfig, userConfig);
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
