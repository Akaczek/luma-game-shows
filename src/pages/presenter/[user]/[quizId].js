import LoadingPage from '@/components/presenter/LoadingPage';
import PresenterQuestion from '@/components/presenter/PresenterQuestion';
import WaitingForUsers from '@/components/presenter/WaitingForUsers';
import ResultsOfOpenQuestions from '@/components/presenter/resultsOfOpenQuestions';
import ResultsPresenterPage from '@/components/presenter/ResultsPresenterPage';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import sharedStyles from '../../../styles/presenter/sharedPresenterStyles.module.css';

const gameState = {
  BEFORE_CONNECT: 'BEFORE_CONNECT',
  CONNECTED: 'CONNECTED',
  GAME_STARTED: 'GAME_STARTED',
  NEXT_QUESTION: 'NEXT_QUESTION',
  SHOW_RESULTS: 'SHOW_RESULTS',
  GAME_FINISHED: 'GAME_FINISHED',
};

const RunQuiz = () => {
  const router = useRouter();
  const { quizId, user } = router.query;
  const [userSocket, setUserSocket] = useState(null);
  const [room, setRoom] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentState, setCurrentState] = useState(gameState.BEFORE_CONNECT);
  const [realAnswer, setRealAnswer] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [gameCode, setGameCode] = useState(null);
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);

  const connectToSocket = () => {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      setUserSocket(socket);
      socket.emit('join', { type: 'presenter', userName: user });
      setCurrentState(gameState.CONNECTED);
    });

    socket.on('user_disconnected', (room) => {
      setRoom(room);
    });

    socket.on('user_connected', (room) => {
      setRoom(room);
    });

    socket.on('game_code', (gameCode) => {
      setGameCode(gameCode);
    });

    socket.on('game_started', () => {
      setCurrentState(gameState.NEXT_QUESTION);
    });

    socket.on('next_question', (question) => {
      setCurrentState(gameState.NEXT_QUESTION);
      setCurrentQuestion(question);
      setNumberOfAnswers(0);
    });

    socket.on('new_answer', (numberOfAnswers) => {
      setNumberOfAnswers(numberOfAnswers);
    });

    socket.on('close_answers_checked', (gotRealAnswer) => {
      setRealAnswer(gotRealAnswer);
      setCurrentState(gameState.SHOW_RESULTS);
    });

    socket.on('open_answers_checked_presenter', (roomState) => {
      console.log('open_answers_checked_presenter', roomState);
      setRoom(roomState);
      setCurrentState(gameState.SHOW_RESULTS);
    });

    // todo - na koniec pytania i otrzymanie odpowiedxi prawidlowek, przejsc do PreasenterQuestion z tymi rzeczami,
    //state na game results
    // ifAnswerPage={ifAnswerPage}
    // correctAnswer={correctAnswer}
    // nextQuestion={nextQuestion} -> klikniecie nastepne pytanie, wyslac serwerowi ze nast pytanie

    socket.on('game_finished', (gameRanking) => {
      socket.disconnect();
      setCurrentState(gameState.GAME_FINISHED);
      setCurrentQuestion(null);
      setRanking(gameRanking);
      //TODO: redirect to results page
    });
  };

  const handleExit = () => {
    userSocket.disconnect();
    setUserSocket(null);
    router.replace('/');
  };

  const handleRunQuiz = () => {
    userSocket.emit('start_game', quizId);
  };

  const handleSendOpenAnswers = (sockets) => {
    userSocket.emit('check_open_answers', sockets);
    userSocket.emit('go_next_question');
  };

  const handleGoNextQuestion = () => {
    console.log('go_next_question');
    userSocket.emit('go_next_question');
  };

  const handleFinishGame = () => {
    router.replace(`/presenter/${user}/quizes`);
  };

  const handleTimesUp = () => {
    userSocket.emit('times_up');
    setNumberOfAnswers(0);
  };

  const componentToRender = () => {
    switch (currentState) {
      case gameState.BEFORE_CONNECT:
        return (
          <>
            <h1>Czy chcesz uruchomić ten quiz?</h1>
            <div className={sharedStyles.buttonsContainer}>
              <button
                className={sharedStyles.buttonStylesRed}
                onClick={() => {
                  router.replace(`/presenter/${user}/quizes`);
                }}
              >
                Powrót
              </button>
              <button
                className={sharedStyles.buttonStylesGreen}
                onClick={connectToSocket}
              >
                Uruchom
              </button>
            </div>
          </>
        );

      case gameState.CONNECTED:
        return (
          <WaitingForUsers
            users={room.players ?? []}
            handleRunQuiz={handleRunQuiz}
            handleExit={handleExit}
            gameCode={gameCode}
          />
        );

      case gameState.NEXT_QUESTION:
        if (currentQuestion) {
          return (
            <PresenterQuestion
              questionObject={currentQuestion}
              // ifAnswerPage={ifAnswerPage}
              // correctAnswer={correctAnswer}
              handleNextQuestion={() => {}}
              handleTimesUp={handleTimesUp}
              numberOfAnswers={numberOfAnswers}
            />
          );
        } else {
          return <LoadingPage />;
        }

      case gameState.SHOW_RESULTS:
        if (currentQuestion.collectionName === 'quiz_question') {
          return (
            <PresenterQuestion
              questionObject={currentQuestion}
              ifAnswerPage={true}
              correctAnswer={realAnswer}
              handleNextQuestion={handleGoNextQuestion}
            /> 
          );
        } else {
          return (
            <ResultsOfOpenQuestions
              players={room.players}
              handleSendAnswers={handleSendOpenAnswers}
            />
          );
        }

      case gameState.GAME_FINISHED:
        return (
          <ResultsPresenterPage
            ranking={ranking} 
            handleExit={handleFinishGame}
          />
        );
      
      default:
        <h1>Niezany state</h1>;
    }
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <div className={sharedStyles.pageContainer}>{componentToRender()}</div>
    </>
  );
};

export default RunQuiz;
