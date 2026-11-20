# 数据库记录（hyt_database.md）

> 规则：每次建表、改表或插入数据后，按执行顺序追加 SQL 语句（含测试数据 INSERT），
> 要求仅凭本文件即可在新机器上完整重建数据库。

---

## 0. 初始化说明

- 数据库类型：MySQL
- 连接凭据：见 `backend/.env`（`DB_USER` / `DB_PASSWORD` / `DB_HOST` / `DB_NAME`），本文件不记录任何凭据。
- 尚未建表；后续建表语句按顺序追加在下方。

---

## 1. 创建数据库 · 2026-11-20 14:47

```sql
CREATE DATABASE IF NOT EXISTS hyt_web_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
```

- 说明：库名与 `backend/.env` 中的 `DB_NAME` 一致；字符集 utf8mb4，排序规则 utf8mb4_general_ci。
- 环境备注：本机 MySQL 8.0.30 的 `root` 密码已按课程要求设置，凭据仅保存在 `backend/.env`，成功连接验证通过（`SELECT VERSION()` 返回 8.0.30）。

---

## 2. 建表 hyt_news（科技新闻）· 2026-11-20 14:56

```sql
CREATE TABLE IF NOT EXISTS hyt_news (
  hyt_id           INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  hyt_title        VARCHAR(120) NOT NULL COMMENT '标题',
  hyt_category     VARCHAR(30)  NOT NULL DEFAULT '科技' COMMENT '栏目',
  hyt_summary      VARCHAR(255) NOT NULL COMMENT '摘要',
  hyt_source       VARCHAR(60)  NOT NULL DEFAULT '本站' COMMENT '来源',
  hyt_cover        VARCHAR(255) DEFAULT NULL COMMENT '封面图地址',
  hyt_published_at DATETIME     NOT NULL COMMENT '发布时间',
  hyt_views        INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '浏览量',
  hyt_created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (hyt_id),
  KEY hyt_idx_published (hyt_published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='科技新闻';
```

## 3. 测试数据（8 条）· 2026-11-20 14:56

```sql
INSERT INTO hyt_news (hyt_title, hyt_category, hyt_summary, hyt_source, hyt_views, hyt_published_at) VALUES
('国产 AI 芯片新一代架构发布，训练能效提升明显', '芯片', '新架构面向大模型训练场景，单位算力能耗较上一代下降约三成，多家整机厂商已同步推出适配方案。', '科技日报', 1286, '2026-11-20 08:30:00'),
('6G 关键技术试验完成阶段性验证', '通信', '太赫兹通信与智能超表面在室内外场景完成联合测试，单用户峰值速率达到预期指标。', '中国信息通信研究院', 964, '2026-11-19 16:10:00'),
('量子计算原型机实现新型纠错方案验证', '量子', '研究团队在超导量子比特上验证了表面码纠错流程，逻辑比特寿命首次超过物理比特。', '中国科学院', 1520, '2026-11-19 09:20:00'),
('人形机器人进入汽车总装线试点', '机器人', '多台人形机器人在总装车间承担物料搬运与螺栓预紧任务，单班次作业效率接近熟练工人。', '智能制造周刊', 2043, '2026-11-18 14:05:00'),
('固态电池中试线良率突破关键节点', '新能源', '硫化物固态电解质体系中试线良品率提升至可量产水平，能量密度目标为 400 Wh/kg。', '能源观察', 1187, '2026-11-18 10:40:00'),
('低轨卫星互联网完成连续覆盖测试', '航天', '多颗低轨卫星组网后完成跨区域连续通信测试，时延与切换成功率达到设计要求。', '航天科技报', 842, '2026-11-17 15:30:00'),
('操作系统新版本强化端侧 AI 能力', '软件', '新版本将端侧推理框架下沉至系统层，常用应用可获得更低时延的本地智能服务。', '数码前沿', 2376, '2026-11-16 11:15:00'),
('新型 AR 眼镜重量降至 45 克', '消费电子', '采用光波导与微型显示方案，整机重量与普通眼镜接近，支持全天候佩戴与语音交互。', '消费电子评测', 1655, '2026-11-15 18:20:00');
```

- 执行方式：`mysql --user=root --default-character-set=utf8mb4 -e "source hyt_news_init.sql"`，执行后 `SELECT COUNT(*)` 返回 8。

---

## 4. 重构 hyt_news 表结构（按新需求字段）· 2026-11-20 15:04

