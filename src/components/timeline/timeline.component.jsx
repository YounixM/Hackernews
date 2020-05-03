import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, Label } from "recharts";

import '../../assets/styles/timeline.scss';

export default function Timeline (props) {
    return (        
        <ResponsiveContainer
            width='100%'
            height={400}
            className='timelineContainer'
        >
            <LineChart data={props.data} margin={{ top: 10, right: 20, left: 20, bottom: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="objectID" orientation='bottom' angle={-90} textAnchor="end" interval={0}>
                    <Label value="ID" offset={-80} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'Votes', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
                <Line type="monotone" dataKey="points" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}
