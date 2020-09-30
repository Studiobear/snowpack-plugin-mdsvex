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

  return {
    name: 'snowpack-plugin-mdsvex',
    resolve: {
      input: extensions,
      output: ['.js'],
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
      const { js } = await compile(svxPreprocess.toString())

      return {
        '.js': js && js.code,
      }
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
   * These options are passed directly to the MDSVEX compiler.
   */
  mdsvexOptions?: Record<string, any>
}
