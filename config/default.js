/**
 * Created by cblazek on 9/9/16.
 */
module.exports = {
  logLevel: "DEBUG",
  tag: "DEFAULT",
  mssqlConnConfig: {
    client: 'mssql',
    connection: {
      server: '',
      database: '',
      user: '',
      password: '',
      connectionTimeout: 50000,
      requestTimeout: 600001,
      options: {
        appName: 'Our App',
      }
    }
  },
  'OURDTNService': {
    redis: {'@ref': "redis"},
    requestQueue: "OURDTNServiceBus"
  },
  redis: {
    host: "localhost",
    port: 6379
  }
};
