// CurrentWeatherConditions.jsx
import React, { useState } from 'react';
import './css/CurrentWeatherConditions.css';

function CurrentWeatherConditions({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!data) {
        return null;
    }

    return (
        <div className="current-conditions">
            <h2 onClick={() => setIsExpanded(!isExpanded)}>Current Conditions</h2>
            {isExpanded && (
                <>
                    <p>Top Snow Depth: {data.topSnowDepth}</p>
                    <p>Bottom Snow Depth: {data.botSnowDepth}</p>
                    <p>Fresh Snowfall: {data.freshSnowfall || 'No recent snowfall'}</p>
                    <p>Last Snowfall Date: {data.lastSnowfallDate}</p>
                    <h3>Basic Info</h3>
                    <p>Region: {data.basicInfo.region}</p>
                    <p>Name: Snöfjällby (Data might be borrowed from Sälen.. ssh quiet.)</p>
                    <p>URL: <a href={data.basicInfo.url}>{data.basicInfo.url}</a></p>
                    <p>Top Lift Elevation: {data.basicInfo.topLiftElevation}</p>
                    <p>Mid Lift Elevation: {data.basicInfo.midLiftElevation}</p>
                    <p>Bottom Lift Elevation: {data.basicInfo.botLiftElevation}</p>
                    <p>Latitude: {data.basicInfo.lat}</p>
                    <p>Longitude: {data.basicInfo.lon}</p>
                </>
            )}
        </div>
    );
}

export default CurrentWeatherConditions;