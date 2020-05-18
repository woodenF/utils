module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 强制使用单引号
    'quotes': ['error', 'single'],
    // 强制使用分号
    'semi': ['error', 'always'],
    // 禁止行位空白符
    'no-trailing-spaces': 'error',
    // 强制箭头函数的参数使用括号
    'arrow-parens': ['error', 'always'],
    // 强制箭头函数箭头前后使用空格分割
    'arrow-spacing': ['error', { before: true, after: true }],
    // 禁止修改const声明的变量
    'no-const-assign': 'error',
    // 禁止模块重复导入
    'no-duplicate-imports': ["error", { "includeExports": true }],
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 'error',
    // 禁止在条件表达式中使用赋值语句
    'no-cond-assign': 'error',
    // 禁止function定义中出现重复的参数
    'no-dupe-args': 'error',
    // 禁止对象字面量出现重复的key
    'no-dupe-keys': 'error',
    // 禁用不必要的类型转换
    'no-extra-boolean-cast': 'error',
    // 禁用不必要的分号
    'no-extra-semi': 'error',
    // 禁止不规则的空白
    'no-irregular-whitespace': 'error',
    // 禁止不可达代码
    'no-unreachable': 'error',
    // 强制使用isNaN()检查NaN
    'use-isnan': 'error',
    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': 'error',
    // 把 var 语句看作是在块级作用域范围之内
    'block-scoped-var': 'error',
    // 要求遵循大括号约定
    'curly': 'error',
    // 要求 Switch 语句中有 Default 分支
    'default-case': 'error',
    // 强制使用===和!==
    'eqeqeq': 'error',
    // 禁止在 else 前有 return
    'no-else-return': 'error',
    // 禁止出现空函数, 有一行注释的函数不会被认为是空函数
    'no-empty-function': 'error',
    // 禁止连续的空格
    'no-multi-spaces': 'error',
    // 禁止new对象时不使用变量接受
    'no-new': 'error',
    // 禁止重新声明变量
    'no-redeclare': 'error',
    // 禁止自身比较
    'no-self-compare': 'error',
    // 限制可以被抛出的异常
    'no-throw-literal': 'error',
    // 禁止循环条件不发生改变
    'no-unmodified-loop-condition': 'error',
    // 大括号风格要求
    'brace-style': 'error',
    // 强制使用驼峰命名
    'camelcase': 'error',
    // 强制逗号后空格，逗号前无空格
    'comma-spacing': ['error', { before: false, after: true }],
    // 强制使用一致的缩进风格
    'indent': ['error', 2],
    // 强制对象键与冒号之间无空格，键与值之间有一个空格，值水平对齐
    'key-spacing': ['error', { beforeColon: false, afterColon: true, align: 'value' }],
    // 强制在花括号中使用一致的空格
    'object-curly-spacing': ['error', 'always']
    }
};