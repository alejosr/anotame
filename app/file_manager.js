const FS = require('fs')

var FileManager = function(){
    return {
        repo: "",
    
        repository: function(path){
            FileManager.repo = path
        },
        
        list: function(){
            console.log(FileManager.repo)
            let dirData = {};
            try {
                dirData = FS.readdirSync(FileManager.repo);
            } catch (ex) {
                if (ex.code === 'EACCES') { return null; }
                throw ex;
            }
            return dirData;
        }
    }
}();