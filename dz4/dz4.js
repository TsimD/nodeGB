import readline from 'readline';
import path from 'path';
import inquirer from 'inquirer';
import fsp from 'fs/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const root =  process.cwd();

const findFilesInDir = (dirName) => {
    return fsp
        .readdir(dirName)
        .then((choices) => {
            return inquirer.prompt([
                {
                    name: 'fileName',
                    type: 'list',
                    message: 'Выберите файл',
                    choices
                },
                {
                    name: 'findString',
                    type: 'input',
                    message: "Что искать?"
                }
            ])
        })
        .then(async ({fileName, findString})=> {
            const fullPath = path.join(dirName, fileName);
            const stat = await fsp.stat(fullPath);
            if (!stat.isFile()){
                return findFilesInDir(fullPath)
            }
            return Promise.all([
                fsp.readFile(path.join(dirName, fileName), 'utf-8'),
                Promise.resolve(findString)
            ])
        })
        .then((result)=>{
            if(result){
                const [text, findString] = result;
                const pattern = new RegExp(findString, "g");
                let count = 0;
                const out = text.replace(pattern, () => {
                    count++;
                    return findString;
                })
                console.log(out, "\n", `Найдено ${count} эллементов`)
            }
        })
};
  rl.question(
      `Вы находитесь в: ${root} \n   ВВедите путь к папке: `,
      (dirPath) =>{
          const dirName = path.join(root, dirPath);

          findFilesInDir(dirName)
      }
  );

  rl.on("close", () => process.exit(0));