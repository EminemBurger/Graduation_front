import React from 'react';
import '../App.css';
import { map } from  './Map'

declare global {
  interface Window {
    kakao: any;
  }
}



const Carousel : React.FC = (props) => {



  const setCenter : any = (lat: number, lng: number) => {
    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon : any = new window.kakao.maps.LatLng(lat, lng);
  
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.setCenter(moveLatLon);
  }

  return (
    <div className="map_carousel">
    <a href="#" onClick={() => setCenter(37.275127, 127.009438)}>경기도</a>
    <a href="#" onClick={() => setCenter(37.885382, 127.729768)}>강원도</a>
    <a href="#" onClick={() => setCenter(36.635723, 127.491345)}>충청북도</a>
    <a href="#" onClick={() => setCenter(36.658837, 126.672791)}>충청남도</a>
    <a href="#" onClick={() => setCenter(35.820308, 127.108770)}>전라북도</a>
    <a href="#" onClick={() => setCenter(34.816210, 126.462913)}>전라남도</a>
    <a href="#" onClick={() => setCenter(36.575991, 128.505599)}>경상북도</a>
    <a href="#" onClick={() => setCenter(35.238229, 128.692398)}>경상남도</a>
    <a href="#" onClick={() => setCenter(33.488816, 126.498075)}>제주도</a>
  </div>



  );
}

export default Carousel;