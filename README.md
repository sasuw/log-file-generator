## log-file-generator

Generates a mock log file in the specified path and appends a new line to it in a specified interval until stopped. If no interval option is given, a new line is generated every 2 seconds.

Every line looks like this (with current date and time and a random log level, one of 'ERROR','INFO','WARN','TRACE' or 'OTHER'):
> 2022-04-11 12:23:11 DEBUG [Component] - Log entry

## Usage

### Local

    node bin/index.js

### Global

Install with

    npm i -g log-file-generator

Run with 

    log-file-generator -f [filename] -i [interval]

### Options

``-i, --interval string   Interval in seconds for writing a new log line. If omitted, default value of 2 seconds is used.``                                                            
``-f, --file file path    File path of the log file to generate.``                                        
``-h, --help string       Print this usage guide.``                                                       
``-v, --version string    Prints version number of log-file-generator``

### Quitting

    Ctrl+C