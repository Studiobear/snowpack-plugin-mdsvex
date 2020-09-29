<hr>
<div>
  <h1>
    snowpack-plugin-mdsvex
  </h1>
  <blockquote>Use Markdown enhanced with Svelte components using <a href="https://mdsvex.com/">MDSVEX</a> to build <code>.md</code> and <code>.svx</code> files with <a href="https://www.snowpack.dev/">Snowpack</a>!</blockquote>
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
<hr>

<p>This plugin was created to be used within a Svelte project, but could possbily be used in a non-Svelte app since this plugin parses `.md` and `.svx` files into JS externally of the main Svelte preprocessor loop used in [@snowpack/plugin-svelte](https://github.com/pikapkg/snowpack/tree/master/plugins/plugin-svelte).</p>
  <pre>yarn add snowpack-plugin-mdx -D </pre>

Peer dependencies: `svelte`, `snowpack`, `mdsvex`.

## Quick start

If starting a new project, tryout [Create Snowpack App (CSA)](<https://www.snowpack.dev/#create-snowpack-app-(csa)>) using either:

- @snowpack/app-template-svelte
- @snowpack/app-template-svelte-typescript

Otherwise, after installing, update your snowpack config:

```js
// snowpack.config.json
{
  "plugins": [["snowpack-plugin-mdsvex", { /* see "Plugin Options" below */ }]]
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
   * These options are passed directly to the MDSVEX compiler
   */
  mdsvexOptions?: Record<string, any>
}
```

#### Supported MDSVEX options:

- [TODO]: Technically all options except for 'extensions' (currently, only `.md` and `.svx`) should work, but have not been tested. [View all MDSVEX options](https://mdsvex.com/docs#options)

### Acknowledgements

- Inspired and guided by [snowpack-plugin-mdx](https://github.com/jaredLunde/snowpack-plugin-mdx)

## LICENSE

[MIT](https://barry-low.mit-license.org/)
