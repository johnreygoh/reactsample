import React,{Component,useState,useEffect} from "react";

const App = () => {

  const [news,setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [numHits, setNumHits] = useState(5);
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react&hitsPerPage=5');
  const [myloading, setMyloading] = useState(false);

  const fetchNews = () => {

    setMyloading(true);

    fetch(url)
    .then(result => result.json())
    .then(data => setNews(data.hits),setMyloading(false))
    //.then(data => console.log(data))
    .catch(error => console.log(error));

  }

  useEffect(()=>{
    fetchNews();
  },[url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const changeHits = (e) => {
    setNumHits(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=${numHits}`);
  }

  const searchForm = () => (
    <div>
      Search for news
      <input type="text" value={searchQuery} onChange={handleChange} />        
      <br />
      Items to display
      <input type="text" value={numHits} onChange={changeHits} />        
      <button onClick={handleSubmit}>Show on screen</button>
    </div>
  );

  const showLoading = () => (myloading?<h1>Loading...</h1>:"");

  const showItems = () => (
      <div style={{height: '400px', width: '400px', border: 1, overflow: 'auto'}}>
        {news.map((n,i)=>(
        
        <p key={i}>
          <h4>{n.title}</h4>
          <i>{n.author}</i><br />
          <a href={n.url}>read here</a>
          <hr />
          </p>
        
        ))}
      </div>
  );
 
  return(
    <div>
      
      {searchForm()}
      <h2>Meta News</h2>
      {showLoading()}
      {showItems()}     
     
    </div>
  );  
  
}


// const App = () => {

//   const [count,setCount] = useState(0);
//   const [pname,setPname] = useState('Project 2');

//   const increment = () => {
//     setCount(count + 1);
//     setPname('ABC site ');
//   }

//   useEffect(()=>{
//     document.title = `Clicked ${count} times`;
//   });

//   return(
//     <div>
//          <h1>{`This is ${pname} ${count}`}</h1>
       
//         <button onClick={increment}>
//            Clicked {count} times
//            </button>
//        </div>
//   );

// }

// class App extends Component {

//   state = {
//     count:0,
//     projectname:'ABC Site'
//   };

//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     });
//   }

//   // component lifecycle
//   // after component loads
//   componentDidMount(){
//     document.title = `Clicked ${this.state.count} times`;
//   }

//   //after every change
//   componentDidUpdate(){
//     document.title = `Clicked ${this.state.count} times`;
//   }


//   render(){
//     return (
//       <div>
//         <h1>This is {this.state.projectname}</h1>
       
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//           </button>
//       </div>
//     );
//   }

// }

export default App;
