// import { useEffect, useState } from 'react';
// import './App.css';
// import './index.css';

// function App() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState("");

//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   useEffect(() => {
//     fetch("/questions.json")
//     .then(response => response.json())
//     .then((data) => {
//       const shuffledQuestions = shuffleArray(data);
//       setQuestions(shuffledQuestions);
//       const selectedQuestion = shuffledQuestions[(Math.floor(Math.random() * shuffledQuestions.length))];
//       setCurrentQuestion(selectedQuestion);
//     })
//     .catch((error) => console.error('Error fetching the questions', error));
//   }, []);

//   const getRandomQuestion = () => {
//     if(questions.length > 0)
//       setCurrentQuestion(questions[(Math.floor(Math.random() * questions.length))]);
//   }
//   return (
//     <div className="flex flex-col items-center justify-around bg-slate-200 min-h-screen py-24">
//       <p className=''>GAUCHE OU DROITE</p>
//       <p className='pb-16'>{currentQuestion.question}</p>

//       <div className='flex items-center justify-between w-[750px]'>

//         <button className='bg-red-800 w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 shadow-inner border-white border-4'
//         onClick={getRandomQuestion}
//         >
//           <p className='text-white'>GAUCHE</p>
//         </button>
//         <button className='bg-blue-950 w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 shadow-inner border-white border-4'
//         onClick={getRandomQuestion}
//         >
//           <p className='text-white'>DROITE</p>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import JSConfetti from 'js-confetti';


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetch("/questions.json")
      .then(response => response.json())
      .then((data) => {
        const shuffledQuestions = shuffleArray(data);
        setQuestions(shuffledQuestions);
        setCurrentQuestion(shuffledQuestions[Math.floor(Math.random() * shuffledQuestions.length)]);
      })
      .catch((error) => console.error('Error fetching the questions', error));
  }, []);

  const getRandomQuestion = (confColors) => {
    jsConfetti.addConfetti({
      // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌈','🌈', '🌈'],
      // confettiNumber: 100,
      // confettiColors: [
      //   '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
      // ],
      confettiColors: confColors,
    }).then(() => {
      if (questions.length > 0) {
        const newQuestion = questions[Math.floor(Math.random() * questions.length)];
        setCurrentQuestion(newQuestion);
      }
  })

  };

  // const redButton = document.getElementById('red-button');
  // const blueButton = document.getElementById('blue-button');
  const canva = document.querySelector('#confetti-canva');
  const jsConfetti = new JSConfetti()




  return (
    <div>
      <canvas id="confetti-canva" className='h-0 w-0'>
      </canvas>
      <div className="split-background h-screen w-screen flex relative">
        {/* Left Side */}
        <div className="w-1/2 bg-red-800 flex items-center justify-center">
          <button
            id="red-button"
            className='bg-slate-100 w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 shadow-2xl bg-gradient-to-l from-gray-50 to-gray-400'
            onClick={() => getRandomQuestion([
              '#800016', '#a0001c', '#c00021', '#ff002b', '#ffffff',
            ])}
          >
            <p className='text-red-800 font-bold'>GAUCHE</p>
          </button>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-blue-950 flex items-center justify-center">
          <button
            id="blue-button"
            className='w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 shadow-2xl bg-gradient-to-r from-gray-50 to-gray-400'
            onClick={() => getRandomQuestion([
              '#00043a', '#002962', '#004e89', '#407ba7', '#ffffff',
            ])}
          >
            <p className='text-blue-950 font-bold'>DROITE</p>
          </button>
        </div>

        {/* Centered Question Overlay */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-36">
          <p className='text-white text-4xl font-bold border rounded-full py-4 px-6 header-glass'>{currentQuestion.question}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
