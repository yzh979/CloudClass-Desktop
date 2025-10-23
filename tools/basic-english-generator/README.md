# 基础英语850词汇变形生成器

## 项目介绍

这是一个独立的Python工具，用于系统地生成基础英语（Basic English）850个单词及其根据Ogden规则派生的所有语法变形。该工具输出交互式HTML页面和CSV/Excel数据文件，便于学习和研究基础英语词汇体系。

## 什么是基础英语850词汇？

基础英语（Basic English）是由英国语言学家Charles Kay Ogden在1930年代创立的简化英语系统。它包含850个精心挑选的核心词汇，通过这些词汇及其变形和组合，可以表达日常英语的绝大部分含义。

### 850词汇分类

1. **Operations (100词)**: 基本操作词，包括动词、介词、连词等
   - 核心动词：come, get, give, go, keep, let, make, put, seem, take, be, do, have, say, see, send
   - 介词：about, across, after, against, among, at, before, between, by, down, from, in, off, on, over, through, to, under, up, with
   - 连词和其他：and, as, at, because, but, for, if, of, or, than, that, though, till, while

2. **Things (600词)**: 事物名词
   - General Things (400词)：抽象和一般事物（如account, act, addition, agreement等）
   - Picturable Things (200词)：可视化的具体事物（如angle, ant, apple, arm, baby等）

3. **Qualities (100词)**: 形容词，描述性质和状态
   - 如able, beautiful, black, bright, clean, cold, good, happy, high, important, large, new, old等

4. **Miscellaneous (50词)**: 其他词类
   - 冠词、代词、副词、数词等

## Ogden变形规则详解

### 规则1：名词复数 (-s, -es, -ies)

名词的复数形式是英语最基本的变形之一。

**规则：**
- **一般名词 + s**: book → books, table → tables
- **以s/x/ch/sh/ss结尾 + es**: box → boxes, church → churches, glass → glasses
- **辅音字母+y结尾，变y为ies**: baby → babies, country → countries
- **以f/fe结尾，变f/fe为ves**: knife → knives, leaf → leaves
- **不规则变化**: 
  - man → men, woman → women
  - child → children
  - tooth → teeth, foot → feet
  - sheep → sheep (单复数同形)

**示例：**
```
book → books
box → boxes
baby → babies
knife → knives
man → men
```

### 规则2：名词派生词（300个动作相关名词）

约300个与动作相关的名词可以派生出四种形式。

#### 规则2a：-er派生（做...的人/物）

表示执行该动作的人或工具。

**规则：**
- **一般词 + er**: teach → teacher, work → worker
- **以e结尾 + r**: make → maker, write → writer
- **辅音+y变ier**: carry → carrier
- **重读闭音节双写末尾字母+er**: run → runner, swim → swimmer

**示例：**
```
teach → teacher (教师)
work → worker (工人)
make → maker (制造者)
run → runner (跑步者)
```

#### 规则2b：-ing派生（名词性/形容词性）

可以作为名词（表示行为）或形容词（表示正在进行）。

**规则：**
- **一般词 + ing**: build → building, meet → meeting
- **以不发音的e结尾，去e加ing**: make → making, write → writing
- **重读闭音节双写末尾字母+ing**: run → running, swim → swimming
- **以ie结尾变ying**: die → dying, lie → lying

**示例：**
```
build → building (建筑物/建造)
make → making (制作)
run → running (跑步/正在跑的)
interest → interesting (有趣的)
```

#### 规则2c：-ed派生（形容词：被...的）

表示被动或完成状态。

**规则：**
- **一般词 + ed**: interest → interested, excite → excited
- **以e结尾 + d**: like → liked, love → loved
- **辅音+y变ied**: worry → worried, carry → carried
- **重读闭音节双写末尾字母+ed**: stop → stopped, plan → planned

**示例：**
```
interest → interested (感兴趣的)
excite → excited (激动的)
worry → worried (担心的)
stop → stopped (被停止的)
```

### 规则3：形容词派生副词 (-ly)

形容词可以通过添加-ly变成副词，表示动作的方式。

**规则：**
- **一般形容词 + ly**: quick → quickly, beautiful → beautifully
- **以辅音+y结尾变ily**: happy → happily, easy → easily
- **以le结尾去e加y**: simple → simply, possible → possibly
- **以ic结尾加ally**: automatic → automatically, basic → basically

