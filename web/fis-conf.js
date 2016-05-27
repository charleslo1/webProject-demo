// ======================= 基础设置 ======================
// 项目设置
fis.set('project', {
  charset: 'utf8',
  md5Length: 7,
  md5Connector: '_',
  files: ['*'],
  ignore: ['**/node_modules/**', '**/bak/**',
 		  '**/{lib,libs,vendor}/**/*{demo,example,php,java,dotnet}*/**',
           'fis-conf.js', 'gulpfile.js', 'config.rb', 'package.json', 'component.json',
           '**/**.{zip,rar,bat,exe,bowerrc}']
});


// ======================= 发布控制 ======================
fis.match('*', {
  // 所有文件默认发布在/web目录下
  // release: '/web/$0'
});

fis.match('/{*.php,server/**}', {
  // 服务器文件默认不发布
  release: false
});

// statics下的文件使用CDN地址
/*fis.match('/statics/(**)', {
  domain: 'http://static.keketour.me/',
  url: '$1'
});*/


// ======================= 静态资源 ======================
// md5戳
fis.match('*.{js,json,css,scss,png,jpg,gif}', {
  useHash: false
});

fis.match('/{application,components,modules}/**', {
  // release
  release: '/statics/$0'
});

fis.match('/views/**.{js,json,css,scss,png,jpg,gif}', {
  // release
  release: '/statics/$0'
});

// 组件同名依赖
fis.match('*.{html,js,php}', {
  useSameNameRequire: false
});


// ======================= html处理 ======================
// php文件当作html处理
fis.match('*.php', {
  isHtmlLike: true,
  loaderLang: 'html'
});

// swig模板编译
fis.match('*.html', {
  parser: fis.plugin('swig')
});

// 不发布引用html
fis.match('_*.html', {
  release: false
});


// ======================= css处理 ======================
// sass编译
fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass')
});

// 不发布引用sass
fis.match('_*.scss', {
  release: false
});

// cssSprites
fis.match('::package', {
  spriter: fis.plugin('csssprites')   // 启用fis-spriter-csssprites
});

// 压缩
fis.match('*.{css,scss}', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true,
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});


// ======================= JS处理 ======================
// 模块化
fis.hook('commonjs', {
  // 模块根目录
  baseUrl: '/',
  // paths
  paths: {
    // path
    'com': '/components/',
    'mod': '/modules/',
    'util': '/application/js/util/',
    // file
    'jquery': '/components/jquery/jquery.js'
  }
});

fis.match('*.js', {
  isMod: true
});

fis.match('/application/js/base/mod.js', {
  isMod: false
});

fis.match('::package', {
  // npm install [-g] fis3-postpackager-loader
  // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
  postpackager: fis.plugin('loader', {
      resourceType: 'mod',
      useInlineMap: true,
      // resoucemap: '/statics/pkg/${filepath}.js'
  })
});

// 压缩
fis.match('{*.js,*.html:js,*.php:js}', {
  optimizer: fis.plugin('uglify-js', {
    mangle: {
    	//不想被压的字符串
		expect: ['require', 'define', 'module', 'exports', 'arguments']
    }
  })
});


// ======================= 图片处理 ======================
// png压缩
fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});


// ======================= [开发环境 fis3 release] ======================
// dev环境不需要的配置
fis.media('dev-fe')
  .match('*.{js,json,css,scss,png,jpg,gif}', {
    useHash: false,
    useSprite: false,
    optimizer: false
  }).match('/server/**', {
    // 服务器文件发布到根目录
    release: '/test/$0'
  }).match('/server/server.conf', {
    // 路由配置文件发布到config目录
    release: '/config/server.conf'
  });

fis.media('dev-dist')
  .match('*.{js,json,css,scss,png,jpg,gif}', {
    useHash: false,
    useSprite: false,
    optimizer: false
  }).match('*', {
    deploy: fis.plugin('local-deliver', {
        to: '../dist/'
    })
  });


// ======================= [测试环境 fis3 release test] ======================
// test环境
fis.media('test')
  .match('*.{js,json,css,scss,png,jpg,gif}', {
    useHash: false,
    // useSprite: false,
    optimizer: false
  })


// ======================= [发布环境 fis3 release pub] ======================
// pub环境
fis.media('pub')
  .match('*.{js,json,css,scss,png,jpg,gif}', {
    useHash: true,
    useSprite: true,
    // optimizer: false
  })
  // 方案一
  .match('::package', {
    packager: fis.plugin('map', {
      // application
      '/application/app.scss': [
        '/application/**.{scss,css}'
      ],
      '/application/mod.js': [
        '/application/js/base/mod.js'
      ],
      '/application/app.js': [
        '/application/**.js'
      ],
      
      // components
      '/components/coms.scss': [
        '/components/**.{scss,css}'
      ],
      '/components/coms.js': [
        '/components/**.js'
      ],
      
      // modules
      // '/modules/mods.scss': [
      //   '/modules/**.{scss,css}'
      // ],
      // '/modules/mods.js': [
      //   '/modules/**.js'
      // ],
      
      // views
      // '/views/views.scss': [
      //   '/views/**.{scss,css}'
      // ],
      // '/views/views.js': [
      //   '/views/**.js'
      // ]
    })
  })

  // 方案二：all in one
  /*.match('::package', {
    packager: fis.plugin('map', {
      // application
      '/statics/css/app.scss': [
        '/application/**.{scss,css}'
      ],
      '/statics/js/mod.js': [
        '/application/js/base/mod.js'
      ],
      '/statics/js/app.js': [
        '/application/**.js'
      ],
      
      // components
      '/statics/css/coms.scss': [
        '/components/**.{scss,css}'
      ],
      '/statics/js/coms.js': [
        '/components/**.js'
      ],
      
      // modules
      '/statics/css/mods.scss': [
        '/modules/**.{scss,css}'
      ],
      '/statics/js/mods.js': [
        '/modules/**.js'
      ],
      
      // views
      '/statics/css/views.scss': [
        '/views/**.{scss,css}'
      ],
      '/statics/js/views.js': [
        '/views/**.js'
      ]
    })
  });*/