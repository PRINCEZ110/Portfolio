/* GSAP core — registered once, imported wherever scroll-driven
   scenes (pins, parallax, scrubs) are built. Visuals come later;
   this file is the wiring. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
