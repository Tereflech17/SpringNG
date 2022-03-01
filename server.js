const app = require('./app');
// const chalk = require('chalk');

const port = process.env.PORT || 8080; // default port to listen to estalbish connection
app.listen(port, () => {
    // console.log(chalk.magenta(figlet.textSync('SprinNG server started', {horizontalLayout: 'full'})))
    console.log(`server runnig http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
})