**示例：**
```
quick → quickly (快速地)
happy → happily (快乐地)
simple → simply (简单地)
automatic → automatically (自动地)
```

### 规则4：比较级和最高级

形容词的比较级用于比较两者，最高级用于三者或以上。

**规则：**
- **单音节和部分双音节词 + er/est**: 
  - small → smaller → smallest
  - tall → taller → tallest
- **以e结尾 + r/st**: large → larger → largest
- **辅音+y变ier/iest**: happy → happier → happiest
- **重读闭音节双写+er/est**: big → bigger → biggest
- **长词用more/most**: beautiful → more beautiful → most beautiful
- **不规则变化**:
  - good → better → best
  - bad → worse → worst
  - little → less → least
  - much → more → most
  - far → farther/further → farthest/furthest

**示例：**
```
small → smaller → smallest
happy → happier → happiest
beautiful → more beautiful → most beautiful
good → better → best
```

### 规则5：否定形容词 (un-)

通过添加前缀un-形成反义词。

**规则：**
- **大部分形容词可加un-**: happy → unhappy, able → unable
- **不适用情况**:
  - 颜色形容词：red, blue, green等
  - 已经是否定的词：unhappy不再加un-
  - 使用其他否定前缀的词：possible (impossible), regular (irregular)

**示例：**
```
happy → unhappy (不快乐的)
able → unable (不能的)
kind → unkind (不友善的)
```

### 规则6：复合词

两个词组合成一个新词，创造新的含义。

**规则：**
- **名词+名词**: milk + man → milkman (送奶工)
- **名词+方向词**: sun + down → sundown (日落)
- **其他组合**: book + mark → bookmark (书签)

**常见复合词示例：**
```
sunlight (阳光)
moonlight (月光)
fireman (消防员)
waterfall (瀑布)
bookkeeper (簿记员)
handwriting (笔迹)
footprint (脚印)
daylight (日光)
```

### 规则7：动词变化

动词需要根据时态和人称变化。

**规则：**

1. **第三人称单数（现在时）**:
   - 一般动词 + s: work → works
   - 以s/x/ch/sh/o结尾 + es: go → goes, watch → watches
   - 辅音+y变ies: study → studies

2. **过去式和过去分词**:
   - 一般动词 + ed: work → worked
   - 以e结尾 + d: like → liked
   - 辅音+y变ied: study → studied
   - 重读闭音节双写+ed: stop → stopped

3. **现在分词**:
   - 一般动词 + ing: work → working
   - 去e加ing: make → making
   - 双写+ing: run → running

4. **不规则动词**（部分示例）:
   ```
   be → am/is/are → was/were → being → been
   come → comes → came → coming → come
   do → does → did → doing → done
   get → gets → got → getting → got/gotten
   give → gives → gave → giving → given
   go → goes → went → going → gone
   have → has → had → having → had
   make → makes → made → making → made
   see → sees → saw → seeing → seen
   take → takes → took → taking → taken
   ```

## 安装依赖

该工具需要Python 3.8或更高版本。

### 安装方法

```bash
# 进入工具目录
cd tools/basic-english-generator

# 安装依赖
pip install -r requirements.txt
```

### 依赖说明

- **openpyxl (>=3.1.0)**: 用于生成Excel文件
- **jinja2 (>=3.1.0)**: 用于HTML模板渲染

## 运行脚本

```bash
# 在工具目录下运行
python basic_english_generator.py

# 或者使用绝对路径
python /path/to/tools/basic-english-generator/basic_english_generator.py
```

### 运行过程

脚本运行时会显示详细的进度信息：

```
============================================================
基础英语850词汇变形生成器
============================================================

1. 加载词汇数据: basic_english_850.json
   加载了 850 个词汇
   - Operations: 100
   - General Things: 400
   - Picturable Things: 200
   - Qualities: 100

2. 处理词汇并生成变形...
   处理完成，共生成 850 个词条

3. 生成HTML交互页面: output/basic_english_derivatives.html
   ✓ HTML页面生成成功

4. 生成CSV文件: output/basic_english_derivatives.csv
   ✓ CSV文件生成成功

5. 生成Excel文件: output/basic_english_derivatives.xlsx
   ✓ Excel文件生成成功

============================================================
所有文件生成完成！
============================================================

输出目录: output
  - basic_english_derivatives.html  (交互式HTML页面)
  - basic_english_derivatives.csv   (CSV数据文件)
  - basic_english_derivatives.xlsx  (Excel多表格文件)

请在浏览器中打开HTML文件查看交互界面。
```

