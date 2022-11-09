import inquirer, { ListQuestionOptions } from "inquirer";
import scripts from "./scripts/index.js";

const choices: ListQuestionOptions["choices"] = Object.entries(scripts).map(
	([key, value]) => {
		return {
			name: key,
			value: key,
		};
	}
);

async function start() {
	const res = await inquirer.prompt({
		type: "list",
		message: "你想执行什么脚本？",
		name: "scriptName",
		choices: choices,
	});

	try {
		scripts[res.scriptName]();
	} catch (e) {
		console.log("不存在该命令");
	}
}
start();
