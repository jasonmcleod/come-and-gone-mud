const rules = {
    RUN_REPL: false,
    RUN_WEBSERVER: false,
    RUN_TELNETSERVER: false,
    RUN_TEST_SCRIPTS: true
}
const state = require('./app')(rules);
