import React, { useState, createContext} from "react"

export const TrackingContext = createContext()

export const TrackingProvider = (props) => {
    const [trackingList, setTrackingList] = useState([])
    const [searchTrackingLocation, setTrackingLocation] = useState([])
    const [trackingCarrierUsed, setTrackingCarrierUsed] = useState([])


const userId = localStorage.getItem("wearhouse_user")

const getTrackingList = () => {
    fetch(`http://localhost:8088/trackingDetails?userId=${userId}`)
}


const searchTracking = (trackingNumber, carrier) => {
    setTrackingCarrierUsed([])
    fetch("https://order-tracking.p.rapidapi.com/trackings/realtime", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-key": "7680539ba2msh4be3503c616bb53p1cee89jsn8a6e9c4805c5",
		"x-rapidapi-host": "order-tracking.p.rapidapi.com"
	},
	"body": {
		"tracking_number": `${trackingNumber}`,
		"carrier_code": `${carrier}`
	}
})
    .then(res => res.json())
    .then(setTrackingLocation)
}

const addTrackingNumber = trackingNumber => {
    return fetch("http://localhost:8088/trackingInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trackingNumber)
    })
    .then(response => response.json())
}

const getTrackingNumberById =trackingInfoId => {
    return fetch(`http://localhost:8088/trackingInfo/${trackingInfoId}`)
    .then(res => res.json())
}

const releaseTrackingNumber = trackingInfoId => {
    return fetch (`http://localhost:8088/trackingInfo/${trackingInfoId}`, {
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
        searchTrackingLocation,
        setTrackingLocation,
        getTrackingList,
        addTrackingNumber,
        getTrackingNumberById,
        releaseTrackingNumber,
        updateTrackingInfo,
        searchTracking,
        trackingCarrierUsed

    }}>
        {props.children}
    </TrackingContext.Provider>
)
}