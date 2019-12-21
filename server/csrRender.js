
import path from 'path'
import fs from 'fs'

export default function csrRender(res) {
  console.log('csr')
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  res.send(fs.readFileSync(filename, 'utf8'))
}