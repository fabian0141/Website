import { addButtons } from "./buttons/buttons.js";
import { addLinearLayouts } from "./layouts/linearLayout.js";

export function addBasics(bm, domc, scripts) {
    addButtons(domc, scripts)
    addLinearLayouts(domc);


    bm.add('text', {
        label: '<?xml version="1.0" ?><svg viewBox="0 0 512 512" width=16 height=16 xmlns="http://www.w3.org/2000/svg"><title/><path d="M292.6,407.78l-120-320a22,22,0,0,0-41.2,0l-120,320a22,22,0,0,0,41.2,15.44L88.76,326.8a2,2,0,0,1,1.87-1.3H213.37a2,2,0,0,1,1.87,1.3l36.16,96.42a22,22,0,0,0,41.2-15.44Zm-185.84-129,43.37-115.65a2,2,0,0,1,3.74,0L197.24,278.8a2,2,0,0,1-1.87,2.7H108.63A2,2,0,0,1,106.76,278.8Z"/><path d="M400.77,169.5c-41.72-.3-79.08,23.87-95,61.4a22,22,0,0,0,40.5,17.2c8.88-20.89,29.77-34.44,53.32-34.6C431.91,213.28,458,240,458,272.35h0a1.5,1.5,0,0,1-1.45,1.5c-21.92.61-47.92,2.07-71.12,4.8C330.68,285.09,298,314.94,298,358.5c0,23.19,8.76,44,24.67,58.68C337.6,430.93,358,438.5,380,438.5c31,0,57.69-8,77.94-23.22,0,0,.06,0,.06,0h0a22,22,0,1,0,44,.19v-143C502,216.29,457,169.91,400.77,169.5ZM380,394.5c-17.53,0-38-9.43-38-36,0-10.67,3.83-18.14,12.43-24.23,8.37-5.93,21.2-10.16,36.14-11.92,21.12-2.49,44.82-3.86,65.14-4.47a2,2,0,0,1,2,2.1C455,370.1,429.46,394.5,380,394.5Z"/></svg><br/><b>Text</b>',
        content: '<div data-gjs-type="text">Insert your text here</div>',
        category: 'Basic'
    });

    bm.add('button', {
        label: '<svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g><title>background</title><rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/></g><g><title>Layer 1</title><path stroke="null" id="svg_1" d="m256.931192,379.650183l-190.231044,0a28.56438,28.56438 0 0 1 -28.534657,-28.534657l0,-190.231044a28.56438,28.56438 0 0 1 28.534657,-28.534657l190.231044,0a28.56438,28.56438 0 0 1 28.534657,28.534657l0,190.231044a28.56438,28.56438 0 0 1 -28.534657,28.534657z"/><path stroke="null" id="svg_2" d="m449.082359,379.65018l-190.23104,0a28.56438,28.56438 0 0 1 -28.53466,-28.53465l0,-190.23105a28.56438,28.56438 0 0 1 28.53466,-28.53465l190.23104,0a28.56438,28.56438 0 0 1 28.53466,28.53465l0,190.23105a28.56438,28.56438 0 0 1 -28.53466,28.53465z"/></g></svg><br/><b>Button</b>',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: '<button data-gjs-type="button">Click Me</button>',
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
        category: 'Basic'
    });

    bm.add('image', {
        label: '<?xml version="1.0" ?><svg class="bi bi-image" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg><br/><b>Image</b>',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: 'image' },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
        category: 'Basic'
    });

    bm.add('iconButton', {
        label: '<?xml version="1.0" ?><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-13.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5.5 10h-7l4-5 1.5 2 3-4 5.5 7h-7z"/></svg><br/><b>Icon Button</b>',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: 'IconB' },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
        category: 'Basic'
    });

    bm.add('vertLayout', {
        label: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="bi bi-layout-three-columns"><g><title>background</title><rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/></g><g><title>Layer 1</title><path transform="rotate(89.93165588378906 8.000000000000002,8) " id="svg_1" d="m0,1.5a1.5,1.5 0 0 1 1.5,-1.5l13,0a1.5,1.5 0 0 1 1.5,1.5l0,13a1.5,1.5 0 0 1 -1.5,1.5l-13,0a1.5,1.5 0 0 1 -1.5,-1.5l0,-13zm1.5,-0.5a0.5,0.5 0 0 0 -0.5,0.5l0,13a0.5,0.5 0 0 0 0.5,0.5l3.5,0l0,-14l-3.5,0zm8.5,14l0,-14l-4,0l0,14l4,0zm1,0l3.5,0a0.5,0.5 0 0 0 0.5,-0.5l0,-13a0.5,0.5 0 0 0 -0.5,-0.5l-3.5,0l0,14z"/></g></svg><br/><b>V-Layout</b>',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: 'VLayout'},
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
        category: 'Basic',
    });

    bm.add('horiLayout', {
        label: '<?xml version="1.0" ?><svg class="bi bi-layout-three-columns" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1H1.5zM10 15V1H6v14h4zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11v14z"/></svg><br/><b>H-Layout</b>',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: 'HLayout'},
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
        category: 'Basic',
    });
}