```sql
DROP TABLE IF EXISTS hyt_news;

CREATE TABLE hyt_news (
  hyt_id           INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  hyt_title        VARCHAR(120) NOT NULL COMMENT '标题',
  hyt_summary      VARCHAR(255) NOT NULL COMMENT '摘要',
  hyt_content      TEXT         NOT NULL COMMENT '正文',
  hyt_source       VARCHAR(60)  NOT NULL DEFAULT '本站' COMMENT '来源',
  hyt_publish_time DATETIME     NOT NULL COMMENT '发布时间',
  hyt_cover_img    VARCHAR(255) DEFAULT NULL COMMENT '封面图地址',
  PRIMARY KEY (hyt_id),
  KEY hyt_idx_publish_time (hyt_publish_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='科技新闻';
```

## 5. 测试数据（8 条，含正文与封面）· 2026-11-20 15:04

```sql
INSERT INTO hyt_news (hyt_title, hyt_summary, hyt_content, hyt_source, hyt_publish_time, hyt_cover_img) VALUES
('国产 AI 芯片新一代架构发布，训练能效提升明显', '新架构面向大模型训练场景，单位算力能耗较上一代下降约三成，多家整机厂商已同步推出适配方案。', '该芯片采用芯粒拼接与近存计算设计，单卡显存带宽较上一代提升约四成。官方公布的数据显示，在同等训练任务下单位算力能耗下降约三成。目前已有三家服务器厂商完成整机适配，配套的软件栈同步开源，开发者可直接在现有框架上迁移。', '科技日报', '2026-11-20 08:30:00', 'https://picsum.photos/seed/hyt-news-1/800/450'),
('6G 关键技术试验完成阶段性验证', '太赫兹通信与智能超表面在室内外场景完成联合测试，单用户峰值速率达到预期指标。', '试验在城区、郊区和室内三类场景展开，重点验证太赫兹频段的覆盖能力与智能超表面的补盲效果。测试结果显示，单用户峰值速率与多用户并发容量均达到课题任务书指标，切换时延控制在毫秒级。下一阶段将转向外场连续覆盖与终端小型化验证。', '中国信息通信研究院', '2026-11-19 16:10:00', 'https://picsum.photos/seed/hyt-news-2/800/450'),
('量子计算原型机实现新型纠错方案验证', '研究团队在超导量子比特上验证了表面码纠错流程，逻辑比特寿命首次超过物理比特。', '团队在 66 比特超导处理器上运行表面码纠错循环，通过实时反馈解码把逻辑错误率压低到物理错误率以下。实验中逻辑比特的相干时间首次超过单个物理比特，为后续扩展比特规模提供了可复用的控制方案。相关结果已通过同行评议。', '中国科学院', '2026-11-19 09:20:00', 'https://picsum.photos/seed/hyt-news-3/800/450'),
('人形机器人进入汽车总装线试点', '多台人形机器人在总装车间承担物料搬运与螺栓预紧任务，单班次作业效率接近熟练工人。', '试点产线部署了 12 台人形机器人，覆盖内饰装配前的物料配送与底盘螺栓预紧两道工序。现场数据显示，单班次完成节拍与熟练工人差距缩小到一成以内，换型所需示教时间由小时级缩短到分钟级。厂方计划在明年把试点扩展到三个车间。', '智能制造周刊', '2026-11-18 14:05:00', 'https://picsum.photos/seed/hyt-news-4/800/450'),
('固态电池中试线良率突破关键节点', '硫化物固态电解质体系中试线良品率提升至可量产水平，能量密度目标为 400 Wh/kg。', '中试线通过改进电解质涂布工艺与界面修饰方案，把电芯良品率提升到可量产区间。首批样品能量密度达到 400 Wh/kg，循环 500 次后容量保持率超过八成。企业表示将先在小批量车型上验证，再逐步扩大产线规模。', '能源观察', '2026-11-18 10:40:00', 'https://picsum.photos/seed/hyt-news-5/800/450'),
('低轨卫星互联网完成连续覆盖测试', '多颗低轨卫星组网后完成跨区域连续通信测试，时延与切换成功率达到设计要求。', '测试航线跨越三个纬度区间，终端在移动过程中完成数十次星间切换。结果显示端到端时延稳定在数十毫秒，切换成功率高于设计指标。项目方称下一阶段将扩充星座规模，并同步推进机载与船载终端的小型化。', '航天科技报', '2026-11-17 15:30:00', 'https://picsum.photos/seed/hyt-news-6/800/450'),
('操作系统新版本强化端侧 AI 能力', '新版本将端侧推理框架下沉至系统层，常用应用可获得更低时延的本地智能服务。', '新版本把推理调度、模型压缩与硬件加速统一到系统层，第三方应用通过标准接口即可调用。官方演示中，语音转写与图像检索的本地响应时延下降约一半，敏感数据不出设备。开发者套件已同步开放，并提供量化工具链。', '数码前沿', '2026-11-16 11:15:00', 'https://picsum.photos/seed/hyt-news-7/800/450'),
('新型 AR 眼镜重量降至 45 克', '采用光波导与微型显示方案，整机重量与普通眼镜接近，支持全天候佩戴与语音交互。', '新品采用单层光波导与微型 Micro-LED 显示方案，整机重量 45 克，镜腿内置电池与触控。实测连续显示续航约 4 小时，支持语音指令与手机投屏。厂商表示下一代将重点优化户外亮度与近视镜片适配。', '消费电子评测', '2026-11-15 18:20:00', 'https://picsum.photos/seed/hyt-news-8/800/450');
```

