import { createRsbuild } from '@rsbuild/core';
import { createStubRsbuild } from '@scripts/test-helper';
import PrefreshRspackPlugin from 'rspack-plugin-prefresh';
import { describe, expect, it } from 'vitest';
import { pluginPreact } from '../src';

describe('plugins/preact', () => {
  const preactAlias = {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react/jsx-runtime': 'preact/jsx-runtime',
  };

  it('should apply react aliases by default', async () => {
    const rsbuild = await createRsbuild({
      rsbuildConfig: {
        plugins: [pluginPreact()],
      },
    });

    const configs = await rsbuild.initConfigs();
    expect(configs[0].resolve?.alias).toMatchObject(preactAlias);
  });

  it('should not apply react aliases if reactAliasesEnabled is false', async () => {
    const rsbuild = await createRsbuild({
      rsbuildConfig: {
        plugins: [
          pluginPreact({
            reactAliasesEnabled: false,
          }),
        ],
      },
    });

    const configs = await rsbuild.initConfigs();
    expect(configs[0].resolve?.alias).not.toMatchObject(preactAlias);
  });

  it('should not apply react refresh when dev.hmr is false', async () => {
    const rsbuild = await createStubRsbuild({
      rsbuildConfig: {
        dev: {
          hmr: false,
        },
      },
    });

    rsbuild.addPlugins([pluginPreact()]);

    expect(
      await rsbuild.matchBundlerPlugin(PrefreshRspackPlugin.name),
    ).toBeFalsy();
  });

  it('should not apply react refresh when target is node', async () => {
    const rsbuild = await createStubRsbuild({
      rsbuildConfig: {
        output: {
          targets: ['node'],
        },
      },
    });

    rsbuild.addPlugins([pluginPreact()]);

    expect(
      await rsbuild.matchBundlerPlugin(PrefreshRspackPlugin.name),
    ).toBeFalsy();
  });

  it('should not apply react refresh when target is web-worker', async () => {
    const rsbuild = await createStubRsbuild({
      rsbuildConfig: {
        output: {
          targets: ['web-worker'],
        },
      },
    });

    rsbuild.addPlugins([pluginPreact()]);

    expect(
      await rsbuild.matchBundlerPlugin(PrefreshRspackPlugin.name),
    ).toBeFalsy();
  });
});
