            process.chdir( '/Users/Shared/Repos/AnyLLM/server' )

      var { ApiKey } = require( '../../server/models/apiKeys' );
// import { ApiKey } from '../../server/models/apiKeys'

            process.on('unhandledRejection', (reason, promise) => {
              console.error('Unhandled Rejection at:', promise, 'reason:', reason);
              });

       var  API = { getKey, getKeys, getProviderModels, getModels, getSettings, getWorkspaces, getDate }

//          doTest( 'getKey' )
//          doTest( 'getKeys' )
//          doTest( 'getProviderModels' )
//          doTest( 'getModels0' )
//          doTest( 'getModels1' )
//          doTest( 'getModels2' )
//          doTest( 'getModels3' )
//          doTest( 'getModels4' )
//          doTest( 'getModels5' )
//          doTest( 'getSettings' )
//          doTest( 'getWorkspaces' )

async function doTest( aTest ) {
       if (aTest == 'getKey'            ) { console.log( ( await API.getKey( )                          ).Keys[0].key ) }
       if (aTest == 'getKeys'           ) { console.log( ( await API.getKeys( )                         ).Keys  )       }
       if (aTest == 'getProviderModels' ) { console.log( ( await API.getProviderModels( 'ollama' )      ).Models )      }
       if (aTest == 'getModels0'        ) { console.log( ( await API.getModels( )                       ).Models )      }
       if (aTest == 'getModels1'        ) { console.log( ( await API.getModels( 'anthropic' )           ).Models )      }
       if (aTest == 'getModels2'        ) { console.log( ( await API.getModels( 'ollama', 'qwen2' )     ).Models )      }
       if (aTest == 'getModels3'        ) { console.log( ( await API.getModels( 'ollama,anthropic' )    ).Models )      }
       if (aTest == 'getModels4'        ) { console.log( ( await API.getModels( 'openai' )              ).Models )      }
       if (aTest == 'getModels5'        ) { console.log( ( await API.getModels( 'ollama,openai', '3.' ) ).Models )      }
       if (aTest == 'getSettings'       ) { console.log( ( await API.getSettings( )                     ).Settings )    }
       if (aTest == 'getWorkspaces'     ) { console.log( ( await API.getWorkspaces( )                   ).Workspaces )  }
       debugger
       }
// -------------------------------------------------------------------------

     async  function  getProviderModels( aProvider ) {       // from AnythingLLM interenal "system" API
            aProvider        =  aProvider ? aProvider : 'ollama'
       var  aURL             = 'http://10.0.0.37:3001/api/system/custom-models'
//     var  aKey             = (await getKey( )).Keys[0].key

//     var  pController      =  new AbortController();       // Create an AbortController to generate a valid AbortSignal
//     var  pSignal          =  controller.signal;
//     var  pSignal          ={ aborted: false, onAbort: null, reason: undefined }  // no workie: incorrect "datatype"
   
//     var nTimeout          =  5000; // Adjust as needed    // Optional: Add a timeout (e.g., 5000ms) as needed for client-side interuptions, aborts, etc.  
//     if (nTimeout) {          setTimeout(() => { controller.abort("Request timed out."); }, nTimeout ); }

       var  pREQ             = 
             {  method       : "POST"
//           ,  headers      :{ 'accept': 'application/json', 'Authorization': `Bearer ${aKey}` } 
             ,  headers      :{'Authorization': null }  // obtained later from .env 
//           ,  signal       :  pSignal
             ,  body         :  JSON.stringify( { provider: aProvider, apiKey: null, basePath: null } ) 
                }
//  return  fetch( aURL, pREQ )
//  .then( (res) => {
     try {
       var  pResponse        =  await fetch( aURL, pREQ )
       if (!pResponse.ok) {
            throw new Error(    pResponse.statusText || "Error finding custom models.");
            }
       var  pData            =  await pResponse.json();

       var  mModels          =  pData.models
       var  mProviderModels  =  mModels.map( pModel => ( { Provider: aProvider, Model: pModel.id } ) )
   return { Models: mProviderModels }
        } catch (pError) { 
            console.error( 'Fetch error:', pError); }     
            throw pError; // Rethrow the error to propagate it to the caller    
//  return  res.json();
//          } )
         }; // eof  getProviderModels
