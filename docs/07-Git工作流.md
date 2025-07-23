# Git 工作流

本文檔說明 GDG Portal 專案的 Git 分支策略和開發流程，確保團隊協作的一致性和程式碼品質。

## 🌳 分支策略

我們採用 **Git Flow** 分支策略，包含以下主要分支：

### 📍 主要分支

#### `master` 分支
- **用途**: 生產環境穩定版本
- **特點**: 只包含經過測試的穩定程式碼
- **保護**: 禁止直接推送，只能透過 Pull Request 合併
- **部署**: 自動部署到生產環境

#### `develop` 分支
- **用途**: 開發主分支，整合最新功能
- **特點**: 包含下一個版本的所有功能
- **來源**: 從 `master` 分支建立
- **合併**: 接受來自 `feature` 和 `release` 分支的合併

### 🚀 功能分支

#### `feature/*` 分支
- **用途**: 開發新功能
- **命名**: `feature/功能名稱` (例如: `feature/user-profile`)
- **來源**: 從 `develop` 分支建立
- **合併**: 完成後合併回 `develop` 分支
- **生命週期**: 功能完成後刪除

#### `release/*` 分支
- **用途**: 準備新版本發布
- **命名**: `release/版本號` (例如: `release/v1.2.0`)
- **來源**: 從 `develop` 分支建立
- **用途**: 版本測試、bug 修復、文檔更新
- **合併**: 同時合併到 `master` 和 `develop`

#### `hotfix/*` 分支
- **用途**: 緊急修復生產環境問題
- **命名**: `hotfix/問題描述` (例如: `hotfix/login-bug`)
- **來源**: 從 `master` 分支建立
- **合併**: 同時合併到 `master` 和 `develop`
- **優先級**: 最高優先級

## 🔄 開發流程

### 1. 新功能開發

```bash
# 1. 切換到 develop 分支並拉取最新代碼
git checkout develop
git pull origin develop

# 2. 創建功能分支
git checkout -b feature/your-feature-name

# 3. 開發功能並提交
git add .
git commit -m "Add user authentication feature. 07/24"

# 4. 推送到遠端
git push origin feature/your-feature-name

# 5. 創建 Pull Request 到 develop 分支
```

### 2. 版本發布

```bash
# 1. 從 develop 創建 release 分支
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. 進行版本測試和 bug 修復
git commit -m "Fix minor bugs for release. 07/24"

# 3. 合併到 master 和 develop
git checkout master
git merge release/v1.2.0
git push origin master

git checkout develop
git merge release/v1.2.0
git push origin develop

# 4. 建立標籤 (自動化處理)
git tag v1.2.0
git push origin v1.2.0
```

### 3. 緊急修復

```bash
# 1. 從 master 創建 hotfix 分支
git checkout master
git pull origin master
git checkout -b hotfix/critical-bug

# 2. 修復問題
git commit -m "Fix critical login issue. 07/24"

# 3. 合併到 master 和 develop
git checkout master
git merge hotfix/critical-bug
git push origin master

git checkout develop
git merge hotfix/critical-bug
git push origin develop
```

## 📝 提交訊息規範

### 統一格式
所有提交訊息必須遵循以下格式：

```
訊息內容. MM/DD
```

### 範例
```bash
# ✅ 正確格式
git commit -m "Add user registration feature. 07/24"
git commit -m "Fix database connection issue. 07/24"
git commit -m "Update README documentation. 07/24"
git commit -m "Refactor authentication middleware. 07/24"

# ❌ 錯誤格式
git commit -m "added feature"
git commit -m "fix bug"
git commit -m "Update docs"
```

### 訊息類型建議

