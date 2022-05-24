const { writeFileSync } = require('fs');
const { marked } = require('marked');
const hljs = require('highlight.js');

const {
  readFile
} = require('../libs/utils');

const {
  regexp: {
    reg_mdStr
  },
  outerPath: {
    mdPath,
    htmlPath
  },
  innerDir: {
    htmlDir
  }
} = require('../config');

// markdown插件配置
marked.setOptions({
  // 配置highlight插件
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
})

// markdown转html的方法
function mdToHtml (filename) {
  // 读取markdown文件
  const _mdStr = readFile(mdPath + '/' + filename);
  // 读取markdown的模板html文件 - md.html
  let _htmlStr = readFile(htmlDir + '/md.html');
  // 将markdown文件的内容通过markdown插件转换成html字符串
  const newStr = marked(_mdStr);
  // 将模板md.html里的{{newStr}}替换成newStr(markdown插件转换出的结果)
  _htmlStr = _htmlStr.replace(reg_mdStr, newStr);

  // 将新的_htmlStr写入html文件并保存到src/html目录下
  writeFileSync(htmlPath + '/' + filename.replace('.md', '.html'), _htmlStr, function(err) {
    if (err) {
      throw new Error('File is failed to write.', err);
    }
  });
}

module.exports = mdToHtml;