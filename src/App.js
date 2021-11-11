import './App.css';
import './components/SelectName/SelectName';
import SelectName from './components/SelectName/SelectName';

import initialMembersList from './utils/initialValues';

function App() {
  return (
    <div className="santa">
     <h1>Merchandising Secret Santa 2021</h1>
     <SelectName memberList={initialMembersList} />
    </div>
  );
}

export default App;
