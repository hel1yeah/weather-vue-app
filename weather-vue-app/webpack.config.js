const Dotenv = require('dotenv-webpack')
import path from 'path'
module.exports = {
  plugins: [new Dotenv()],
  alias: {
    '@': path.resolve(__dirname, 'src/components/'),
  },
}
