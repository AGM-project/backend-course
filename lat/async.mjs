function samplePromise(){
    return Promise.resolve("Feri");
}

const name = await samplePromise();
console.info(name);
