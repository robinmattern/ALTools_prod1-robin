/*\
##=========+====================+================================================+
##RD         ALT11_Keys         | ALTools Keys Component
##RFILE    +====================+=======+===============+======+=================+
##FD  ALT11_Keys-Component.mjs  |  13412|  1/01/25  1:01|   256| p1.01`.50101.0101
##FD  ALT11_Keys-Component.mjs  |  13412|  3/10/25 18:45|   256| p1.01`.50310.1845
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the Key Component for ALTools Commands.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
# async func getKeys            | ALT11  get keys {Platform} {Model} {Project}                              // .(50310.02.9) 
# async func putKey_inEnv       | ALT11  put key  {App}                                                     // .(50310.03.9) 
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50309.04   3/09/25 RAM  7:00p| Create ALT11_Keys_Component.mjs
#.(50309.07   3/09/25 RAM 10:00p| Add get, put and key to list of cmds and objs
#.(50310.02   3/10/25 RAM  6:15p| Create getKeys method in keys component 
#.(50310.03a  3/10/25 RAM  6:30p| Create putKey_inENV method in keys component 
#.(50313.03   3/13/25 RAM  H:MMa| Create getWorkspaces method in Workspaces component 
#.(50313.04   3/13/25 RAM  H:MMa| Create putWorkspace_inENV method in Workspaces component#
#.(50316.01   3/16/25 RAM  9:09a| Move programs into Components folder    

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

   import   FRT                 from '../../AICs/AIC90_FileFns_u1.03.mjs';                                  // .(50316.01.2)     

       var  AppEnvs          =  getAppEnvs() 

//--------  ---------------  =  ------------------------------------------------------  #
//      if (typeof( require.main ) != 'undefined') {
//          console.log( `-- require.main: '${require.main}'` ) // === module  or typeof == object
//      } else {
//           console.log( `-- import.meta.url: '${import.meta.url}'` ) // === module
//          }
//          console.log( `-- TERM_PROGRAM: '${process.env.TERM_PROGRAM}` )  // undefined if called or running in vscode 
//          console.log( `-- VSCODE_INSPECTOR_OPTIONS: '${process.env.VSCODE_INSPECTOR_OPTIONS}` )  // undefined if called or running in vscode 

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
            var [ mKeys, aPlatforms ] = await getKeys( 'any,xai' );  
            putKey( 'aidocs', (await getKeys( 'anythingllm' ))[0] )
            debugger; process.exit() 
            }
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

  function  getAppEnvs( ) {
//     var  mAppEnvs         = 
    return  [ {"ID": "1", "App": "aidocs", "Repo": "AIDocs_demo1-master",   "AppPath": "client1/c16_aidocs-review-app", "File": "utils/FRTs/_env" }
            , {"ID": "2", "App": "ollama", "Repo": "Ollama/_wrapper-bruce", "AppPath": "",                              "File": ".env" }
              ]
           } 
//-------  ----------------  =  ------------------------------------------------------  #

    async  function  getKeys(   aPlatforms, aModels  ) {                                                    // .(50310.02.10 write getKeys Beg) 
      var  aURL              = 'http://localhost:8113/api/getKeys'

                                FRT.sayMsg( `ALT11[  77]  getKeys( aPlatforms: '${aPlatforms}', aModels: '${aModels}'`, -1 )
                                FRT.sayMsg( `ALT11[  78]  getKeys: fetch( '${aURL } )`, -1 )
       try {                         
        var  pResponse       =  await fetch( aURL );
       if (!pResponse.ok) {
//          throw new Error( `  HTTP error! Status: ${pResponse.status}` );
                                FRT.sayMsg( `ALT11[  83]  Error: Getting Key for ${aPlatforms}, aModel: '${aModel}'`, -1 )
          }
       var  mKeys            =  await pResponse.json();
        if (aPlatforms > '') {    
            aPlatforms       =  aPlatforms.split( /,/).map( fixPlatform ).join( ',' )
            aPlatforms       = `,${aPlatforms},`
            mKeys            =  mKeys.filter( pKey => { return aPlatforms.includes( `,${pKey.platform},` ) } )
            }
        if (aModels > '') {    
            aModels          = `,${aModels},`
            mKeys            =  mKeys.filter( pKey => { return aModels.includes( `,${pKey.model},` ) } )
              }
            mKeys            =  mKeys.map(    pKey => { return pKey.key } )
    return  [ mKeys, aPlatforms.slice(1,-1) ]  // [0].key                                     // .(50312.02.1 )
        } catch (pError) {
//          console.error( '    Error fetching keys:', pError.message );
            aPlaforms        =  aPlarforms.match( /,'/) ? `platforms: ${aPlatforms}` : `platform: ${aPlatforms}`
                                FRT.sayMsg( `ALT11[ 100]  Error: Getting Key for ${aPlatforms}, aModel: '${aModel}'`, -1 )
            }
   function fixPlatform( aPlatform ) {
        if (aPlatform.match( /^any/)) { return 'anythingllm' }
        if (aPlatform.match( /^xai|^grok/)) { return 'xai' }
            }           
        }; // eof getKeys                                                                                   // .(50310.02.10 End)    
//-------  ---------------  =  ------------------------------------------------------  #

     async  function  putKey_inENV( aApp, aKey ) {                                                          // .(50310.03.10 write putKey Beg)     
      var  aENV_NAME        = 'ANYLLM_API_KEY'   
       try {
//     var  aPath ='/Users/Shared/Repos/AIDocs_demo1-master/client1/c16_aidocs-review-app/utils/FRTs/_env'
//     var  aBase_path        =  FRT.path( FRT.__basedir, '../aidocs_demo1-master')
//     var  aApp_path         =  FRT.path( aBase_path,    'client1', 'c16_aidocs-review-app')
//     var  aEnv_path         =  FRT.path( aApp_path,     'utils/FRTs/_env' )
//          aKey              =  aKey ? aKey : getKeys( aPlatform )
       var  pEnv              =  AppEnvs.filter( pEnv => { return pEnv.App == aApp } )[0]
       var  aEnv_path         =  FRT.path( FRT.__basedir, `../${pEnv.Repo}`, pEnv.AppPath, pEnv.File )  
                                 FRT.sayMsg( `ALT11[ 119]  aEnv_path: '${aEnv_path}'`, -1)

       var  aEnv_file         =  FRT.readFileSync(  aEnv_path )  
       var  rEnv_name         =  new RegExp(   `  ${aENV_NAME} +=.+` )
            aEnv_file         =  aEnv_file.replace( rEnv_name, `  {aENV_NAME} = "${aKey}"` ) 
                                 FRT.writeFileSync( aEnv_path, aEnv_file )                                  
                                 FRT.sayMsg( `ALT11[ 125]  Saved Key, '${aKey}', for App: '${aApp}' in ENV file.`, -1)
    return  aKey 
        } catch( pError ) {      FRT.sayMsg( `ALT11[ 127]  Error: Putting Key, '${aKey}', for app: '${aApp}', in ENV file.`, -1 )
    return  '' }
            }  // eof putKey                                                                                // .(50310.03.10 End)    
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

  var  cKeys = { 
            getKeys: getKeys                                                                                // .(50310.02.11) 
          , putKey_inENV: putKey_inENV                                                                      // .(50310.03a.11) 
            }
//   module.exports = { cKeys: cKeys  } 
    export  default  cKeys 

//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
