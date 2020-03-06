import fs from 'fs';
import ServerApi from './services/server-api';
import {register} from './services/register';
import chalk from 'chalk';
const commander =  require('commander');

const program = new commander.Command();
program.version('1.0.0');

program
  .option('-d, --debug', 'Toggle debug mode');

program
  .command('new')
  .option('-n, --name <name>', 'set a human readable name (optional)')
  .description('Generate a new key. Use --name to set a nickname')
  .action(withTryCatch(async (newCmd) => {
    const serverApi = getServerApi();
    await verifyLoggedIn(serverApi);
    const key = await serverApi.generateNewKey(newCmd.name);
    console.log(`New key is: ${chalk.cyan(key)}`);
    console.log(`To set a value run:`);
    console.log(chalk.yellow(`curl 'https://www.lightdb.org/_functions/setValue/${key}' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'authorization: ${serverApi.getToken()}' -H 'Content-Type: application/json' --data-binary '{"value":{"lastName":"Bond","firstName":"James"}}' --compressed`));
  }));

program
  .command('list')
  .description('List of your keys')
  .action(withTryCatch(async () => {
    const serverApi = getServerApi();
    await verifyLoggedIn(serverApi);
    const list = await serverApi.list();
    console.table(list);
  }));

program
  .command('get')
  .description(`Get the value of <key>`)
  .option('-k, --key <key>', 'key')
  .action(withTryCatch(async (getCmd) => {
    const serverApi = getServerApi();
    const value = await serverApi.get(getCmd.key);
    console.log(value);
  }));

program
  .command('logout')
  .description(`You won't be able to set new keys but the one you have will still be available publicly`)
  .action(withTryCatch(async () => {
    const serverApi = getServerApi();
    await verifyLoggedIn(serverApi);
    const message = await serverApi.logout();
    console.log(chalk.yellow(message));
  }));


function withTryCatch(func: Function) {
  return async function(...args) {
    try {
      await func.apply(this, args);
    } catch (e) {
      console.log(`Error calling ${func.name}: ${e.message}`);
    }
  }
}

async function defaultCommand() {
  const serverApi = getServerApi();
  await verifyLoggedIn(serverApi);
  program.help();
}


function getServerApi() {
  const isDebug = !!program.debug;
  const isLoggedIn = fs.existsSync(`.light-db`);
  const token = isLoggedIn ? fs.readFileSync('.light-db', 'utf8'): null;
  return new ServerApi(isDebug, token);
}

async function verifyLoggedIn(serverApi: ServerApi) {
  const isLoggedIn = fs.existsSync(`.light-db`);
  if (!isLoggedIn) {
    await register(serverApi);
    process.exit(0);
  }
}


program.parse(process.argv);
const NO_COMMAND_SPECIFIED = !process.argv.slice(2).length;
if (NO_COMMAND_SPECIFIED) {
  defaultCommand();
}


