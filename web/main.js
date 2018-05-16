var ansi_up = new AnsiUp;
var terminal = document.getElementById('terminal');
var prompt = document.getElementById('prompt');
var fullHistory = [];

var setFocus = function() { prompt.focus(); }

var newLine = function(str) {
    fullHistory.push(str);
    var html = ansi_up.ansi_to_html(fullHistory.join('\r\n'));
    terminal.innerHTML = html;
    terminal.scrollTop = terminal.scrollHeight;
    if(fullHistory.length > 200) {
        fullHistory = fullHistory.slice(fullHistory.length - 100);
    }
};

document.addEventListener('click', function() {setFocus() });
prompt.addEventListener('keypress', function(e) { 
    if(e.keyCode === 13) {
        socket.emit('cmd', this.value);
        this.value = '';
    }
});

socket.on('newLine', function(data) {
    let formatted = data;
    newLine(formatted);
});

setFocus();