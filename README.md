<hr>
<div>
  <h1>
    snowpack-plugin-mdsvex
  </h1>
  <blockquote>Use Markdown with Svelte Components! Using <a href="https://mdsvex.com/">MDSVEX compiler</a> to build <code>.md</code> and <code>.svx</code> files with <a href="https://www.snowpack.dev/">Snowpack</a></blockquote>
  <p>This plugin was created to be used within a Svelte project, but possbily could be used in a non-Svelte app. `@snowpack/app-scripts-svelte` is configured only for `.svelte` files, and this plugin focuses `.md` and `.svx` files parsing into JS externally of the main Svelte preprocessor loop.</p>
  <pre>yarn add snowpack-plugin-mdx -D </pre>
  <p><em>Peer dependencies:</em> `svelte`, `snowpack`, `mdsvex`.</p>

</div>
<p>
  <a aria-label="Types" href="https://www.npmjs.com/package/snowpack-plugin-mdsvex">
    <img alt="Types" src="https://img.shields.io/npm/types/snowpack-plugin-mdsvex?style=flat&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/Studiobear/snowpack-plugin-mdsvex">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/Studiobear/snowpack-plugin-mdsvex">
  </a>
  
  <a href='https://studiobear.semaphoreci.com/badges/snowpack-plugin-mdsvex/branches/master.svg?style=shields'> <img src='https://studiobear.semaphoreci.com/badges/snowpack-plugin-mdsvex/branches/master.svg?style=shields' alt='Build Status'></a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/snowpack-plugin-mdsvex">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/snowpack-plugin-mdsvex?style=flat&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://barry-low.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/snowpack-plugin-mdx?style=flat&labelColor=24292e">
  </a>
</p>
<hr>

## Quick start

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

- Guided by [snowpack-plugin-mdx]()

## LICENSE

[MIT](https://barry-low.mit-license.org/)
