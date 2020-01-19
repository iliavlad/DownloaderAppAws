module.exports = {
    configureWebpack: {
        watchOptions: {
            ignored: /node_modules/,
            poll: 1000 // Check for changes every second
        }
    },
};
