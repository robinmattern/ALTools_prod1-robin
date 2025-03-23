
   var { ApiKey } = require( '../../server/models/apiKeys' );
// import { ApiKey } from '../../server/models/apiKeys'

  async  function  getKeys() {

//       console.log( "  - AIC[   3]  getting Keys")

   var { apiKey, error } = await ApiKey.create();
   var   aSecretKey  = apiKey.secret 

         console.log( `  - AIC[   4]  got AnythingLLM Key: ${aSecretKey}`)

    return {
      keys: [
        { id: 1, platform: "anythingllm", model:'',                 key: aSecretKey },
        { id: 2, platform: "ollama",      model: "llama3.1:latest", key: ''      },
        { id: 3, platform: "ollama",      model: "Bruce's Custom1", key: ''      },
        { id: 4, platform: "xai",         model: "grok3",           key: 'grok-key'   },
        { id: 5, platform: "claude",      model: "sonnet3.5",       key: 'claude-key'   }
      ],
    };
  }

  module.exports = { getKeys } 


