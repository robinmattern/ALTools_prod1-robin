
    async function getKeys() {
        try {
          const response = await fetch('http://localhost:8113/api/getKeys');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const keys = await response.json();
          console.log('Keys received:', keys);
          return keys 
        } catch (error) {
          console.error('Error fetching keys:', error.message);
        }
      }

// -----------------------------------------------------------------------------------------

  var  pALT     = { getKeys: getKeys }
//     module.exports = { ALT: pALT  } 
       export  default         pALT 

