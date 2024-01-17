import server from './app.js'
import { config } from "dotenv";
config();


const PORT = process.env.PORT || 5001;


server.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}/`));
