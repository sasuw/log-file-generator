## log-file-generator

Generates a mock log file in the specified path. If no interval option is given, a new line is generated every 2 seconds.


## Usage

node bin/index.js

### Options

``-i, --interval string   Interval in seconds for writing a new log line. If omitted, default value of 2 seconds is used.``                                                            
``-f, --file file path    File path of the log file to generate.``                                        
``-h, --help string       Print this usage guide.``                                                       
``-v, --version string    Prints version number of log-file-generator``

### Quitting

Ctrl+C