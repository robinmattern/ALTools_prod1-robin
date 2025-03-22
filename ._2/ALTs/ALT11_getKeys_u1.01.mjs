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
# async func getKeys            | ALT11  get keys {aPlatform}                                               // .(50310.02.9) 
# async func putKeys            | ALT11  put key  {App}                                                     // .(50310.03.9) 
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50309.04   3/09/25 RAM  7:00p| Create ALT11_Keys_Component.mjs
#.(50309.07   3/09/25 RAM 10:00p| Add get, put and key to list of cmds and objs
#.(50310.02   3/10/25 RAM  6:15p| Create getKeys method in keys component 
#.(50310.03   3/10/25 RAM  6:30p| Create putKey method in keys component 
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

// import   FRT                 from '../AICs/AIC90_FileFns_u1.03.mjs';

//     var  AppEnvs          =  getAppEnvs() 

//--------  ---------------  =  ------------------------------------------------------  #

       var  bInVSCode        =  true 
       var  bCalled          =  false 
       if (!bCalled && bInVSCode) {
       var  AppEnvs          =  getAppEnvs() 
            console.log( JSON.stringify( AppEnvs, '', 2 ) )
            debugger; process.exit() 
            }
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

  function  getAppEnvs( ) {
       var  mAppEnvs         = 
            [ {"ID": "1", "App": "aidocs", "Repo": "AIDocs_demo1-master",   "App": "client1/c16_aidocs-review-app", "File": "utils/FRTs/_env" }
            , {"ID": "2", "App": "ollama", "Repo": "Ollama/_wrapper-bruce", "App": "",                              "File": ".env" }
                ]
            } 
//--------  ---------------  =  ------------------------------------------------------  #

     async  function  getKeys(   aPlatforms, aModel  ) {                                                    // .(50310.02.10 write getKeys Beg) 
       try {
       var  pResponse        =  await fetch('http://localhost:8113/api/getKeys');
       if (!pResponse.ok) {
            throw new Error( `  HTTP error! Status: ${pResponse.status}` );
            }
       var  mKeys            =  await pResponse.json();
        if (aPlatforms > '') {    
            aPlatforms       = `,${aPlatforms},`
            mKeys            =  mKeys.filter( pKey => { return aPlatforms.includes( `,${pKey.platform},` ) } )
            }
        if (aModel > '') {    
            aModel          = `,${aModel},`
            mKeys            =  mKeys.filter( pKey => { return aModel.includes( `,${pKey.model},` ) } )
            }
            mKeys            =  mKeys.map(    pKey => { return pKey.key } )
    return  mKeys  // [0].key 
        } catch (pError) {
            console.error( '    Error fetching keys:', pError.message );
            }
            }; // eof getKeys                                                                               // .(50310.02.10 End)    
//--------  ---------------  =  ------------------------------------------------------  #

     async  function  putKey( aApp, aKey ) {                                                                // .(50310.03.10 write putKey Beg)                                                            
       try {
       var  aAppName          =    
//     var  aPath ='/Users/Shared/Repos/AIDocs_demo1-master/client1/c16_aidocs-review-app/utils/FRTs/_env'
       var  aBase_path        =  FRT.path( FRT.__basedir, '../aidocs_demo1-master')
       var  aApp_path         =  FRT.path( aBase_path,    'client1', 'c16_aidocs-review-app')
       var  aEnv_path         =  FRT.path( aApp_path,     'utils/FRTs/_env' )
            FRT.sayMsg( `ALT11[  63]  aEnv_path: '${aEnv_path}'`, 1)
       var  aEnv_file         =  FRT.readFileSync( aEnv_path )  
            aEnv_file.replace(/  ANYLLM_API_KEY +=.+/, `  ANYLLM_API_KEY = "${aKey}"` ) 
                          FRT.writeFileSync( aEnv_path, aEnv_file )                                  
    return  aKey 
        } catch (pError) {
            console.error('Error fetching keys:', pError.message);
    return ''
            }
            }  // eof putKey                                                                                // .(50310.03.10 End)    
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

       var  cKeys = { 
               getKeys: getKeys                                                                             // .(.(50310.02.11) 
             , putKey:  putKey                                                                              // .(.(50310.03.11) 
               }
//   module.exports = { cKeys: cKeys  } 
            export    default  cKeys 

//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
