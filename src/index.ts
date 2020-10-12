const svelteRollupPlugin = require('rollup-plugin-svelte')
const fs = require('fs/promises')
const utils = require('@rollup/pluginutils')
const svelte = require('svelte/compiler')
const { mdsvex } = require('mdsvex')

const ext = /(\.md$|\.svx$)/
const extensionsDefault = ['.md', '.svx']

module.exports = function plugin(
  snowpackConfig: any,
  pluginOptions: SnowpackPluginMdsvexOptions,
) {
  const isDev = process.env.NODE_ENV !== 'production'
  const emitCss = pluginOptions.css ? pluginOptions.css : false

  let filter: any
  let extensions: string[]
  let extRegexp: RegExp

  if (pluginOptions.mdsvexOptions && pluginOptions.mdsvexOptions.extensions) {
    extensions = pluginOptions.mdsvexOptions.extensions
    let genExtRegExp: string = ''
    let extL = 0
    extensions.map((e) => {
      genExtRegExp += e.replace(/\./g, '')
      if (extensions.length != extL) genExtRegExp += '|'
      extL++
    })
    extRegexp = new RegExp(genExtRegExp)
  } else {
    extensions = extensionsDefault
    extRegexp = ext
  }

  if (pluginOptions.include || pluginOptions.exclude)
    filter = utils.createFilter(pluginOptions.include, pluginOptions.exclude)

  if (
    snowpackConfig &&
    snowpackConfig.installOptions &&
    snowpackConfig.installOptions.rollup &&
    snowpackConfig.installOptions.rollup.plugins
  ) {
    snowpackConfig.installOptions.rollup.plugins.push(
      svelteRollupPlugin({
        extensions: ['.svelte', ...extensions],
        emitCss,
        preprocess: mdsvex({ ...pluginOptions.mdsvexOptions, dev: isDev }),
      }),
    )
  }

  return {
    name: 'snowpack-plugin-mdsvex',
    resolve: {
      input: extensions,
      output: ['.js', '.css'],
    },
    knownEntrypoints: ['svelte/internal'],
    async load({ filePath }: { filePath: string }) {
      if (
        !extRegexp.test(filePath) ||
        (typeof filter === 'function' && !filter(filePath))
      ) {
        return null
      }

      const contents = await fs.readFile(filePath, 'utf-8')

      const svxPreprocess = await svelte.preprocess(
        contents,
        mdsvex({
          ...pluginOptions.mdsvexOptions,
        }),
        { filename: filePath },
      )
      const { js, css } = await svelte.compile(svxPreprocess.toString())
      const output: any = {
        '.js': {
          code: js.code,
        },
      }
      if (emitCss && css && css.code) {
        output['.css'] = {
          code: css.code,
        }
      }

      return output
    },
  }
}

export interface SnowpackPluginMdsvexOptions {
  /**
   * Includes only the specified paths
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
   * These options are passed directly to the MDSVEX compiler.
   */
  mdsvexOptions?: Record<string, any>
}
