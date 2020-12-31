import React, { useEffect, useState } from 'react';
import '../App.css';
import $ from 'jquery';
import Tensor from './TensorLoading';
import redDot from '../images/1.png'
import yellowDot from '../images/2.png'
import purpleDot from '../images/3.png'
import greenDot from '../images/4.png'
const { getStateColor } = require('../StateColor');









declare global {
  interface Window {
    kakao: any;
  }
}

const App: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState(["none", "none", "none", "none"])
  const [mapLocation, setMapLocation] = useState({ setCenter({ }) { } })

  useEffect(() => {

    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(35.832259, 128.757553), //지도의 중심좌표.
      level: 11 //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    setMapLocation(map)

    let geocoder = new window.kakao.maps.services.Geocoder();

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    let mapTypeControl = new window.kakao.maps.MapTypeControl()
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT)

    let zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.LEFT)

    let clusterOptions = {
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 10, // 클러스터 할 최소 지도 레벨 
    }

    let clusterer = new window.kakao.maps.MarkerClusterer(clusterOptions)

    window.kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

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

    
    $.get('test.json', function (data: any) {

      let imageSrc = ''
      const imageSize = new window.kakao.maps.Size(20, 20)
      const imageOption = { offset: new window.kakao.maps.Point(0, 0) };
      const getColor = new getStateColor()

      let markers = $(data.positions).map((i: any, position: any) => {
        if (data.positions[i].PM25 < 16) {
          imageSrc = greenDot
        }
        else if (data.positions[i].PM25 < 36) {
          imageSrc = yellowDot
        }
        else if (data.positions[i].PM25 < 76) {
          imageSrc = redDot
        }
        else imageSrc = purpleDot

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        const customMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(position.lat, position.lon),
          image: markerImage,
          clickable: true
        });

        geocoder.coord2Address(data.positions[i].lon, data.positions[i].lat, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            let lot_number_address = result[0].address.address_name
            let date = new Date(data.positions[i].DT.trim()).toLocaleString()

            let infowindow = new window.kakao.maps.InfoWindow({
              removable: true,
              content:
                '<div class="infowindow">' +
                `<b>${lot_number_address}</b>` +
                '<hr></hr>' +
                `<div class="progress_bar">
                  <div class="pro-bar">
                    <small class="progress_bar_title">
                      PM10
                      <span class="progress_number">${data.positions[i].PM10}㎍/㎥</span>
                    </small>
                    <span class="progress-bar-inner" style="background-color: ${getColor.FD(data.positions[i].PM10)}; width: ${100 * data.positions[i].PM10 / 150}%;">
                    </span>
                </div>
            </div>

            <div class="progress_bar">
                  <div class="pro-bar">
                    <small class="progress_bar_title">
                      PM25
                      <span class="progress_number">${data.positions[i].PM25}㎍/㎥</span>
                    </small>
                    <span class="progress-bar-inner" style="background-color: ${getColor.superFD(data.positions[i].PM25)}; width: ${100 * data.positions[i].PM25 / 150}%;">
                    </span>
                </div>
            </div>

            <div class="progress_bar">
                  <div class="pro-bar">
                    <small class="progress_bar_title">
                      PM1
                      <span class="progress_number">${data.positions[i].PM1}㎍/㎥</span>
                    </small>
                    <span class="progress-bar-inner" style="background-color: ${getColor.superFD(data.positions[i].PM1)}; width: ${100 * data.positions[i].PM1 / 150}%;">
                    </span>
                </div>
            </div>

            <div class="progress_bar">
                  <div class="pro-bar">
                    <small class="progress_bar_title">
                      소음
                      <span class="progress_number">${data.positions[i].Noise}dB(A)</span>
                    </small>
                    <span class="progress-bar-inner" style="background-color: ${getColor.noise(data.positions[i].Noise)}; width: ${100 * data.positions[i].Noise / 4}%;">
                    </span>
                </div>
            </div>

            <div class="progress_bar">
                  <div class="pro-bar">
                    <small class="progress_bar_title">
                      온도
                      <span class="progress_number">${data.positions[i].Temp}°C</span>
                    </small>
                    <span class="progress-bar-inner" style="background-color: ${getColor.temp(data.positions[i].Temp)}; width: ${100 * (30 + data.positions[i].Temp) / 80}%;">
                    </span>
                </div>
            </div>
            
            <div class="progress_bar">
                  <div class="pro-bar">
                    <small class="progress_bar_title">
                      습도
                      <span class="progress_number">${data.positions[i].Humi}%</span>
                    </small>
                    <span class="progress-bar-inner" style="background-color: ${getColor.humi(data.positions[i].Humi)}; width: ${data.positions[i].Humi}%;">
                    </span>
                </div>
            </div>` +
                '<hr></hr>' +
                `<p>${date}<p/>` +
                '</div>'
            });

            window.kakao.maps.event.addListener(customMarker, 'click', makeOnClick(map, customMarker, infowindow));
            //window.kakao.maps.event.addListener(markers[n], 'mouseout', makeMouseOut(infowindow))
          }
        })

        return customMarker
      });

      function makeOnClick(map: any, markers: any, infowindow: any) {
        return function () {
          infowindow.open(map, markers);
        };
      };
      /* 오버레이 겹침문제로 인포윈도우 깜빡거림
      function makeMouseOut(infowindow: any) {
        return function () {
          infowindow.close();
        }
      }; 
      */
      clusterer.addMarkers(markers);

    })
  }, [])

  const setCenter = (lat: number, lng: number) => {
    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    mapLocation.setCenter(moveLatLon);
  }

  const modalMouseOver = (stateIdx: number) => {
    setModalVisible(modalVisible.map((value, index) => {
      if (index === stateIdx) {
        return "flex"
      }
      return "none"
    }))
  }

  const modalMouseOut = (stateIdx: number) => {
    setModalVisible(modalVisible.map((value, index) => {
      if (index === stateIdx) {
        return "none"
      }
      return "none"
    }))
  }

  return (
    <div style={{height:"1145px"}}>
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
      <div className='kakaoMap' id="map" />
      <div className="hAddr">
        <span id="centerAddr"></span>
      </div>

      <div className="labels">
        <table>
          <tr>
            <td id="labels_good" onMouseOver={() => modalMouseOver(0)} onMouseOut={() => modalMouseOut(0)}>좋음</td>
            <td id="labels_moderate" onMouseOver={() => modalMouseOver(1)} onMouseOut={() => modalMouseOut(1)}>보통</td>
            <td id="labels_unhealthy" onMouseOver={() => modalMouseOver(2)} onMouseOut={() => modalMouseOut(2)}>나쁨</td>
            <td id="labels_hazardous" onMouseOver={() => modalMouseOver(3)} onMouseOut={() => modalMouseOut(3)}>매우 나쁨</td>
          </tr>
        </table>

        <div className="modal_good" style={{ display: modalVisible[0] }}>
        <b>좋음</b>
        <p id="modal_in_p">대기오염 관련 질환자군에서도 영향이 유발되지 않을 수준</p>
      </div>
      <div className="modal_moderate" style={{ display: modalVisible[1] }}>
        <b>보통</b>
        <p id="modal_in_p">환자군에게 만성 노출시 경미한 영향이 유발될 수 있는 수준</p>
      </div>
      <div className="modal_unhealthy" style={{ display: modalVisible[2] }}>
        <b>나쁨</b>
        <p id="modal_in_p">환자군 및 민감군(어린이,노약자 등)에게 유해한 영향 유발, 일반인도 건강상 불쾌감을 경험할 수 있는 수준</p>
      </div>
      <div className="modal_hazardous" style={{ display: modalVisible[3] }}>
        <b>매우 나쁨</b>
        <p id="modal_in_p">환자군 및 민감군에게 급성 노출시 심각한 영향 유발, 일반인도 약한 영향이 유발될 수 있는 수준</p>
      </div>

      </div>
      <Tensor />
    </div>

/*
<div>
{isPc && <p>pc</p>}
{isTablet && <p>tablet</p>}
{isTabletPC && <p>tablet_pc</p>}
{isMobileTablet && <p>mobile_tablet</p>}
{isMobile && <p>mobile</p>}

</div>
*/
  );
}

export default App;