- 说明：第 4、5 节替代第 2、3 节的旧结构（旧表只有 summary 无 content、时间字段名不同），以本节为准；执行后 `COUNT(*) = 8`，时间范围 2026-11-15 18:20 ~ 2026-11-20 08:30。

---

## 6. 建表 hyt_gallery（图文列表）· 2026-11-20 15:16

```sql
CREATE TABLE IF NOT EXISTS hyt_gallery (
  hyt_id           INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  hyt_title        VARCHAR(80)  NOT NULL COMMENT '图片标题',
  hyt_desc         VARCHAR(255) NOT NULL COMMENT '图说',
  hyt_location     VARCHAR(60)  NOT NULL COMMENT '拍摄地点',
  hyt_img          VARCHAR(255) NOT NULL COMMENT '图片地址',
  hyt_publish_time DATETIME     NOT NULL COMMENT '发布时间',
  PRIMARY KEY (hyt_id),
  KEY hyt_idx_gallery_time (hyt_publish_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='图文列表';
```

## 7. 测试数据（8 条）· 2026-11-20 15:16

```sql
INSERT INTO hyt_gallery (hyt_title, hyt_desc, hyt_location, hyt_img, hyt_publish_time) VALUES
('紫禁城的秋日金顶', '琉璃瓦在午后的斜阳里连成一片暖金，红墙与蓝天之间只剩干净的光影。', '北京 · 故宫', '/images/hyt_gallery_1.jpg', '2026-11-20 09:10:00'),
('西湖的清晨薄雾', '苏堤尚未醒透，湖面浮着浅淡的雾，远处的塔影被水光揉得柔软。', '杭州 · 西湖', '/images/hyt_gallery_2.jpg', '2026-11-19 07:20:00'),
('鸣沙山下的月牙泉', '驼队在沙脊上投下长长的影子，一弯泉水安静地卧在金黄沙丘之间。', '敦煌 · 鸣沙山', '/images/hyt_gallery_3.jpg', '2026-11-18 18:30:00'),
('张家界的石峰云海', '石英砂岩峰林从林海中拔起，云雾在峰间流动，山谷里满是湿润的绿。', '张家界 · 武陵源', '/images/hyt_gallery_4.jpg', '2026-11-17 06:50:00'),
('黄山的云海与迎客松', '岩峰浮在云层之上，崖边老松伸展枝干，山风吹过时云海缓缓翻涌。', '安徽 · 黄山', '/images/hyt_gallery_5.jpg', '2026-11-16 08:40:00'),
('丽江古城的灯影长街', '石板路两侧挂起红灯笼，屋顶连成深色剪影，尽头是覆着雪的玉龙雪山。', '丽江 · 古城', '/images/hyt_gallery_6.jpg', '2026-11-15 19:05:00'),
('鼓浪屿的红砖与海风', '红砖洋楼藏在古榕与棕榈之间，海面泛着亮蓝色，风一吹便带走午后的燥热。', '厦门 · 鼓浪屿', '/images/hyt_gallery_7.jpg', '2026-11-14 15:25:00'),
('漓江上的竹筏', '山峰倒映在流动的江水里，竹筏贴着水面缓缓向前，两岸是满目青翠。', '桂林 · 漓江', '/images/hyt_gallery_8.jpg', '2026-11-13 10:15:00');
```

- 图片文件：`hyt-prompt/frontend/images/hyt_gallery_1.jpg ~ hyt_gallery_8.jpg`（AI 生成，2560×1440）；执行后 `COUNT(*) = 8`。
