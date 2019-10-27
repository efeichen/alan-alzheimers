# alan-alzheimers

## Inspiration
Our goal was to create a project that not only followed the tracks but also drew upon our own **personal experiences**. In brainstorming, we realized that three of our team members had a grandparent with Alzheimer's disease. In discussing this, our team decided upon a product geared towards those with Alzheimer's, a voice assistant made specifically for individuals in mild to moderate stages. When using popular voice assistants, such as Amazon Alexa and Google Home, to set reminders or add to a calendar, users with Alzheimer's have to **_adapt their needs_ to the general functions provided**. However, with Alan AI, our desire was to **directly _adapt our functions_ to their needs**. We wanted to have a development process that revolved around the effects of Alzheimer's on the user. Our objective was to **maximize simplicity** to **minimize user effort**.

## What it does
Much of the functionality is yet to be perfected. At the moment, we have what is essentially a web application that receives user input, through audio or text, and sets a reminder with the necessary parameters. It audibly reads back the set reminder for confirmation.

## How we built it
For the back-end, we utilized various AWS products. We used Amazon Transcribe to listen to voice input and create text, Amazon Lex to read the text and respond in the appropriate manner, and Amazon Lamda to save the reminder parameters into an Amazon DynamoDB database.
For the front-end, we utilized React JS to create the framework necessary to process/access the user voice input. Additionally, we used HTML5 and CSS3 to develop a visually appealing website.

## Challenges we ran into
The first challenge that we ran into was our shared inexperience with AWS. For the whole team, it was the first time using AWS products. A fair amount of time was devoted just to developing a foundational understanding of the above AWS products. Additionally, our implementation of Amazon Transcribe through React JS was causing the user voice input-to-text function to produce inconsistent results. 

## Accomplishments that we're proud of
Overall, we are incredibly proud of the familiarity with AWS gained throughout this project. In addition to this, we are happy that each member was able specialize and learn in depth about a specific, technical aspect of the project.

## What we learned
We learned how to use a host of AWS products including Amazon Transcribe, Lambda, Lex, DynamoDB, S3, and Translate. Furthermore, we developed a deeper understanding of React JS and its implementation of outside API. 

## What's next for Alan AI
We are looking to expand the functionality of our project. In the time allotted, we were unable to implement all the functions that we intended to. We are excited to take our newfound knowledge to the next level and further grow Alan AI!
