import fse from "fs-extra"
import path from "path"
import prettier from "prettier"

const currentPath=process.cwd()
const name = "Test"
type ChangeMap=Record<string,string>
const changeMap:ChangeMap = {
	// TemplateModal: name + "Modal",
	"<!-- 新增Modal -->": `<${name}Modal
	v-bind="all${name}ModalProps"
	@update:show="handle${name}ModalUpdateShow"
	@close="close${name}ModalCallback"
	@confirm="confirm${name}ModalCallback"
	@cancel="cancel${name}ModalCallback"
/>
<!-- 新增Modal -->`,
	"//新增import": `import ${name}Modal from "./${name}Modal.vue";
import { provide${name}Modal } from "./use-${name.toLowerCase()}-modal";
//新增import`,
	"// 新增provide": `const {
	allProps: all${name}ModalProps,
	handleUpdateShow: handle${name}ModalUpdateShow,
	closeCallback: close${name}ModalCallback,
	confirmCallback: confirm${name}ModalCallback,
	cancelCallback: cancel${name}ModalCallback,
} = provide${name}Modal()
// 新增provide`,
}

async function reWriteTemplate(filePath, changeMap:ChangeMap) {
	let data = ""
	const promise = new Promise(async (resolve, reject) => {
		fse.readFile(path.resolve(filePath), (err, _data) => {
			if (!err) {
				data = _data.toString("utf-8")
				for (const [changeTag, replaceContent] of Object.entries(changeMap)) {
					data = data.replace(changeTag, replaceContent)
				}
				data = prettier.format(data, {
					parser: "vue",
				})
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
	return promise
}


async function genModalDir(dirPath){
	try{
		await fse.mkdir(dirPath)
	}catch(e){
		throw e
	}
}

export async function genModal(){
	// const dirName=path.join(currentPath,`${name}-modal`)
	// await fse.mkdir(dirName)
	// await fse.copy(__filename,path.join(dirName,'txxxx.js'))
	// createFile('hello')
  console.log('gen-modal');
}
genModal()

// reWriteTemplate("src/components/modal/ModalProvider.vue", changeMap).then(
// 	(res) => {
// 		console.log("res", res)
// 	}
// )
// createFile()




























// inquirer
//   .prompt([
//     /* Pass your questions in here */
// 		{
// 			'type':'input',
// 			'message':'hello,your name?',
// 			'default':'hello,your namsdadse?',
// 			'name':'name'
// 		}
//   ])
//   .then((answers) => {
// 		console.log(answers);
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });
