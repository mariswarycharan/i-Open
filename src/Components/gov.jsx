import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data1 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
  { name: 'Page A', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page B', uv: 2500, pv: 1200, amt: 1700 },
  { name: 'Page C', uv: 3800, pv: 2600, amt: 2100 },
  { name: 'Page D', uv: 4500, pv: 3908, amt: 2400 },
  { name: 'Page E', uv: 2200, pv: 4800, amt: 2100 },
  { name: 'Page F', uv: 3200, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 2800, pv: 4300, amt: 2100 },
];

const data3 = [
  { name: 'Page A', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page B', uv: 1500, pv: 3908, amt: 2000 },
  { name: 'Page C', uv: 2800, pv: 4800, amt: 2181 },
  { name: 'Page D', uv: 3200, pv: 2800, amt: 2500 },
  { name: 'Page E', uv: 1900, pv: 3900, amt: 2100 },
  { name: 'Page F', uv: 2800, pv: 3200, amt: 2100 },
  { name: 'Page G', uv: 3500, pv: 2100, amt: 2100 },
];

const data4 = [
  { name: 'Page A', uv: 3500, pv: 2100, amt: 2100 },
  { name: 'Page B', uv: 3200, pv: 2800, amt: 2500 },
  { name: 'Page C', uv: 3800, pv: 3900, amt: 2100 },
  { name: 'Page D', uv: 4200, pv: 4800, amt: 2181 },
  { name: 'Page E', uv: 3700, pv: 3900, amt: 2100 },
  { name: 'Page F', uv: 4300, pv: 3200, amt: 2100 },
  { name: 'Page G', uv: 3900, pv: 2100, amt: 2100 },
];

const data5 = [
  { name: 'Page A', uv: 2800, pv: 3200, amt: 2100 },
  { name: 'Page B', uv: 2900, pv: 3800, amt: 2500 },
  { name: 'Page C', uv: 3200, pv: 4200, amt: 2100 },
  { name: 'Page D', uv: 3000, pv: 3500, amt: 2100 },
  { name: 'Page E', uv: 2600, pv: 2700, amt: 2100 },
  { name: 'Page F', uv: 2900, pv: 3900, amt: 2100 },
  { name: 'Page G', uv: 3200, pv: 2100, amt: 2100 },
];

const SimpleBarChart = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      <div>
        <BarChart width={300} height={250} data={data1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          Drug 1
        </div>
      </div>
      <div>
        <BarChart width={300} height={250} data={data2} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          Drug 2
        </div>
      </div>
      <div>
        <BarChart width={300} height={250} data={data3} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          Drug 3
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 20 }}>
      <div>
        <BarChart width={300} height={250} data={data4} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          Drug 4
        </div>
      </div>
      <div>
        <BarChart width={300} height={250} data={data5} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          Drug 5
        </div>
      </div>
    </div>
  </div>
);

export default SimpleBarChart;
