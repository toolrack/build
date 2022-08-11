const args = new Map;

const ARGS = {
    PATH: ['path', 'p'],
    SERVER: ['server', 's'],
    BROWSER: ['browser', 'b'],
    WATCH: ['watch', 'w'],
    MODE: ['mode', 'm'],
};

process.argv.forEach((arg) => {
    let [name, value] = arg.split('=');
    const res = Object.entries(ARGS)
        .find(([key, value]) => value.includes(name));
    if (res !== undefined) {
        args.set(ARGS[res[0]], value || true);
    }
});

module.exports = (function Args() {
    return {
        getArg(name) {
            return args.get(name);
        },
        ARGS,
    }
})();