// -------------------------------------------------------------------------

     async  function  getModels( aProviders, aModel ) {       // from AnythingLLM interenal "system" API
            aProviders       =  aProviders || ''
       if (!aProviders) { return [] }            
       var  mProviders       =  aProviders.split( ',' )
       var  mModels          = [ ] 

//          mProviders.forEach( async ( aProvider ) => {   // no workie 
   for (var aProvider of mProviders) {   // Use for...of to handle async/await sequentially
            try {
            var  mProviderModels =  await getProviderModels( aProvider );
                 mModels.push( ...mProviderModels.Models ); // Use spread to flatten if mProviderModels is an array
             } catch ( pError) {
                 console.error( `Error fetching models for provider ${aProvider}:`, pError );
                 throw pError; // Rethrow to propagate to the caller
               } }             
        if (aModel) {               
            mModels        =  mModels.filter( pModel => pModel.Model.includes( aModel ) )        
            }
   return { Models: mModels }
             }; // eof  getModels
//       ------------------------------------------------

// -------------------------------------------------------------------------

     async  function  getWorkspaces( aWorkspace ) {       // from AnythingLLM interenal "system" API
       var  aURL = 'http://10.0.0.37:3001/api/v1/workspaces'
       var  aKey = (await getKey( )).Keys[0].key
       var  pREQ =  
             {  method: 'GET'
             ,  headers: { 'accept': 'application/json', 'Authorization': `Bearer ${aKey}` } 
                }
     try {
       var  pResponse        =  await fetch( aURL, pREQ )
       if (!pResponse.ok) {
            throw new Error(    pResponse.statusText || "Error finding custom workspaces.");
            }
       var  pData            =  await pResponse.json();

       var  mWorkspaces      =  pData.workspaces
        if (aWorkspace) {    
       var  mWorkspaces      =  mWorkspaces.map( pWorkspace => { pWorkspace.name.includes( aWorkspace ) } ) 
            }
   return { Workspaces: mWorkspaces }
        } catch (pError) { 
            console.error( 'Fetch error:', pError); }         
         }; // eof  getWorkspaces
// -------------------------------------------------------------------------

  async  function  getSettings() {       // from AnythingLLM prisma table
 //  var  pKeys = await getKey( )
    var  aURL = 'http://10.0.0.37:3001/api/v1/system'
    var  aKey = (await getKey( )).Keys[0].key
    var  pREQ =  
          {  method: 'GET'
          ,  headers: { 'accept': 'application/json', 'Authorization': `Bearer ${aKey}` } }
    try {
    var  pResponse = await fetch( aURL , pREQ )
    if (!pResponse.ok) {
         throw new Error(`HTTP error! Status: ${ pResponse.status}`);
         }
    var  pData = await pResponse.json();
return { Settings: pData.settings } 
     } catch (pError) { console.error('Fetch error:', pError); }         
         }  // eof getSettings 
// -------------------------------------------------------------------------

  async  function  getKey() {       // from AnythingLLM prisma table
//       console.log( "  - AIC[  11]  getting Keys")
// var { apiKey, error } = await ApiKey.get();
// var   aSecretKey  = apiKey.secret 
    try {
    var  apiKey          =  await ApiKey.get();  // no error, just null if it fails 
    var  aSecretKey      =  apiKey ? apiKey.secret : '' 
         console.log( `  - AIC[  77]  got AnythingLLM Key: ${aSecretKey}`)
return { Keys: 
          [ { id: 1, platform: "anythingllm", model:'',                 key: aSecretKey }
              ]
         };
     } catch (pError) { 
         console.error('ApiKey error:', pError); }         
         }  // eof getKey
