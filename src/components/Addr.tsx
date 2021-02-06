import React, { useEffect } from 'react';
import '../App.css';
import { map } from './Map'

declare global {
  interface Window {
    kakao: any;
  }
}

const Addr : React.FC = (props: any) => {



    useEffect(() => {
      let geocoder : any = new window.kakao.maps.services.Geocoder();

      function searchAddrFromCoords(coords: any, callback: any) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }

      window.kakao.maps.event.addListener(map, 'idle', function () {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      });

      searchAddrFromCoords(map.getCenter(), displayCenterInfo);



    }, []);

    function displayCenterInfo(result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          let infoDiv: any = document.getElementById('centerAddr');
  
          for (let i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
              infoDiv.innerHTML = result[i].address_name;
              break;
            }
          }
        }
      }




  return (

    <div className="hAddr">
    <span id="centerAddr"></span>
    </div>


  );
}

export default Addr;