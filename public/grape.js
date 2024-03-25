import { addBlocks } from "/blocks/blocks.js"

var scriptString = "";

const sessionStoragePlugin = (editor) => {
    // As sessionStorage is not an asynchronous API,
    // the `async` keyword could be skipped
    editor.Storage.add('files', {
        async load(options = {}) {
            return {};
        },

        async store(data, options = {}) {
            //console.log(editor.getHtml(), "\n\nScripts\n\n", editor.getJs());

            fetch('http://localhost:9999/htmlData', {
                method: 'POST',
                body: JSON.stringify({ "html": editor.getHtml(), "css": editor.getCss(), "js": scriptString }), // string or object
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    });
};


const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#gjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '100%',
    width: 'auto',
    plugins: [sessionStoragePlugin],
    // Disable the storage manager for the moment
    storageManager: {
        type: 'files', // Type of the storage, available: 'local' | 'remote'
        autosave: true, // Store data automatically
        autoload: false, // Autoload stored data on init
        stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
        options: {
            local: { // Options for the `local` type
                key: 'gjsProject', // The key for the local storage
            },
        }
    },
    // Avoid any default panel
    layerManager: {
        appendTo: '.layers-container'
    },
    deviceManager: {
        devices: [{
            name: 'Desktop',
            width: '', // default size
        }, {
            name: 'Tablet',
            width: '600px', // this value will be used on canvas width
            widthMedia: '800px', // this value will be used in CSS @media
        }, {
            name: 'Mobile',
            width: '480px', // this value will be used on canvas width
            widthMedia: '599px', // this value will be used in CSS @media
        }, {
            name: 'Mini-Mobile',
            width: '320px', // this value will be used on canvas width
            widthMedia: '479', // this value will be used in CSS @media
        }]
    },
    // We define a default panel as a sidebar to contain layers
    panels: {
        defaults: [{
            id: 'layersLeft',
            el: '.panel__left',
            // Make the panel resizable
            resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0, // Top handler
                cl: 0, // Left handler
                cr: 1, // Right handler
                bc: 0, // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
                keyWidth: 'flex-basis',
            },
        },
        {
            id: 'layers',
            el: '.panel__right',
            // Make the panel resizable
            resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0, // Top handler
                cl: 1, // Left handler
                cr: 0, // Right handler
                bc: 0, // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
                keyWidth: 'flex-basis',
            },
        },
        {
            id: 'traits',
            el: '.traits-container',
            // Make the panel resizable
            resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0, // Top handler
                cl: 0, // Left handler
                cr: 0, // Right handler
                bc: 1, // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
            },
        },
        {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [{
                id: 'show-blocks',
                active: true,
                label: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><title>background</title><rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/></g><g><title>Layer 1</title><path stroke="null" id="svg_1" d="m15.601063,0.012063l-7.202125,0l0,8.386874l-8.402479,0l0,7.202125l8.402479,0l0,8.386874l7.202125,0l0,-8.386874l8.402479,0l0,-7.202125l-8.402479,0l0,-8.386874z"/></g></svg>',
                command: 'show-blocks',
                // Once activated disable the possibility to turn it off
                togglable: false,
            }, {
                id: 'show-style',
                active: true,
                label: '<svg viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m481.97 128.979-98.619-97.935a32 32 0 0 0-45.144.047L30.947 337.479a32 32 0 0 0-.032 45.286l98.713 98.714a32 32 0 0 0 45.255 0l11.817-11.815a8 8 0 0 0 0-11.314l-21.015-21.015A8 8 0 1 1 177 426.021l21.016 21.015a8 8 0 0 0 11.313 0l20.742-20.742a8 8 0 0 0 0-11.313l-21.015-21.015a8 8 0 1 1 11.313-11.315l21.016 21.016a8 8 0 0 0 11.314 0l20.741-20.742a8 8 0 0 0 0-11.314L252.421 350.6a8 8 0 1 1 11.314-11.315L284.75 360.3a8 8 0 0 0 11.314 0l20.742-20.741a8 8 0 0 0 0-11.314l-21.015-21.015a8 8 0 1 1 11.309-11.318l21.016 21.016a8 8 0 0 0 11.313 0l20.742-20.741a8 8 0 0 0 0-11.314l-21.011-21.016a8 8 0 0 1 11.313-11.314l21.016 21.016a8 8 0 0 0 11.313 0l20.742-20.742a8 8 0 0 0 0-11.314l-21.015-21.015a8 8 0 0 1 .176-11.488 8.224 8.224 0 0 1 11.375.408l20.778 20.778a8 8 0 0 0 11.313 0l20.743-20.742a8 8 0 0 0 0-11.314L425.9 177.119a8 8 0 0 1 .176-11.485 8.223 8.223 0 0 1 11.375.409l20.778 20.778a8 8 0 0 0 11.314 0l12.508-12.509a32 32 0 0 0-.081-45.333Zm-108.4-32.47a18 18 0 1 1 0-25.456 18 18 0 0 1 .002 25.456Z"></path></svg>',
                command: 'show-styles',
                togglable: false,
            }],
        },
        {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [{
                id: 'device-desktop',
                label: '<?xml version="1.0" ?><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M11 17H4C2.34315 17 1 15.6569 1 14V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V14C23 15.6569 21.6569 17 20 17H13V19H16C16.5523 19 17 19.4477 17 20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19H11V17ZM4 5H20C20.5523 5 21 5.44772 21 6V14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14V6C3 5.44772 3.44772 5 4 5Z" fill="currentColor" fill-rule="evenodd"/></svg>',
                command: 'set-device-desktop',
                active: true,
                togglable: false,
            }, {
                id: 'device-tablet',
                label: '<?xml version="1.0" ?><svg id="Layer_1_1_" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M12,16c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H4C2.895,0,2,0.895,2,2v12c0,1.105,0.895,2,2,2H12z M3,2h10v11H3V2z"/></svg>',
                command: 'set-device-tablet',
                togglable: false,
            }, {
                id: 'device-mobile',
                label: '<?xml version="1.0" ?><svg id="Layer_1_1_" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5,16h6c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H5C3.895,0,3,0.895,3,2v12C3,15.105,3.895,16,5,16z M4,2h8v12H4V2z"/></svg>',
                command: 'set-device-mobile',
                togglable: false,
            }, {
                id: 'device-mini-mobile',
                label: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><title>background</title><rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/></g><g><title>Layer 1</title><path stroke="null" id="svg_1" d="m5.418437,16l5.163125,0c0.950876,0 1.721042,-0.770166 1.721042,-1.721042l0,-10.326251c0,-0.950876 -0.770166,-1.721042 -1.721042,-1.721042l-5.163125,0c-0.950876,0 -1.721042,0.770166 -1.721042,1.721042l0,10.326251c0,0.950876 0.770166,1.721042 1.721042,1.721042zm-0.860521,-12.047293l6.884167,0l0,10.326251l-6.884167,0l0,-10.326251z"/></g></svg>',
                command: 'set-device-mini-mobile',
                togglable: false,
            }],
        }]
    },
    blockManager: {
        appendTo: '#blocks',
        blocks: []
    },
    selectorManager: {
        appendTo: '.styles-container'
    },
    traitManager: {
        appendTo: '.traits-container',
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [{
            name: 'Dimension',
            open: true,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding', 'flex'],
            // Use `properties` to define/override single property
            properties: [
                {
                    // Type of the input,
                    // options: integer | radio | select | color | slider | file | composite | stack
                    type: 'integer',
                    name: 'The width', // Label for the property
                    property: 'width', // CSS property (if buildProps contains it will be extended)
                    units: ['px', '%'], // Units, available only for 'integer' types
                    defaults: 'auto', // Default value
                    min: 0 // Min value, available only for 'integer' types
                },
                {
                    // Type of the input,
                    // options: integer | radio | select | color | slider | file | composite | stack
                    type: 'integer',
                    name: 'Layout weight', // Label for the property
                    property: 'flex', // CSS property (if buildProps contains it will be extended)
                    defaults: 0, // Default value
                    min: 0, // Min value, available only for 'integer' types
                }
            ]
        }, {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'box-shadow', 'custom-prop'],
            properties: [
                {
                    id: 'custom-prop',
                    name: 'Custom Label',
                    property: 'font-size',
                    type: 'select',
                    defaults: '32px',
                    // List of options, available only for 'select' and 'radio'  types
                    options: [
                        { value: '12px', name: 'Tiny' },
                        { value: '18px', name: 'Medium' },
                        { value: '32px', name: 'Big' },
                    ],
                }
            ]
        }]
    }
});

