import fse from "fs-extra";
import path from "path";
import ora from "ora";

import { fileURLToPath } from "node:url";

const terminalPath = process.cwd(); //打开控制台的路径
const currentFilePath = fileURLToPath(import.meta.url);
const templateModalDirPath = path.resolve(
	path.dirname(currentFilePath),
	"../../../template/modal"
);

export async function initProvider() {
	const spin = ora("生成中～～").start();
	try {
		await fse.copy(
			path.join(templateModalDirPath, "ModalProvider.vue"),
			path.join(terminalPath, `ModalProvider.vue`)
		);
		spin.succeed("生成成功～～");

	} catch (e) {
		spin.fail("生成失败，请重试");
	}
}
