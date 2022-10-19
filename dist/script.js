const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

function TimerControl(props) {

  return /*#__PURE__*/(
    React.createElement("div", { className: "timer" }, /*#__PURE__*/
    React.createElement("h3", { id: props.id + '-label' }, props.name + ' Length'), /*#__PURE__*/
    React.createElement("h1", { id: props.id + '-length' }, props.length, "'"), /*#__PURE__*/
    React.createElement("div", { className: "timer-controls" }, /*#__PURE__*/
    React.createElement("p", { onClick: props.decrement, className: "timer-arrows", id: props.id + '-decrement' }, "-"), /*#__PURE__*/
    React.createElement("p", { onClick: props.increment, className: "timer-arrows", id: props.id + '-increment' }, "+"))));



}

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const audio = document.getElementById('beep');

  function playSound() {
    audio.play();
  }

  function resetSound() {
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          if (onBreak) {
            playSound();
            console.log('session');
            setOnBreak(false);
            setMinutes(breakLength);
            setSeconds(0);
          } else {
            playSound();
            console.log('break');
            setOnBreak(true);
            setMinutes(sessionLength);
            setSeconds(0);
          }
        } else if (seconds === 0) {
          setSeconds(59);
          setMinutes(prevMinutes => prevMinutes - 1);
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  function incrementBreak() {
    if (breakLength < 60) {
      setBreakLength(prevBreakLength => prevBreakLength + 1);
    } else {
      alert('Break must be over 1 minutes and under 60');
    }
  }

  function decrementBreak() {
    if (breakLength > 1) {
      setBreakLength(prevBreakLength => prevBreakLength - 1);
    } else {
      alert('Break must be over 1 minutes and under 60');
    }
  }

  function incrementSession() {
    if (sessionLength < 60) {
      setSessionLength(prevSessionLength => prevSessionLength + 1);
      setMinutes(prevSessionLength => prevSessionLength + 1);
    } else {
      alert('Session must be over 1 minutes and under 60');
    }
  }

  function decrementSession() {
    if (sessionLength > 1) {
      setSessionLength(prevSessionLength => prevSessionLength - 1);
      setMinutes(prevSessionLength => prevSessionLength - 1);
    } else {
      alert('Session must be over 1 minutes and under 60');
    }
  }

  function reset() {
    setIsActive(false);
    setSessionLength(25);
    setBreakLength(5);
    setMinutes(25);
    setSeconds(0);
  }

  function toggle() {
    setIsActive(prevSetIsActive => !prevSetIsActive);
  }

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h1", { className: "title" }, "Pomodoro Timer"), /*#__PURE__*/
    React.createElement("h1", { className: "sub-title" }, "25 + 5 Clock"), /*#__PURE__*/
    React.createElement("div", { className: "timerControls" }, /*#__PURE__*/
    React.createElement(TimerControl, { increment: incrementSession, decrement: decrementSession, id: "session", name: "Session", length: sessionLength }), /*#__PURE__*/
    React.createElement(TimerControl, { increment: incrementBreak, decrement: decrementBreak, id: "break", name: "Break", length: breakLength })), /*#__PURE__*/

    React.createElement("h3", { onClick: toggle, id: "start_stop" }, isActive ? 'Stop' : 'Start'), /*#__PURE__*/
    React.createElement("h2", { id: "time-left" }, "Time left: ", minutes < 10 ? '0' + minutes : minutes, ":", seconds < 10 ? '0' + seconds : seconds), /*#__PURE__*/
    React.createElement("h4", { id: "timer-label" }, !onBreak ? 'Session' : 'Break', " ", isActive ? 'active' : 'paused'), /*#__PURE__*/
    React.createElement("audio", {
      id: "beep",
      preload: "auto",
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }), /*#__PURE__*/

    React.createElement("h3", { onClick: reset, id: "reset" }, "Reset")));


}

const container = document.getElementById('root');
const root = createRoot(container);
root.render( /*#__PURE__*/React.createElement(App, null));