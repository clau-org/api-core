import { API } from "../src/api.ts";
import { helloRouter } from "./routers/validation.ts";

const api = new API({ name: "test", dbUrl: 'prisma://aws-us-east-1.prisma-data.com/?api_key=mY4engKpoOtH3QVxb9NWeTZ_NWpEeoT6CcLwsDAtpsefXTby_mpAjYXQj1qLL0yF' });

api.addRouter(helloRouter);

await api.listen();
