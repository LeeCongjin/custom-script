import prettier from "prettier"
import fse from "fs-extra"
import path from "path"
import chalk from "chalk"
import ora from "ora"
import { ChangeMap } from "../scripts/gen-modal/changMap.js"

export function firstWordUpper(string: string) {
	return string.replace(/^\w/, (s) => s.toUpperCase())
}

export function stringToHump(string: string) {
	return string.replace(/([_|-])(\w)/g, (s, p1, p2) => {
		return p2.toUpperCase()
	})
}

export function stringToSeparator(string: string) {
	return string.replace(/(\W)/g, (s, p1) => {
		return "-" + p1.toLowerCase()
	})
}

export function formatToLowerCase(string: string) {
	return string.toLowerCase().replace(/[_|-]/g, () => "-")
}

export function formatData(filePath: string, data: string) {
	const fileType = filePath.match(/(?:\.)(.*)$/)[1]
	const parseValueMap = new Map([
		["vue", "vue"],
		["ts", "typescript"],
	])
	data = prettier.format(data, {
		parser: parseValueMap.get(fileType),
	})
	return data
}

export async function reWriteTemplate(filePath: string, changeMap: ChangeMap) {
	let data = ""
	const promise = new Promise(async (resolve, reject) => {
		fse.readFile(path.resolve(filePath), (err, _data) => {
			if (!err) {
				data = _data.toString("utf-8")
				for (const [changeTag, replaceContent] of Object.entries(changeMap)) {
					data = data.replace(changeTag, replaceContent)
				}
				data = formatData(filePath, data)
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
	return promise
}

async function genModalDir(dirPath: string) {
	try {
		await fse.mkdir(dirPath)
	} catch (e) {
		throw e
	}
}

async function createFile(data, path) {}