## 输出文件说明

### 1. HTML交互页面 (basic_english_derivatives.html)

一个功能完整的交互式网页，包含：

**主要功能：**
- **统计面板**: 显示总词数、各词性数量、各类变形数量
- **搜索功能**: 实时搜索单词（支持原词或任何变形）
- **筛选功能**:
  - 按词性筛选：全部/名词/形容词/动词/其他
  - 按变形类型筛选：全部/有复数/有比较级/有-ing/有-ed/有-ly/有un-
- **数据表格**: 
  - 显示所有850个词及其变形
  - 响应式设计，移动端友好
  - 可滚动浏览
- **规则说明**: 可展开的Ogden规则详细说明

**使用方法：**
1. 用任何现代浏览器打开HTML文件
2. 在搜索框输入关键词进行搜索
3. 使用筛选按钮快速定位特定类型的词汇
4. 点击"规则说明"查看详细的变形规则

**技术特性：**
- 使用Bootstrap 5，界面美观现代
- 纯客户端JavaScript，无需服务器
- 完全离线可用
- 渐变色设计，用户体验优秀

### 2. CSV文件 (basic_english_derivatives.csv)

标准CSV格式，可用Excel、Google Sheets或任何文本编辑器打开。

**列结构：**
```
原词 | 词性 | 中文释义 | 复数形式 | 比较级 | 最高级 | -er派生 | -ing派生 | -ed派生 | -ly派生 | 否定形式 | 复合词 | 第三人称单数 | 过去式 | 现在分词 | 过去分词 | 变形规则说明
```

**特点：**
- 使用UTF-8-BOM编码，确保中文正确显示
- 所有850个词的完整数据
- 便于数据分析和处理
- 可直接导入数据库或其他工具

**使用场景：**
- 数据分析和统计
- 导入到词汇学习软件
- 制作单词卡片
- 语言学研究

### 3. Excel文件 (basic_english_derivatives.xlsx)

多工作表Excel文件，格式精美，便于打印和阅读。

**工作表结构：**

1. **Sheet 1: 完整派生词列表**
   - 所有850个词的完整信息
   - 包含所有变形列
   - 彩色标题，易于阅读

2. **Sheet 2: 名词及其变形**
   - 仅包含名词（约600个）
   - 显示复数、-er/-ing/-ed派生、复合词
   - 便于专门学习名词变形

3. **Sheet 3: 形容词及其变形**
   - 仅包含形容词（100个）
   - 显示比较级、最高级、-ly派生、un-否定
   - 便于专门学习形容词变形

4. **Sheet 4: 动词及其变形**
   - 仅包含可变位的动词
   - 显示第三人称单数、过去式、现在分词、过去分词
   - 包括不规则动词的完整变化

5. **Sheet 5: 统计汇总**
   - 各类词汇的数量统计
   - 各类变形的数量统计
   - 便于了解整体情况

6. **Sheet 6: Ogden规则说明**
   - 7种变形规则的详细说明
   - 中文解释和示例
   - 方便查阅和学习

**特点：**
- 表头使用深蓝色背景，白色粗体字
- 自动调整列宽，便于阅读
- 多工作表分类，便于专项学习
- 适合打印成学习材料

## 数据准确性说明

### 词汇来源
本工具使用的850个词汇基于Charles Kay Ogden的Basic English词表，这是一个公认的简化英语标准。

### 变形规则
所有变形规则都经过仔细实现，包括：
- 规则变化的完整覆盖
- 不规则变化的特殊处理
- 特殊情况的异常处理

### 已知限制
1. **音节判断**: 使用词长作为简化判断，可能有少数误差
2. **复合词**: 仅生成常见的、语义清晰的复合词
3. **派生词适用性**: 约300个名词标记为可派生，基于动作相关性判断

## 使用示例

### 示例1：查找所有"happy"相关变形

