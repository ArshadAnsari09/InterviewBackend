const middleware = require("../middleware"),
  responseHandler = require("./../responseHandler");
const user = require("./../modules/user/route");

const routesWithAuth = [
  { path: "/api/v1/user", route: user },
];
const routesWithoutAuth = [];

module.exports = (app) => {
  // Apply basic auth middleware to specific routes
  routesWithAuth.forEach(({ path, route }) => {
    app.use(path, middleware.basicAuth.basicAuthentication, route);
  });

  routesWithoutAuth.forEach(({ path, route }) => {
    app.use(path, route);
  });

  // Root route with plain HTML response
  app.get("/", (req, res) => {
    res.send(`
          <!DOCTYPE html>
          <html>
            <head><title>Welcome</title></head>
          <body>
              <h1>Welcome to NodeJS Backend</h1>
          </body>
          </html>
      `);
  });

  app.use(responseHandler.defaultRoute);
  app.use(responseHandler.handleError);
};

