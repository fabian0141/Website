import { addCarousels } from "./containers/carousel.js"

export function addContainers(bm, domc, scripts) {
    addCarousels(domc, scripts);

    bm.add('section', {
        id: 'section',
        label: '<?xml version="1.0" ?><svg width="16" height=16 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM8,20H4V10H8Zm6,0H10V10h4Zm6,0H16V10h4ZM20,8H4V4H20Z"/></svg><br/><b>Section</b>', // You can use HTML/SVG inside labels
        attributes: { class: 'gjs-block-section' },
        content: `<section>
      <h1>This is a simple title</h1>
      <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
    </section>`,
        category: 'Containers'
    });

    bm.add('carousel', {
        id: 'carousel',
        label: '<?xml version="1.0" ?><svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/></svg><br/><b>Carousel</b>', // You can use HTML/SVG inside labels
        content: { type: 'Carousel' },
        category: 'Containers',
    });

    bm.add('carousel-item', {
        id: 'carousel',
        label: '<?xml version="1.0" ?><svg height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z"/><path d="M0 0h48v48H0z" fill="none"/></svg><br/><b>Carousel Item</b>', // You can use HTML/SVG inside labels
        content: { type: 'CarouselItem' },
        category: 'Containers',
    });
}