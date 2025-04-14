# Vercel部署指南 - 宝宝点菜机

本文档将指导您如何将"宝宝点菜机"应用部署到Vercel平台，以便您和您的伴侣可以随时随地使用这个应用来决定晚餐菜单。

## 准备工作

在开始部署之前，您需要准备以下内容：

1. 一个GitHub账号（用于存储代码）
2. 一个Vercel账号（用于部署应用）
3. DeepSeek API密钥（已在代码中配置）

## 步骤1：创建GitHub仓库

1. 登录您的GitHub账号
2. 点击右上角的"+"图标，选择"New repository"
3. 填写仓库名称，例如"baby-food-selector"
4. 选择"Public"或"Private"（根据您的偏好）
5. 点击"Create repository"

## 步骤2：上传代码到GitHub

在您的本地计算机上，执行以下命令：

```bash
# 克隆空仓库
git clone https://github.com/您的用户名/baby-food-selector.git

# 将项目文件复制到仓库文件夹中
# (将下载的zip文件解压到这个文件夹)

# 进入仓库文件夹
cd baby-food-selector

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到GitHub
git push origin main
```

## 步骤3：在Vercel上部署

1. 访问 [Vercel官网](https://vercel.com/) 并登录
2. 点击"New Project"按钮
3. 从列表中选择您刚刚创建的GitHub仓库
4. 在配置页面上：
   - 项目名称：保持默认或自定义
   - 框架预设：确保选择"Next.js"
   - 根目录：保持默认（通常是"/"）
   - 构建命令：保持默认（`next build`）
   - 输出目录：保持默认（`.next`）

5. 环境变量设置（可选）：
   - 如果您想使用自己的DeepSeek API密钥，可以添加一个名为`DEEPSEEK_API_KEY`的环境变量，并将您的API密钥作为值
   - 点击"Add"按钮添加环境变量

6. 点击"Deploy"按钮开始部署

## 步骤4：配置API路由（重要）

由于我们使用了Vercel Serverless Functions（在`/api`目录下），需要确保它们正确配置：

1. 在项目根目录创建一个`vercel.json`文件（如果不存在）
2. 添加以下内容：

```json
{
  "functions": {
    "api/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

这将为API函数分配足够的内存和执行时间，以确保DeepSeek API调用能够正常完成。

## 步骤5：更新API密钥（如果使用环境变量）

如果您在步骤3中设置了环境变量，需要修改`/api/getRecipes.js`文件：

将：
```javascript
const apiKey = 'sk-bjycxopygdghrgkutfezpgwxukfnfbyluxrzksefjmmbhyjx';
```

改为：
```javascript
const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-bjycxopygdghrgkutfezpgwxukfnfbyluxrzksefjmmbhyjx';
```

然后重新提交并推送到GitHub：

```bash
git add api/getRecipes.js
git commit -m "Update API key to use environment variable"
git push origin main
```

Vercel会自动检测到更改并重新部署您的应用。

## 步骤6：测试部署

1. 部署完成后，Vercel会提供一个URL（例如`https://baby-food-selector.vercel.app`）
2. 点击该URL访问您的应用
3. 测试所有功能是否正常工作：
   - 食材选择
   - 菜谱推荐
   - 决策界面
   - 分享功能

## 步骤7：自定义域名（可选）

如果您想使用自己的域名：

1. 在Vercel项目页面，点击"Settings"
2. 选择"Domains"
3. 输入您的域名并点击"Add"
4. 按照Vercel提供的说明配置DNS记录

## 故障排除

如果您在部署过程中遇到问题：

1. **API调用失败**：
   - 检查DeepSeek API密钥是否正确
   - 查看Vercel函数日志（在项目页面的"Functions"选项卡中）

2. **构建失败**：
   - 检查Vercel构建日志
   - 确保所有依赖项都正确安装

3. **页面加载问题**：
   - 检查浏览器控制台是否有错误
   - 确保所有路径和引用都是正确的

## 更新应用

当您想更新应用时：

1. 在本地修改代码
2. 提交并推送到GitHub
3. Vercel会自动检测更改并重新部署

## 结论

恭喜！您的"宝宝点菜机"应用现在已经成功部署到Vercel，您和您的伴侣可以随时随地使用它来决定晚餐菜单。

如果您有任何问题或需要进一步的帮助，请随时联系我。

祝您使用愉快！
