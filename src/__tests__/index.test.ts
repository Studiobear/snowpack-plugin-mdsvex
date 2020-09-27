import path from 'path'
import { promises as fs } from 'fs'
const snowpackPluginMdsvex = require('../index.ts')

describe('snowpack-plugin-mdx', () => {
  it('should compile .md files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      { babelOptions: { babelrc: false, presets: ['@babel/env'] } },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should compile .svx files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      { babelOptions: { babelrc: false, presets: ['@babel/env'] } },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should include files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.svx'],
        babelOptions: { babelrc: false, presets: ['@babel/env'] },
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).not.toBeNull()
  })

  it('should exclude files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        exclude: ['**/*.md'],
        babelOptions: { babelrc: false, presets: ['@babel/env'] },
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).toBeNull()
  })

  it('should ignore files not explicitly included', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.svx'],
        babelOptions: {
          babelrc: false,
          presets: ['@babel/env', '@babel/react'],
        },
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).toBeNull()
  })
})
