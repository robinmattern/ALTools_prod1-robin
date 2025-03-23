   import   express         from 'express';
   import   path            from 'path';
   import { fileURLToPath } from 'url';

// import { getKeys       } from './s13_aidocs-anyllm-api/getKeys.mjs';
// import { getKeys       } from './getKeys.mjs';
   import { API           } from './APIs.js';

      var __filename     =  fileURLToPath( import.meta.url );       // Get __dirname equivalent in ES Modules
      var __dirname      =  path.dirname( __filename);
      var __basedir      =  __dirname.replace( /\/server1\/s13_aidocs-anyllm-api/, '' )

// -------  -----------  =  -------------------------------------------------------------  -------------------------

      var  CLIENT_PORT   =  8013; 
      var  SERVER_PORT   =  8113;
      var  bInVSCode     =  process.argv[2] == undefined

      var  aPort         = (bInVSCode) ?  SERVER_PORT : process.argv[2]
//    var  aPort         = (bInVSCode) ? 'both'       : process.argv[2]

// -------  -----------  =  -------------------------------------------------------------  

       var  pClientApp   =  express();                        // App endpoint for Static routes
       var  pClientDir   =  path.join( __basedir, 'client1', 'c13_aidocs-anyllm-app');
            pClientApp.use( express.static( pClientDir ) );   // Serve static files from client/c01-client-app folder 
            pClientApp.get('/',      ( req, res ) => { sendFile( req, res, 'index.html' ) } )  // Return static HTML file: index.html
            pClientApp.get('/page1', ( req, res ) => { sendFile( req, res, 'page1.html' ) } )  // Return static HTML file: page1.html

// -------  -----------  =  -------------------------------------------------------------  -------------------------

       var  pServerAPI   =  express();                        // API endpoint for Dynamic routes
            pServerAPI.get('/getKeys',                        sendKeys_asHTML ) 
            pServerAPI.get('/api/getKeys',                    sendKeys_asJSON ) 
            pServerAPI.get('/getKey',                         sendKey_asTEXT ) 
            pServerAPI.get('/api/getKey',                     sendKey_asJSON ) 
            pServerAPI.get('/api/getSettings',                sendSettings_asJSON ) 
            pServerAPI.get('/api/getModels/:provider/:model', sendModels_asJSON ) 
            pServerAPI.get('/api/getModels/:provider',        sendModels_asJSON ) 
            pServerAPI.get('/api/getWorkspaces',              sendWorkspaces_asJSON ) 
            pServerAPI.get('/getWorkspaces',                  sendWorkspaces_asHTML ) 

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

async  function  sendFile(  req, res, aFile ) {
                            res.sendFile( path.join( pClientDir, aFile ) );
            } // eof sendFile
// -------  -----------  =  -------------------------------------------------------------
 
