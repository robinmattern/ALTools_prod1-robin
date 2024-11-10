/*\ 
##=========+====================+================================================+
##RD        globalJPTs          | Create JPTs module
##RFILE    +====================+=======+===============+======+=================+
##FD   globalJPTs.cjs           |   5204| 11/09/24 20:32|    81| u1.01`41109.2032
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file creates the JPTs module that gets inserted
#           into AnythingLLM scripts to analyze what's happening.
#
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+

##CHGS     .--------------------+----------------------------------------------+
# .(41109.14 11/14/24 RAM  8:32p| Move ._2/JPTs to ._2/ALTs   
                                |
##SRCE     +====================+===============================================+
\*/

const path = require( 'path' );                                                         // .(40927.04.1 RAM Beg Write global.JPTs.js )
const fs   = require( 'fs'   );

function findRootDir(startDir) {
    let dir = startDir;
    while (!fs.existsSync(path.join( dir, 'package.json') )) {
        const parentDir = path.dirname(dir);
        if (parentDir === dir) {
            throw new Error('Could not find project root directory');
        }
        dir = parentDir;
        }
    return dir;
    }

   var  aRootDir = findRootDir( __dirname );
   var  aJPTsDir = `${aRootDir}/._2/ALTs`                                               // .(41109.14.3 RAM Was ._2/JPTs).(41012.01.2).(41005.02.1 RAM Create aJPTsDir)

// var        pJPTs = require( path.join( aRootDir, '._2/JPTs/Utils/saveAICode.cjs' ));

// Define a global function to lazily load JPTs
Object.defineProperty( global, 'JPTs', {
    get: function() {
    if (!this._JPTs) {
         this._JPTs = require( path.join( aRootDir, '._2/ALTs/Utils/saveAICode.cjs' )); // .(41109.14.4 RAM Was ._2/JPTs).(41012.01.3)
         this._JPTs.findRootDir = findRootDir                                           // .(41005.02.2 RAM Add findRootDir) 
         this._JPTs.RootDir = aRootDir 
         this._JPTs.JPTsDir = aJPTsDir                                                  // .(41005.02.3) 
         }
  return this._JPTs;
    },
    configurable: true
});                                                                                     // .(40927.04.1 End)

// server/index.js
// require('./path/to/global-jpts');
   require( './globalJPTs.cjs' );                                                       // .(40927.04.2)

// Now you can use JPTs.say() anywhere in your application                              //#.(40927.04.3)
// JPTs.say("Server started");                                                          //#.(40927.04.4)

// Other modules can also use JPTs directly
// someModule.js
// JPTs.say("Message from some module");                                                //#.(40927.04.5)
   JPTs.say("JPTs module created");                                                     // .(40927.04.5)