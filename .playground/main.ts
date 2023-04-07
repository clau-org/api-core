import { API } from "../src/api.ts";
import { helloRouter } from "./routers/hello.ts";

const api = new API({ name: "api-core" });

api.addRouter(helloRouter);

await api.listen();
