
export function addCarousels(domc, scripts) {
  scripts.push(testing);
  scripts.push(testelo);

  domc.addType('Carousel', {
    model: {
      defaults: {
        attributes: { class: 'carousel', selected: 0, onclick: 'testing(this);' },
        components: `
            <IconB class="leftCarouselButton test"></IconB>
            <IconB class="rightCarouselButton"></IconB>
            <CarouselItem></CarouselItem>
            <CarouselItem></CarouselItem>
            <CarouselItem></CarouselItem>
            `,
        styles: `

                .carousel { 
                    padding: 10px;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .leftCarouselButton {
                  position: absolute;
                  left: 20px;
                }

                .rightCarouselButton {
                  position: absolute;
                  right: 20px;
                }
            `,
        droppable: true,
        draggable: true,
      },
      updated(prop, val, prev) {
        console.log("geht", prop, val, prev);
        if (prop == "components") {
          
        }
      }
    },
  });

  domc.addType('CarouselItem', {
    isComponent: el => el.tagName === 'CAROUSELITEM',
    model: {
      defaults: {
        attributes: { class: 'carouselItem' },
        components: "",
        styles: `

                .carouselItem { 
                    width: 100%;
                    height: 100%;
                    min-height: 100px;
                    min-width: 100px;
                    background-color: gray;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `,
        droppable: true,
        draggable: true,
      },
    },
  });
}

function testing(e) {
  let i = e.getAttribute("selected");
  console.log(i);
  e.setAttribute("selected", ++i);
}

function testelo(num) {
  console.log("Hell yeah! " + num);
}