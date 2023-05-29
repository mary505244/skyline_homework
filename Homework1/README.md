# 何謂Git Submodule(子模組)？
- 是一個多項目使用共同類庫的工具，可以輕易地將其他人的專案掛載到自己目前任何目錄底下，是巢狀的 Git 結構。

- 它會將指定的 Sub-Repository 版本 Clone 到指定的路徑，並將這個版本的 HASH 紀錄在 Super-Repository 中。

----

# Git Submodule使用時機：

## 使用場景
>*通常應用在多個 repos 都需要共同讀取、修改或追蹤某一個 repo 時的情境。*

基於公司的項目會越來越多，常常需要提取一個公共的類庫提供給多個項目使用，多個子系統（模組）都要及時更新到最新的公共資源，但是這個library怎麼和git在一起方便管理呢？

我們需要解決下面幾個問題：

>如何在git項目中導入library庫?

>library庫在其他的項目中被修改了可以更新到遠程的代碼庫中?

>其他項目如何獲取到library庫最新的提交?

>如何在clone的時候能夠自動導入library庫?

解決以上問題，可以考慮使用git的 submodule 來解決。



Node.js 專案中，子模組是由 npm 來幫我們管理其中的依賴。套件管理系統可以利用 semver 格式的版本號來拉取想要的子模組版本。

但若想引入的專案並沒有放在套件管理系統中，或某語言沒對應的套件管理系統時，git submodule 指令剛好可以在這邊派上用場，它可以用來管理巢狀的 git 專案。可以在專案中引用其他的專案，並以該專案的提交 Hash 當做所依賴的版本號。

----


# Git Submodule實際演練：

## 添加子模塊
```
git submodule add <remote repository> <local path>
```
* remote repository 就是要填你的子 Repository 的 URL，

* local path 指的是你要放在本地端主 Repository 的路徑位置

添加子模塊後運行git status, 可以看到目錄有增加1個文件.gitmodules, 這個文件用來保存子模塊的信息。
```
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   .gitmodules
    new file:   assets
```
注意第一個檔案 .gitmodules，裡面紀錄 submodule 的對應關係，我們實際打開看內容:
```
[submodule "assets"]
  path = assets
  url = https://github.com/maonx/vimwiki-assets.git
```
接著，我們對主 repository 進行 push 的動作，看遠端的 repository 會怎樣去連接子模組
```
git add .
git commit -m "add submodule"
git push
```
<img src="https://blog.kennycoder.io/2020/06/14/Git-submodule-%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8/p4.jpg" width="50%" height="50%" alt="calculator"/>
這個後面的 Hash 值，其實就是對應到我們的 git-sub-module 第一次 commit 的 Hash 值，因此這邊如果點擊的話，會自動跳到 git-sub-module repository 的頁面！這樣代表我們成功建立子模組的關係了～

## 更新子模塊
* 更新項目內子模塊到最新版本
```
$ git submodule update
```
* 更新子模塊為遠程項目的最新版本
```
$ git submodule update --remote
```

## 克隆包含子模塊的項目
克隆包含子模塊的項目有二種方法：一種是*先克隆父項目，再更新子模塊*；另一種是*直接遞歸克隆整個項目*。

### 1.克隆父項目，再更新子模塊
#### 克隆父項目
```
$ git clone https://github.com/maonx/vimwiki-assets.git assets
```
#### 查看子模塊
```
$ git submodule -e33f854d3f51f5ebd771a68da05ad0371a3c0570 assets
```
子模塊前面有一個-，說明子模塊文件還未檢入（空文件夾）。

#### 初始化子模塊
```
$ git submodule init
Submodule 'assets' (https://github.com/maonx/vimwiki-assets.git) registered for path 'assets'
```
初始化模塊只需在克隆父項目後運行一次。

#### 更新子模塊
```
$ git submodule update
Cloning into 'assets'...
remote: Counting objects: 151, done.
remote: Compressing objects: 100% (80/80), done.
remote: Total 151 (delta 18), reused 0 (delta 0), pack-reused 70
Receiving objects: 100% (151/151), 1.34 MiB | 569.00 KiB/s, done.
Resolving deltas: 100% (36/36), done.
Checking connectivity... done.
Submodule path 'assets': checked out 'e33f854d3f51f5ebd771a68da05ad0371a3c0570'
```
### 2.遞歸克隆整個項目
```
git clone https://github.com/maonx/vimwiki-assets.git assets --recursive
```
遞歸克隆整個項目，子模塊已經同時更新了，一步到位。

## 修改子模塊
在子模塊中修改文件後，直接提交到遠程項目分支。
```
$ git add .
$ git ci -m "commit"
$ git push origin HEAD:master
```
## 刪除子模塊
刪除子模塊比較麻煩，需要手動刪除相關的文件，否則在添加子模塊時有可能出現錯誤

刪除子模塊文件夾
```
$ git rm --cached assets
$ rm -rf assets
```
刪除.gitmodules文件中相關子模塊信息
```
[submodule "assets"]
  path = assets
  url = https://github.com/maonx/vimwiki-assets.git
```
刪除.git/config中的相關子模塊信息
```
[submodule "assets"]
  url = https://github.com/maonx/vimwiki-assets.git
```
刪除.git文件夾中的相關子模塊文件
```
$ rm -rf .git/modules/assets
```

----

### 備註： 
- **git submodule init**: 在 .gitmodules 第一次被其他人建立或有新增內容的時候，用 git submodule init 更新你的 .git/config、設定目錄與增加 submodule 的 remote URL。

- **git submodule update**: 在 init 完有新的 submodule commit id 後就可以做了，會把所有相關檔案拉下來。若其他人更新 submodule 造成你拿到新的 commit id 時，你可以直接用 git submodule update 做更新即可、不需要做任何 add 或 commit 的動作！

可以想見，其他成員使用 git submodule update 的情況會遠比 git submodule init 多很多。

- **修改 Submodule 的內容**
這裡有一點非常需要注意，因為 Submodule 的更新只記錄 commit id，所以你必須先在 submodule 內做 commit、push 後、再到 parent git 做 push，不然會出現版本錯亂的問題，別人跟你 submodule 的內容將會不一致。
