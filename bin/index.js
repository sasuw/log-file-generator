const ObjectUtils = require('../lib/objectUtils');
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const getPackageVersion = require('../lib/version');
const fs = require('fs')
const nodeCleanup = require('node-cleanup');
const chalk = require('chalk');

let doExit = false;
let defaultInterval = 2;

function printToConsole(msg) {
    process.stdout.write(msg + '\n');
}

(async function () {
    const optionDefinitions = [
        {name: 'interval', alias: 'i', type: Number},
        {name: 'file', alias: 'f', type: String},
        {name: 'help', alias: 'h', type: Boolean},
        {name: 'version', alias: 'v', type: Boolean}
    ]

    const options = commandLineArgs(optionDefinitions);

    if (ObjectUtils.isEmpty(options) || options.help) {
        displayHelp();
        process.exit(0);
    }

    if (options.version) {
        printToConsole('log-file-generator v. ' + getPackageVersion());
        process.exit(0);
    }

    let interval = defaultInterval;
    if (options.interval != null){
        interval = options.interval;
    }

    if (options.file != null){
        let path = options.file;
        let fileAdjective = 'new';
        try {
            if (fs.existsSync(path)) {
                fileAdjective = 'existing';
                //printToConsole('Found existing file at ' + path);
            }else{
                //printToConsole('Creating file ' + path);
                fs.openSync(path,'w');
            }
        } catch(err) {
            console.error('Error opening or creating file ' + path);
            console.error(err);
            process.exit(1);
        }
        printToConsole('Creating mock log entries to ' + fileAdjective + ' file ' + chalk.underline(path) + ' every ' + interval + ' seconds');

        let writeLogLineToFile = function(){
            writeLogLine(path);
        }
        setInterval(writeLogLineToFile, interval * 1000);
    }

})();

(function wait () {
    if (!doExit) setTimeout(wait, 1000);
})();

function getTimestamp () {
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

let logStream = null;
function writeLogLine(filepath){
    logStream = fs.createWriteStream(filepath, {flags: 'a'});
    let logLine = getTimestamp() + ' DEBUG [Component] - Log entry\n';
    logStream.write(logLine);
}

function displayHelp() {
    const sections = [
        {
            header: 'log-file-generator',
            content: 'Generates a mock log file'
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: 'interval',
                    alias: 'i',
                    description: 'Interval in seconds for writing a new log line. If omitted, default value of ' + defaultInterval  + ' seconds is used.'
                },
                {
                    name: 'file',
                    alias: 'f',
                    typeLabel: '{underline file path}',
                    description: 'File path of the log file to generate.'
                },
                {
                    name: 'help',
                    alias: 'h',
                    description: 'Print this usage guide.'
                },
                {
                    name: 'version',
                    alias: 'v',
                    description: 'Prints version number of log-file-generator'
                }
            ]
        }
    ]
    const usage = commandLineUsage(sections);
    printToConsole(usage);
}

function cleanUpBeforeExit(){
    try {
        logStream.end();
    }catch(err){
        console.error('cleanUpBeforeExit error: ' + err);
    }
};

nodeCleanup(function (exitCode, signal) {
    cleanUpBeforeExit();
});