| 類型 | 說明 | 範例 |
|------|------|------|
| **Add** | 新增功能或檔案 | `Add user profile management. 07/24` |
| **Fix** | 修復錯誤 | `Fix database connection timeout. 07/24` |
| **Update** | 更新現有功能 | `Update user authentication flow. 07/24` |
| **Remove** | 移除功能或檔案 | `Remove deprecated API endpoints. 07/24` |
| **Refactor** | 重構代碼 | `Refactor database models. 07/24` |
| **Test** | 添加或修改測試 | `Add unit tests for user service. 07/24` |
| **Docs** | 文檔相關 | `Update API documentation. 07/24` |

## 🏷️ 版本標籤與發布

### 自動化發布
本專案已設定 GitHub Actions (`release.yml`)，當推送到 `master` 分支時會自動：

1. **建立版本標籤**: 根據 `package.json` 版本號自動建立
2. **生成發布說明**: 基於提交訊息自動生成
3. **部署到生產環境**: 觸發自動部署流程

### 版本號規範
採用 **語義化版本** (Semantic Versioning)：

```
主版本號.次版本號.修訂號 (MAJOR.MINOR.PATCH)
```

- **主版本號**: 不相容的 API 修改
- **次版本號**: 新增功能但向後相容
- **修訂號**: 向後相容的錯誤修復

### 範例版本演進
```
v1.0.0 → v1.0.1 (修復錯誤)
v1.0.1 → v1.1.0 (新增功能)
v1.1.0 → v2.0.0 (重大變更)
```

## 🛡️ 分支保護規則

### Master 分支保護
- **禁止直接推送**: 只能透過 Pull Request
- **必要審查**: 至少一位審查者批准
- **狀態檢查**: 必須通過 CI/CD 檢查
- **最新分支**: 必須基於最新的 `master` 分支

### Develop 分支保護
- **Pull Request**: 建議使用 Pull Request
- **代碼審查**: 建議至少一位審查者
- **測試通過**: 確保功能測試通過

## 🔍 最佳實踐

### 1. 提交頻率
- **小而頻繁**: 每個邏輯單元完成後就提交
- **原子性**: 每次提交只包含一個邏輯變更
- **測試**: 確保每次提交的代碼都能運行

### 2. Pull Request
- **描述清楚**: 詳細說明變更內容和原因
- **截圖/GIF**: 如果有 UI 變更，提供視覺證據
- **測試**: 說明如何測試這些變更
- **關聯 Issue**: 如果相關，請關聯對應的 Issue

### 3. 代碼審查
- **及時回應**: 24 小時內回應 Pull Request
- **建設性意見**: 提供具體和有幫助的建議
- **學習機會**: 把審查當作學習和分享的機會

### 4. 分支管理
- **及時刪除**: 功能完成後刪除對應的 feature 分支
- **保持同步**: 定期從 `develop` 分支同步最新變更
- **避免長期分支**: 減少合併衝突的可能性

## 🚨 常見問題解決

### 合併衝突
```bash
# 1. 拉取最新的目標分支
git checkout develop
git pull origin develop

# 2. 切回功能分支並合併
git checkout feature/your-feature
git merge develop

# 3. 解決衝突後提交
git add .
git commit -m "Resolve merge conflicts. 07/24"
```

### 錯誤提交
```bash
# 修改最後一次提交訊息
git commit --amend -m "Correct commit message. 07/24"

# 撤銷最後一次提交 (保留變更)
git reset --soft HEAD~1

# 撤銷最後一次提交 (丟棄變更)
git reset --hard HEAD~1
```

### 忘記切分支
```bash
# 如果在 master/develop 上直接開發
git stash                        # 暫存變更
git checkout -b feature/new-feature  # 創建新分支
git stash pop                    # 恢復變更
```

## 📚 相關資源

- [Git Flow 詳細介紹](https://nvie.com/posts/a-successful-git-branching-model/)
- [語義化版本規範](https://semver.org/lang/zh-TW/)
- [提交訊息最佳實踐](https://chris.beams.io/posts/git-commit/)
- [GitHub Flow 工作流程](https://guides.github.com/introduction/flow/)

遵循這些規範將確保我們的專案保持高品質的代碼和清晰的開發歷史，讓團隊協作更加順暢！
