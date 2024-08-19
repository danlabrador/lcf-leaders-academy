import { createAccessToken } from "./src/util/jwt";

const accessToken = createAccessToken({
  id: "USR-01J5M7YPS5DHWK601WGSS6TBD8",
});

console.log(accessToken);
