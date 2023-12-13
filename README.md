# jsd-final-project
Link to the live app:  https://natashadwyer.github.io/jsd-final-project/

**Concept:** 
This interface is for people living with MND and those who are paralysed and use AAC speech (augmented and alternative communication). Gaming is big within this community. However, gamers need advice from other gamers about the possibility of games, reviews from other users fill this need. 

Connected to a project "Game on with MND" - with Ben O'mara, Kirsten Harley, Matt Harrison.

> Using the Web Speech Api  https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

The api grabs what the user is saying and turns the data into a string. This string is sent to the database, instead of the user entering text into a form. 

**Justification**
Why games?

Social connection / Distraction 

So far… 
Community reviews the most helpful, not academic research, word-of-mouth and ‘lived experience’ is key …. Diablo IV supposed to be good… but? 
Technology access needs to change as the disease progresses
Strength-based approach (not a deficit model) works best 
Often up to the carer 
Turn-taking games work better - ‘But what if I want to play Galaga/Space Invaders?’

Our outcomes: 

Better access to games (lobby developers, policy makers) 
Co-opt technology people are already using (phones and tablets are big, neuronode is top of the range, aac speech is popular), can keep playing as their disease progresses   - We need to cater to all budgets and access levels…


** Technical hurdles **
>> Delaying the search functions so it waited for the speech recognition to deliver - async functions do the trick 
>> The intricacies of the api, how it returns the user input - words vs. numbers. Multi-syllable work best. Lots of console logging does the trick.  

** Future plans:**
	Observing users / using AAC tech myself to fine-tune the interface 
	Including different languages, adding the Google translation function
	Lobbying the open.critic api to include an accessibility field  - caniplaythat.com is the gold standard - but no api
