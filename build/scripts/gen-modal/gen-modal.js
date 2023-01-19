import fse from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { modalProviderChangeMap, useModalChangeMap, TemplateModalChangeMap, } from "./changMap.js";
import { fileURLToPath } from "node:url";
import { firstWordUpper, formatToLowerCase, reWriteTemplate, stringToHump, } from "../../utils/index.js";
import inquirer from "inquirer";
const terminalPath = process.cwd();
const currentFilePath = fileURLToPath(import.meta.url);
const templateModalDirPath = path.resolve(path.dirname(currentFilePath), "../../../template/modal");
export async function genModal() {
    const nameRep = await inquirer.prompt({
        type: "input",
        message: "你的弹窗名称是什么？",
        name: "modalName",
    });
    if (!nameRep.modalName) {
        console.log(chalk.bgRedBright("弹窗名称不能为空,重启脚本"));
        return;
    }
    const modalName = nameRep.modalName;
    const modalProviderPathRep = await inquirer.prompt({
        type: "input",
        message: "你的ModalProvider.vue位置在哪里？",
        name: "modalProviderPath",
    });
    if (!modalProviderPathRep.modalProviderPath) {
        console.log(chalk.bgRedBright("ModalProvider位置不能为空,重启脚本"));
        return;
    }
    const modalProviderPath = modalProviderPathRep.modalProviderPath;
    try {
        await fse.access(modalProviderPath);
    }
    catch (e) {
        console.log(chalk.bgRedBright("文件路径不存在"));
        return;
    }
    const outputDirPath = path.join(terminalPath, `${formatToLowerCase(modalName)}-modal`);
    const spin = ora("生成中～～").start();
    try {
        await fse.mkdir(outputDirPath);
        const useModalData = await reWriteTemplate(path.join(templateModalDirPath, "use-modal.ts"), useModalChangeMap(modalName));
        await fse.outputFile(path.join(outputDirPath, `use-${formatToLowerCase(modalName)}-modal.ts`), useModalData);
        const TemplateModalData = await reWriteTemplate(path.join(templateModalDirPath, "TemplateModal.vue"), TemplateModalChangeMap(modalName));
        await fse.outputFile(path.join(outputDirPath, `${firstWordUpper(stringToHump(modalName))}Modal.vue`), TemplateModalData);
        const modalProviderData = await reWriteTemplate(modalProviderPath, modalProviderChangeMap(modalName, "./" + path.relative(path.dirname(modalProviderPath), outputDirPath)));
        await fse.writeFile(modalProviderPath, modalProviderData);
    }
    catch (e) {
        spin.fail("生成失败，请重试");
    }
    spin.succeed("生成成功～～");
}
//# sourceMappingURL=gen-modal.js.map