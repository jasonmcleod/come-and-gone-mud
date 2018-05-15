var cursorType = 'underscore';
var systemPrompt = 'Game:\\';
var fuzzy = false;

var terminal = document.getElementById('terminal');
var prompt = document.getElementById('prompt');
var promptWrapper = document.getElementById('promptWrapper');
var promptCopy = document.getElementById('promptCopy');

var setFocus = function() {
    prompt.focus();
}

var setCopy = function(value) {
    // promptCopy.innerHTML = '<span id="systemPrompt">' + systemPrompt + '</span>' + value;
    // promptCopy.innerHTML+='<span id="cursor-' + cursorType + '"></span>';
};

var newLine = function(str) {
    terminal.innerHTML += '<br>' + str;
    console.log(document.body.scrollHeight, window.innerHeight)
    setTimeout(() => {
        if(document.body.scrollHeight > window.innerHeight) {
            window.scrollTo(0,document.body.scrollHeight);
        }
    }, 100);
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

if(fuzzy) { document.body.className = 'fuzzy'; }
setCopy('');
setFocus();

socket.on('newLine', function(data) {
    let formatted = data;
    
    formatted = formatted.split('\n').join('<br>');
    formatted = formatted.split('\t').join('&nbsp;&nbsp;&nbsp;&nbsp;');
    // todo: make a pattern matcher
    // todo: let it escape on its own
    formatted = formatted.split(' ').join('&nbsp;');
    formatted = formatted.split('[36m').join('<span class="color-36m">');
    formatted = formatted.split('[39m').join('<span class="color-39m">');
    formatted = formatted.split('[33m').join('<span class="color-33m">');
    formatted = formatted.split('[32m').join('<span class="color-32m">');
    formatted = formatted.split('[31m').join('<span class="color-31m">');

    let count = (formatted.match(/<span/g) || []).length;

    for(let e=0;e<count;e++) {
        formatted+='</span>';
    }
    newLine(formatted);
});





var colorReplace = function( input, replace ) {
    var replaceColors = {
        "0;31" : "{r",
        "1;31" : "{R",

        "0;32" : "{g",
        "1;32" : "{G",

        "0;33" : "{y",
        "1;33" : "{Y",

        "0;34" : "{b",
        "1;34" : "{B",

        "0;35" : "{m",
        "1;35" : "{M",

        "0;36" : "{c",
        "1;36" : "{C",

        "0;37" : "{w",
        "1;37" : "{W",

        "1;30" : "{*",

        "0" : "{x"
    };

    if ( replace )
    {
        for( k in replaceColors )
        {
            var re = new RegExp( "\033\[[" + k + "]*m", "g" );

            input = input.replace( re, replaceColors[ k ] );
        }
    } else {
        input = input.replace( /\033\[[0-9;]*m/g, "" );
    }

    return input;
};
