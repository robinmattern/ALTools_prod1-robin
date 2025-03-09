var  path      =  require('path');
var  aRepoDir  =  __dirname;
var  aLogFmt   = "HH:mm.sss";

module.exports = {
 apps: [
   {
     name: "AnyLLM_Server-3001",
     script: "npm",
     args: "run dev",
     cwd: path.join( aRepoDir, "server" ),
     log_date_format: aLogFmt,        
     autorestart: true,
     watch: false
     },
   {
     name: "AnyLLM_Collector-8888",
     script: "npm",
     args: "run dev",
     cwd: path.join( aRepoDir, "collector" ),
     log_date_format: aLogFmt,        
     autorestart: true,
     watch: false
     },
   {
     name: "AnyLLM_Frontend-3000",
     script: "npm",
     args: "run dev",
     cwd: path.join( aRepoDir, "frontend" ),
     log_date_format: aLogFmt,        
     autorestart: true,
     watch: false
     },
   {
      name: "AnyLLM_c13-8013",
      script: "server.mjs",
      args: "8013",
//    cwd: path.join( aRepoDir, "client1/c13_aidocs-anyllm-app" ),
      cwd: path.join( aRepoDir, "server1/s13_aidocs-anyllm-api" ),
      log_date_format: aLogFmt,        
      autorestart: true,
      watch: false
      },
    {
      name: "AnyLLM_s13-8113",
      script: "server.mjs",
      args: "8113",
      cwd: path.join( aRepoDir, "server1/s13_aidocs-anyllm-api" ),
      log_date_format: aLogFmt,        
      autorestart: true,
      watch: true
      }
    ]
};

//  console.log( Object.entries( module.exports )[0][0] )  
//  module.exports.apps.forEach( p => console.log( p.name, p.script, p.args, p.cwd ) )
// console.log( module.exports )
