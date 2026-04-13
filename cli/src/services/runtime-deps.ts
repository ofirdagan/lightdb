type ChalkInstance = {
  cyan(value: string): string;
  red(value: string): string;
  yellow(value: string): string;
};

type PromptQuestion = {
  message: string;
  name: string;
  type: string;
  validate?: (value: string) => boolean | string;
};

type InquirerInstance = {
  prompt<T>(questions: PromptQuestion[]): Promise<T>;
};

const dynamicImport = new Function(
  'specifier',
  'return import(specifier);',
) as <T>(specifier: string) => Promise<T>;

let chalkPromise: Promise<ChalkInstance> | undefined;
let inquirerPromise: Promise<InquirerInstance> | undefined;

export function getChalk() {
  if (!chalkPromise) {
    chalkPromise = dynamicImport<{ default: ChalkInstance }>('chalk').then((module) => module.default);
  }

  return chalkPromise;
}

export function getInquirer() {
  if (!inquirerPromise) {
    inquirerPromise = dynamicImport<{ default: InquirerInstance }>('inquirer').then((module) => module.default);
  }

  return inquirerPromise;
}
