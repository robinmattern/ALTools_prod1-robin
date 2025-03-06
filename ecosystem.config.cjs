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
   }
 ]
};