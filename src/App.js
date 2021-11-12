import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./components/SelectName/SelectName";
import SelectName from "./components/SelectName/SelectName";
import Giftee from "./components/Giftee/Giftee";

import initialMembersList from "./utils/initialValues";

function App() {
  return (
    <Router>
      <div className='santa'>
        <h1>Merchandising Secret Santa 2021</h1>
        <Routes>
          <Route
            path='/'
            element={<SelectName memberList={initialMembersList} />}
          />
          <Route path='/giftee' element={<Giftee />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