editor.Panels.addPanel({
    id: 'panel-top',
    el: '.panel__top',
});
editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
        {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<?xml version="1.0" ?><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 7h2v2h-2zm0 8h2v2h-2zm-4-4h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2z"/><path d="M19 3H3v18h18V3h-2zm0 4v12H5V5h14v2z"/></svg>',
            command: 'sw-visibility', // Built-in command
        }, {
            id: 'export',
            className: 'btn-open-export',
            label: '<?xml version="1.0" ?><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 22a2 2 0 0 0 2-2v-5l-5 4v-3H8v-2h7v-3l5 4V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4z"/></svg>',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
        }, {
            id: 'show-json',
            className: 'btn-show-json',
            label: '<?xml version="1.0" ?><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 15.122c-.517 0-.816.491-.816 1.146 0 .661.311 1.126.82 1.126.517 0 .812-.49.812-1.146 0-.604-.291-1.126-.816-1.126z"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211.35 0 .534-.146.534-.365 0-.211-.159-.331-.564-.476-.562-.195-.927-.506-.927-.996 0-.576.481-1.017 1.277-1.017.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476.596.22.876.53.876 1.006.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716 0-1.012.646-1.768 1.642-1.768 1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z"/></svg>',
            context: 'show-json',
            command(editor) {
                editor.Modal.setTitle('Components JSON')
                    .setContent(`<textarea style="width:100%; height: 250px;">
              ${JSON.stringify(editor.getComponents())}
            </textarea>`)
                    .open();
            },
        }
    ],
});

editor.Commands.add('show-blocks', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getBlocksEl(row) { return row.querySelector('.blocks-container') },

    run(editor, sender) {
        const lmEl = this.getBlocksEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor, sender) {
        const lmEl = this.getBlocksEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    },
});
editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },

    run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    },
});

// Commands
editor.Commands.add('set-device-desktop', {
    run: editor => editor.setDevice('Desktop'),
    stop: editor => { }
});
editor.Commands.add('set-device-tablet', {
    run: editor => editor.setDevice('Tablet'),
    stop: editor => { }
});
editor.Commands.add('set-device-mobile', {
    run: editor => editor.setDevice('Mobile'),
    stop: editor => { }
});
editor.Commands.add('set-device-mini-mobile', {
    run: editor => editor.setDevice('Mini-Mobile'),
    stop: editor => { }
});

const bm = editor.Blocks;
const domc = editor.DomComponents;
let scripts = [];

addBlocks(bm, domc, scripts);

for (const sf of scripts) {
    scriptString = sf.toString() + "\n";
}

editor.on('load', (some, argument) => {
    const frameDocument = editor.Canvas.getDocument();
    let combinedScripts = document.createElement('script');
    combinedScripts.textContent = scripts.join('\n');
    frameDocument.head.appendChild(combinedScripts);
});