async  function  sendWorkspaces_asJSON( req, res ) {       
       try {
       var  pResponse    =  await API.getWorkspaces();              // Calls the imported function: getWorkspaces
                            res.json( pResponse.Workspaces );
       var  aTEXT        =  fmtWorkspaces_asTEXT( pResponse.Workspaces )
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch workspaces as JSON' }); }
            console.log(    aTEXT );
            }  // eof sendWorspaces_asJSON
// -------  ------------  =  -----------------------------------------

async  function  sendWorkspaces_asHTML( req, res) {
       try {
       var  pResponse    =  await API.getWorkspaces();                 // Calls the imported function: getWorkspaces
       var  aHTML        =  fmtWorkspaces_asHTML( pResponse.Workspaces )
                            res.send( aHTML )
 //                         res.send( JSON.stringify( pKeys, '', 2 ) )
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch workspaces as HTML' }); }
            } // eof sendWorkspaces_asHTML 
// -------  ------------  =  -----------------------------------------

async  function  sendWorkspaces_asTEXT( req, res) {
       try {
       var  pResponse    =  await API.getWorkspaces();                       // Calls the imported function: getWorkspaces
       var  aText        =  fmtWorkspaces_asTEXT( pResponse.Workspaces )
                            res.send( aText )
 //                         res.send( JSON.stringify( pKeys, '', 2 ) )
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch workspaces as TEXT' }); }
            } // eof sendWorkspaces_asHTML 
// -------  ------------  =  -----------------------------------------

async  function  sendModels_asJSON( req, res) {   //  pServerAPI.get('/api/getModels',    sendModels_asJSON ) 
       try {
       var  aProviders   =  req.params.provider || ''; // Extract provider from path
       var  aModel       =  req.params.model || '';
       var  pResponse    =  await API.getModels( aProviders, aModel );            
   if (pResponse.Models) {  res.json( pResponse.Models ); }
          else {            res.status(200).json( [ ]  ); }
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch models as JSON' }); }
            } // eof sendKey_asJSON 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

async  function  sendSettings_asJSON( req, res) {
       try {
       var  pResponse    =  await API.getSettings();                       // Calls the imported function: getKeys
                            res.json( pResponse.Settings );
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch settings as JSON' }); }
            } // eof sendKey_asJSON 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

async  function  sendKey_asJSON( req, res) {
       try {
       var  pResponse    =  await API.getKey();                       // Call the imported function: getKeys
                            res.json( pResponse.Keys );
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch keys as JSON' }); }
            } // eof sendKey_asJSON 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

async  function  sendKey_asTEXT( req, res) {
       try {
       var  pResponse    =  await API.getKey();                       // Call the imported function: getKeys
                            res.send( pResponse.Keys[0].key )
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch key as TEXT' }); }
       }  // sendKey_asTEXT 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

async  function  sendKeys_asJSON( req, res) {
       try {
       var  pResponse    =  await API.getKeys();                       // Call the imported function: getKeys
                            res.json( pResponse.Keys );
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch keys as JSON' }); }
            } // eof sendKeys_asJSON 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

async  function  sendKeys_asHTML( req, res) {
       try {
       var  pResponse    =  await API.getKeys();                       // Call the imported function: getKeys
       var  aHTML        =  fmtKeys_asHTML( pResponse.Keys )
                            res.send( aHTML )
 //                         res.send( JSON.stringify( pKeys, '', 2 ) )
        } catch (error) {   res.status(500).json({ error: 'Failed to fetch keys as HTML' }); }
            } // eof sendKeys_asHTML 
// -------  -----------  =  -------------------------------------------------------------  -------------------------

  function  fmtKeys_asHTML( mKeys ) {
       var  mRows        =  mKeys.map( fmtKeyRow_asHTML )
       var  mRows        =[ fmtKeyHdg_asHTML( mKeys[0] ), ...mRows ]
       var  aTable       = `<table border="1px" cellspacing="0">\n${ mRows.join('\n' ) }\n</table>`
    return  aTable   
//          }  // eof fmtKeys_asHTML
// -------  -----------  =  -------------------------------------------------------------

  function  fmtKeyHdg_asHTML( pKey ) {
       var  aID          = `    ${ fmtFld( "ID:",          8 ) }\n`
       var  aPlatform    = `    ${ fmtFld( "Platform:",   45 ) }\n`
       var  aModel       = `    ${ fmtFld( "Model:",      30 ) }\n`
       var  aKey         = `    ${ fmtFld( "Key:",        15 ) }\n`
       var  aHeading     = `  <tr>\n${aID}${aPlatform}${aModel}${aKey}  </tr>`    
    return  aHeading
            }  // fmtKeyHdg_asHTML
// -------  -----------  =  -------------------------------------------------------------
function  fmtKeyRow_asHTML( pKey ) {
       var  aID          = `    ${ fmtFld( pKey.id,      -10 ) }\n`
       var  aPlatform    = `    ${ fmtFld( pKey.platform, 55 ) }\n`
       var  aModel       = `    ${ fmtFld( pKey.model,   125 ) }\n`
       var  aKey         = `    ${ fmtFld( pKey.key,     500 ) }\n`
       var  aRow         = `  <tr>\n${aID}${aPlatform}${aModel}${aKey}  </tr>`    
    return  aRow
            }  // fmtKeyRow_asHTML
// -------  ------------  =  -------------------------------------------------------------
function  fmtKeyRow1( pKey ) {
       var  aID          = `    ${ fmtFld( "ID:",          8 ) }${ fmtFld( pKey.id,      -10 ) }\n`
       var  aPlatform    = `    ${ fmtFld( "Platform:",   45 ) }${ fmtFld( pKey.platform, 55 ) }\n`
       var  aModel       = `    ${ fmtFld( "Model:",      30 ) }${ fmtFld( pKey.model,   125 ) }\n`
       var  aKey         = `    ${ fmtFld( "Key:",        15 ) }${ fmtFld( pKey.key,     200 ) }\n`
       var  aRow         = `  <tr>\n${aID}${aPlatform}${aModel}${aKey}  </tr>`    
    return  aRow
            }  // fmtKeyRow1_asHTML
// -------  ------------  =  -------------------------------------------------------------
         }; // eof fmtKeys_asHTML 
// -------  ------------  =  -------------------------------------------------------------  --------------------------

  function  fmtWorkspaces_asTEXT( mWorkspaces ) {
       var  mRows            =  mWorkspaces.map( fmtWorkspaceRow_asTEXT )
    return  mRows.join( "\n" )

  function  fmtWorkspaceRow_asTEXT( pRec ) {      
       var  aID               =      fmtNum(  pRec.id, 3 ) + '.'               
       var  aName             =               pRec.name.padEnd(    25 )       // 'Constitution'
       var  aCreatedAt        =      fmtDate( pRec.createdAt )        
       var  aUpdatedAt        =      fmtDate( pRec.lastUpdatedAt )    
       var  aAgentModel       =               pRec.agentModel        
       var  aAgentProvider    =               pRec.agentProvider     
       var  aChatMode         =               pRec.chatMode.padEnd( 5 )       // 'chat' or 'query'
       var  aChatModel        =               pRec.chatModel         
       var  aChatProvider     =               pRec.chatProvider      
       var  aOpenAiHistory    =               pRec.openAiHistory              // 20
       var  aOpenAiPrompt     =               pRec.openAiPrompt       
       var  aOpenAiTemp       =      fmtNum(  pRec.openAiTemp,      2 )       //           
       var  aPfpFilename      =               pRec.pfpFilename       
       var  aQueryRefusalResponse =           pRec.queryRefusalResponse 
       var  aSimilarityThreshold =   fmtNum(  pRec.similarityThreshold, 4 )   // 0.25
       var  aSlug             =               pRec.slug                       // 'constitution'
       var  aTopN             =      fmtNum(  pRec.topN, 2 )                  // 4
       var  aVectorSearchMode =               pRec.vectorSearchMode           // 'default'
       var  aVectorTag        =               pRec.vectorTag          
       var  aRow          = `${aID}  ${aCreatedAt}  ${aName}  ${aChatMode} ${aOpenAiTemp} ${aSimilarityThreshold} ${aTopN}` 
    return  aRow 
            }  // eof fmtWorkspaceRow_asTEXT
// -------  ------------  =  -----------------------------------------
         }; // eof fmtWorkspaces_asTEXT
// -------  ------------  =  -----------------------------------------

  function  fmtWorkspaces_asHTML( mWorkspaces ) {
       var  mRows        =  mWorkspaces.map( fmtWorkspaceRow_asHTML )
       var  mRows        =[ fmtWorkspaceHdg_asHTML( mWorkspaces[0] ), ...mRows ]
       var  aFont        = `style="font-family:arial;"`
       var  aTable       = `<table border="1px" cellspacing="0" ${aFont}>\n${ mRows.join('\n' ) }\n</table>`
    return  aTable   
//          }  // eof fmtWorkspaces_asHTML
// -------  -----------  =  -------------------------------------------------------------

  function  fmtWorkspaceHdg_asHTML( pRec ) {
       var  mFlds                 =  Object.entries( pRec ).map( mFld => mFld[0].toUpperCase() )
       var  aID                   = `    ${ fmtFld(  mFlds[0],                -25 ) }\n`
       var  aName                 = `    ${ fmtFld( "Name",                   250 ) }\n`                  
       var  aCreatedAt            = `    ${ fmtFld( "CreatedAt",             -135 ) }\n`       
       var  aUpdatedAt            = `    ${ fmtFld( "LastUpdatedAt",         -135 ) }\n`    
       var  aAgentModel           = `    ${ fmtFld( "AgentModel",              15 ) }\n`        
       var  aChatModel            = `    ${ fmtFld( "ChatModel",               15 ) }\n`         
       var  aAgentProvider        = `    ${ fmtFld( "AgentProvider",           12 ) }\n`      
       var  aChatProvider         = `    ${ fmtFld( "ChatProvider",            12 ) }\n`      
       var  aChatMode             = `    ${ fmtFld( "Mode",                    48 ) }\n`  
       var  aOpenAiHistory        = `    ${ fmtFld( "OpenAiHistory",          -50 ) }\n`  
       var  aOpenAiPrompt         = `    ${ fmtFld( "OpenAiPrompt",            50 ) }\n`  
       var  aOpenAiTemp           = `    ${ fmtFld( "Temp",                   -48 ) }\n`  
       var  aPfpFilename          = `    ${ fmtFld( "PfpFilename",             20 ) }\n`  
       var  aQueryRefusalResponse = `    ${ fmtFld( "QueryRefusalResponse",    25 ) }\n` 
       var  aSimilarityThreshold  = `    ${ fmtFld( "Sim.T.",                 -55 ) }\n`  
       var  aSlug                 = `    ${ fmtFld( "Slug",                   125 ) }\n`  
       var  aTopN                 = `    ${ fmtFld( "TopN",                   -50 ) }\n`  
       var  aVectorSearchMode     = `    ${ fmtFld( "VectorSearchMode",        10 ) }\n`  
       var  aVectorTag            = `    ${ fmtFld( "VectorTag",               10 ) }\n`          
       var  aHeading              = `  <tr>\n${aID}${aCreatedAt}${aName}${aChatMode}${aOpenAiTemp}${aSimilarityThreshold}${aTopN}  </tr>` 
    return  aHeading
            }   // fmtWorkspaceHdg_asHTML
// -------  -----------  =  -------------------------------------------------------------

  function  fmtWorkspaceRow_asHTML( pRec ) {
       var  mValues               = Object.entries( pRec ).map( mFld => mFld[1] )
       var  aID                   = `    ${ fmtNbr( mValues[0],               -25 ) + '.'  }\n`              
       var  aName                 = `    ${ fmtFld( pRec.name,                250 ) }\n`          // 'Constitution'
       var  aCreatedAt            = `    ${ fmtDte( pRec.createdAt,          -135 ) }\n`       
       var  aUpdatedAt            = `    ${ fmtDte( pRec.lastUpdatedAt,      -135 ) }\n`    
       var  aAgentModel           = `    ${ fmtFld( pRec.agentModel,           15 ) }\n`        
       var  aChatModel            = `    ${ fmtFld( pRec.chatModel,            15 ) }\n`         
       var  aAgentProvider        = `    ${ fmtFld( pRec.agentProvider,        12 ) }\n`      
       var  aChatProvider         = `    ${ fmtFld( pRec.chatProvider,         12 ) }\n`      
       var  aChatMode             = `    ${ fmtFld( pRec.chatMode,             48) }\n`          // 'chat' or 'query'
       var  aOpenAiHistory        = `    ${ fmtNbr( pRec.openAiHistory,       -50 ) }\n`          // 20
       var  aOpenAiPrompt         = `    ${ fmtFld( pRec.openAiPrompt,         50 ) }\n`      
       var  aOpenAiTemp           = `    ${ fmtNbr( pRec.openAiTemp,          -48 ) }\n`          //           
       var  aPfpFilename          = `    ${ fmtFld( pRec.pfpFilename,          20 ) }\n`      
       var  aQueryRefusalResponse = `    ${ fmtFld( pRec.queryRefusalResponse, 25 ) }\n`  
       var  aSimilarityThreshold  = `    ${ fmtNbr( pRec.similarityThreshold, -55 ) }\n`          // 0.25
       var  aSlug                 = `    ${ fmtFld( pRec.slug,                250 ) }\n`          // 'constitution'
       var  aTopN                 = `    ${ fmtNbr( pRec.topN,                -50 ) }\n`          // 4
       var  aVectorSearchMode     = `    ${ fmtFld( pRec.vectorSearchMode,     10 ) }\n`          // 'default'
       var  aVectorTag            = `    ${ fmtFld( pRec.vectorTag,            10 ) }\n`          
       var  aRow                  = `  <tr>\n${aID}${aCreatedAt}${aName}${aChatMode}${aOpenAiTemp}${aSimilarityThreshold}${aTopN}  </tr>` 
    return  aRow
            }   // fmtWorkspaceRow_asHTML
// -------  ------------  =  -------------------------------------------------------------
         }; // eof fmtWorkspaces_asHTML 
// -------  ------------  =  -------------------------------------------------------------

         function  fmtFld( aText,  nWdt ) {
                   aText        = (aText || '').trim()
                   aText        =  nWdt > 0 ? `&nbsp${aText}` : `${aText}&nbsp`
              var  aAlign       =  nWdt > 0 ? "left" : "right"; nWdt = Math.abs(nWdt)
              var  aFld         = `<td style="width:${nWdt}px; text-align:${aAlign};">${aText}</td>` 
           return  aFld
                   }
         function  fmtDte(  dDate, nWdt ) { return fmtFld( fmtDate( dDate), nWdt ) }
         function  fmtNbr(  nNum,  nWdt ) { return fmtFld( fmtNum( nNum, nWdt ), nWdt ) }
         function  fmtDate( dDate       ) { return API.getDate( dDate, 0, 5 ).replace(/(\d{4})(\d{2})(\d{2}).(\d{2})(\d{2})/, '$1-$2-$3 $4:$5'); }
         function  fmtNum(  nNum,  nWdt ) { return `${ `${nNum}`.padStart( Math.abs(nWdt) ) }` } 
            
// -------  ------------  =  -------------------------------------------------------------
       
