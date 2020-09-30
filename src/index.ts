import { promises as fs } from 'fs'
import { createFilter } from '@rollup/pluginutils'
import { preprocess, compile } from 'svelte/compiler'
import { mdsvex } from 'mdsvex'

const ext = /(\.md$|\.svx$)/
const extensionsDefault = ['.md', '.svx']

module.exports = function plugin(
  _: any,
  pluginOptions: SnowpackPluginMdsvexOptions,
) {
  let filter: any
  let extensions: string[]
  let extRegexp: RegExp
  let emitCSS: boolean = false

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
    filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  if (pluginOptions.css) emitCSS = pluginOptions.css

  return {
    name: 'snowpack-plugin-mdsvex',
    resolve: {
      input: extensions,
      output: ['.js', '.css'],
    },
    async load({ filePath }: { filePath: string }) {
      if (
        !extRegexp.test(filePath) ||
        (typeof filter === 'function' && !filter(filePath))
      ) {
        return null
      }

      const contents = await fs.readFile(filePath, 'utf-8')

      const svxPreprocess = await preprocess(
        contents,
        mdsvex({
          ...pluginOptions.mdsvexOptions,
        }),
        { filename: filePath },
      )
      const { js, css } = await compile(svxPreprocess.toString())
      const output: any = {
        '.js': {
          code: js.code,
        },
      }
      if (emitCSS && css && css.code) {
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
