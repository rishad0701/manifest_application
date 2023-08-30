import React,{useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import './home.css';

export default function Home() {

    let[DC,setDC] = useState([]);
    const[DcId,SetDCId] = useState('');
    let[carrier,setCarrier] = useState([]);
    const[carrierName,setCarrierName] = useState('');
    const usenavigate = useNavigate();

    useEffect(()=>{

        let username = sessionStorage.getItem('UserName');
        if(username===''||username===null){
            usenavigate('/login');
        }
        let jwt = sessionStorage.getItem('Token');

        const getDC = async ()=>{
            await fetch("http://localhost:54850/api/Manifest/DCNames",{headers:{
                'Authorization' : 'bearer '+jwt
            }})
            .then(responce=>responce.json())
            .then(data=>{
                setDC(data);
            });
        }
        getDC();
    },);

    const handleDC=(ev)=>{
        const getDCId = parseInt(ev.target.value);
        console.log(getDCId);
        SetDCId(getDCId);
        getCarrier(getDCId);
    }
    const getCarrier = async(getDCId)=>{
        let jwt = sessionStorage.getItem('Token');
        await fetch(`http://localhost:54850/api/Manifest/CarrierNames/${getDCId}`,{method:"POST",
        headers:{'Authorization' : 'bearer '+jwt,'Accept':'application/json','Content-Type':'application/json'},})
        .then(resp=>resp.json())
        .then(data=>{
            setCarrier(data);
            console.log(data)
    }); 
    }
    const handleCr=(ev)=>{
        const getCr = ev.target.value;
        setCarrierName(getCr);
    }

    const back = ()=>{
        usenavigate("/login")
        sessionStorage.setItem('UserName','');
    }

    const handleClear = ()=>{
        setCarrierName('')
        SetDCId('');
    }

    const handleManifest = async()=>{
    let jwt = sessionStorage.getItem('Token');
      const x = await fetch("http://localhost:54850/api/Manifest/Manifesting",{
            method:"POST",
            headers:{'Authorization' : 'bearer '+jwt,'Accept':'application/json','Content-Type':'application/json'},
            body:JSON.stringify({
                CarrierName : carrierName,
                DCId : DcId,
            })
        })

        if(x)
        {
            toast.success('Succesfully Manifested!!!', {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
            setCarrierName('')
            SetDCId('');
        }
        else{
            toast.error('Manifest Failed!!!!', {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
        }

    }

  return (
    <>
    <div className='homepage1'>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    <div className="header">
    <button style={{float:'right',borderRadius:"7px"}} className='btn btn-primary mx-3 my-2' onClick={back} >Logout</button>
        {/* <button style={{float:'right',margin:'20px 40px 0 0',borderRadius:"7px"}}>LogOut</button> */}
        {/* <Link style={{float:'right'}} to={'/login'}>Logout</Link> */}
    </div>
    <div className="container ">
        <div className="row col-12" >
            <div className="col-sm-12">
                <h2 className="mt-4 mb-4 fw-bold" style={{color:'white',textAlign:"left"}}>Manifesting the Carrier</h2>
                <div className="row mb-3">
                    <div className="form-group col-md-4">
                        <label className="mb-2" style={{color : 'white',textAlign:"left"}}>Distribution Centre</label>
                        <select className="form-control" value={DcId} style={{backgroundColor : '#13466e', color : 'white'}}  onChange={(e)=>handleDC(e)}>
                            <option selected disabled value="">--select DC--</option>
                            {
                                DC.map((DCget)=>(
                                <option key={DCget.dcId} value={DCget.dcId}>{DCget.dcName}</option>
                                ))
                            }                           
                        </select>
                    </div> 
                    <div className="form-group col-md-4" >
                        <label className="mb-2" style={{color : 'white',textAlign:"left"}}>Carriers</label>.
                        <select className="form-control" value={carrierName} style={{backgroundColor : '#13466e', color : 'white'}} onChange={(e)=>handleCr(e)} disabled={DcId===''}>
                            <option selected disabled value="">--select Carrier--</option>
                            {
                                carrier.map((Cr)=>(
                                    <option key={Cr.carrierName} value={Cr.carrierName}>{Cr.carrierName}</option>
                                ))
                            }             
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <button disabled={DcId===''} className='btn btn-primary mx-2 my-1' onClick={handleClear} >Clear</button>
        <button disabled={DcId==='' || carrierName===''} className='btn btn-primary mx-2 my-1' onClick={handleManifest} >ManifestAll</button>
    </div>
    </div>
    </>
  )
}
