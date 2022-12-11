import axios from 'axios';
import React,{useState,useRef} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

import BarChart from 'react-bar-chart';
import '../components/dashboard.css';


const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='



function SingleMention ()  {
    const {id} = useParams()
    const ref = useRef()
const [ifmentioned,setIfmentioned]=useState(false);
const [apptoken,setApptoken]=useState('');

const logout=()=>{

}

var Routes=(
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top text-primary bg-dark portfolio-navbar gradient" >
    <div className="container-fluid"><Link className="navbar-brand logo" href="/">Rep alert </Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse"
            id="navbarNav">
            <ul className="nav navbar-nav ml-auto">
               
                <li className="nav-item" role="presentation"><Link className="nav-link" to="/dashboard"><i style={{marginRight:'5px'}} className="fa fa-line-chart"> 👉🏽</i>Dashboard</Link></li>
                <li className="nav-item" role="presentation"><Link className="nav-link" to={`/cocktail/${id}`}><i style={{marginRight:'5px'}} className="fa fa-pie-chart"></i>Single Mention</Link></li>
    
                   
    
                
                
                
                
                
                
                
            </ul>
            
        </div>
       
    </div>
</nav>
)

const baseURL='https://nlapi.expert.ai/v2/analyze/standard/en/relevants'


const config = {
    headers: { 'Authorization': `Bearer ${process.env.REACT_APP_EXPERT_AI_TOKEN}`,
    'Content-type':'application/json'
 }
};

const getToken =()=>{
    var axios = require('axios');
    var data = JSON.stringify({"username":"consistengolf1@gmail.com","password":"Magazine1!"});

    var config = {
    method: 'post',
    url: 'https://developer.expert.ai/oauth2/token',
    headers: { 
        '': '', 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
     setApptoken(response.data.token);
    })
    .catch(function (error) {
    console.log(error);
    });

}

const onChange=(e)=>{
    setText(e.target.value);
}

const refreshPage=(e)=> {
    window.location.reload(false);
    setText(e.target.value);
  }

const submit=(e)=>{
    e.preventDefault();
    axios.post(baseURL,{
        document:{
            text:text
        }
    },config).then((res)=>{
        console.log(res.data)
        setTopics(res.data.data.topics)
        setMain(res.data.data.mainSentences)
    }).catch(err=>{
        console.log(err);
    })

    axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/entities',{
        document:{
            text:text
        }
    },config).then((res)=>{
        console.log(res.data)
        setEntities(res.data.data.entities)
    }).catch((err)=>{
        console.log(err);
    })
    
    axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/sentiment',{
        document:{
            text:text
        }
    },config).then((res)=>{

        const datareview=[...data];
        var item=datareview[0];
        item.value=res.data.data.sentiment.positivity;
        datareview[0]=item;

        item=datareview[1];
        item.value=Math.abs(res.data.data.sentiment.negativity);
        datareview[1]=item;

        item=datareview[2];
        item.value=res.data.data.sentiment.overall;
        datareview[2]=item;

        
       setData(datareview);

        console.log(data);

        
    }).catch((err)=>{
        console.log(err);
    })
    
    setIfmentioned(true);

}
const translate=(lang)=>{

}
const [data,setData] =useState ([
    {text: 'Positive', value: 500}, 
    {text: 'Negative', value: 400},
    {text: 'Overall', value: 400} 
  ]);

  const [datapie,setDatapie] =useState ([
    {title: 'Positive', value: 500,color: '#C13C37'}, 
    {title: 'Negative', value: 400,color: '#E38627'},
    {title: 'Overall', value: 400, color: '#6A2135'} 
  ]);

  const box = {top: 20, right: 20, bottom: 230, left: 40};

  const [text,setText]=useState('a');
  const [topics,setTopics]=useState([]);
  const [main,setMain]=useState([]);
  const [entities,setEntities]=useState([]); 

  

 
  return ifmentioned?(

    <div>
            {Routes}
            <div className="container">
           
            <label for="exampleFormControlTextarea1" style={{marginTop:'3rem'}}>Review Text</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={text}></textarea>
            {/* <button onClick={refreshPage}> Try another!</button> */}
            <div><Link className="nav-link" to={`/cocktail/${id}`}><i style={{marginRight:'5px'}} className="fa fa-bar-chart"></i>Single Mention</Link></div>
            <div style={{marginTop:'2rem'}}class="form-group">
           
          </div>
          <div class="container">
            <div class="row">
                <div class="col-sm">
                {/* One of three columns */}
                <div class="card" style={{marginTop:'2rem'}} >
                
                    <div class="card-body">
                    <h5 class="card-title">Summary</h5>
                    {
                        main.map((maintext)=>{
                            return(
                                <p className="text-justify">{maintext.value}</p>
                            )
                        })
                    }
                        
                    
                    </div>
                </div>
                </div>
                <div class="col-sm">
                 {/* One of three columns */}

                </div>
                <div class="col-sm">
                <ul class="list-group" style={{marginTop:'2rem'}}>
                <li class="list-group-item"><b>Main Entities mentioned</b></li>
                {
                    entities.map((entity)=>{
                        return(
                             
                            <li class="list-group-item d-flex justify-content-between align-items-center active">Item  <span class="badge badge-danger badge-pill">{entity.lemma}</span></li>
                            
                        )
                    })
                }
                
                
            </ul>
                </div>
            </div>
            </div>
            <h5 style={{textAlign:'left',marginTop:'2rem'}}>key topics</h5>
            <div className="row">
                <div className="col col-lg-4" style={{marginTop:'2rem'}}>
                {
                    topics.map((topic)=>{
                        return(
                            <h5><span style={{marginRight:'10px'}} class="badge badge-warning">{topic.label}</span></h5>
                        )
                    })
                }
                </div>
                <div className="col col-lg-8">
                {/* <ul class="list-group" style={{marginTop:'2rem'}}>
                <li class="list-group-item"><b>Main Entities mentioned</b></li>
                {
                    entities.map((entity)=>{
                        return(
                            <li class="list-group-item">{entity.lemma}</li>
                        )
                    })
                }
                
                
            </ul> */}
                   
                </div>
            </div>

            <div class="card" style={{marginTop:'2rem'}} >
                
                    {/* <div class="card-body"> */}
                    <h5 style={{textAlign:'center',marginTop:'2rem'}}>Sentiment of Mention</h5>
                    <div align="right" style={{width: '60%'}}> 
                        <BarChart ylabel='range'
                        width={500}
                        height={500}
                        margin={box}
                        data={data}
                        />   
                  
                    </div>
                </div>

            
               
            </div>
            {/* <h5 style={{textAlign:'center',marginTop:'2rem'}}>Sentiment of Mention</h5>
            <div style={{width: '100%'}}> 
                <BarChart ylabel='Scale'
                  width={500}
                  height={500}
                  margin={box}
                  data={data}
                  />   
            </div> */}
                
            
        </div>
        ):(
    
    <div>
        {Routes}
      <h2><ul><li><p></p></li></ul>{id} </h2>
      <div className="container" ref={ref}>
            <form class="form-group" style={{marginTop:'3rem'}} onSubmit={submit}>
                <label for="exampleFormControlTextarea1">Enter/Paste the mention /Click at the box hit "enter" </label>
                <textarea value={id}  class="form-control" id="exampleFormControlTextarea1" rows="12" onChange={onChange}></textarea>

                <button style={{marginTop:'20px'}} type="submit" className="btn btn-block btn-success">Submit</button>
            </form>
           
            </div>
    </div>
  )
}

export default SingleMention
