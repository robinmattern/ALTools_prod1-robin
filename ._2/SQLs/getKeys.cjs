// getApiKeys.js (in /Users/Shared/Repos/AnyLLM/server)


      var { PrismaClient } =  require( '/Users/Shared/Repos/AnyLLM/server/node_modules/@prisma/client');
// import   AIF                   from '../AICs/AIC90_FileFns_u1.03.mjs'
//     var  AIF            =  require( '../AICs/AIC90_FileFns_u1.03.mjs' )
//    var { default: AIF } =  await import( '/Users/Shared/Repos/AnyLLM/._2/AICs/AIC90_FileFns_u1.03.mjs' );  // no workie

//     var  prisma         =       new  PrismaClient( { datasourceUrl: 'file:./server/storage/anythingllm.db' } )
       var  Prisma         =       new  PrismaClient( { datasourceUrl: 'file:/Users/Shared/Repos/AnyLLM/server/storage/anythingllm.db' } );

// -------  ------------  =  ---------------------------------------------------------------

     async  function  showTables() {
       var  mTables        =  await  Prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`;
            console.log( 'Available tables:\n', mTables.map( pTable => pTable.name ).join("\n"), '\n');
            }
// -------  ------------  =  ---------------------------------------------------------------
            
     async  function  main( ) {
      var { default: AIF } =  await  import( '/Users/Shared/Repos/AnyLLM/._2/AICs/AIC90_FileFns_u1.03.mjs' );

//                            await showKeys( 8 )
                              await showWorkspaces( )

// -------  ------------  =  -----------------------------------------

     async  function  showKeys( nHrs ) {       
       var  dTime          =  new    Date( Date.now() - ((60 * nHrs) * 60 * 1000) ); // 8 hours ago 
       var  mKeys          =  await  Prisma.api_keys.findMany();    // not apiKey
            mKeys          =  mKeys.filter( pRec => pRec.createdAt >= dTime )
            console.log(      mKeys.map( fmtKeyRec ).join( "\n" ));
            }  // eof shoKeys 
// -------  ------------  =  -----------------------------------------

  function  fmtKeyRec( pRec ) {
       var  fmtDate       =  ( d ) =>  AIF.getDate( d, 0, 5 ).replace(/(\d{4})(\d{2})(\d{2}).(\d{2})(\d{2})/, '$1-$2-$3 $4:$5');
       var  aKey          =  pRec.secret            // not apiKey 
       var  aCreatedAt    =  fmtDate( pRec.createdAt )  
       var  aUpdatedAt    =  fmtDate( pRec.lastUpdatedAt )  
       var  aID           = `${ `${pRec.id}`.padStart(3) }.`
       var  aRec          = `${aID}  ${aCreatedAt}  ${aUpdatedAt}  ${aKey}` 
    return  aRec 
            }  // eof fmtKeyRec 
// -------  ------------  =  -----------------------------------------

     async  function  showWorkspaces( ) {       
       var  mWorkspaces   =  await  Prisma.workspaces.findMany();    // not apiKey
            console.log(     mWorkspaces.map( fmtWorkspace ).join( "\n" ));
            }  // eof shoKeys 
// -------  ------------  =  -----------------------------------------

  function  fmtWorkspace( pRec ) {
       var  fmtDate       =  ( d ) =>  AIF.getDate( d, 0, 5 ).replace(/(\d{4})(\d{2})(\d{2}).(\d{2})(\d{2})/, '$1-$2-$3 $4:$5');
       var  fmtNum        =  ( n,w ) => `${ `${n}`.padStart(w) }`  
       var  aAgentModel       =               pRec.agentModel        
       var  aAgentProvider    =               pRec.agentProvider     
       var  aChatMode         =               pRec.chatMode.padEnd( 5 )       // 'chat' or 'query'
       var  aChatModel        =               pRec.chatModel         
       var  aChatProvider     =               pRec.chatProvider      
       var  aID               =      fmtNum(  pRec.id, 3 ) + '.'               
       var  aCreatedAt        =      fmtDate( pRec.createdAt )        
       var  aUpdatedAt        =      fmtDate( pRec.lastUpdatedAt )    
       var  aName             =               pRec.name.padEnd( 25 )                   // 'Constitution'
       var  aOpenAiHistory    =               pRec.openAiHistory              // 20
       var  aOpenAiPrompt     =               pRec.openAiPrompt       
       var  aOpenAiTemp       =      fmtNum(  pRec.openAiTemp, 2 )            //           
       var  aPfpFilename      =               pRec.pfpFilename       
       var  aQueryRefusalResponse =           pRec.queryRefusalResponse 
       var  aSimilarityThreshold =   fmtNum(  pRec.similarityThreshold, 4 )   // 0.25
       var  aSlug             =               pRec.slug                       // 'constitution'
       var  aTopN             =      fmtNum(  pRec.topN, 2 )                  // 4
       var  aVectorSearchMode =               pRec.vectorSearchMode           // 'default'
       var  aVectorTag        =               pRec.vectorTag          
       var  aRec          = `${aID}  ${aCreatedAt}  ${aName}  ${aChatMode} ${aOpenAiTemp} ${aSimilarityThreshold} ${aTopN}` 
    return  aRec 
            }  // eof fmtKeyRec 
// -------  ------------  =  -----------------------------------------

         }; // eof main 
// -------  ------------  =  ---------------------------------------------------------------

//    showTables() 

       main()
         .catch(   e        => {
            console.error(e) } )
         .finally( async () => { await Prisma.$disconnect() } );

// -------  ------------  =  -----------------------------------------
  
