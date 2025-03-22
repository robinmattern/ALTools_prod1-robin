/*\
##=========+====================+================================================+
##RD         ALT13_Workspaces   | ALTools Workspaces Component
##RFILE    +====================+=======+===============+======+=================+
##FD ALT13_Workspaces-Compnt.mjs|  ####|  3/13/25  H:MM|   ###| p1.01`50313.HHMM
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the Workspaces Component for ALTools Commands.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
# async func getWorkspaces       | ALT13  get Workspaces App {Item3}                                        // .(50313.03.9) 
# async func putWorkspace_inENV  | ALT13  put Workspace_inEnv {Item4}                                       // .(50313.04.9)
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50313.01   3/13/25 RAM  8:00a| Create ALT13_Workspaces_Component.mjs     
#.(50313.02   3/13/25 RAM  8:00a| Add get, put and key to list of cmds and obj     
#.(50313.03   3/13/25 RAM  9:00a| Create getWorkspaces method in Workspaces component 
#.(50313.04   3/13/25 RAM  9:00a| Create savWorkspace_inENV method in Workspaces component
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

   import   FRT                 from '../AICs/AIC90_FileFns_u1.03.mjs';

       var  AppEnvs          =  getAppEnvs() 

//--------  ---------------  =  ------------------------------------------------------  #

            var  bInVSCode   =   process.env.VSCODE_INSPECTOR_OPTIONS != undefined 
            var  bInspect    =`${process.execArgv}`.match( /--inspect/ ) != null  
            var  bCalled     =   process.argv.length > 2 
                 console.log( ` -- bInVSCode: '${bInVSCode}', bInspect: '${bInspect}', bCalled: '${bCalled}'`, )  
     
//         debugger; process.exit() 

       var  bInVSCode        =  false 
       var  bCalled          =  false 
       if (!bCalled && bInVSCode) {

//     var  AppEnvs          =  getAppEnvs() 
//          console.log( JSON.stringify( AppEnvs, '', 2 ) )

            bDebug           =  1
//    var [ mWorkspaces, aApp ] = await getWorkspaces( 'c16' );  
//    var   aWorkspace          = await savWorkspace_inENV( 'c16', (await getWorkspaces( 'c16' ))[0] )

            debugger; process.exit() 
            }
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

  function  getAppEnvs( ) {
//     var  mAppEnvs         = 
    return  [ {"ID": "1", "App": "aidocs", "Repo": "AIDocs_demo1-master",   "AppPath": "client1/c16_aidocs-review-app", "File": "utils/FRTs/_env" }
            , {"ID": "2", "App": "ollama", "Repo": "Ollama/_wrapper-bruce", "AppPath": "",                              "File": ".env" }
              ]
            } 
//--------  ---------------  =  ------------------------------------------------------  #
  
     async  function  getWorkspaces( aApps ) {                                                              // .(50313.03.10) write getWorkspaces Beg) 
       try {
       var  pResponse        =  await fetch('http://localhost:8113/api/getWorkspaces');
       if (!pResponse.ok) {
            throw new Error( `  ALT13[  70]  Error in getWorkspaces\n`  
                           + `    HTTP Status: ${pResponse.status}` );
            }
       var  mWorkspaces      =  await pResponse.json();

        if (aApps > '') {    
            aApps            = `,${ aApps.split( /,/).map( fixApp ).join( ',' ) },`
                                FRT.sayMsg( `ALT13[  77]  aApps: '${aApps}'.`, -1 )
            mWorkspaces      =  mKeys.filter( pWorkspace => { return aApps.includes( `,${pWorkspace.app},` ) } )
            }

            mWorkspaces      =  mWorkspaces.map(    pWorkspace => { return pWorkspace.app } )

  return  [ mWorkspaces, aApps .slice(1,-1) ]  // [0].app                                     

        } catch (pError) {
//          console.error( '    Error fetching keys:', pError.message );
            aApp             =  aApp.match( /,'/) ? `Apps: ${aApps}` : `App: ${aApps}`
                                FRT.sayMsg( `ALT13[  93]  Error: Getting Workspace for: '${aApps}'.`, -1 )
            }
// -------- ---------------  =  ----------------------------------  #

   function fixApp( aApp ) {
        if (aApp.match( /^any/)      ) { return 'anythingllm' }
        if (aApp.match( /^xai|^grok/)) { return 'xai'    }
        if (aApp.match( /^.+/)       ) { return '{Item2' }
            }           
// -------- ---------------  =  ----------------------------------  #
         }; // eof getWorkspaces                                                                            // .(50313.03.10 End)    
//--------  ---------------  =  ------------------------------------------------------  #
  
     async  function  putWorkspace_inENV( aApp, aWorkspace ) {                                              // .(50313.04.10 write putWorkspace_inENV Beg)                                                           
       var  aENV_NAME        = 'ANYLLM_WORKSP'   
            aWorkspace       =  aWorkspace ? aWorkspace : getWorkspaces( aApp )
       try {
       var  pEnv             =  AppEnvs.filter( pEnv => { return pEnv.App == aApp } )[0]
       var  aEnv_path        =  FRT.path( FRT.__basedir, `../${pEnv.Repo}`, pEnv.AppPath, pEnv.File )  
                                FRT.sayMsg( `ALT13[ 107]  aEnv_path: '${aEnv_path}'.`, -1)

       var  aEnv_file        =  FRT.readFileSync(  aEnv_path )  
       var  rEnv_name        =  new RegExp(   `  ${aENV_NAME} +=.+` )
            aEnv_file        =  aEnv_file.replace( rEnv_name, `  {aENV_NAME} = "${aWorkspace}"` ) 
                                FRT.writeFileSync( aEnv_path, aEnv_file )                                  
            FRT.sayMsg(        `ALT13[ 113]  Saved Workspace, '${aWorkspace}', for App, '${aApp}', in ENV file.`, -1)
    return  aWorkspace 
//  ------  ---------------  =  ----------------------------------  #

        } catch( pError ) {     FRT.sayMsg( `ALT13[ 117]  Error: Saving Workspace, '${aWorkspace}', for App, '${aApp}', in ENV file.`, -1 )
    return  ''
            }
//  ------  ---------------  =  ----------------------------------  #
         }; // eof putWorkspace                                                                             // .(50313.04.10 End)   
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
  
  var  cWorkspaces = { 
            getWorkspaces: getWorkspaces                                                                    // .(50313.03.11) 
          , putWorkspace_inENV: putWorkspace_inENV                                                          // .(50313.04.11)
            }
//   module.exports = { cWorkspaces: cWorkspaces  } 
    export  default  cWorkspaces 
 
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
