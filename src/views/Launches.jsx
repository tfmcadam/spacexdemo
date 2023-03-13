
import {useEffect, useState} from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner';
import {Link} from 'react-router-dom'
import { getAllLaunches } from '../services/spacexApiServices';


export const Launches = () =>{
    const [launches, setLaunches] =useState([]);
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        setIsLoading(true)
        setTimeout(()=>{
        getAllLaunches()
            .then((data) =>{
                const launchesWitchImages = data.filter((launch) =>{
                    return launch.links.flickr.original.length > 0;
                })
                console.log(data);
                setLaunches(launchesWitchImages)
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(() =>{
                setIsLoading(false)
            })
        }, 2000)
    }, [])
    
    return (
        <div className="flex-col align-items-center text-center">
            {
                isLoading && <LoadingSpinner/>
            }
            {
                launches.map((launch, i) => {
                    const {name, date_local, id} = launch;
                    return(
                        <div key = {i} className="w-25pct mb-md shadow rounded">
                            <Link to={`/onelaunch/${id}`}>
                                <h2>{name}</h2>
                            </Link>
                            <p>Date: {date_local}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}