import './App.css';
import ModelEditor from './Page/ModelEditor';

console.log(ModelEditor);

function App() {
  return (
    <div className="App" style={{
      display: 'flex', direction: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh'
    }}>
      < ModelEditor />
    </div>
  );
}

export default App;