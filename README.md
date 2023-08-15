# Node 自定义脚本

该仓库可以作为一个创建脚本的模版，让我们快速的执行我们编写的 js 文件。

# Usage

## Step1

构建 js 文件

```sh
cd custom-script
npm i
npm run build
```

## Step2

将当前文件夹路径设置为系统环境路径

```sh
sh initEnv.sh
```

## Step3

在需要使用的地方使用 `sh mysh.sh`

# Development

你可以在 scr/scripts/index.ts 中暴露出你拓展的函数，然后通过 `sh mysh.sh` 来执行你的函数
