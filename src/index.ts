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
  const emitCss = pluginOptions.css ? pluginOptions.css : false
  const compile = pluginOptions.compile === false ? pluginOptions.compile : true

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

      // Default compile svelte or preprocess only
      const code = compile
        ? await svelte.compile(svxPreprocess.toString())
        : svxPreprocess.toString()

      const output: any = {
        '.js': {
          code: compile ? code.js.code : code,
        },
      }
      if (emitCss && code && code.css && code.css.code) {
        output['.css'] = {
          code: code.css.code,
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
   * CSS included. Default: false
   */
  css?: boolean
  /**
   * Compile or preprocess only. Default: true
   */
  compile?: boolean
  /**
   * Options passed directly to the MDSVEX compiler. Default: true
   */
  mdsvexOptions?: Record<string, any>
}
