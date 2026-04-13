import figlet from 'figlet';
import emailValidator from 'email-validator';
import { getChalk, getInquirer } from './runtime-deps';
import ServerApi from './server-api';

export const register = async (serverApi: ServerApi) => {
  const chalk = await getChalk();
  console.clear();
  console.log(chalk.cyan(figlet.textSync('LIGHT DB', {horizontalLayout: 'full'})));

  const email = await readEmailFromInput();
  try {
    await serverApi.register(email);
    const verificationCode = await readVerificationCodeFromInput();
    const token = await serverApi.verify(email, verificationCode);
    console.log(`Great, we're all good and ready to go.. run `, chalk.yellow(`lightdb new --name='your key name'`), ` to get your first key!`);
    console.log(`\nYou can also save the following token and use the REST API\n`, chalk.yellow(token));  
  } catch(error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(chalk.red(message));
  }

};

async function readEmailFromInput() {
  const questions = [
    {
      name: 'email',
      type: 'input',
      message: 'Enter your e-mail',
      validate: (value: string) => {
        return emailValidator.validate(value) ? true : `${value} is not a valid email`;
      }
    }
  ];

  const inquirer = await getInquirer();
  const {email} = await inquirer.prompt<{ email: string }>(questions);
  return email;
}

async function readVerificationCodeFromInput() {
  const questions = [
    {
      name: 'verificationCode',
      type: 'input',
      message: 'Enter the verification code that you got:',
      validate: (value: string) => {
        return value.length === 6 ? true : `${value} is not a valid verification code`;
      }
    }
  ];
  const inquirer = await getInquirer();
  const {verificationCode} = await inquirer.prompt<{ verificationCode: string }>(questions);
  return verificationCode;
}
