----

<img src="https://user-images.githubusercontent.com/105697987/188320734-20f67bdd-ae83-43f0-b704-8d5a443f0c7f.png" width="30%" height="30%" alt="calculator"/>   <img src="https://user-images.githubusercontent.com/105697987/188320827-3bf60f29-08ea-4c7b-aafe-b22924670693.png" width="30%" height="30%" alt="calculator"/>   <img src="https://user-images.githubusercontent.com/105697987/188320859-eeb40ac0-40b0-4714-bd0c-a9d5bdcd6cbc.png" width="30%" height="30%" alt="calculator"/>

> ###React Calculator App (Homework2、3)

### 簡介
*  跟隨教學影片實作計算機並修改些許功能，**Tailwind CSS** + **Grid** + **Hooks** + **Redux**等技術。
*  將計算機 docker build 打包成**容器映像檔案** + 搭配 **Dockerfile** 更簡易使用 ( 並以 5001 直接映射 )

### 功能
- [x] 主題色切換（藍色/粉色/紫色）
- [x] 符合四則運算規則（先乘除，後加減）
- [x] 基本功能：加減乘除、小數計算、百分比計算
- [x] 額外功能：開平方根與開y次方
- [x] Docker
    - [x] Dockerfile
	![image](https://user-images.githubusercontent.com/105697987/188306639-1d6cc4e5-2fc1-4451-883c-4c59778eaee9.png)
	
    - [x] 打包成**容器映像檔**
	`docker image build -t calculator-app:2.0 .
`
    - [x] 啟動並以 5001 直接映射
	`docker run --restart=always -d -it -p 5001:5001 calculator-app:2.0`
- [ ] 以 Vite 作為前端構建工具，目標轉譯到 ES5 版本支援 IE10 版本 ( 尚未成功 )

	1.已嘗試於package.json：

		(1)使用相關dependencies
		- `@vitejs/plugin-legacy` 搭配 `terser`
		- `babel-polyfill`

		(2)也嘗試添加
		```
		"browserslist": {
			"production": [
				"> 1%",
				"not dead",
				"not op_mini all",
				"ie 11"
			],
			"development": [
				"last 1 chrome version",
				"last 1 firefox version",
				"ie 11"
			]
		}
		```

	2.已嘗試於vite.config.js：

		(1)使用相關dependencies
		`@babel/preset-env`

		```
		import legacy from '@vitejs/plugin-legacy'

		legacy({
		targets: ['ie >= 11'],
		additionalLegacyPolyfills:['regenerator-runtime/runtime'],
		})
		```
