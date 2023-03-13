import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { getOneLaunch } from '../services/spacexApiServices';

export const OneLaunch = (props) =>{
    const{ id } = useParams();
    const [launch, setLaunch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            getOneLaunch(id)
                .then( (data) => {
                    console.log(data);
                    setLaunch(data)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }, 50)
    }, [id])
    if(launch=== null){
        return <LoadingSpinner/>
    }
    const {name, date_local, details, links} = launch;
    const {article, flickr} = links;
    const {original: originalImgUrls} = flickr;
    return <div className="flex-col align-items-center text-center">
        <h2>{name}</h2>
        <h4>Date:</h4>
        <p>{date_local}</p>
        <h4>Details:</h4>
        <p>{details}</p>
        {
            originalImgUrls.map((url, i) =>{
                return (
                    <img
                        key={i}
                        className="shadow-img rounded mb-md"
                        src={url}
                        alt="Launch"
                        width="60%"/>
                )
            })
        }
        {
            article && (
                <iframe
                title="Launch Article"
                src={article}
                width="50%"
                height="800"
                allowFullScreen=""
                loading="lazy"
                />
            )
        }
    </div>
}