

export function addButtons(domc, scripts) {
    domc.addType('IconB', {
        isComponent: el => el.tagName === 'ICONB',
        model: {
            defaults: {
                tagName: 'IconB',
                attributes: { class: 'iconb', src: "resources/icons/icon_button.svg", svgfill: "#999999", onclick: "testelo(2);" },
                styles: `
                    .iconb {
                        width: 48px;
                        height: 48px;
                    }
                    .iconb svg {
                        //fill: green;
                    }
                `,
                droppable: false,
                draggable: true,
                traits: [
                    "id",
                    "title",
                    {
                        type: 'color',
                        name: 'svgfill',
                        label: 'Color'
                    },
                    {
                        type: 'text',
                        name: 'src',
                        label: 'SVG'
                    },
                    {
                        type: 'text',
                        name: 'onclick',
                        label: 'OnClick'
                    }
                ],
                content: '<?xml version="1.0" ?><svg fill="#999999" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-13.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5.5 10h-7l4-5 1.5 2 3-4 5.5 7h-7z"/></svg>'
            },
            init() {
                this.on('change:attributes:src', this.loadSVG);
                this.on('change:attributes:svgfill', this.changeColor);
            },
            loadSVG() {
                let path = this.getAttributes().src;
                console.log(path);

                if (path.length < 5 || path.slice(-3) != "svg") {
                    setTimeout(() => {
                        this.addAttributes({ src: 'resources/icons/icon_button.svg' });
                    }, 100)
                } else {

                    fetch(path)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Not found');
                            }
                            return response.text()
                        })
                        .then(svgData => {
                            // Inject SVG content into the DOM
                            console.log("whut");

                            this.empty()
                            let pos = svgData.search("<svg") + 4
                            svgData = svgData.slice(0, pos) + ' fill="' + this.getAttributes().svgfill + '" ' + svgData.slice(pos)
                            console.log(svgData);
                            this.append(svgData)

                        }).catch(error => {
                            this.addAttributes({ src: 'resources/icons/icon_button.svg' });
                        });
                }

            },
            changeColor() {
                this.getEl().lastChild.setAttribute("fill", this.getAttributes().svgfill);
            }
        },
    });
}