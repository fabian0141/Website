

export function addLinearLayouts(domc) {
    addVLayout(domc);
}

function addVLayout(domc) {
    domc.addType('VLayout', {
        model: {
            defaults: {
                attributes: { class: 'vlayout' },
                components: `<div>Empty</div>
                
            `,
                styles: `
                .vlayout { 
                    display: flex;
                    flex-direction: row;
                    padding: 10px;
                }
            `,
                droppable: true,
                draggable: true,
            },
        },
    });

    domc.addType('HLayout', {
        model: {
            defaults: {
                attributes: { class: 'hlayout' },
                components: `<div>Empty</div>
                
            `,
                styles: `
                .hlayout { 
                    display: flex;
                    flex-direction: row;
                    padding: 10px;
                }
            `,
                droppable: true,
                draggable: true,
            },
        },
    });
}
