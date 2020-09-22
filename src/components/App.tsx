import React, { useEffect } from 'react';
import '../App.css';
import $ from 'jquery';
//import HK from '../images/HK.jpg'
import Tensor from './TensorLoading';


declare global {
  interface Window {
    kakao: any;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(35.832259, 128.757553), //지도의 중심좌표.
      level: 11 //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    let geocoder = new window.kakao.maps.services.Geocoder();

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    let mapTypeControl = new window.kakao.maps.MapTypeControl()
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT)

    let zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    let clusterOptions = {
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 10, // 클러스터 할 최소 지도 레벨 
      calculator: [10, 30, 50], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
      texts: getTexts, // texts는 ['삐약', '꼬꼬', '꼬끼오', '치멘'] 이렇게 배열로도 설정할 수 있다 
      styles: [{ // calculator 각 사이 값 마다 적용될 스타일을 지정한다
        width: '30px', height: '30px',
        background: 'rgba(51, 204, 255, .8)',
        borderRadius: '15px',
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '31px'
      },
      {
        width: '40px', height: '40px',
        background: 'rgba(255, 153, 0, .8)',
        borderRadius: '20px',
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '41px'
      },
      {
        width: '50px', height: '50px',
        background: 'rgba(255, 51, 204, .8)',
        borderRadius: '25px',
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '51px'
      },
      {
        width: '60px', height: '60px',
        background: 'rgba(255, 80, 80, .8)',
        borderRadius: '30px',
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '61px'
      }
      ]
    }

    let clusterer = new window.kakao.maps.MarkerClusterer(clusterOptions)

    let circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(35.832259, 128.757553),  // 원의 중심좌표 입니다 
      radius: 25000, // 미터 단위의 원의 반지름입니다 
      strokeWeight: 5, // 선의 두께입니다 
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'longdash', // 선의 스타일 입니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.2  // 채우기 불투명도 입니다   
    });

    // 지도에 원을 표시합니다 
    circle.setMap(map);

    window.kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });


    function getTexts(count: number) {
      // 한 클러스터 객체가 포함하는 마커의 개수에 따라 다른 텍스트 값을 표시합니다 
      if (count < 10) {
        return '1+';
      } else if (count < 30) {
        return '10+';
      } else if (count < 50) {
        return '30+';
      } else {
        return '50+';
      }
    }

    function searchAddrFromCoords(coords: any, callback: any) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

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

    $.get('//apis.map.kakao.com/download/web/data/chicken.json', function (data: any) {
      let markers = $(data.positions).map(function (i: any, position: any) {
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(position.lat, position.lng),
          clickable: true
        });
      });

      for (let n = 0; n < data.positions.length; n++) {
        geocoder.coord2Address(data.positions[n].lng, data.positions[n].lat, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            var lot_number_address = result[0].address.address_name

            let infowindow = new window.kakao.maps.InfoWindow({
              content:
                '<b class="infoTitle">' + lot_number_address + '</b>' +
                '<table>' +
                '<tr align="center"><th rowspan="2">미세먼지</th><th>PM 10</th><th>PM 2.5</th><th>PM 1</th></tr>' +
                '<tr align="center"><td>값</td><td>값</td><td>값</td></tr>' +
                '<tr align="center"><th rowspan="2">도수</th><th>소음</th><th>온도</th><th>습도</th></tr>' +
                '<tr align="center"><td>값</td><td>값</td><td>값</td></tr>' +
                '<tr align="center"><th rowspan="2">가스</th><th>스모그</th><th>메탄</th><th>일산화탄소</th></tr>' +
                '<tr align="center"><td>값</td><td>값</td><td>값</td></tr>' +
                '</table>'
            });

            window.kakao.maps.event.addListener(markers[n], 'mouseover', makeMouseOver(map, markers[n], infowindow));
            window.kakao.maps.event.addListener(markers[n], 'mouseout', makeMouseOut(infowindow))
          }
        })
      }

      function makeMouseOver(map: any, markers: any, infowindow: any) {
        return function () {
          infowindow.open(map, markers);
        };
      };

      function makeMouseOut(infowindow: any) {
        return function () {
          infowindow.close();
        };
      };

      clusterer.addMarkers(markers);

    })
  }, [])

  return (
    <div className="App">
      <input type="checkbox" id="check" />
      <header className="header">
        <label htmlFor="check">
          <i className="fas fa-bars" id="sidebar_btn"></i>
        </label>
        <div className="left_area">
          <h3>Life <span>Meter</span></h3>
        </div>
      </header>

      <div className="sidebar">
        <div className="profile_info">
          <img src={HK} className="profile_image" alt="" />
          <h4>Welcome!</h4>
        </div>
        <a href="#"><i className="fas fa-desktop"></i><span>Dashboard</span></a>
        <a href="#"><i className="fas fa-cogs"></i><span>Components</span></a>
      </div>

    <div className='kakaoMap' id="map" />
      <div className="hAddr">
        <span>지도중심기준 주소정보</span>
        <span id="centerAddr"></span>
      </div>
      <Tensor/>
    </div>
  );
}

export default App;
