// nodeJs

var http=require("http");
var fs = require('fs')
// var writerStream = fs.createWriteStream('aa.dmg')
http.get('http://ucancdn.xdf.cn/download/%E9%AD%94%E6%B3%95%E6%95%99%E5%B8%88-0.2.2.dmg',{
    headers: { 'Content-Type': 'application/octet-stream' }
}, (res) => {
  var bate = new Buffer.from('');

  res.on('data', (chunk) => {
        bate = Buffer.concat([bate,chunk]);
        console.log(bate.length)
        fs.appendFileSync("aa3.dmg",chunk, (error)  => {
            if (error) return console.log("追加文件失败" + error.message);
            console.log("追加成功");
        });
    });
    res.on('end', () => {
        try {
          fs.writeFileSync('zngril_buffer.dmg', bate);
        } catch (e) {
          console.error(e.message);
        }
      });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});