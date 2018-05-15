var ansi_up = new AnsiUp;
var terminal = document.getElementById('terminal');
var prompt = document.getElementById('prompt');
var fullHistory = '';

var setFocus = function() { prompt.focus(); }

var newLine = function(str) {
    fullHistory += '\r\n' + str;
    var html = ansi_up.ansi_to_html(fullHistory);
    terminal.innerHTML = html;
    terminal.scrollTop = terminal.scrollHeight;
};

document.addEventListener('click', function() {setFocus() });
prompt.addEventListener('keydown', function() { setCopy(this.value); });
prompt.addEventListener('keyup', function() { setCopy(this.value); });
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