/*\
##=========+====================+================================================+
##RD         ALT02_Main-Program | ALTools Main NodeJS Program
##RFILE    +====================+=======+===============+======+=================+
##FD  ALT02_Main_Program.mjs    |  13412|  1/01/25  1:01|   256| p1.01`.50101.0101
##FD  ALT02_Main_Program.mjs    |  13412|  3/10/25 18:45|   256| p1.01`.50310.1845
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the Main Program for ALTools Commands.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#                               |
# async func main               | ( aArg1, aArg2, aArg3, mArgs ) {
# async fync listKeys           | ALT02  list keys {Platforms} [{Models}] [{Project}]                       // .(50310.02a.6)  
# async func saveKeys_inENV     | ALT02  save key  {Platform} [{Models}] [{Project}]                        // .(50310.03a.6) 
# async fync listWorkspaces     | ALT02  list workspaces {Workspaces} [{Project}]                           // .(50313.03.6) 
# async func saveWorkspaces_inENV|ALT02  save workspace {App} {Workspace} [{Project}]                       // .(50313.04.6) 
# async fync listModels         | ALT02  list Models {Models} [{Project}]                                   // .(50313.03.6) 
                                |
##CHGS     .--------------------+----------------------------------------------+
#.(50309.04   3/09/25 RAM  7:00p| Create ALT02_Main1_Program.mjs
#.(50309.07   3/09/25 RAM 10:00p| Add get, put and key to list of cmds and objs
#.(50310.02   3/10/25 RAM  6:15p| Create Get Keys command in .mjs program   
#.(50310.03   3/10/25 RAM  6:30p| Create Put Key command in .mjs program   
#.(50310.02a  3/10/25 RAM  6:15p| Rename List Keys command in .mjs program   
#.(50310.03a  3/10/25 RAM  6:30p| Create Save Key command in .mjs program   
#.(50313.03   3/13/25 RAM  H:MMa| Create List Workspaces Command in .mjs program  
#.(50313.04   3/13/25 RAM  H:MMa| Create Save Workspace Command .mjs program  
#.(50313.05   3/13/25 RAM  H:MMa| Create List Models Command .mjs program  
#.(50316.01   3/16/25 RAM  9:09a| Move programs into Components folder        

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
//  import   Keys                from '../ALTs/ALT11_Keys-Component_u1.01.cjs';                             //#.(50316.01.1)   
    import   Keys                from '../ALTs/Components/ALT11_Keys_u1.01.mjs';                            // .(50316.01.1 RAM Moved into Components)        
    import { appendFileSync }   from 'fs';

      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()                                         // .(50125.01.15 RAM Vars are local to this scripts)
                     
        if (bQuiet >= 0) {                                                                                  // .(50309.05.8 RAM ???).(50301.01.4)
            console.log( `\n -- ALT02[  39]  bDebug: ${global.bDebug}, bQuiet: ${global.bQuiet}, bDoit: ${FRT.bDoit}, bForce: ${FRT.bForce}, bIsCalled: ${FRT.isCalled(import.meta.url)}` )      // .(50202.03.1)
            }
//    var   execAsync        =  promisify( exec );

      var __dirname          =  path.dirname( fileURLToPath( import.meta.url ) ); global.path = path
       var  aAppDir          =  __dirname; global.aAppDir  = aAppDir

       var  aTS              =  FRT._TS  // fmtTS()
//      --- ---------------  =  ------------------------------------------------------  #  

       var       bIsInVSCode =  FRT.isNotCalled( import.meta.url )                      // .(50313.03.x RAM Is this good in all cases).(50201.04.2 RAM if this really in VSCode ??) 
            global.bInVSCode =  process._debugProcess ? 1 : 0                           // .(50313.03.x RAM Used in ALT).(50208.08.2 RAM Thanks Grok) 
            global.bIsCalled = !bIsInVSCode || process.argv.length > 2                  // .(50313.03.x RAM Use bInVSCode instead? It's running in VSCode debugger) 
            global.nTest4    =  1                                                       // .(50313.03.x RAM Display ALT03[138]).(50127.02.1) 
            global.nTest3    =  3                                                       // .(50313.03.x RAM Display arg names, and quit if 2  
//          global.nTest4    =  2                                                       // .(50313.03.x RAM Exit after main()).(50301.01.5).(50213.01.1 RAM sayMsg('ALT02[ 174]', nTest4): 1, -1 or 2) 

//          ---------------  =  ------------------------------------------------------  #  
        if (bIsCalled == false) {                                                       // It's running in VSCode debugger

            global.bDebug    =  0
            global.bInVSCode =  process._debugProcess ? 1 : 0                           // .(50313.03.x RAM Used in ALT).(50208.08.2 RAM Thanks Grok) 
            global.nTest3    =  global.nTest3 ? global.nTest3 : 1                       // .(50313.03.x RAM Display or exit after main( cmd, args set ))   
            FRT.bDoit  =  1;    global.bTest = 0                                        // .(50313.03.x RAM Don't exit from main() and JPT12_Main2Fns holdovers)  

       var  aTests     = '1s'
//                              await main( 'list', 'models', 'gp4oopm' )
//                              await main( 'new', 'app', 's94', "Another-Server-App" ) // Invalid App, spaces in name, no bFix
//                              await main( 'sho', 'vars' )
//                              await main( 'get', 'keys' )
//                              await main( 'get', 'keys', 'anythingllm' )
//                              await main( 'get', 'keys', 'anythingllm,xai' )
//                              await main( 'get', 'keys', 'anythingllm,xai', 'grok3' )
                    if ( /,1a,/.test(`,${aTests},`)) { 
                                await main( 'list', 'keys', '',         '',      ''    )
                                await main( 'list', 'keys', 'app',      '',      ''    )
                                await main( 'list', 'keys', 'platform', 'app',   ''    )
                                await main( 'list', 'keys', 'platform', 'model', 'app' )
                                }
                    if ( /,1s,/.test(`,${aTests},`)) { 
                                      usrMsg( "" )
                                await tesn(  -11,  'save    keys' )
                                await tesn(  -12,  'save    keys   app                    ' )
                                await tesn(  -13,  'save    keys   platform    app        ' )
                                await tesn(  -15,  'save    keys   platform    model   app' )     
                                
                                await tesn(  -12,  'save    keys  "c21_My App"'             )
                                await tesn(  -13,  'save    keys   Ollama "c21_My App"'     ) 
                                await tesn(  -15,  'save    keys   Ollama "My Model" "c21_My App" ' )            

                                await tesn(   14,  'save    keys  "c21_My App" Ollama'      )
                                await tesn(   16,  'save    keys   ollama "c21_My App"   "My Model" ' )           
                                await tesn(   17,  'save    keys  "c21_My App" Ollama    "My Model" ' )          
                                await tesn(   18,  'save    keys  "c21_My App" "My Model" Ollama'     )          
                                await tesn(   19,  'save    keys  "My Model"   Ollama  "c21_My App" ' )            
                                }
//                              await main( 'save', 'key',  'aidocs', 'any', 'model', '', '' )
//                              await main( 'save', 'key',  'any', 'model', 'aidocs' )
                                debugger; // process.exit()
        } else {  // eif bIsCalled == true
//          ---------------  =  ------------------------------------------------------  #  

        if (process.argv[1].match( /test/i ) != null) { var aTF = process.argv[1].match( /(test.*)\./ )[1]  // .(50213.04.1).(50208.01b.1)
            sayMsg( `ALT02[  92]  ${aTF} args: '${ process.argv.slice(2).join("', '") }'`, -1 )             // .(50208.01.1 RAM Running a test.mjs script in VSCode or nodeJS )
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
            console.error('An error occurred in main():', pErr );
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
       var  a          =  ''
//          a          =  a + ( global.bTest  == 1 ? 't' : '' )
            a          =  a + ( global.bDebug == 1 ? 'b' : '' )
            a          =  a + ( FRT.bDoit     == 1 ? 'd' : '' )
            a          =  a + ( FRT.bForce    == 1 ? 'f' : '' )
            a          =  a + ( global.bQuiet == 1 ? 'q' : '' )
    return  a ? `-${a}` : ''
            }
// -------  ---------------  =  ------------------------------------------------------  #

async  function  tesn( nTest, aCmd ) {
        if (nTest <= 0 ) { return }
        var  mArgs    =  splitOnUnquotedSpaces( aCmd )      
        var  aArgs    =  mArgs.map( a => a.match( / /) ? `"${a}"` : a ).join( " " )   
//          usrMsg( `  - Test ${ String(nTest).padStart(2) }. main( ${ mArgs.join( "," ) } )` )  // or aCmd 
            usrMsg( `  - Test ${ String(nTest).padStart(2) }. alt ${ aArgs }`  )  
            usrMsg( "------------------------------------------------------" )
            await main( ...mArgs )
            usrMsg( "" )
            }
// -------  ---------------  =  ------------------------------------------------------  #

  function  splitOnUnquotedSpaces(input) {
//     Match either:
//        - Quoted strings: "..." or '...', including spaces inside
//        - Unquoted words: sequences of non-space characters

       if (!input) return [];
       var  regex = /("[^"]*"|'[^']*'|[^\s'"]+)/g;
       var  result = [];
       var  match;
    
    while ((match = regex.exec(input)) !== null) {  // Extract all matches
      var  segment = match[0];
        // Remove surrounding quotes if present, but only if the entire segment is quoted
      if ((segment.startsWith('"') && segment.endsWith('"')) || (segment.startsWith("'") && segment.endsWith("'"))) {
           segment = segment.slice(1, -1);
           }
    result.push(segment);
           }
    return result;
           }

  function  splitOnUnquotedSpaces1(input) {
      if (!input) return [];
    // Regex to match: (non-space characters or quoted strings) separated by one or more spaces
    // - ([^"\s']+(?:"[^"]*"|'[^']*')*[^"\s']*)+ matches a segment
    // - \s+ matches one or more spaces
       var  regex     = /([^"\s']+(?:"[^"]*"|'[^']*')*[^"\s']*)\s+/g;
       var  result    = [];
       var  lastIndex = 0;

      input.replace( regex, (match, group, index) => {
        if (lastIndex < index) {
            result.push(input.substring(lastIndex, index).trim());
            }
            result.push(group.trim());
            lastIndex = index + match.length;
            });
        if (lastIndex < input.length) {  // Add the remaining part if any
            result.push(input.substring(lastIndex).trim());
            }
    return  result.filter(item => item.length > 0);
            }           
// -------  ---------------  =  ------------------------------------------------------  #
/*========================================================================================================= #  ===============================  *\
#>      ALT02 MAIN
\*===== =================================================================================================== */

