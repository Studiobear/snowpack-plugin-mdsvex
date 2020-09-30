import path from 'path'
import { promises as fs } from 'fs'
const snowpackPluginMdsvex = require('../index.ts')

describe('snowpack-plugin-mdx', () => {
  it('should compile .md files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex({}, {})
    const result = await plugin.load({ contents, filePath })
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should compile .svx files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex({}, {})
    const result = await plugin.load({ contents, filePath })
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should resolve extensions to custom extension .dvx', async () => {
    const plugin = snowpackPluginMdsvex(
      {},
      {
        mdsvexOptions: {
          extensions: ['.dvx'],
        },
      },
    )
    const result = plugin.resolve.input
    expect(result[0]).toBe('.dvx')
  })

  it('should compile custom extension file .dvx', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-svelte.dvx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.dvx'],
        mdsvexOptions: {
          extensions: ['.dvx'],
        },
      },
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
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).toBeNull()
  })

  it('should render embedded Svelte component', async () => {
    const filePath = path.join(__dirname, '__fixtures__/counter.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.svx'],
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should output CSS from embedded Svelte component', async () => {
    const filePath = path.join(__dirname, '__fixtures__/css.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.svx'],
        css: true,
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result['.css']).toMatchSnapshot('.css')
  })

  it('should output CSS from embedded Svelte component', async () => {
    const filePath = path.join(__dirname, '__fixtures__/css.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.svx'],
        css: true,
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result['.css']).toMatchSnapshot('.css')
  })
  it('should not output CSS if option not set to true', async () => {
    const filePath = path.join(__dirname, '__fixtures__/css.svx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdsvex(
      {},
      {
        include: ['**/*.svx'],
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result['.css']).toBe(undefined)
  })
})
