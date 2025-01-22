import {URL} from "url";

const pzn = new URL("https://codingstudio.id/fast-track/front-end-development-beginner");

// kl mau ubah
pzn.host = "www.codingstudio.co.id";
pzn.searchParams.append("status", "gold");
// end ubah

console.info(pzn.toString());
console.info(pzn.href);
console.info(pzn.protocol);
console.info(pzn.host);
console.info(pzn.pathname);
console.info(pzn.searchParams);
