
const buffer = Buffer.from("Feri Lauw", "utf8");

console.info(buffer.toString());
console.info(buffer.toString("hex"));
console.info(buffer.toString("base64"));

const bufferBase64 = Buffer.from("RmVyaSBMYXV3", "base64");
console.info(bufferBase64.toString("utf8"));
