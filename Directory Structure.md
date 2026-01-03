next-app/
├── .env.local # 本地环境变量（不提交到Git，敏感配置存放）
├── .env.production # 生产环境变量（可选，按需配置）
├── .env.development # 开发环境变量（可选，按需配置）
├── .gitignore # Git 忽略配置（node_modules、.next 等）
├── next.config.js # Next.js 核心配置文件（路由、构建、静态资源等）
├── package.json # 项目依赖、脚本配置
├── tsconfig.json # TypeScript 配置（推荐使用TS，增强类型安全）
├── postcss.config.js # PostCSS 配置（Tailwind CSS 等样式工具依赖）
├── tailwind.config.js # Tailwind CSS 配置（主流样式方案，可选）
├── public/ # 静态公共资源（无需编译，直接映射到根路径）
│ ├── favicon.ico # 网站图标
│ ├── logo.png # 项目Logo
│ ├── images/ # 公共图片资源（如首页轮播图、默认头像等）
│ └── robots.txt # 搜索引擎爬虫配置
├── app/ # App Router 核心目录（Next.js 13+ 推荐，路由基于文件系统）
│ ├── layout.tsx # 根布局组件（全局共享布局，如导航栏、页脚、全局样式）
│ ├── page.tsx # 首页（根路由 / 对应的页面组件）
│ ├── error.tsx # 全局错误捕获组件（页面出错时展示）
│ ├── loading.tsx # 全局加载组件（异步数据加载时的骨架屏/加载动画）
│ ├── not-found.tsx # 404 页面组件（路由不存在时展示）
│ ├── dashboard/ # 业务模块目录（示例：仪表盘模块，对应 /dashboard 路由）
│ │ ├── layout.tsx # 仪表盘模块局部布局（仅该模块下页面共享）
│ │ ├── page.tsx # 仪表盘首页（/dashboard）
│ │ ├── settings/ # 子模块目录（对应 /dashboard/settings 路由）
│ │ │ └── page.tsx # 仪表盘设置页面
│ │ └── [userId]/ # 动态路由目录（对应 /dashboard/123 等动态路径，[] 包裹动态参数）
│ │ └── page.tsx # 动态路由页面（获取 userId 参数进行数据渲染）
│ └── api/ # API 路由目录（App Router 下的 API，对应 /api 路径）
│ │ └── route.ts # 示例 API 路由
│ ├── user/ # 用户相关 API 模块
│ │ └── route.ts # 用户 API 接口（支持 GET/POST/PUT/DELETE 等请求）
│ └── product/ # 商品相关 API 模块
│ └── route.ts # 商品 API 接口
├── components/ # 全局公共组件（所有页面/模块共享）
│ ├── ui/ # 基础UI组件（原子组件，可复用性极强）
│ │ ├── Button.tsx # 按钮组件
│ │ ├── Input.tsx # 输入框组件
│ │ ├── Card.tsx # 卡片组件
│ │ └── Modal.tsx # 弹窗组件
│ ├── layout/ # 布局相关组件（非路由布局，如侧边栏、面包屑）
│ │ ├── Navbar.tsx # 导航栏组件
│ │ ├── Footer.tsx # 页脚组件
│ │ └── Sidebar.tsx # 侧边栏组件
│ └── features/ # 业务功能组件（按业务模块划分，复用性中等）
│ ├── auth/ # 认证相关组件（登录表单、注册表单等）
│ │ ├── LoginForm.tsx
│ │ └── RegisterForm.tsx
│ └── product/ # 商品相关组件（商品卡片、商品列表等）
│ ├── ProductCard.tsx
│ └── ProductList.tsx
├── lib/ # 工具库/公共逻辑（非组件代码，全局复用）
│ ├── utils.ts # 通用工具函数（格式化时间、校验表单等）
│ ├── api.ts # API 请求封装（统一请求拦截、响应处理）
│ ├── db.ts # 数据库连接配置（Prisma/MongoDB 等）
│ └── hooks/ # 自定义 React Hooks（全局复用的状态/逻辑钩子）
│ ├── useAuth.ts # 认证相关 Hook（获取用户信息、登录状态等）
│ └── useCart.ts # 购物车相关 Hook（添加商品、计算总价等）
├── models/ # 数据模型/类型定义（TypeScript 接口、数据库模型）
│ ├── user.ts # 用户数据类型（IUser、UserCreateInput 等）
│ ├── product.ts # 商品数据类型（IProduct 等）
│ └── order.ts # 订单数据类型（IOrder 等）
├── styles/ # 全局样式文件（可选，配合 Tailwind 或单独使用）
│ ├── globals.css # 全局 CSS（重置样式、全局通用样式）
│ └── components/ # 组件专属样式（可选，如 CSS Modules）
├── middleware.ts # Next.js 中间件（全局路由守卫、请求拦截、重定向等）
├── prisma/ # Prisma ORM 配置（可选，数据库方案）
│ ├── schema.prisma # 数据库模型定义
│ └── migrations/ # 数据库迁移文件
└── .next/ # 构建输出目录（自动生成，无需手动修改，.gitignore 忽略）
