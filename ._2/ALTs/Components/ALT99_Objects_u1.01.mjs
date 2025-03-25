/*\
##=========+====================+================================================+
##RD         ALT99_{Object}s    | ALTools {Object}s Component
##RFILE    +====================+=======+===============+======+=================+
##FD  ALT99_{Object}s-Compnt.mjs|  ####|  M/DD/YY  H:MM|   ###| p1.01`YMMDD.HHMM
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the {Object}s Component for ALTools Commands.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
# async func get{Object}s       | ALT99  get {Object}s {Item2} {Item3}                                      // .(YMMDD.03.9)
# async func put{Object}_inENV  | ALT99  put {Object}_inEnv {Item4}                                         // .(YMMDD.04.9)
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(YMMDD.01   M/DD/YY RAM  H:MMa| Create ALT99_{Object}s_Component.mjs
#.(YMMDD.02   M/DD/YY RAM  H:MMa| Add get, put and key to list of cmds and obj
#.(YMMDD.03   M/DD/YY RAM  H:MMa| Create get{Object}s method in {Object}s component
#.(YMMDD.04   M/DD/YY RAM  H:MMa| Create sav{Object}_inENV method in {Object}s component
#.(50309.05b  3/23/25 RAM  9:45a| sayMsg bInVSCode 
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

   import   FRT                 from '../../AICs/AIC90_FileFns_u1.03.mjs';

       var  AppEnvs          =  getAppEnvs() 

//--------  ---------------  =  ------------------------------------------------------  #

            var  bInVSCode   =   process.env.VSCODE_INSPECTOR_OPTIONS != undefined 
            var  bInspect    =`${process.execArgv}`.match( /--inspect/ ) != null  
            var  bCalled     =   process.argv.length > 2 
            FRT.sayMsg( `ALT11[ 52]  bInVSCode: '${bInVSCode}', bInspect: '${bInspect}', bCalled: '${bCalled}'`, -1 );          // .(50309.05b.5) 
     
//         debugger; process.exit() 

       var  bInVSCode        =  false 
       var  bCalled          =  false 
       if (!bCalled && bInVSCode) {

//     var  AppEnvs          =  getAppEnvs() 
//          console.log( JSON.stringify( AppEnvs, '', 2 ) )

            bDebug           =  1
//    var [ m{Object}s, a{Item1} ] = await get{Object}s( '{Object}s', '{Item2}s );  
//    var   a{Object}              = await sav{Object}_inENV( '{Item1}', (await get{Object}s( '{Object}', '{Item2}' ))[0] )

            debugger; process.exit() 
            }
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

  function  getAppEnvs( ) {
//     var  mAppEnvs         = 
    return  [ {"ID": "1", "Project": "aidocs", "App": "c16", "Repo": "AIDocs_demo1-master",   "AppPath": "client1/c16_aidocs-review-app", "File": "utils/FRTs/_env" }
            , {"ID": "2", "Project": "aidocs", "App": "s16", "Repo": "AIDocs_demo1-master",   "AppPath": "server1/c16_aidocs-review-api", "File": ".env" }
            , {"ID": "3", "Project": "ollama", "App": "c01", "Repo": "Ollama/_wrapper-bruce", "AppPath": "client/c01_wrapper-app",        "File": ".env" }
              ]
            } 
//--------  ---------------  =  ------------------------------------------------------  #
/*  
     async  function  get{Object}s( a{Item2}s, a{Item3}s  ) {                                               // .(YMMDD.03.10) write get{Object}s Beg)
      var  aURL              = 'http://localhost:8113/api/get{Object}s'

                                FRT.sayMsg( `ALT99[  72]  get{Object}s( a{Item2}s: '${a{Item2}s}', a{Item3}s: '${a{Item2}s}'`, -1 )
                                FRT.sayMsg( `ALT99[  73]  get{Object}s: fetch( '${aURL } )`, -1 )
       try {
       var  pResponse        =  await fetch( aURL);
       if (!pResponse.ok) {
            throw              new Error( `  ALT99[  74]  Error in get{Object}s\n`  
                                        + `    HTTP Status: ${pResponse.status}` );
            }
       var  m{Object}s       =  await pResponse.json();

        if (a{Item2}s > '') {    
            a{Item2}s        = `,${ a{Item2}s.split( /,/).map( fix{Item2} ).join( ',' ) },`
                                FRT.sayMsg( `ALT99[  81]  a{Item2}s: '${a{Item2}s}'.`, -1 )
            m{Object}s       =  m{Object}s.filter( p{Object} => { return a{Item2}s.includes( `,${p{Object}.{item2}},` ) } )
            }
        if (a{Item3}s > '') {    
            a{Item3}s        = `,${ a{Item3}s.split( /,/).map( fix{Item3} ).join( ',' ) },`
                                FRT.sayMsg( `ALT99[  86]  a{Item3}s: '${a{Item3}s}'.`, -1 )
            m{Object}s       =  m{Object}s.filter( p{Object} => { return a{Item3}s.includes( `,${p{Object}.{item3}},` ) } )
            }

            m{Object}s       =  m{Object}s.map( p{Object} => { return p{Object}.{Item1} } )

  return  [ m{Object}s, a{Item2}s .slice(1,-1) ]  // [0].{item1}                                     

        } catch( pError ) {
//          console.error( '    Error fetching keys:', pError.message );
            a{Item2}         =  a{Item2}.match( /,'/) ? `{Item2}s: ${a{Item2}s}` : `{Item2}: ${a{Item2}s}`
            FRT.sayMsg(        `ALT99[  93]  Error: Getting {Object} for '${a{Item2}s}', a{Item3}: '${a{Item3}}'.`, -1 )
            }
// -------- ---------------  =  ----------------------------------  #

   function fix{Item2}( a{Item2} ) {
        if (a{Item2}.match( /^any/)      ) { return 'anythingllm' }
        if (a{Item2}.match( /^xai|^grok/)) { return 'xai'    }
        if (a{Item2}.match( /^.+/)       ) { return '{Item2}' }
            }           
// -------- ---------------  =  ----------------------------------  #

   function fix{Item3}( a{Item3} ) {
        if (a{Item3}.match( /^.+/)       ) { return '{Item3}' }
            }           
// -------- ---------------  =  ----------------------------------  #
         }; // eof get{Object}s                                                                             // .(YMMDD.03.10 End)   
//--------  ---------------  =  ------------------------------------------------------  #
*//*
     async  function  sav{Object}_inENV( a{Item4}, a{Object} ) {                                             // .(YMMDD.04.10 write put{Object}_inENV Beg)                                                           
       var  aENV_NAME        = 'ANYLLM_API_KEY'   
            a{Object}        =  a{Object} ? a{Object} : get{Object}s( a{Item4} )
       try {
       var  pEnv             =  AppEnvs.filter( pEnv => { return `{pEnv.Project}-{pEnv.App}` == a{Item4} } )[0]
       var  aEnv_path        =  FRT.path( FRT.__basedir, `../${pEnv.Repo}`, pEnv.AppPath, pEnv.File )  
                                FRT.sayMsg(`ALT99[ 117]  aEnv_path: '${aEnv_path}'.`, -1)

       var  aEnv_file        =  FRT.readFileSync(  aEnv_path )  
       var  rEnv_name        =  new RegExp(   `  ${aENV_NAME} +=.+` )
            aEnv_file        =  aEnv_file.replace( rEnv_Name, `  {aENV_NAME} = "${a{Object}}"` ) 
                                FRT.writeFileSync( aEnv_path, aEnv_file )                                  
                                FRT.sayMsg( `ALT99[ 123]  Saved {Object}, '$a{Object}}', for {Item4}, '${a{Item4}}', in ENV file.`, -1)
    return  a{Object} 
//  ------  ---------------  =  ----------------------------------  #

        } catch (pError) {
            FRT.sayMsg(        `ALT99[ 128]  Error: Saving {Object}, '$a{Item1}}', for {Item4}, '${a{Item4}}', in ENV file.`, -1 )
    return  ''
            }
//  ------  ---------------  =  ----------------------------------  #
         }; // eof put{Object}                                                                              // .(YMMDD.04.10 End)   
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
*//*
  var  c{Object}s = { 
            get{Object}s: get{Object}s                                                                      // .(YMMDD.03.11)
          , put{Object}:  put{Object}                                                                       // .(YMMDD.04.11)
            }
//   module.exports = { c{Object}s: c{Object}s  } 
    export  default  c{Object}s 
*/
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
