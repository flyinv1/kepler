import solarSystem from './solarSystem';
import {getSaved} from "../Redux/Storage";
import {USER_BODIES} from "../Redux/constants";

let defaultBodies = solarSystem;
let savedBodies = getSaved(USER_BODIES);

export default {
    defaults: defaultBodies,
    saved: savedBodies
}