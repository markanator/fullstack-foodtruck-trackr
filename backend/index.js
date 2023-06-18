const server = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5001;


server.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}/`));
