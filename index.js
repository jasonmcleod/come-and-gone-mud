const rules = {
    RUN_REPL: false,
    RUN_WEBSERVER: true,
    RUN_TELNETSERVER: true,
    RUN_TEST_SCRIPTS: true
}
const state = require('./app')(rules);
