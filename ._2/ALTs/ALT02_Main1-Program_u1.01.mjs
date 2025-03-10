/*\
##=========+====================+================================================+
##RD         ALT02_Main-Program | ALTools Main NodeJS Program
##RFILE    +====================+=======+===============+======+=================+
##FD  ALT02_Main_Program.mjs    |  13412|  1/01/25  1:01|   256| p1.01`.50101.0101
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the Main Program for ALTools Commands.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
#    async  function  main      | ( aArg1, aArg2, aArg3, mArgs ) {
#           function  newApp    | ( aApp, mArgs ) { ... }
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50309.04   3/09/25 RAM  7:00p| Create ALT02_Main1_Program.mjs

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/

   import   fs                  from 'fs/promises';
   import   path                from 'path';
   import { fileURLToPath }     from 'url';
// import   dotenv              from 'dotenv';
// import { exec }              from 'child_process';
// import { promisify }         from 'util';

    import   FRT                 from '../AICs/AIC90_FileFns_u1.03.mjs';
    import   ALT                 from '../ALTs/ALT11_getKeys_u1.01.mjs';

      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()                                         // .(50125.01.15 RAM Vars are local to this scripts)
                     
        if (bQuiet >= 0) {                                                                                  // .(50309.05.8 RAM ???).(50301.01.4)
            console.log( `\n -- ALT02[  39]  bDebug: ${global.bDebug}, bQuiet: ${global.bQuiet}, bDoit: ${FRT.bDoit}, bForce: ${FRT.bForce}, bIsCalled: ${FRT.isCalled(import.meta.url)}` )      // .(50202.03.1)
            }
//    var   execAsync        =  promisify( exec );

      var __dirname          =  path.dirname( fileURLToPath( import.meta.url ) ); global.path = path
      var   aAppDir          =  __dirname; global.aAppDir  = aAppDir

       var  aTS              =  FRT._TS  // fmtTS()
//      --- ---------------  =  ------------------------------------------------------  #  

            global.bTest     =  0                                                       // .(50127.02.1)
       var  bIsInVSCode      =  FRT.isNotCalled( import.meta.url )                      // .(50201.04.2 RAM if this really in VSCode ??)
       var  bIsCalled        = !bIsInVSCode || process.argv.length > 2                  // It's running in VSCode debugger
            global.nTest4    =  1                                                       // .(50301.01.5).(50213.01.1 RAM sayMsg('ALT02[ 174]', nTest4): 1, -1 or 2)

//          ---------------  =  ------------------------------------------------------  #  
        if (bIsCalled == false) {                                                       // It's running in VSCode debugger
            global.bDebug    =  1
            global.bInVSCode =  process._debugProcess ? 1 : 0                           // .(50208.08.2 RAM Thanks Grok)

            FRT.bDoit = 1;      global.bTest = 1
//                              await main( 'list', 'models', 'gp4oopm' )
//                              await main( 'new', 'app', 's94', "Another-Server-App" ) // Invalid App, spaces in name, no bFix
//                              await main( 'sho', 'vars' )
                                await main( 'get', 'keys' )

                                process.exit()
        } else {  // eif bIsCalled == true
//          ---------------  =  ------------------------------------------------------  #  

        if (process.argv[1].match( /test/i ) != null) { var aTF = process.argv[1].match( /(test.*)\./ )[1]  // .(50213.04.1).(50208.01b.1)
            sayMsg( `ALT02[  69]  ${aTF} args: '${ process.argv.slice(2).join("', '") }'`, -1 )             // .(50208.01.1 RAM Running a test.mjs script in VSCode or nodeJS )
            } // eif is running this script test.mjs in the the VSCode debugger
//          ---------------  =  ------------------------------------------------------  #  
          else {                                                                                            // .(50213.04.3)
//          sayMsg( `ALT02[ 120] '${ process.argv[1] }'`, 1 )                                               //#.(50301.01.6 RAM it's always ALT02_Main-Program_u1.02.mjs )
//          sayMsg( `ALT02[ 121]  process.argv[ '${ process.argv.slice(2).join("', '") }' ]`, 1 );          //#.(50301.01.7)
            }                                                                                               // .(50213.04.4)
//      --- ---------------  =  ------------------------------------------------------  #  

            if (process.argv[1].match( /test/i ) == null) {                                 // .(50201.10.1 RAM Not Running a Test Script, ALT02_Main-Program_u1.02.mjs)
//          sayMsg( "", -1 )
            FRT.aAbort    = "abort"                                                     // .(50205.02.1)
   try {
            await main().catch( pErr => {                                               // .(50204.01.1 RAM Add await main() and try { } finally { })
            console.error('An error occurred in main:', pErr );
            } );
//          ---------------  =  ------------------------------------------------------  #  
        } finally {
//          AIF.close()                                                                 // .(50204.01.2)
            }                                                                           // .(50204.01.1 End)
//          ---------------  =  ------------------------------------------------------  #  
            } // eif not running test.mjs in the the VSCode debugger
//      --- ---------------  =  ------------------------------------------------------  #  

        } // // eif bIsCalled == true
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #
        
//                             await main( ...args )                                    ##.(50309.05.x RAM ??? )

//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

  function  fmtFlags( ) {
       var  a          = ''
//          a          = a + (global.bTest  == 1 ? 't' : '')
            a          = a + (global.bDebug == 1 ? 'b' : '')
            a          = a + (FRT.bDoit     == 1 ? 'd' : '')
            a          = a + (FRT.bForce    == 1 ? 'f' : '')
            a          = a + (global.bQuiet == 1 ? 'q' : '')
    return  a ? `-${a}` : ''
            }
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

/*========================================================================================================= #  ===============================  *\
#>      ALT02 MAIN
\*===== =================================================================================================== */