// -------------------------------------------------------------------------

  async  function  getKeys() {      // from here with newly created key inserted into AnythingLLM prisma table
         console.log( "  - AIC[  71]  getting Keys")

    try {
   var { apiKey, error } =  await ApiKey.create();
    var  aSecretKey      =  apiKey.secret 

         console.log( `  - AIC[  93]  got AnythingLLM Key: ${aSecretKey}`)
return { Keys: 
          [ { id: 1, platform: "anythingllm", model:'',                 key: aSecretKey }
          , { id: 2, platform: "ollama",      model: "llama3.1:latest", key: ''      }
          , { id: 3, platform: "ollama",      model: "Bruce's Custom1", key: ''      }
          , { id: 4, platform: "xai",         model: "grok3",           key: 'grok-key'   }
          , { id: 5, platform: "claude",      model: "sonnet3.5",       key: 'claude-key'   }
              ]
         };
     } catch (pError) { 
         console.error('ApiKey error:', pError); }         
         }  // eof getKeys 
// -------------------------------------------------------------------------
  function  getDate( nDate, nDateStart, nMinLength, nHrs ) {
       var  nHrs        =  nHrs ? ((nHrs == -1) ? new Date().getTimezoneOffset() / 60 : nHrs) : 0
       var  nOffset     = (nHrs * 60) * 60 * 1000
       var  bDate       = (typeof(nDate) == 'number') && nDate < 15
        if (bDate) {       nHrs = nMinLength; nMinLength = nDateStart; nDateStart = nDate; nDate = null}
        var bFmtDate    =  nDateStart == -1               // nMinLength:  -1)yyyy-mm-dd, 8)hh:mm:ss, 9)hh:mm:sss, 11)hh:mm:sssss
            nDateStart  =  typeof(nDateStart) != 'undefined' ? nDateStart : 3
            nMinLength  =  typeof(nMinLength) != 'undefined' ? nMinLength : ( bFmtDate ? 5 : 5 )
//          aDate       =  aDate ? new Date( isNaN(aDate) ? aDate : (+aDate)           ) : new Date( )
       var  dDate       =  nDate ? new Date( isNaN(nDate) ? nDate : (+nDate) - nOffset ) : new Date( )
//          aGTM_Date   =  dDate.toISOString().split( /[-:Z.]/).join( "" ).replace( /T/, "." )
       var  aDate       =  `${ `${dDate.getFullYear(     )}` }-`                      // `-`  or ``
                        +  `${ `${dDate.getMonth(   ) + 1 }`.padStart( 2, '0' )}-`   // `-`  or ``
                        +  `${ `${dDate.getDate(         )}`.padStart( 2, '0' )} `   // ` `  or `.`
                        +  `${ `${dDate.getHours(        )}`.padStart( 2, '0' )}:`   // `:`  or ``
                        +  `${ `${dDate.getMinutes(      )}`.padStart( 2, '0' )}.`   // `.`  or ``
                        +  `${ `${dDate.getSeconds(      )}`.padStart( 2, '0' )}`    //
                        +  `${ `${dDate.getMilliseconds( )}`.padStart( 3, '0' )}`    //
        if (bFmtDate) {
//  return `${aDate.substring(0,4)}-${aDate.substring(4,6)}-${aDate.substring(6,8)} ${aDate.substring(9,11)}:${aDate.substring(11,13)}.${aDate.substring(13)}`.substring(0, 11 + nMinLength)
    return  aDate.substring(0, 11 + nMinLength)
       } else {
    return  aDate.replace( /[-:.]/g, "").replace( / /, ".").substring( nDateStart, 8 + nMinLength )
       }    }  // eof getDate()
// --------------------------------------------------------------

// -------------------------------------------------------------------------

//  module.exports = { getKeys, getKey } 
//  module.exports = { Keys } 
    module.exports = { API } 

