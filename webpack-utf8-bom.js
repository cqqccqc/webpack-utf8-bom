/* global Buffer */
var fs = require('fs');

function UTF8BOMPlugin(options,custom){
	this.custom = custom || {
    add: true
  };
}

UTF8BOMPlugin.prototype.apply = function(compiler) {
	var self = this;
  compiler.plugin('done', function(Stats, callback){
		var files = Stats.compilation.assets;
    for(var fileName in files) {
      var path = files[fileName]['existsAt'];
      if(!path) {
        return ;
      }
      
      // Whether add or remove BOM head
      var isAdd = self.custom.add;
      console.log(isAdd)
      var buff = fs.readFileSync(path);
      
      if(isAdd) {
        console.log('add bom');
        if (buff.length < 3 
          || buff[0].toString(16).toLowerCase() != "ef" 
          || buff[1].toString(16).toLowerCase() != "bb" 
          || buff[2].toString(16).toLowerCase() != "bf") {
        
          var bom = new Buffer([0xEF, 0xBB, 0xBF]);
          buff = bom + buff;
          fs.writeFile(path, buff.toString(), "utf8");
          
        }
                
      } else {
        console.log('remove bom')
        if (buff.length >= 3 
          && buff[0].toString(16).toLowerCase() == "ef" 
          && buff[1].toString(16).toLowerCase() == "bb" 
          && buff[2].toString(16).toLowerCase() == "bf") {          
          buff = buff.slice(3);
          fs.writeFile(path, buff.toString(), "utf8");
        }
      }
      
      
      
      
    }
  });
}

module.exports = UTF8BOMPlugin;