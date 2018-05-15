const rules = {
    RUN_REPL: false,
    RUN_WEBSERVER: true,
    RUN_TELNETSERVER: true,
    RUN_TEST_SCRIPTS: false
}
const state = require('./app')(rules);
