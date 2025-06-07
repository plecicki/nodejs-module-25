import React, {useMemo, useState} from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState();
  const [timer, setTimer] = useState(null);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const formattedMin = min < 10 ? `0${min}` : min;
    const formattedSec = sec < 10 ? `0${sec}` : sec;
    return `${formattedMin}:${formattedSec}`;
  };

  const formattedTime = useMemo(() => {
    return time !== undefined ? formatTime(time) : '';
  }, [time]);

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    const newTimer = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime - 1;

        if (newTime <= 0) {
          setStatus(prevStatus => {
            const nextStatus = prevStatus === 'work' ? 'rest' : 'work';
            setTime(nextStatus === 'work' ? 1200 : 20);
            return nextStatus;
          });
        }

        return newTime > 0 ? newTime : 0;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(undefined);
    setStatus('off');
    setTimer(null);
  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