//   async  function  main( aArg1, aArg2, aArg3, mArgs ) { ... }                                            //#.(50101.01 RAM Wrote main function End)
     async  function  main( ...args ) {                                                                     // .(50101.01 RAM Use ...args)
        if (process.argv[6] > "") { process.argv = [ ...process.argv.slice(0,6), ...process.argv[6].slice(1,-1).split( /" "/ ) ] }
       var  mArgs_ =  args.length ? args : process.argv.slice(2) // .filter( a => a ) // s.b. 2, but I want to start from mArgs[1] below

//     var  mArgs_ =  mArgs;                           // fixArgs( mArgs )                                  // .(50302.04.1).(50124.04a.1 RAM Re-Wrote fixArgs )
       var  mArgs  =  mArgs_.map( aArg => QQ( aArg )); // fixArgs( mArgs )                                  // .(50313.05.1)..(50302.04.1).(50124.04a.1 RAM Re-Wrote fixArgs ) 
//     var  mArgs  =  mArgs_;                          // fixArgs( mArgs )                                  // .(50313.05.1)..(50302.04.1).(50124.04a.1 RAM Re-Wrote fixArgs ) 

//     sayMsg( '', global.nTest4 )                                                                          // .(50313.03.x RAM ) 
       sayMsg( `ALT02[ 227]  await main( ...args: '${ mArgs.join( "', '" ) }' )`, -1 )
//     sayMsg( `ALT02[ 126]  await main( ...args:  ${ mArgs.join(  " , " ) } )`, -1 )
       
       var  aCmd   = (mArgs[0] || '').slice(0,3).toLowerCase()   // (aArg1 ? aArg1 : mArgs[1] || '').slice(0,3)
       var  aObj   = (mArgs[1] || '').slice(0,3).toLowerCase()   // (aArg2 ? aArg2 : mArgs[2] || '').slice(0,3)
       var  aItm   =  mArgs[2] || ''                             //  aArg3 ? aArg3 : mArgs[3] || ''
       var  mArgs  =  mArgs.slice(3)                             //  mArgs ? mArgs : mArgs.slice(3)          

       var  aOths  = `[ '${ mArgs.join("', '") }' ]`
//     var  aOths  = `[ ${  mArgs.join( ", " ) } ]`
       var  aAllArgs = `'${aObj}', '${aItm}'${ mArgs.length ? `, ${aOths}` : '' }`

//     sayMsg( '', global.nTest4 == 3 ? 1 : global.nTest4 )                                                               // .(50313.03.x RAM ) 
       sayMsg( `ALT02[ 240]  aCmd: '${aCmd}', aObj: '${aObj}', aItm: '${aItm}', aOth: ${aOths}`, -1 ) 
//     sayMsg( `ALT02[ 138]  await main( '${aCmd}', ${aAllArgs} )`, global.nTest4 );  if (global.nTest4 == 2 ) { return } // .(50313.03.x RAM if global.nTest4 == 2, it will exit if bTest != 1) // exit_wCR() 
       sayMsg( `ALT02[ 242]  await main( '${aCmd}', ${aAllArgs} )`, global.nTest4 )                                       // .(50313.03.x RAM if global.nTest4 == 2, it will exit if bTest != 1) // exit_wCR() 
//     sayMsg( '', global.nTest4 == 3 ? 1 : global.nTest4 )                                                               // .(50313.03.x RAM ) 
       sayMsg( '', global.nTest4 )                                                                          // .(50313.03.x RAM ) 

       if ( mArgs_[1] == '') {                                                                              // .(50302.04.2 RAM S.B. aObj Beg)
       var  aMsg   = /(['"])([^'"]*(?:(?!\1)['"][^'"]*)*)?$/.test( mArgs_[0] ) ? "Name has unmatched quotes" : ''   
            usrMsg( `\n* ${ aMsg  ? aMsg : `Invalid Arguments: '${ mArgs_[0] }'` }. Please re-enter command.`, 2 )
        if (global.bTest) { return } else { FRT.exit_wCR() }                                                // .(50313.03.1 RAM if global.bTest, then FRT.exit_wCR doesn't exit)  
            } 
                                                                                                          
        if (aCmd.match( /new|add|lis|run|get|set|put|sav|sho|vue/ ) == null) {                              // .(50309.07.1 RAM Add get and put cmd)
            usrMsg( "\n* Please enter one of these commands: new, add, list, run, get, set, save, show or view.", global.bTest ? 1 : 2 ); // .(50202.01.2)
            }
        if (aObj.match( /key|app|mod|sys|pro|ses|scr|var/         ) == null) {                              // .(50309.07.2 RAM Add key obj)
            usrMsg( "\n* Please enter one of these objects: app, model, prompt, session, script or vars.",        global.bTest ? 1 : 2 ); // .(50202.01.4)
            }
//      ---------------------------------------------------------------

        if (global.nTest4 == 3) { return }                                                                  // .(50313.03.x RAM Exit after main arg checks)  

        if (aObj == 'key') {                                                                                // .(50309.07.3 RAM Add key commands Beg)
    switch (aCmd) {
      case 'lis': await listKeys(       [ aItm, ...mArgs ] ); break;                                        // .(50310.02a.7 RAM Write getKeys)  
      case 'sav': await saveKey_inENV(  [ aItm, ...mArgs ] ); break;                                        // .(50310.03a.7 RAM Write putKey)   
//    case 'add': await addApp(  [ aItm, ...mArgs ] ); break;  
//    case 'set': await setApp(  [ aItm, ...mArgs ] ); break;  
//    case 'lis': await listApps(  aItm             ); break;
            };  } // process.exit() }                                                                       // .(50309.07.3 End)
//      --- ---------------  =  ------------------------------------------------------  

        if (aObj == 'wor') {                                                                                // .(50313.02.1 RAM Add workspace commands Beg)
    switch (aCmd) {
      case 'lis': await listWorkspaces(       [ aItm, ...mArgs ] ); break;                                  // .(50313.03.7 RAM Write getWorkspaces) 
      case 'sav': await saveWorkspace_inENV(  [ aItm, ...mArgs ] ); break;                                  // .(50313.04.7 RAM Write savWorkspace_inENV)   
//    case 'set': await setObj(  [ aItm, ...mArgs ] ); break;  
//    case 'lis': await listObjs(  aItm             ); break;
            };  } // process.exit() }                                                                       // .(50313.02.1 End)
//      --- ---------------  =  ------------------------------------------------------  

        if (aObj == 'mod') {                                                                                // .(50313.05.7 RAM Add workspace commands Beg)  
    switch (aCmd) {
      case 'lis': await listModels(  [ aItm, ...mArgs ] ); break;                                           // .(50313.05.7 RAM Write listModels) 
//    case 'sav': await saveObj( [ aItm, ...mArgs ] ); break;                                               
//    case 'set': await setObj(  [ aItm, ...mArgs ] ); break;  
//    case 'lis': await listObjs(  aItm             ); break;
            };  } // process.exit() }                                                                       // .(50313.05.7 End)  
//      --- ---------------  =  ------------------------------------------------------  

        if (aObj == 'obj') {                                                                                // .(ymmdd.nn.m XXX Add obj commands Beg) 
    switch (aCmd) {
      case 'get': await newObj(  [ aItm, ...mArgs ] ); break;  
      case 'add': await addObj(  [ aItm, ...mArgs ] ); break;  
      case 'set': await setObj(  [ aItm, ...mArgs ] ); break;  
      case 'lis': await listObjs(  aItm             ); break;
            };  } // process.exit() }                                                                       // .(ymmdd.nn.m End) 
//      --- ---------------  =  ------------------------------------------------------  

            }  // eof main                                                                                  // .(50101.01 End)
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

/*========================================================================================================= #  ===============================  *\
#>      ALT02 getKeys
\*===== =================================================================================================== */

     async  function  listKeys(  mArgs ) {                                                                  // .(50310.02a.7 Write getKeys in .sh Beg)  
      var [ aPlatforms, aModel ] =  mArgs ? [ ...mArgs,'','','' ] : [ '','','','' ]   
      
//    var [ aPlatforms, aModel ] =  mArgs 
            aPlatforms       =  aPlatforms.match( /''/) ? '' : aPlatforms
            aModel           =  aModel.match( /''/) ? '' : aModel
                                sayMsg( `ALT02[ 313]  await Keys.getKeys('${aPlatforms}', '${aModel}')`, -1 );             
      var [ mKeys  ]         =  await Keys.getKeys(   aPlatforms, aModel  )  
                                sayMsg( `ALT02[ 315]  Received aKeys: [ '${ mKeys.join("', '") }' ]`, -1 );             
          usrMsg(            `  Received Keys: '${ mKeys.join("', '") }'` );             
            }  // eof getKeys                                                                               // .(50310.02.8 End)  
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

/*========================================================================================================= #  ===============================  *\
#>      ALT02 putKey
\*===== =================================================================================================== */

     async  function  saveKey_inENV( mArgs ) {                                                              // .(50310.03.8 Write putKey in .sh Beg) 
/*      
        if (mArgs[0].match( /^[acs][0-9][0-9]_/) ) {  mArgs[2] = mArgs[0]; mArgs[0] = '' }
        if (mArgs[1].match( /^[acs][0-9][0-9]_/) ) {  mArgs[2] = mArgs[1]; mArgs[1] = '' }

       var  aApp             =  chkArg( Apps, mArgs )
       var  aPlatforms       =  chkArg( Apps, mArgs )
       var  aModels          =  chkArg( Apps, mArgs )
*/
                          var [ aPlatform, aModel, aApp ] =  mArgs ? [ ...mArgs, '','','' ] : [ '','','',''  ]  
//                            [ aPlatform, aModel, aApp ] =  aApp      == ""  ? [ aPlatform, '', aModel    ] : [ aPlatform, aModel, aApp ]
//                            [ aPlatform, aModel, aApp ] =  aModel    == ""  ? [     '',    '', aPlatform ] : [ aPlatform, aModel, aApp ]
//                            [ aPlatform, aModel, aApp ] =  aPlatform == ""  ? [     '',    '',    ''     ] : [ aPlatform, aModel, aApp ]

//     if ( ! mArgs[2]) {     [ aPlatform, aModel, aApp ] = [ aPlatform, '', aModel    ] }
//     if ( ! mArgs[1]) {     [ aPlatform, aModel, aApp ] = [ '',        '', aPlatform ] }           
       if ( ! mArgs[2]) {     [ aPlatform, aModel, aApp ] = [ mArgs[0],  '', mArgs[1]  ] }
       if ( ! mArgs[1]) {     [ aPlatform, aModel, aApp ] = [ '',        '', mArgs[0]  ] }           
//     if ( ! aApp    ) {     [ aPlatform, aModel, aApp ] = [ aPlatform, '', aModel    ] }
//     if ( ! aModel  ) {     [ aPlatform, aModel, aApp ] = [ '',        '', aPlatform ] }           

          sayMsg( `ALT02[ 248]  await Keys.saveKey_inENV( aPlatform: '${aPlatform}', aModel: '${aModel}', aApp: '${aApp}' )`, global.nTest3 );  // .(50313.03.x) 
        if (global.nTest3 == 3) { return }                                                                 // .(50313.03.x RAM Return after cmd vars) 

      var [ mKeys, aPlatform ] =  await Keys.getKeys( aPlatform, aModel )
      var   aKey             =  mKeys[0]
                                sayMsg( `ALT02[ 242]  await Keys.putKey_inENV( '${aApp}', '${aKey}', bDoit: ${FRT.bDoit})`, -1 );             
            aKey             =  await Keys.putKey_inENV(    aApp, aKey )  
        if (aKey) {     
                                sayMsg( `ALT02[ 353]  Saved ${aPlatform} aKey: '${aKey}', for aApp, '${aApp}', in ENV file.`, -1 );             
                                usrMsg(            `  Saved ${aPlatform} Key: ${aKey}, for App, ${aApp}, in ENV file.` );             
         } else {
                                sayMsg( `ALT02[ 356]  Error: Saving ${aPlatform} aKey: '${aKey}', for aApp, '${aApp}', in ENV file failed.`, -1 );             
                                usrMsg(            `  Error: Saving ${aPlatform} Key: ${aKey}, for App, ${aApp}, in ENV file failed.` );             
            }
            }  // eof putKey                                                                                // .(50310.03.8 End) 
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #
/*========================================================================================================= #  ===============================  *\
#>      ALT02 getWorkspaces
\*===== =================================================================================================== */

     async  function  listWorkspaces(  mArgs ) {                                                            // .(50313.03.7 Write getKeys in .sh Beg) 
      var [ aApps ] =  mArgs ? [ ...mArgs,'','','' ] : [ '','','','' ]   
                                sayMsg( `ALT02[ 367]  await Workspaces.getWorkspaces('${aApps}')`, -1 );             
      var [ mWorkspaces ]    =  await Workspaces.getWorkspaces(   aApps  )  
                                sayMsg( `ALT02[ 369]  Received aWorkspaces: [ '${ mWorkspaces.join("', '") }' ]`, -1 );             
                                usrMsg(            `  Received Workspaces: ${ mWorkspaces.join("', '") }` );             
            };  // eof getWorkspaces                                                                        // .(50313.03.8 End) 
//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

/*========================================================================================================= #  ===============================  *\
#>      ALT02 putWorkspace_inENV
\*===== =================================================================================================== */

     async  function  saveWorkspace_inENV( mArgs ) {                                                        // .(50313.04.8 Write putKey in .sh Beg) 
      var [ aApp ] =  mArgs ? [ ...mArgs,'','','' ] : [ '','','','' ]    
      var [ mWorkspaces ]    =  await Workspaces.getWorkspaces(  aApp ), aWorkspace = mWorkspaces[0]
                                sayMsg( `ALT02[ 381]  await Workspaces.savWorkspace_inKey(  '${aWorkspace}', '${aWorkspace}', bDoit: ${FRT.bDoit})`, -1 );             
            aKey             =  await Workspaces.putWorkspace_inENV( aApp, aWorkspace )  
        if (aKey) {     
                                sayMsg( `ALT02[ 384]  Saved aWorkspace, '${aWorkspace}', for aApp, '${aApp}' in ENV file.`, -1 );             
                                usrMsg(            `  Saved Workspace, ${aWorkspace}, for App, ${aApp} in ENV file.` );             
         } else {
                                sayMsg( `ALT02[ 388]  Error: Saving aWorkspace, '${aWorkspace}', for aApp, '${aApp}', in ENV file failed.`, -1 );             
                                usrMsg(            `  Error: Saving Workspace, ${aWorkspace}, for App, ${aApp}, in ENV file failed.` );             
            }
            }  // eof putWorkspace_inENV                                                                    // .(50313.04.8 End) 
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
            } // eof fixArgs
//      --- ---------------  =  ------------------------------------------------------  

  function  QQ( a, b ) {
        if (a == "" || a == `""` || a == `''`) { return '' }
            a = String(a).replace( /'/, "\'" )
            a = String(a).replace( /,$/, "" )               // .(50209.02.1 RAM Remove trailing comma)
        if (b ? 1 : 0) {    
            a = a.replace( /"[, ]*"/, '_' )                 // replace 1st '", "' with _ Why?
            a = a.replace(  /[, ]+/,  '_' )                 // replace 1st ', '  with _ Why?
            }    
//     var  m = a.match( /"([^"]*)"/g );    
       var  m = a.match( /"([^"']*)"/g );                   //  added single quote
    return  m ? a.slice(1, -1) : a                          //  remove mArgs[0]: '"model" "New model"'     -> [ 'model' 'New model'     ]
//  return  m ? m.map( a => a.slice(1, -1)) : a;            //  remove mArgs[0]: '"model" "New model"'     -> [ 'model' 'New model'     ]
            } // eof QQ
//          ---------------  =  ---------------------------------------------

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

