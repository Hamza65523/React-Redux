import React,{useEffect, useState } from 'react';

export default function Machines () {

	const [data,setData] = useState([])
	const [perData,setPerData] = useState({
		id:'',
		name:'',
		ip_address:'',
		health:''
	})
	useEffect(()=>{
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  fetch("http://localhost:8081/machines", requestOptions)
			.then(response => response.json())
			.then((result )=>{
				setData(result)
			} )
			.catch(error => console.log('error', error));
	},[])
	const PerMachine =()=>{
	const [value,setValue] = useState('')
	const hanlderSubmit= ()=>{
		if(value !=''){
			var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": value
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`http://localhost:8081/machines/${perData.id}`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
	 setPerData(result)
	 setPerData({	id:''})
	})
  .catch(error => console.log('error', error));
		}
	}
	return(
		<div className='permachine' style={{display:'flex',gap:'2rem'}}>
			<div style={{width:'50%'}} className='firstcol'>
			<h1>{perData.name}</h1>
			<h1>Update Device</h1>
			<div >
			<div style={{display:'flex',flexDirection:'column'}}>
			<label htmlFor="">Name:</label>
				<input type="text" value={value} onChange={(e)=>setValue(e.target.value)} name="" style={{padding:'0.5rem'}} id="" />
			</div>
				<div style={{display:'flex',padding:'1rem 0',justifyContent:'end'}}>
				<button style={{padding:'10px',fontSize:'1rem'}} onClick={hanlderSubmit}>Submit</button>
				</div>
			</div>
			</div>
			<div style={{width:'50%'}} className='secondcol'>
				<div style={{backgroundColor:'#dddddd',padding:'0 2rem',paddingBottom:'2rem',border:'2px solid black',}}>
					<h1 style={{textAlign:'center'}}>{perData.health}</h1>
					<div className="" style={{border:'1px solid black',height:'30px'}}>
								{/* {items.health} */}
									<div style={{height:'100%',width:`${perData.health}%`,backgroundColor: perData.health<=50?'#D9534F':perData.health>=51&&perData.health<=70?' #f0ad4e':'#5cb85c'}}></div>
								</div>
				</div>
								<div className="">
									<h1>Stats</h1>
									<div style={{display:'flex',paddingBottom:'1rem',gap:'0.5rem',alignItems:'center'}}>
									<b >IP Address:</b>
									<span>{perData.ip_address}</span>
									</div>
								</div>
			</div>
		</div>
	)
}
	return (
		<div>
			{perData.id==''?(
				<div className="">
				<table id='customers'>
					<thead>
						<tr>
						<th style={{textAlign:'start',padding:'8px 5px'}}>Name</th>
						<th style={{textAlign:'start',padding:'8px 5px'}}>IP Address</th>
						<th style={{textAlign:'start',padding:'8px 5px'}}>Health</th>
						</tr>
					</thead>
					<tbody  >
	{data&&data.map((items)=>(
						<tr key={items.id} style={{cursor:'pointer'}} onClick={()=>setPerData(items)}>
						<td >{items.name}</td>
						<td >{items.ip_address}</td>
						<td >
							<div className="" style={{border:'1px solid black',height:'30px'}}>
							{/* {items.health} */}
								<div style={{height:'100%',width:`${items.health}%`,backgroundColor: items.health<=50?'#D9534F':items.health>=51&&items.health<=70?' #f0ad4e':'#5cb85c'}}></div>
							</div>
						</td>
						</tr>
	))}
	</tbody>
				</table>
				</div>
			):(
				<PerMachine/>
			)}
		</div>

	);
}

