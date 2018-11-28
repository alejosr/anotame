const { Menu, app } = require('electron')

// Menu
let template_menu = [{
        label: 'Archivo',
        submenu: [{
                label: 'Consultar',
                sublabel: 'Sub etiqueta',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        app.emit('menu-list')
                    }
                }
            },
            {
                label: 'Listar',
                accelerator: 'CmdOrCtrl+L',
                //role: 'undo'
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        app.emit('menu-list')
                    }
                }
            },
            { 
                label: 'Cerrar Ventana',
                role: 'close',
                accelerator: 'Alt+F4',
            },
            { 
                label: 'Salir', 
                click: () => {
                    app.emit('menu-close-app')
                }
            },
        ]
    },
    {
        label: "Ayuda",
        submenu: [
            { 
                label: 'Debugger',
                click: () => {
                    app.emit('menu-open-devtool')
                }
            },
            {
                label: 'Acerca de',
                accelerator: 'CmdOrCtrl+A',
                //role: 'undo'
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        app.emit('menu-about')
                    }
                }
            },
        ]
    },
    { 
        label: 'Recargar', 
        role: 'reload'
    },
    { 
        label: 'Salir', 
        click: () => {
            app.emit('menu-close-app')
        }
    }
];

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template_menu)
    Menu.setApplicationMenu(menu)
});