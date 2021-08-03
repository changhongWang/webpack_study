const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-server");

server(process.env.PORT || 3000);

const server = (port) => {
  const app = express();

  app.use(express.static("dist"));
  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log("Server is Running On Port: ", port);
  });
};

const renderMarkup = (str) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Test Webpack</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
  `;
};
