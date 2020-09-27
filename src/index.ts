import { promises as fs } from 'fs'
import { createFilter } from '@rollup/pluginutils'
import { preprocess, compile } from 'svelte/compiler'
import { mdsvex } from 'mdsvex'

const ext = /\.md$|\.svx$/
const extensionsDefault = ['.md', '.svx']

module.exports = function plugin(
  _: any,
  pluginOptions: SnowpackPluginMdsvexOptions,
) {
  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)
  let extOpts = pluginOptions.mdsvexOptions?.extensions ?? extensionsDefault

  return {
    name: 'snowpack-plugin-mdsvex',
    resolve: {
      input: extensionsDefault,
      output: ['.js'],
    },
    async load({ filePath }: { filePath: string }) {
      if (!ext.test(filePath) || !filter(filePath)) {
        return null
      }
      const contents = await fs.readFile(filePath, 'utf-8')
      const svxPreprocess = await preprocess(
        contents,
        mdsvex({
          extensions: extensionsDefault,
          ...pluginOptions.mdsvexOptions,
        }),
        { filename: filePath },
      )
      const svxResult = await compile(svxPreprocess.toString())

      return {
        '.js': svxResult.js.code,
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
   * These options are passed directly to the MDSVEX compiler
   */
  mdsvexOptions?: Record<string, any>
}
