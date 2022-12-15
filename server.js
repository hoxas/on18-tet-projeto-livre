const app = require("./src/app");
const config = require("./config.json");

app.listen(config.PORT, () => {
  console.log(`API Rodando no PORT: ${config.PORT}`);
});
