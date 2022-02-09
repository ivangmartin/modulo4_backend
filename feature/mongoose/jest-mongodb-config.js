module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.4.6',
      skipMD5: true,
    },
    instance: {
      dbName: 'test-house-store',
      port: 27017,
    },
    autoStart: false,
  },
};
