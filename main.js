const { app, Menu, BrowserWindow, Tray, Notification, ipcMain } = require('electron');
const { dialog } = require('electron');
const path = require('path');
const glob = require('glob');
//const FileManager = require('./app/file_manager');

//// FILE MANAGER ////////////////////////////////////
const FS = require('fs')

var FileManager = function(){
    //https://nodejs.org/api/fs.html
    return {
        path: "",
        error: "",
    
        setError: function(msg){
            FileManager.error=msg;
        },

        setRepository: function(path){
            FileManager.path = path
        },
        
        readRepository: function(folder){
            var files = [];
            folder = (typeof folder != 'undefined')? folder : "";
            let dirData = [];
            try {
                dirData = FS.readdirSync(FileManager.path + folder, {
                    'withFileTypes' : true
                });
            } catch (ex) {
                if (ex.code === 'EACCES'){
                    FileManager.setError("No es posible leer el repositorio.");
                    return false;
                }
                throw ex;
            }
            dirData.forEach(function(file){
                let sf = FS.statSync(FileManager.path + folder + "/" + file)
                if(sf.isFile()){
                    files.push( {'name':file, 'path': folder + "/" + file, 'type':0} )
                }else if(sf.isDirectory()){
                    let content = FileManager.readRepository(folder + "/" + file);
                    files.push( {'name':file, 'path': folder + "/" + file, 'type':1, 'content': content} )
                }
            })
            return files;
        },
    }
}();
//////////////////////////////////////////////////////

// const globalShortcut = require('global-shortcut');

// const http = require('http');

// Require each JS file in the sources
const files = glob.sync(path.join(__dirname, 'app/**/*.js'))
files.forEach((file) => { require(file) });

FileManager.setRepository(path.join(__dirname,"test"))

// Global intance
let gi = {
    startup: new Date(),
    mainWindow: null,
    mainWindowReady: false,
    closeApp: false,
    tray: null,
    notification: null,
    notificationTimeOut: 5000,
};

// Store info
// const store = new Store({
//     name: 'history',
//     content: {
//         "registry": []
//     }
// });

function createWindow() {
    // Create the browser window.
    gi.mainWindow = new BrowserWindow({
        // width: 550,
        minWidth: 200,
        // height: 500,
        title: app.getName(),
        icon: getIcon(),
        // titleBarStyle: 'hidden',
        // frame: false,
        // modal: true,
        // show: false,
        // backgroundColor: '#232323'
        // backgroundColor: '#F7F7F7'
    });

    gi.mainWindow.webContents.openDevTools();
    gi.mainWindow.loadFile( path.join(__dirname, 'index.html') );
    gi.mainWindow.on('close', (e) => {
        if (gi.closeApp) {
            gi.mainWindow = null;
        } else {
            e.preventDefault();
            gi.mainWindow.webContents.send('close-window');
        }
    });


    ipcMain.on('dom-is-ready', function(event) {
        gi.mainWindowReady = true;
    });
    ipcMain.on('dom-show-window', function(event) {
        gi.mainWindow.show();
    });
    ipcMain.on('dom-hide-window', function(event) {
        gi.mainWindow.hide();
    });
}

function openWindow(action, param) {
    if(gi.mainWindowReady){
        gi.mainWindow.webContents.send('open-window', {'action':action, 'parameters':param});
    }else{
        dialog.showMessageBox(gi.mainWindow, {
            type: 'error',
            title: app.getName(),
            detail: "Ventana princial sin inicar"
        });
    }
}

function showAbout() {
    openWindow("about",app.getVersion());
}

function notification(title, msg) {
    gi.notification = new Notification({
        icon: getIcon(),
        title: title,
        body: msg
    });
    gi.notification.show();
    setTimeout(() => {
        gi.notification.close();
    }, gi.notificationTimeOut);
}

function getWidgetMenu() {
    let template = [];
    template.push({
        label: `Notas: 10`,
        click: () => {
            notification("NotasApp","Aplicación para Notas");
        }
    });
    
    template.push({ type: 'separator' });

    template.push({
        label: 'Acerca de NotasApp',
        click: () => {
            showAbout();
        }
    });
    template.push({
        label: 'Salir',
        click: () => {
            gi.closeApp = true;
            app.quit();
        }
    });

    return Menu.buildFromTemplate(template);
}


function getIcon() {
    return path.join(__dirname, 'assets/images/icon.png');
}

app.on('ready', () => {
    gi.tray = new Tray(getIcon());
    gi.tray.setContextMenu(getWidgetMenu());
    gi.tray.setToolTip(app.getName());

    createWindow();

    gi.tray.on('click', () => {
        openWindow();
    });

    /*
    globalShortcut.register('ctrl+shift+1', function () {
        gi.mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register('ctrl+shift+2', function () {
        gi.mainWindow.webContents.send('global-shortcut', 1);
    });
    */
});

// Acciones del menu

app.on("menu-close-app", () => {
    gi.closeApp = true;
    app.quit();
});

app.on("menu-open-devtool", () => {
    gi.mainWindow.webContents.openDevTools();
});

app.on("menu-list", () => {
    let list = FileManager.readRepository();

    openWindow("list", list)
});

app.on("menu-about", () => {
    showAbout();
});
