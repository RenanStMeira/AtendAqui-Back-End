import express from 'express';
import cors from "cors";
import routes from "./Routes/routes"

const app = express();
app.use(express.json);
app.use(cors());
app.use(routes);

app.listen(3030, () => {
    console.info('Server running on port 3030');
});