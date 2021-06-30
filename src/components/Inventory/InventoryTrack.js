import React, { useContext, useEffect, useState } from "react"
import { Card, CardText, CardTitle, Button } from "reactstrap"
import { TrackingContext } from "../UserTracking/TrackingProvider"

export const InventoryTracker = ({ info }) => {
    const { searchTracking, trackingResults } = useContext(TrackingContext)

    useEffect(() => {
        searchTracking(info.trackingNumber, info.carrier)
    }, [])



    return (
        <>
            <Card body>
                <CardTitle tag="h5">Status: {trackingResults.data?.items[0].status}</CardTitle>
                <CardText>
                    Tracking Number: {trackingResults.data?.items[0].tracking_number}<br />
                    Carrier: {trackingResults.data?.items[0].carrier_code}<br />
                    Updated: {trackingResults.data?.items[0].lastUpdateTime}
                </CardText>
{/* 
                <Button>Go somewhere</Button> */}
            </Card>

        </>
    )

}