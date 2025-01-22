import fs from "fs";

const writer = fs.createWriteStream("artarget.log");

writer.write("Feri\n");
writer.write("Lauw\n");
writer.write("anakrimba\n");
writer.end();

const reader = fs.createReadStream("artarget.log");
reader.addListener("data", (data) => {
    console.info(data.toString());
});
