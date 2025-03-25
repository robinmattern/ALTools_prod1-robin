/*\
##=========+====================+================================================+
##RD         ALT14_Models       | ALTools Models Component
##RFILE    +====================+=======+===============+======+=================+
##FD  ALT14_Models.mjs          |  ####|  3/16/25  9:45|   ###| p1.01`50316.0945
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the Models Component for ALTools Commands.
# 
#             1. Model     -->  | Model
#             2. ALT14     -->  | ALT14  
#             3 // .(      -->  |   // .(
#             4. 50316     -->  | 50316 
#             5.  3/16/25  -->  |  3/16/25
#             6. 0945      -->  | 0945     
#             7.  H:45     -->  |  9:45      
#             6. {Item1}   -->  | Model     
#             6. {Item2}   -->  | Platform      
#             6. Model   -->  | Project     
#             6.           -->  |       
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
# async func getModels          | ALT14  get Models Platform Model                                          // .(50316.03.9) 
# async func putModel_inENV     | ALT14  put Model_inEnv ProjectApp                                         // .(50316.04.9) 
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50316.01   3/16/25 RAM  9:45a| Create ALT14_Models_Component.mjs     
#.(50316.02   3/16/25 RAM  9:45a| Add get, put and key to list of cmds and obj 
#.(50316.03   3/16/25 RAM  9:45a| Create getModels method in Models component 
#.(50316.04   3/16/25 RAM  9:45a| Create savModel_inENV method in Models component 
#.(50309.05b  3/23/25 RAM  9:45a| Use sayMsg bInVSCode 
#.(50316.01b  3/23/25 RAM 10:00a| Import components and AIC90_FileFns
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

   import   FRT                 from '../../AICs/AIC90_FileFns_u1.03.mjs';                                  // .(50316.01b.5)      

       var  AppEnvs          =  getAppEnvs() 

//--------  ---------------  =  ------------------------------------------------------  #

            var  bInVSCode   =   process.env.VSCODE_INSPECTOR_OPTIONS != undefined 
            var  bInspect    =`${process.execArgv}`.match( /--inspect/ ) != null  
            var  bCalled     =   process.argv.length > 2 
            FRT.sayMsg( `ALT11[ 52]  bInVSCode: '${bInVSCode}', bInspect: '${bInspect}', bCalled: '${bCalled}'`, -1 );          // .(50309.05b.4) 
     
//         debugger; process.exit() 

       var  bInVSCode        =  false 
       var  bCalled          =  false 
       if (!bCalled && bInVSCode) {

//     var  AppEnvs          =  getAppEnvs() 
//          console.log( JSON.stringify( AppEnvs, '', 2 ) )

            bDebug           =  1
//    var [ mModels, a{Item1} ] = await getModels( aModel, 'Platform );  
//    var   aModel              = await savModel_inENV( 'Project', (await getModels( aModel, aPlatform ))[0] )

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
  
     async  function  getModels( aPlatforms, aModel  ) {                                                    // .(50316.03.10) write getModels Beg) 
      var  aURL              = 'http://localhost:8113/api/getModels'

                                FRT.sayMsg( `ALT14[  82]  getModels( aPlatforms: '${aPlatforms}', aModel: '${aModel}'`, -1 )
                                FRT.sayMsg( `ALT14[  83]  getModels: fetch( '${aURL } )`, -1 )
       try {
       var  pResponse        =  await fetch( aURL );
       if (!pResponse.ok) {
            throw              new Error( `  ALT14[  87]* Error in getModels\n`  
                                        + `    HTTP Status: ${pResponse.status}` );
            }
       var  mModels          =  await pResponse.json();

        if (aPlatforms > '') {    
            aPlatforms       = `,${ aPlatforms.split( /,/).map( fixPlatform ).join( ',' ) },`
                                FRT.sayMsg( `ALT14[  84]  aPlatforms: '${aPlatforms}'.`, -1 )
            mModels          =  mModels.filter( pModel => { return aPlatforms.includes( `,${pModel.Platform},` ) } )
            }
        if (aModel > '') {    
//          aModel           = `,${ aModels.split( /,/).map( fixModel ).join( ',' ) },`
                                FRT.sayMsg( `ALT14[  89]  aModels: '${aModels}'.`, -1 )
            mModels          =  mModels.filter( pModel => { return aModel.includes( `,${pModel.Model},` ) } )
            }

//          mModels          =  mModels.map( pModel => { return pModel.{Item1} } )

  return  [ mModels, aPlatforms .slice(1,-1) ]  // [0].{item1}                                     

        } catch( pError ) {
//          console.error( '    Error fetching keys:', pError.message );
       var  aPlatforms1      =  aPlatforms.match( /,'/) ? `platforms: '${aPlatforms}'` : `platform: '${aPlatforms}'`            // .(50312.02b.4 5/23/25 RAM Spelling)  
                                FRT.sayMsg( `ALT14[  93]  Error: Getting Model for '${aPlatforms1}', aModel: '${aModel}'.`, -1) // .(50312.02b.5)     
  return  [ [ ], aPlatforms ]                                                                                                   // .(50312.02b.6)     

            }
// -------- ---------------  =  ----------------------------------  #

   function fixPlatform( aPlatform ) {
        if (aPlatform.match( /^any/)      ) { return 'anythingllm' }
        if (aPlatform.match( /^xai|^grok/)) { return 'xai'    }
        if (aPlatform.match( /^.+/)       ) { return 'Platform' }
            }           
// -------- ---------------  =  ----------------------------------  #

   function fixModel( aModel ) {
        if (aModel.match( /^.+/)       ) { return 'Model' }
            }           
// -------- ---------------  =  ----------------------------------  #
         }; // eof getModels                                                                                // .(50316.03.10 End)    
//--------  ---------------  =  ------------------------------------------------------  #

     async  function  savModel_inENV( aProjectApp, aModel ) {                                               // .(50316.04.10 write putModel_inENV Beg)                                                            
       var  aENV_NAME        = 'ANYLLM_API_KEY'   
            aModel           =  aModel ? aModel : getModels( aProjectApp )
       try {
       var  pEnv             =  AppEnvs.filter( pEnv => { return `${pEnv.Project}.${pEnv.App}` == aProjectApp } )[0]
       var  aEnv_path        =  FRT.path( FRT.__basedir, `../${pEnv.Repo}`, pEnv.AppPath, pEnv.File )  
                                FRT.sayMsg(`ALT14[ 117]  aEnv_path: '${aEnv_path}'.`, -1)

       var  aEnv_file        =  FRT.readFileSync(  aEnv_path )  
       var  rEnv_name        =  new RegExp(   `  ${aENV_NAME} +=.+` )
            aEnv_file        =  aEnv_file.replace( rEnv_Name, `  {aENV_NAME} = "${aModel}"` ) 
                                FRT.writeFileSync( aEnv_path, aEnv_file )                                  
                                FRT.sayMsg( `ALT14[ 123]  Saved Model, '$a{Item1}}', for ProjectApp, '${aProjectApp}', in ENV file.`, -1)
    return  aModel 
//  ------  ---------------  =  ----------------------------------  #

        } catch (pError) {
            FRT.sayMsg(        `ALT14[ 128]  Error: Saving Model, '$a{Item1}}', for ProjectApp, '${aProjectApp}', in ENV file.`, -1 )
    return  ''
            }
//  ------  ---------------  =  ----------------------------------  #
         }; // eof putModel                                                                                 // .(50316.04.10 End)    
//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #

  var  cModels = { 
            getModels: getModels                                                                            // .(50316.03.11) 
          , putModel:  savModel_inENV                                                                       // .(50316.01b.6 RAM Was putModel).(50316.04.11) 
            }
//   module.exports = { cModels: cModels  } 
    export  default  cModels 

//--------  ---------------  =  ------------------------------------------------------  #  ---------------- #
