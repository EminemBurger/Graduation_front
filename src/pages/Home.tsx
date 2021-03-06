import React from 'react';
import '../App.css';
import Addr from '../components/Addr'
import Carousel from '../components/Carousel'
import Map from '../components/Map'
import Modal from '../components/Modal'
import TensorFlow from '../components/TensorLoading'

export default function Home() 
{


    return (
        <div style={{height: "1100px"}}>
            <Carousel/>
            <Map/>
            <Addr/>
            <Modal/>
            <TensorFlow/>
        </div>
    );
}
