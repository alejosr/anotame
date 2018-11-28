const FS = require('fs')

module.exports = class FileManager{

    construct(path){
        this.repo = path
        console.log(this.repo)
    }

    set repository(path){
        this.repo = path
        console.log(this.repo)
    }

    get full(){
        fs.recurse(this.repo, [
            '*.txt'
          ], function(filepath, relative, filename) {
            console.log(filepath)
            if (filename) {
                // it's file
            } else {
                // it's folder
            }
          });
        return true;
    }

    get list(){
        console.log(this.repo)
        let dirData = {};
        try {
            dirData = FS.readdirSync(this.repo);
        } catch (ex) {
            if (ex.code === 'EACCES') { return null; }
            throw ex;
        }
        return dirData;
    }
}