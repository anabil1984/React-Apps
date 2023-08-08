import React from 'react'; 
import { createRoot } from 'react-dom/client';
import Map from './map';
import './map.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Map tab="home" />);