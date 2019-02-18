import Introduction from './Pages/introduction';
import Engine from "./Pages/engine";
import HowTo from "./Pages/howTo";
import Coordinates from "./Pages/coordinates";
import Sources from "./Pages/sources";


const PAGES = [
    {
        title: "Introduction",
        nav: "Introduction",
        hash: "intro",
        component: Introduction,
    },
    {
        title: "Getting Started",
        nav: "Getting Started",
        hash: "howto",
        component: HowTo,
    },
    {
        title: "Engine",
        nav: "Engine",
        hash: "engine",
        component: Engine,
    },
    {
        title: "Absolute Coordinate System",
        nav: "Coordinate System",
        hash: "coords",
        component: Coordinates,
    },
    {
        title: "Resources",
        nav: "Resources",
        hash: "sources",
        component: Sources,
    }
];

export default PAGES;