1. 打开HTML文件
2. 在搜索框输入"happy"
3. 查看结果：
   - happy (形容词) - 快乐的
   - 比较级: happier
   - 最高级: happiest
   - 副词: happily
   - 否定: unhappy

### 示例2：学习所有名词复数

1. 打开Excel文件
2. 进入"名词及其变形"工作表
3. 查看"复数形式"列
4. 对比规则变化和不规则变化

### 示例3：数据分析

```python
import pandas as pd

# 读取CSV
df = pd.read_csv('output/basic_english_derivatives.csv')

# 统计有比较级的形容词数量
adj_with_comp = df[(df['词性'] == 'adjective') & (df['比较级'] != '')].shape[0]

# 找出所有不规则动词
irregular = df[df['变形规则说明'].str.contains('不规则', na=False)]
```

## 项目结构

```
tools/basic-english-generator/
├── basic_english_generator.py      # 主Python脚本（带详细中文注释）
├── basic_english_850.json          # 850词汇完整数据库
├── requirements.txt                # Python依赖
├── README.md                       # 本文档
├── templates/
│   └── index.html.j2              # HTML模板（Jinja2）
└── output/                         # 生成的输出目录（.gitignore）
    ├── basic_english_derivatives.html
    ├── basic_english_derivatives.csv
    └── basic_english_derivatives.xlsx
```

## 技术实现

### 核心算法

**名词复数算法：**
```python
def pluralize_noun(word):
    # 1. 检查不规则复数
    # 2. 以s/x/ch/sh结尾加es
    # 3. 辅音+y变ies
    # 4. 以f/fe结尾变ves
    # 5. 一般情况加s
```

**比较级算法：**
```python
def get_comparative_superlative(word):
    # 1. 检查不规则变化
    # 2. 根据音节数判断使用-er/-est还是more/most
    # 3. 处理特殊拼写规则
```

### 异常处理
- 文件不存在时的错误提示
- 数据格式错误时的容错处理
- 输出目录自动创建

### 性能优化
- 一次性加载所有数据
- 使用字典快速查找不规则变化
- 模板渲染优化

## 常见问题

### Q: 为什么某些词没有特定的变形？
A: 根据Ogden规则，不是所有词都适用所有变形。例如：
- 颜色形容词通常不加un-前缀
- 只有动作相关的名词才能派生-er/-ing/-ed形式
- 介词、连词等不进行变形

### Q: 比较级为什么有些用-er，有些用more？
A: 一般规则是：
- 单音节和部分双音节词用-er/-est
- 长词（通常3个音节以上）用more/most
- 本工具使用词长作为简化判断

### Q: 如何添加自己的词汇？
A: 编辑`basic_english_850.json`文件，按照现有格式添加新词条：
```json
{
  "word": "example",
  "pos": "noun",
  "chinese": "例子",
  "can_derive": false
}
```

### Q: 输出文件在哪里？
A: 默认在`output/`目录下。如果目录不存在，脚本会自动创建。

### Q: 可以修改HTML页面的样式吗？
A: 可以。编辑`templates/index.html.j2`文件中的CSS部分。

## 学习建议

### 初学者
1. 先浏览HTML页面，了解整体词汇结构
2. 重点学习Operations中的100个核心词
3. 使用筛选功能，分词性学习

### 进阶学习
1. 研究每个变形规则的具体应用
2. 对比规则变化和不规则变化
3. 学习复合词的构词逻辑

### 教师和研究者
1. 使用Excel进行数据分析
2. 导出特定词汇集制作教学材料
3. 研究词汇变形的统计规律

## 参考资料

- [Basic English - Wikipedia](https://en.wikipedia.org/wiki/Basic_English)
- Charles Kay Ogden - "Basic English: A General Introduction with Rules and Grammar" (1930)
- [The Basic English Institute](http://www.basic-english.org/)

## 许可证

本工具是CloudClass-Desktop项目的一部分，遵循项目的开源许可证。

## 维护和更新

如发现词汇数据错误或变形规则问题，请：
1. 检查`basic_english_850.json`数据准确性
2. 查看变形规则函数的实现
3. 提交issue或pull request

## 技术支持

如有问题，请在CloudClass-Desktop仓库提交issue。

---

**祝学习愉快！Happy Learning!** 📚✨
