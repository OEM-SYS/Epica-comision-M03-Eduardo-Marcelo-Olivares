import {app} from "./app.js";
import {settingsDotEnvPort} from "./config/dotenv.js";
const {port}=settingsDotEnvPort();
app.listen(port,console.log(`Server listening at port ${port}`));