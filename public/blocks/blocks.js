
import { addBasics } from "./basics.js"
import { addContainers } from "./containers.js"


export function addBlocks(bm, domc, scripts) {
    addBasics(bm, domc, scripts);
    addContainers(bm, domc, scripts);
}