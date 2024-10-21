import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const __dirnameView = join(__dirname, '../views');

export default __dirnameView;