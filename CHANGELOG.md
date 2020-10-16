# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.2](https://github.com/Studiobear/snowpack-plugin-mdsvex/compare/v0.2.1...v0.2.2) (2020-10-16)

**PLUGIN UNARCHIVED**: Archived when the `preprocessor` option was added to `@snowpack/plugin-svelte`, however since a Snowpack plugin's `resolve.input` doesn't allow dyanmic input it was not possible to make Snowpack aware of extensions beyond `.svelte`.

### [0.2.1](https://github.com/Studiobear/snowpack-plugin-mdsvex/compare/v0.2.0...v0.2.1) (2020-10-12)

~~**PLUGIN DEPRECATED**: Snowpack's plugin-svelte now allows preprocessing option pass through therefore allowing svelte-preprocess and other preprocessors, like MDSvex, to be passed in via plugin options.~~

## [0.2.0](https://github.com/Studiobear/snowpack-plugin-mdsvex/compare/v0.1.2...v0.2.0) (2020-09-30)

### Features

- **custom extensions** ([0fc7da3](https://github.com/Studiobear/snowpack-plugin-mdsvex/commit/0fc7da3d4fb747f93dafdade7bf7da5f0d670522)), closes [#3](https://github.com/Studiobear/snowpack-plugin-mdsvex/issues/3)
  - Use MDSvex options to customize extensions imported for `.md`|`.svx` files

_example: snowpack.config.js_

```javascript
plugins: [
  [
    'snowpack-plugin-mdsvex',
    {
      mdsvexOptions: { extendsions: '.dvx' },
    },
  ],
]
```

- **optional css output** ([46f493e](https://github.com/Studiobear/snowpack-plugin-mdsvex/commit/46f493e0b1359fdbc1de1059258d17a3e7fbacc9)), closes [#2](https://github.com/Studiobear/snowpack-plugin-mdsvex/issues/2)
  - Default: false. Set true to output CSS.

_example: snowpack.config.js_

```javascript
plugins: [
  [
    'snowpack-plugin-mdsvex',
    {
      css: true,
    },
  ],
]
```

### [0.1.1](https://github.com/Studiobear/snowpack-plugin-mdsvex/compare/v0.1.0...v0.1.1) (2020-09-29)

**\*Cough\***...bump

### Bug Fixes

- fix badges 😳 ([e1c8963](https://github.com/Studiobear/snowpack-plugin-mdsvex/commit/e1c8963b26d41bd5a8223599e772b461bc240597))

## 0.1.0 (2020-09-29)

🎉 **Snowpack-Plugin-MDSVEX** Initial release! View [README](./README.md) for usage and options.
