import app from '@adonisjs/core/services/app'
import { readdir, readFile } from 'node:fs/promises'
import { MarkdownFile } from '@dimerapp/markdown'
import { Exception } from '@adonisjs/core/exceptions'

export default class UserService {
  static getSlugUrl(slug: string) {
    if (!slug.endsWith('.md')) {
      slug += '.md'
    }
    return app.makeURL(`resources/users/${slug}`)
  }
  static async getSlugs() {
    const files = await readdir(app.makeURL('resources/users'))
    return files.map((file) => file.replace('.md', ''))
  }

  static async read(slug: string) {
    try {
      const url = this.getSlugUrl(slug)
      const file = await readFile(url, 'utf8')
      const md = new MarkdownFile(file)
      await md.process()
      return md
    } catch (error) {
      throw new Exception(`Could not find a user called: ${slug}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }
}
