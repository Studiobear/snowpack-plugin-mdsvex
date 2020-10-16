<hr />
<div>
  <h1>
    snowpack-plugin-mdsvex
  </h1>
  <blockquote>Use Markdown enhanced with Svelte components compiled by <a href="https://mdsvex.com/">MDSvex</a> to parse <code>.md</code> and <code>.svx</code> files with <a href="https://www.snowpack.dev/">Snowpack</a>!</blockquote>
</div>
<div>
&nbsp;
<p>
  <a aria-label="Types" href="https://www.npmjs.com/package/snowpack-plugin-mdsvex"><img alt="Types" src="https://img.shields.io/npm/types/snowpack-plugin-mdsvex?style=flat&labelColor=24292e"></a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/Studiobear/snowpack-plugin-mdsvex"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/Studiobear/snowpack-plugin-mdsvex"></a>
<a href='https://studiobear.semaphoreci.com/badges/snowpack-plugin-mdsvex/branches/master.svg?style=shields'><img src='https://studiobear.semaphoreci.com/badges/snowpack-plugin-mdsvex/branches/master.svg?style=shields' alt='Build Status'></a>
<a aria-label="NPM version" href="https://www.npmjs.com/package/snowpack-plugin-mdsvex"><img alt="NPM Version" src="https://img.shields.io/npm/v/snowpack-plugin-mdsvex?style=flat&labelColor=24292e"></a>
<a aria-label="License" href="https://barry-low.mit-license.org/"><img alt="MIT License" src="https://img.shields.io/npm/l/snowpack-plugin-mdx?style=flat&labelColor=24292e"></a>
</p>
&nbsp;
</div>
<hr />

This plugin was created to be used within a Svelte project, but could possbily be used in a non-Svelte app since this plugin parses `.md` and `.svx` files into JS externally of the main Svelte preprocessor loop used in [@snowpack/plugin-svelte](https://github.com/pikapkg/snowpack/tree/master/plugins/plugin-svelte).

**Note**: The plugin was archived at one point when the `preprocessor` option was added to `@snowpack/plugin-svelte`, however since a Snowpack plugin's `resolve.input` doesn't allow dyanmic input it was not possible to make Snowpack aware of extensions beyond `.svelte`.

```bash
yarn add snowpack-plugin-mdsvex -D
# or
npm i snowpack-plugin-mdsvex --dev -D
```

Peer dependencies: `svelte`, `snowpack`, `mdsvex`.

## Quick start

If starting a new project, tryout [Create Snowpack App (CSA)](<https://www.snowpack.dev/#create-snowpack-app-(csa)>) using either:

- @snowpack/app-template-svelte
- @snowpack/app-template-svelte-typescript

Otherwise, after installing, update your snowpack config:

```js
// snowpack.config.json
{
  "plugins": [
    ...
    ["snowpack-plugin-mdsvex", { /* see "Plugin Options" below */ }],
    ...
  ]
}
```

### Plugin Options

```typescript
interface SnowpackPluginMdsvexOptions {
  /**
   * Includes only the  specified paths
   */
  include?: string[]
  /**
   * Excludes the specified paths
   */
  exclude?: string[]
  /**
   * Include CSS. Default: false
   */
  css?: boolean
  /**
   * These options are passed directly to the MDSvex compiler
   */
  mdsvexOptions?: Record<string, any>
}
```

#### Supported MDSvex options:

```typescript
interface MdsvexOptions {
  /**
   * Use custom extensions
   * example: ['.dvx']
   */
  extensions?: string[]
}
```

- `extensions`: Set if you wish to use any custom extensions. Defaults: `['.md', '.svx']`.
- [TODO]: [View all MDSvex options](https://mdsvex.com/docs#options). With exception to custom extensions, all other MDSvex options have not been tested, but should work.

<hr />

### Acknowledgements

- Inspired and guided by [snowpack-plugin-mdx](https://github.com/jaredLunde/snowpack-plugin-mdx)

## LICENSE

[MIT](https://barry-low.mit-license.org/)
