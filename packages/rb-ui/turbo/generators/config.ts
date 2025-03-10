import type { PlopTypes } from "@turbo/gen";
import * as fs from 'fs';

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("rb-component", {
    description: "rb-component를 추가합니다.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "컴포넌트 이름을 입력해주세요.",  
      },
      {
        type: "input", 
        name: "path",
        message: "컴포넌트를 생성할 src/components 다음 경로를 입력해주세요. (e.g., a/d/v) (없다면 Enter)",
      },
      {
        type: "input",
        name: "confirmation",
        when: (answers) => {
          const componentPath = `src/components/${answers.path ? `${answers.path}/` : ''}${plop.getHelper('pascalCase')(answers.name)}.tsx`;
          const stylePath = `src/components/${answers.path ? `${answers.path}/` : ''}${plop.getHelper('pascalCase')(answers.name)}.module.scss`;
          
          if (fs.existsSync(componentPath)) {
            throw new Error(`이미 존재하는 컴포넌트입니다: ${componentPath}`);
          }else if(fs.existsSync(stylePath)){
            throw new Error(`이미 존재하는 스타일 파일입니다: ${stylePath}`);
          }

          return false;
        }
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{#if path}}{{path}}/{{/if}}{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "add",
        path: "src/components/{{#if path}}{{path}}/{{/if}}{{pascalCase name}}.module.scss",
        templateFile: "templates/scss-module.hbs",
      },
      {
        type: "append",
        path: "package.json",
        pattern: /"exports": {(?<insertion>)/g,
        template: '    "./components/{{path}}/{{pascalCase name}}": "./src/components/{{#if path}}{{path}}/{{/if}}/{{pascalCase name}}.tsx",',
      },
    ],
  });
}
