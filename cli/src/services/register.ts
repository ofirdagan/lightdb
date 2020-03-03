import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import emailValidator from 'email-validator';
import ServerApi from './server-api';

export const register = async (serverApi: ServerApi) => {
  console.clear();
  console.log(chalk.cyan(figlet.textSync('LIGHT DB', {horizontalLayout: 'full'})));

  const email = await readEmailFromInput();
  await serverApi.register(email);

  const verificationCode = await readVerificationCodeFromInput();
  const token = await serverApi.verify(email, verificationCode);
  console.log(`Great, we're all good and ready to go.. run `, chalk.yellow(`lightdb new --name='your key name'`), ` to get your first key!`);
  console.log(`\nYou can also save the following token and use the REST API\n`, chalk.yellow(token));
};

async function readEmailFromInput() {
  const questions = [
    {
      name: 'email',
      type: 'input',
      message: 'Enter your e-mail',
      validate: value => {
        return emailValidator.validate(value) ? true : `${value} is not a valid email`
      }
    }
  ];

  const {email} = await inquirer.prompt(questions);
  return email;
}

async function readVerificationCodeFromInput() {
  const questions = [
    {
      name: 'verificationCode',
      type: 'input',
      message: 'Enter the verification code that you got:',
      validate: value => {
        return value.length === 6 ? true : `${value} is not a valid verification code`;
      }
    }
  ];
  const {verificationCode} = await inquirer.prompt(questions);
  return verificationCode;
}
