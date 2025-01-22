import dns from "dns/promises";

const address = await dns.lookup("anakrimba.org");

console.info(address.address);
console.info(address.family);
