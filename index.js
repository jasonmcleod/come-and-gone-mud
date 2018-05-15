const rules = {
    RUN_REPL: true,
    RUN_WEBSERVER: true,
    RUN_TELNETSERVER: true,
    RUN_TEST_SCRIPTS: false
}
const state = require('./app')(rules);
