import { API } from "../mod.ts";
import { helloRouter } from "./routers/hello.ts";

const api = new API({
  name: "api-core",
  someKey: "",
});

api.addRouter(helloRouter);

api.setDBUrl({
  url:
    "prisma://aws-us-east-1.prisma-data.com/?api_key=mY4engKpoOtH3QVxb9NWeTZ_NWpEeoT6CcLwsDAtpsefXTby_mpAjYXQj1qLL0yF",
});

await api.listen();
