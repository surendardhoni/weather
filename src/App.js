import React from 'react'
import City from '../src/Search/City'
import Latitude from '../src/Search/Latitude'

const App = () => {
  return (
    <div>
      {/* <button onClick={() =>City()}>Click</button> */}
      {/* <form onSubmit={<City />}>
      <button type="submit">Submit</button>
    </form> */}

    <City />
    {/* <Latitude /> */}
    {/* <input type='radio' value='student'></input> */}
    {/* <p>Please select your favorite Web language:</p>
  <input type="radio" id="html" name="fav_language" value="HTML" />
  <label for="html">HTML</label>
  <input type="radio" id="css" name="fav_language" value="CSS" />
  <label for="css">CSS</label>
  <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
  <label for="javascript">JavaScript</label> */}

    </div>
  )
}

export default App