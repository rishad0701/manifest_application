import React,{useState,useEffect} from 'react';

export default function Home() {

    let[DC,setDC] = useState([]);
    const[DcId,SetDCId] = useState('');
    let[carrier,setCarrier] = useState([]);
    const[carrierName,setCarrierName] = useState('');

    useEffect(()=>{
        const getDC = async ()=>{
            await fetch("http://localhost:33243/api/Manifest/DCNames")
            .then(responce=>responce.json())
            .then(data=>{
                setDC(data);
                console.log(data);
            });
        }
        getDC();
    },[]);

    const handleDC=(ev)=>{
        const getDCId = parseInt(ev.target.value);
        console.log(getDCId);
        SetDCId(getDCId);
        getCarrier(getDCId);
    }
    const getCarrier = async(getDCId)=>{
        await fetch(`http://localhost:33243/api/Manifest/CarrierNames/${getDCId}`,{method:"POST",
        headers:{'Accept':'application/json','Content-Type':'application/json'},})
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

    // useEffect(()=>{
    //     const getCarrier = async()=>{
    //         await fetch(`http://localhost:33243/api/Manifest/CarrierNames/${DcId}`,{method:"POST",
    //         headers:{'Accept':'application/json','Content-Type':'application/json'},})
    //         .then(resp=>resp.json())
    //         .then(data=>{
    //             setCarrier(data);
    //             console.log(data)
    //     }); 
    //     }
    //     getCarrier();
    // },[DcId]);

    const handleClear = ()=>{
        // let ar = []
        setDC([]);
        setCarrier([]);
        // DC =[];
        // carrier = [];
        // fetch("http://localhost:33243/api/Manifest/DCNames")
        //     .then(responce=>responce.json())
        //     .then(data=>{
        //         setDC(data);
        //         console.log(data);
        //     });
    }

    const handleManifest = async()=>{
        console.log(DcId)
        console.log(carrierName)
        await fetch("http://localhost:33243/api/Manifest/Manifesting",{
            method:"POST",
            headers:{'Accept':'application/json','Content-Type':'application/json'},
            body:JSON.stringify({
                CarrierName : carrierName,
                DCId : DcId,
            })
        })
    }

    const handlesubmit = ()=>{
        handleManifest()
        handleClear()
    }

  return (
    <form className="container" onSubmit={handlesubmit}>
    <div className="container pe-0">
        <div className="row col-12" >
            <div className="col-sm-12">
                <h2 className="mt-4 mb-4 fw-bold">Manifesting the Carrier</h2>
                <div className="row mb-3">
                    <div className="form-group col-md-4">
                        <label className="mb-2">Distribution Centre</label>
                        <select name="Dc" className="form-control" onChange={(e)=>handleDC(e)}>
                            <option>--select DC--</option>
                            {
                                DC.map((DCget)=>(
                                <option key={DCget.dcId} value={DCget.dcId}>{DCget.dcName}</option>
                                ))
                            }                           
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="mb-2">Carriers</label>.
                        <select name="Dc" className="form-control" value={carrierName} onChange={(e)=>handleCr(e)}>
                            <option>--select Carrier--</option>
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
        <button disabled={DcId==='' || carrierName===''} className='btn btn-primary mx-2 my-1' type='submit' >ManifestAll</button>
    </div>
    </form>
  )
}
