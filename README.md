# Play with Letters & Numbers

## Application Objective

This application is designed for children, with the goal of promoting the learning of letters, numbers, and basic math operations through an interactive and fun experience. Kids can drag and drop letters and numbers to form words and solve math operations while receiving real-time audio and visual feedback.

The application contains two main sections:
- **Play with Letters**: In this section, children need to arrange the letters to form the names of animals.
- **Play with Numbers**: Here, they solve simple math problems by dragging the correct number.

## Technologies Used

In developing this application, various technologies and APIs were explored:

- **React.js**: Used to build a dynamic and reactive user interface.
- **Bootstrap**: For component design and layout structuring.
- **Buzz.js**: A library that allows easy sound management within the application. It is used to play different sound effects (such as success and error) based on user interaction.
- **SpeechSynthesis API (Web Speech API)**: Used to convert text to speech, allowing the app to pronounce letters and numbers.
- **Animate.css**: Adds appealing animations to the user interface elements to enhance the visual experience.

## Explored APIs

- **SpeechSynthesis API**: Allows text-to-speech conversion, providing a more immersive learning experience by reading aloud letters and numbers.
- **Drag and Drop API**: For user interaction through drag-and-drop functionality, enhancing engagement and hands-on learning.

## Navigation Description

### Play with Letters

- The user sees an image of an animal along with its name in the correct order and a scrambled list of the letters in the animal's name.
- They need to drag and drop the letters from the scrambled list to their correct position in the animal’s name.
- When a letter is selected, a sound plays that pronounces the letter (using the **SpeechSynthesis API**).
- If the letter is placed correctly, a success sound plays, and the letter disappears from the scrambled list.
- If the letter is incorrect, the app plays an error sound, and the letter returns to its original position.
- Once the animal’s name is completed, the game moves to the next animal, increasing in difficulty with each level.
- After all the animals are completed, the game resets from the beginning.

### Play with Numbers

- A math operation is shown with a plus or minus sign and a list of scrambled numbers.
- The child must drag the correct number to the place where the result of the operation should be.
- As in "Play with Letters," the **SpeechSynthesis API** is used to pronounce the numbers when selected, and success or error sounds are played based on whether the answer is correct or not.
- The difficulty increases as more operations are solved, and once completed, the game restarts.

## Target Audience

The application is primarily aimed at young children who are in the process of learning the alphabet, numbers, and basic math operations. With the integration of animations, sounds, and simple gameplay mechanics, children can learn in an interactive and entertaining way.


[Visit the PLay with letters and numbers Web App](https://play-with-numbers-and-letters.netlify.app/)
