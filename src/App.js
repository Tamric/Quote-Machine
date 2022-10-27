import MouseHunter from './features/functional/MouseHunter';
import { QuoteMachine } from './features/quote/QuoteMachine';

function App() {
  return (
    <MouseHunter className="app_wrap" 	  >
	<QuoteMachine />
    </MouseHunter>
  );
}

export default App;
