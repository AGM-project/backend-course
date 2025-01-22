function samplePromise(){
    return Promise.resolve("Feri");
}

async function run(){
    const name = await samplePromise();
    console.info(name);
}

run();
