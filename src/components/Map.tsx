import React, { useEffect } from 'react';
import '../App.css';
import $ from 'jquery';
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

  export let map : any;


  const Map : React.FC = (props) => {


    useEffect(() => {
  
      let container : any = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(35.832259, 128.757553), //지도의 중심좌표.
        level: 11 //지도의 레벨(확대, 축소 정도)
      };
  
      map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  
      let geocoder : any = new window.kakao.maps.services.Geocoder();
  
  
      let mapTypeControl : any = new window.kakao.maps.MapTypeControl()
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT)
  
      let zoomControl : any = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.LEFT)
  
      let clusterOptions = {
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 10, // 클러스터 할 최소 지도 레벨 
      }
  
      let clusterer : any = new window.kakao.maps.MarkerClusterer(clusterOptions)
  

  

  


      $.get('test.json', function (data: any) {

        let imageSrc = ''
        const imageSize : any = new window.kakao.maps.Size(20, 20)
        const imageOption : any = { offset: new window.kakao.maps.Point(0, 0) };
        const getColor : any = new getStateColor()
  
        let markers : any = $(data.positions).map((i: any, position: any) => {
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
  
          const markerImage : any = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
          const customMarker : any = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(position.lat, position.lon),
            image: markerImage,
            clickable: true
          });
  
          geocoder.coord2Address(data.positions[i].lon, data.positions[i].lat, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              let lot_number_address : any = result[0].address.address_name
              let date : any = new Date(data.positions[i].DT.trim()).toLocaleString()
  
              let infowindow : any = new window.kakao.maps.InfoWindow({
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


  return (
      <div className='kakaoMap' id="map" />    
  )
  }

  export default Map;