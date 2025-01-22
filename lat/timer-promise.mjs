
import timers from "timers/promises";

// 5000 = 5 detik
// console.info(new Date());
// const name = await timers.setTimeout(5000, "Feri");
// console.info(new Date());
// console.info(name);

for await (const startTime of timers.setInterval(1000, "ignored")){
    console.info(`Start time at ${new Date()}`);
}
