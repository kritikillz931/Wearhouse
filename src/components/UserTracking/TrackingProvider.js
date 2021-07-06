/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, createContext } from "react"

export const TrackingContext = createContext()

export const TrackingProvider = (props) => {
    const [trackingList, setTrackingList] = useState([])
    const [trackingResults, setTrackingResults] = useState([])
    const [trackingSingle, setTrackingSingle] = useState()
    const [trackingDetailsArray, setDetailsArray] = useState([])
    let trackingData = [];

    const getTrackingList = () => {
        fetch(`http://localhost:8088/trackingDetails?_expand=inventoryItem`)
            .then(res => res.json())
            .then(setTrackingList)
    }

    let detailedTracking = []
    const getUsersTrackingDetails = (list) => {
        console.log("running function")
        console.log("list: ", list)

        list.map(tracking => {
            console.log("in map")
            searchTrackingTwo(tracking.trackingNumber, tracking.carrier, tracking)
        })
    }


    const searchTracking = (trackingNumber, carrier) => {
        setTrackingResults([])
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "7680539ba2msh4be3503c616bb53p1cee89jsn8a6e9c4805c5");
        myHeaders.append("x-rapidapi-host", "order-tracking.p.rapidapi.com");
        myHeaders.append("content-type", "application/json");

        var raw = JSON.stringify({
            "tracking_number": `${trackingNumber}`,
            "carrier_code": `${carrier}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://order-tracking.p.rapidapi.com/trackings/realtime", requestOptions)
            .then(response => response.json())
            .then(setTrackingResults)
    }

    const searchTrackingTwo = (trackingNumber, carrier, trackingData) => {

        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "7680539ba2msh4be3503c616bb53p1cee89jsn8a6e9c4805c5");
        myHeaders.append("x-rapidapi-host", "order-tracking.p.rapidapi.com");
        myHeaders.append("content-type", "application/json");

        var raw = JSON.stringify({
            "tracking_number": `${trackingNumber}`,
            "carrier_code": `${carrier}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://order-tracking.p.rapidapi.com/trackings/realtime", requestOptions)
            .then(response => response.json())
            .then(res => detailedTracking.push({
                silhouette: trackingData.inventoryItem.silhouette,
                description: trackingData.inventoryItem.name,
                brand: trackingData.inventoryItem.brand,
                carrier: carrier,
                trackNum: trackingNumber,
                status: res.data.items[0].status
            }))
            .then(setDetailsArray(detailedTracking))
    }








    const searchTrackingSingle = (trackingNumber, carrier) => {

        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "7680539ba2msh4be3503c616bb53p1cee89jsn8a6e9c4805c5");
        myHeaders.append("x-rapidapi-host", "order-tracking.p.rapidapi.com");
        myHeaders.append("content-type", "application/json");

        var raw = JSON.stringify({
            "tracking_number": `${trackingNumber}`,
            "carrier_code": `${carrier}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://order-tracking.p.rapidapi.com/trackings/realtime", requestOptions)
            .then(response => response.json())
            .then(setTrackingSingle)
    }


    let trackingArray = []
    const searchTrackingArray = (arrayOfData) => {
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "7680539ba2msh4be3503c616bb53p1cee89jsn8a6e9c4805c5");
        myHeaders.append("x-rapidapi-host", "order-tracking.p.rapidapi.com");
        myHeaders.append("content-type", "application/json");

        arrayOfData.map((info) => {
            var raw = JSON.stringify({
                "tracking_number": `${info.trackingNumber}`,
                "carrier_code": `${info.carrier}`
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            
            fetch("https://order-tracking.p.rapidapi.com/trackings/realtime", requestOptions)
                .then(response => response.json())
                .then(res => trackingArray.push(res))
                .then(setTrackingResults(trackingArray))
                .then(console.log("array: ", trackingArray))
        })
            
    }

    const addTracking = trackingInfo => {
        return fetch("http://localhost:8088/trackingDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trackingInfo)
        })
            .then(response => response.json())
    }

    const getTrackingNumberById = trackingInfoId => {
        return fetch(`http://localhost:8088/trackingInfo/${trackingInfoId}`)
            .then(res => res.json())
    }

    const releaseTrackingNumber = trackingInfoId => {
        return fetch(`http://localhost:8088/trackingDetails/${trackingInfoId}`, {
            method: "DELETE"
        })
            .then(getTrackingList)
    }

    const updateTrackingInfo = trackingInfoId => {
        return fetch(`http://localhost:8088/trackingInfo/${trackingInfoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trackingInfoId)
        })
            .then(getTrackingList)
    }



    return (
        <TrackingContext.Provider
            value={{
                trackingList,
                setTrackingList,
                trackingResults,
                getTrackingList,
                addTracking,
                getTrackingNumberById,
                releaseTrackingNumber,
                updateTrackingInfo,
                searchTracking,
                searchTrackingSingle,
                trackingData,
                trackingSingle,
                searchTrackingArray,
                getUsersTrackingDetails,
                trackingDetailsArray
            }}>
            {props.children}
        </TrackingContext.Provider>
    )
}