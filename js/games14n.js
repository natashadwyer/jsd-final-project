// let menuCounter = 0;


// outdated DOM elements - keep for the moment... 
// const searchForm = document.querySelector("#searchForm");
// const submitButton = document.querySelector("#submit-button");
// const searchText = document.querySelector("#searchText");
const scan = document.querySelector( '#scan' );

const resultsDiv = document.querySelector("#results");
const results1Div = document.querySelector("#results1");
// const results2Div = document.querySelector("#results2");
const detailsDiv = document.querySelector("#details");
const details1Div = document.querySelector("#details1");

const returnDiv = document.querySelector("#return");
let totalstringl = 0;


function shufflePage() { 

    const scrollPosition = window.scrollY;
    console.log(scrollPosition);
    
   const currentScrollPosition = window.scrollY;

    // Scroll to the current position plus 100 pixels
    window.scrollTo({
        top: currentScrollPosition + 200,
        behavior: 'smooth' // Optional: Use smooth scrolling animation
    
    });
        
    console.log(`moved!`);
    // shufflePage();
    setTimeout(moveFunction, 3000);
    };

function renderResultsPage() {
    // Show
    resultsDiv.className = "show"
    // hidden
    detailsDiv.className = "hidden"
  }

  function detailsResultsPage() {
    // hide
    resultsDiv.className = "hidden"
    results1Div.className = "hidden"
    // results2Div.className = "hidden"
    // show
    detailsDiv.className = "show"
  }



async function welcomeFunction(){
    renderResultsPage();
    results1Div.innerHTML += `
    <p>
      <div class="results">
        <h3> <font color=green> Say the name of the game you are interested in...</font></h3>
     </p>
      </div>
    `
	try {
		const recognizedText = await startSpeechRecognition();
		await loadSearchResults(recognizedText);
	} catch (error) {
		console.error("Speech recognition error: " + error);
	}
}



async function moveFunction(){
    console.log(`moveFunction`);
	try {
		const recognizedText = await startSpeechRecognition();
		// await loadSearchResults(recognizedText);
        if (recognizedText == "scroll down") {
            console.log("move recognized");
            // await loadSearchResults(recognizedText);
             shufflePage();
        } else {
            console.log("move not recognized");
            // await loadSearchResults(recognizedText);
            // shufflePage();
        }
	} catch (error) {
		console.error("Speech recognition error: " + error);
	}
}
// Function to start speech recognition and return a promise
function startSpeechRecognition() {
	return new Promise((resolve, reject) => {
		if (!("webkitSpeechRecognition" in window)) {
			reject("Speech recognition not supported");
			return;
		}

		let recognition = new webkitSpeechRecognition();
		recognition.continuous = false; // We want a single result
		recognition.lang = "en-US";
		recognition.maxAlternatives = 1;

		recognition.onresult = function (event) {
			let last = event.results.length - 1;
			let transcript = event.results[last][0].transcript;
			// console.log("Speech recognized: " + transcript);
			resolve(transcript.trim());
		};

		recognition.onerror = function (event) {
			reject("Speech recognition error: " + event.error);
		};

		recognition.start();
	});
}



async function loadSearchResults(searched){
console.log(`searched...${searched}`);
    try {
        const response = await axios.get('https://opencritic-api.p.rapidapi.com/game/search', {
        params: { 
          criteria: `${searched}`
        },
        headers: {
          'X-RapidAPI-Key': '2751474908mshd037e3df8ab4effp12b747jsn10c701b85e70',
          'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
      });
 
      console.log(response.data);
    for (game of response.data) {
        // menuCounter++;
        // console.log(game.images);
        // console.log(game[7].images);
        // console.log(game.images.banner);
        // console.log(game[7].images.banner);
        results1Div.innerHTML = `<p>
        <div class="details">
          <h3>Now say the number i.d of the game to receive reviews, say it digit-by-digit... </h3>
       </p>
        </div>`

        resultsDiv.innerHTML += `
          <div class="results">
            <h3 data-id="${game.id}" > <FONT COLOR="red"> ${game.id}.</FONT> ${game.name}</h3>
          </div>
        `
        ;
      } 

    } catch (error) {
      console.error(error);
      resultsDiv.innerHTML += `
      <p>
        <div class="results">
          <h3> Sorry there has been a problem wth the connection</h3>
       </p>
        </div>
      `
    }
  menuPick();
  } 


  async function menuPick(){
 
    try {
    
        const recognizedText2 = await startSpeechRecognition();
        await menuMoresearch(recognizedText2);
    
        } catch (error) {
          console.error(error);
          detailsDiv.innerHTML += `
          <p>
            <div class="details">
              <h3>Sorry, there has been an error in the connection to the speech recognition service </h3>
              .................
           </p>
            </div>
           
          `
        }
    
    }

    async function menuMoresearch(searched) {
        try {
        //   const recognizedText = await startSpeechRecognition();
        //   await menu(recognizedText);
        //   pickchoice = recognizedText;
      searchNumber = parseInt(searched);
      console.log(searchNumber);

          const response2 = await axios.get('https://opencritic-api.p.rapidapi.com/reviews/game/'+searchNumber+'', 
           {
            params: {
              criteria: `${searchNumber}`
            },
            headers: {
              'X-RapidAPI-Key': '803f289465mshf853f8ef16b041cp167335jsn4892b7d31870',
              'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
            }
          });
          details1Div.innerHTML = `<p>
          <div class="details"> <font color="purple">
            <h3>Say "scroll down" to move down the page, if you need to.</font> </h3>
         </p>
          </div>`
          response2.data[0]
       snippetstring = response2.data[0].snippet;
          for (review of response2.data) {
           detailsDiv.innerHTML += `
            <p>
              <div class="details">
              <font color=purple>
                <h3 data-id="${game.id}" > ${review.snippet}</h3>
                .................</font>
             </p>
              </div>
             
            `
            totalstringl += snippetstring.length;
            console.log(totalstringl);
          } // each movie
     
        } catch (error) {
          console.error(error);
          detailsDiv.innerHTML += `
          <p>
            <div class="details">
              <h3>Sorry, there has been an error in the connection to the website service </h3>
              .................
           </p>
            </div>
           
          `
        }
    detailsResultsPage();
    moveFunction();

      }
      

    //   function scrollToTop() {
    //     $(window).scrollTop(0);
    // }
   welcomeFunction();