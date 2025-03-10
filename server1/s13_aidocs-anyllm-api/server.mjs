   import   express         from 'express';
   import   path            from 'path';
   import { fileURLToPath } from 'url';

// import { getKeys       } from './s13_aidocs-anyllm-api/getKeys.mjs';
// import { getKeys       } from './getKeys.mjs';
   import { getKeys       } from './getKeys.js';

      var __filename     =  fileURLToPath( import.meta.url );       // Get __dirname equivalent in ES Modules
      var __dirname      =  path.dirname( __filename);
      var __basedir      =  __dirname.replace( /\/server1\/s13_aidocs-anyllm-api/, '' )

// -------  -----------  =  -------------------------------------------------------------  -------------------------

      var  CLIENT_PORT   =  8013; 
      var  SERVER_PORT   =  8113;
      var  bInVSCode     =  process.argv[2] == undefined

      var  aPort         = (bInVSCode) ?  SERVER_PORT : process.argv[2]
      var  aPort         = (bInVSCode) ? 'both'       : process.argv[2]

// -------  -----------  =  -------------------------------------------------------------  

       var  pClientApp   =  express();                        // App endpoint for Static routes
       var  pClientDir   =  path.join( __basedir, 'client1', 'c13_aidocs-anyllm-app');
            pClientApp.use( express.static( pClientDir ) );   // Serve static files from client/c01-client-app folder 
            pClientApp.get('/',      ( req, res ) => { sendFile( req, res, 'index,html' ) } )  // Return static HTML file: index.html
            pClientApp.get('/page1', ( req, res ) => { sendFile( req, res, 'page1,html' ) } )  // Return static HTML file: page1.html

// -------  -----------  =  -------------------------------------------------------------  -------------------------

       var  pServerAPI   =  express();                        // API endpoint for Dynamic routes
            pServerAPI.get('/getKeys',     sendKeys_asHTML ) 
            pServerAPI.get('/api/getKeys', sendKeys_asJSON ) 

// -------------------------------------------------------------------------------------
                             
       var  bStarted     =  0; console.log(  '' )
        if (CLIENT_PORT ==  aPort || aPort == 'both') { bStarted = 1
            pClientApp.listen( CLIENT_PORT, () => {
                            console.log(    `  Client App is running at http://localhost:${CLIENT_PORT}`);
                            } ); }
        if (SERVER_PORT ==  aPort || aPort == 'both') { bStarted = 1
            pServerAPI.listen( SERVER_PORT, () => {
                            console.log(    `  Server API is running at http://localhost:${SERVER_PORT}`);
                            } ); }
       if (!bStarted)  {    console.error(  `  No apps were started!` ) }; 
//      if (bInVSCode) {    debugger }; 

// -------  -----------  =  -------------------------------------------------------------  -------------------------

     async  function  sendFile( req, res, aFile ) {
                            res.sendFile( path.join( pClientDir, aFile ) );
            } // eof sendFile
// -------  -----------  =  -------------------------------------------------------------
 
     async  function  sendKeys_asJSON( req, res) {
       try {
       var  mKeys        =  await getKeys();                       // Call the imported function: getKeys
                            res.json( pKeys );
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch keys' }); }
            } // eof sendKeys 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

     async  function  sendKeys_asHTML( req, res) {
       try {
       var  mKeys        =  await getKeys();                       // Call the imported function: getKeys
       var  aHTML        =  fmtKeys( mKeys.keys )
                            res.send( aHTML )
 //                         res.send( JSON.stringify( pKeys, '', 2 ) )
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch keys' }); }
            } // eof sendKeys 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

  function  fmtKeys( mKeys ) {
       var  mRows        =  mKeys.map( fmtRow )
       var  mRows        =[ fmtHdg( mKeys[0] ), ...mRows ]
       var  aTable       = `<table border="1px" cellspacing="0">\n${ mRows.join('\n' ) }\n</table>`
    return  aTable   
            }
// -------  -----------  =  -------------------------------------------------------------
  function  fmtHdg( pKey ) {
       var  aID          = `    ${ fmtFld( "ID:",          8 ) }\n`
       var  aPlatform    = `    ${ fmtFld( "Platform:",   45 ) }\n`
       var  aModel       = `    ${ fmtFld( "Model:",      30 ) }\n`
       var  aKey         = `    ${ fmtFld( "Key:",        15 ) }\n`
       var  aHeading     = `  <tr>\n${aID}${aPlatform}${aModel}${aKey}  </tr>`    
    return  aHeading
            } 
// -------  -----------  =  -------------------------------------------------------------
function  fmtRow( pKey ) {
       var  aID          = `    ${ fmtFld( pKey.id,      -10 ) }\n`
       var  aPlatform    = `    ${ fmtFld( pKey.platform, 55 ) }\n`
       var  aModel       = `    ${ fmtFld( pKey.model,   125 ) }\n`
       var  aKey         = `    ${ fmtFld( pKey.key,     500 ) }\n`
       var  aRow         = `  <tr>\n${aID}${aPlatform}${aModel}${aKey}  </tr>`    
     return aRow
            } 
// -------  ------------  =  -------------------------------------------------------------
function  fmtRow1( pKey ) {
       var  aID          = `    ${ fmtFld( "ID:",          8 ) }${ fmtFld( pKey.id,      -10 ) }\n`
       var  aPlatform    = `    ${ fmtFld( "Platform:",   45 ) }${ fmtFld( pKey.platform, 55 ) }\n`
       var  aModel       = `    ${ fmtFld( "Model:",      30 ) }${ fmtFld( pKey.model,   125 ) }\n`
       var  aKey         = `    ${ fmtFld( "Key:",        15 ) }${ fmtFld( pKey.key,     200 ) }\n`
       var  aRow         = `  <tr>\n${aID}${aPlatform}${aModel}${aKey}  </tr>`    
     return aRow
            } 
// -------  ------------  =  -------------------------------------------------------------
  function  fmtFld( aText, nWdt ) {
       var  aAlign       =  nWdt > 0 ? "left" : "right"; nWdt = Math.abs(nWdt)
       var  aFld         = `<td style="width:${nWdt}px; text-align:${aAlign};">${aText}</td>` 
    return  aFld
            }
// -------  ------------  =  -------------------------------------------------------------
//       { id: 5, platform: "claude",      model: "sonnet3.5",       key: 'sdf' }    }            
// -------  ------------  =  -------------------------------------------------------------  --------------------------