//   async  function  main( aArg1, aArg2, aArg3, mArgs ) { ... }                                            //#.(50101.01 RAM Wrote main function End)
     async  function  main( ...args ) {                                                                     // .(50101.01 RAM Use ...args)
       var  mArgs  =  args.length ? args : process.argv.slice(2).filter( a => a ) // s.b. 2, but I want to start from mArgs[1] below

       var  mArgs_ =  mArgs; // fixArgs( mArgs )                                                            // .(50302.04.1).(50124.04a.1 RAM Re-Wrote fixArgs )
                                                                                           
       var  aCmd   = (mArgs[0] || '').slice(0,3).toLowerCase()   // (aArg1 ? aArg1 : mArgs[1] || '').slice(0,3)
       var  aObj   = (mArgs[1] || '').slice(0,3).toLowerCase()   // (aArg2 ? aArg2 : mArgs[2] || '').slice(0,3)
       var  aItm   =  mArgs[2] || ''                             //  aArg3 ? aArg3 : mArgs[3] || ''
       var  mArgs  =  mArgs.slice(3)                             //  mArgs ? mArgs : mArgs.slice(3)
       var  aArgs  = `[ '${ mArgs.join("', '") }' ]`
       var  aAllArgs = `'${aObj}', '${aItm}'${ mArgs.length ? `, ${aArgs}` : '' }`

       sayMsg( `ALT02[ 128]  aCmd: '${aCmd}', aObj: '${aObj}', aItm: '${aItm}', aOths: '${aArgs}'`, -1 ) 
       sayMsg( `ALT02[ 129]  await main( '${aCmd}', ${aAllArgs} )`, global.nTest4 );  if (global.nTest4 == 2 ) { return }// exit_wCR()

       if ( mArgs_[1] == '') {                                                                              // .(50302.04.2 RAM S.B. aObj Beg)
       var  aMsg   = /(['"])([^'"]*(?:(?!\1)['"][^'"]*)*)?$/.test( mArgs_[0] ) ? "Name has unmatched quotes" : ''   
            usrMsg( `\n* ${ aMsg ? aMsg : `Invalid Arguments: '${mArgs_[0]}'` }. Please re-enter command.`, 2 )
        if (global.bTest) { return } else { FRT.exit_wCR() } 
            } 
                                                                                                          
        if (aCmd.match( /new|add|lis|run|get|set|sav|sho|vue/ ) == null) {                                  // .(50309.07.x RAM Add get)
            usrMsg( "\n* Please enter one of these commands: new, add, list, run, get, set, save, show or view.", bTest ? 1 : 2 );              // .(50202.01.2)
            }
        if (aObj.match( /key|app|mod|sys|pro|ses|scr|var/     ) == null) {                                  // .(50309.07.x RAM Add alm)
            usrMsg( "\n* Please enter one of these objects: app, model, prompt, session, script or vars.",        bTest ? 1 : 2 );              // .(50202.01.4)
            }
//      ---------------------------------------------------------------

        if (global.bTest1) { return }

        if (aObj == 'key') {
    switch (aCmd) {
      case 'get': await getKey( [ aItm, ...mArgs ] ); break;  // ANo_AppName, Mod, ModelName                // .(50127.01.1 RAM New way).(50124.03.6)
//    case 'add': await addApp( [ aItm, ...mArgs ] ); break;  // ANo, AppName                               // .(50127.01.2).(50122.01.2)
//    case 'set': await setApp( [ aItm, ...mArgs ] ); break;  // ANo, AppName                               // .(50127.01.3).(50126.05.4)
//    case 'lis': await listApps( aItm             ); break;
//    case 'mak': console.log( `  makAppModel( ${aAllArgs} ) -- not implemented yet")` ); break;
            };  } // process.exit() }
//      --- ---------------  =  ------------------------------------------------------  

     } // eof main                                                                                       // .(50101.01 End)
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

/*========================================================================================================= #  ===============================  *\
#>      ALT02 newApp
\*===== =================================================================================================== */

     async  function  getKey( mArgs ) {                                                                     // .(50907.07.1 Write getKeys)
      var [ aObj, aKey ] = mArgs ? [ ...mArgs,'','','' ] : [ '','','','' ]    
            sayMsg( `ALT02[ 167]  await ALT.getKeys( '${aKey}', bDoit: ${FRT.bDoit})`, -1 );             
        var aKey             =  await  ALT.getKeys( aKey )  
            } // eof newApp                                                                                 // .(50309.07.1 End)
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

/*========================================================================================================= #  ===============================  *\
#>      ALT02 END
\*===== =================================================================================================== */

//  export  default { tesn, main }
       var  getApps_n_Models = {}   // AIM.getApps_n_Models                             // .(50210.04.1)
       var  close = function() { }  // AIF.close                                        // .(50216.06.1)
  export  { main, getApps_n_Models, close }  

/*========================================================================================================= #  ===============================  */

  function  fixArgs( mARgs ) {
       var  nNoisy   =  -1 * 0  // -1 or 1                                              // .(50201.02.1 RAM Add nNoisy)
       if (!Array.isArray( mARgs )) { mARgs = mARgs.split( /,(?=(?:(?:[^"]*"){2})*[^"]*$)/ ) };  // double quotes must be balanced
       var  mARGs    = [...mARgs,'','','','','','','',''].map( a => QQ(a,0) );          // .(50208.02.1 RAM mARgs = mARGs. Was 1, i.e. replace 1st spce with _)
            sayMsg( `ALT02[ 555]  mARgs: '${ mARgs.join( "', '") }'`, nNoisy )          // .(50201.02.2)

       var  bObj     =  mARGs[1].match( /app|mod|sys|pro|ses|scr|var/) == null, nArgs = 6                   // .(50202.01.6)
       var  aObj     =  { new: "app", add: "mod" }[ mARGs[0] ] || ''

        if (bObj) {     mARGs.splice(1, 0, aObj); nArgs-- }                             // insert (MT 2nd arg or aObj) if 2nd arg is invalid
            sayMsg( `ALT02[ 562]  mARGs: '${ mARGs.join( "', '") }'`, nNoisy )          // .(50201.02.3)

       var  mArgs    =  [...mARGs.slice(0,2),'','','','','']                            //  args 3 thr 7 start as blank
       var  mArg3    =  mARGs[2].split( /[_ ]/ )                                        // .(50211.02.1 RAM Change 1st item of 3rd arg to be seperated by _ or a space)
            mArgs[2] =  mArg3[0]
            mArgs[3] =  mArg3[1] ? mArg3.slice(1).join( ' ' ) : mARGs[3]                // if two _s or spaces in name  // .(50211.02.2).(50201.08.3 RAM Put back spaces after first one)
        if (mArg3[1]) { mARGs.splice(2, 0, mArg3[0]); nArgs-- }                         // insert MT 4th arg or aItm if 3rd arg contains '_' or a space. '12 34567' ok    // .(50211.02.3)
       var  bModel   =  mARGs[3].split( /[_ ]/)[0].replace(/[-:,. ]/, '').length == 7   // is the 4th arg is a model.   Works for "1234567 My Model Name"                 // .(50211.02.4)
            bModel   =  bModel && !(mARGs[2].length == 7 && mARGs[5].length == 0)       // does not fail on "1234567 My-Model_Name" or "t004 My Session Name"             // .(50211.02.6 RAM Was May not)
        if (bModel  ) { mARGs.splice(3, 0, ''); nArgs--; mArgs[3] = '' }                // insert MT 5th arg if 4th arg is a Model ID
            sayMsg( `ALT02[ 580]  mARGs: '${ mARGs.join( "', '") }'`, nNoisy )          // .(50201.02.4)

       var  mArg5    =  mARGs[4].split( '_' )
            mArgs[4] =  mArg5[0]
            mArgs[5] =  mArg5[1] ? mArg5.slice(1).join( '_' ) : mARGs[5]                // if two _s in name   // .(50201.08.4 RAM Put back '_'s after first one)
        if (mArg5[1]) { nArgs--; }
       var  mRest    =  mARgs.slice( nArgs ).filter( a => a ).map( a => QQ(a,0) )
            mArgs    =  [ ...mArgs.slice(0,6), ...mRest ]                               // get the rest
            sayMsg( `ALT02[ 588]  mArgs: '${ mArgs.join( "', '") }'`, nNoisy )          // .(50201.02.5)
     return mArgs
//          ---------------  =  ---------------------------------------------

  function  QQ( a, b ) {
        if (a == "" || a == '""') { return '' }
            a = String(a).replace( /'/, "\'" )
            a = String(a).replace( /,$/, "" )           // .(50209.02.1 RAM Remove trailing comma)
        if (b ? 1 : 0) {
            a = a.replace( /"[, ]*"/, '_' )             // replace 1st '", "' with _ Why?
            a = a.replace(  /[, ]+/,  '_' )             // replace 1st ', '  with _ Why?
            }
//     var  m = a.match( /"([^"]*)"/g );
       var  m = a.match( /"([^"']*)"/g );               //  added single quote
    return  m ? a.slice(1, -1) : a                      //  remove mArgs[0]: '"model" "New model"'     -> [ 'model' 'New model'     ]
//  return  m ? m.map( a => a.slice(1, -1)) : a;        //  remove mArgs[0]: '"model" "New model"'     -> [ 'model' 'New model'     ]
            } // eof QQ
//          ---------------  =  ---------------------------------------------
            } // eof fixArgs
//      --- ---------------  =  ------------------------------------------------------  

  function  fixArgs1( mArgs ) {
       if (!Array.isArray( mArgs )) { mArgs = [ mArgs ] };  //  if mArgs = 'model_New Model'
        if (mArgs.length != 1) { return mArgs };            //  if mArgs = [ 'model_New Model', '"" "" ""' ]
       var  m = mArgs[0].match( /"([^"]*)"/g );             //
    return  m ? m.map( a => a.slice(1, -1)) : mArgs;        //  remove mArgs[0]: '"model" "New model"'     -> [ 'model' 'New model'     ]
                                                            //  remove mArgs[1]: '"model" "New Model" ""'  -> [ 'model' 'New model', '' ]
            } // eof fixArgs1 
//      --- ---------------  =  ------------------------------------------------------  
/*========================================================================================================= #  ===============================  */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/

