import React from 'react';
import '../App.css';
import LSS from '../images/LSS.jpg'

export default function Mappage() 
{
  
    return (
        <>
        <div class="team-section">
            <h1>Our Team</h1>
            <div class="about-border"></div>
            <div class="ps">
                <a href="#p1"><img src={LSS} alt=""/></a>
                <a href="#p2"><img src={LSS} alt=""/></a>
                <a href="#p3"><img src={LSS} alt=""/></a>
                <a href="#p4"><img src={LSS} alt=""/></a>
                <a href="#p5"><img src={LSS} alt=""/></a>
            </div>

            <div class="section" id="p1">
                <div class="name">Lee Sang Seok</div>
                <div class="about-border"></div>
                <p>
                현재 벤츠에서 인턴으로 근무중.
                오공에서 하드웨어 구축과 클라우드 서비스
                연동을 담당하셨음. 본 프로젝트의 팀장.
                </p>
            </div>

            <div class="section" id="p2">
                <div class="name">Park Jae Hyun</div>
                <div class="about-border"></div>
                <p>
                현재 대학원 다니는중.
                오공에서 텐서플로우 기능을 담당하셨음.
                </p>
            </div>

            <div class="section" id="p3">
                <div class="name">Kim Dong Hyun</div>
                <div class="about-border"></div>
                <p style={{textAlign:"center"}}>
                현재 취직준비중. 직업은 백수가 아닌 취준생.
                오공에서 반응형웹 부분과 useEffect를 사용한
                동적 렌더링 담당. 로그인 페이지 담당했음.
                </p>
            </div>

            <div class="section" id="p4">
                <div class="name">Lee Sung Keun</div>
                <div class="about-border"></div>
                <p>
                졸업학점이 부족해 아직 대학교 다니는중.
                오공에서 백엔드 부분과 카카오맵 api를 활용한
                맵 구현 부분을 담당하셨음.
                </p>
            </div>

            <div class="section" id="p5">
                <div class="name">Son Chang Won</div>
                <div class="about-border"></div>
                <p>
                대구 예대를 다니고 있는 학생.
                김동현의 친구로 본 프로젝트에서
                오공의 로고를 직접 디자인 하셨고,
                미세먼지 농도의 마커를 디자인 하셨다.
                </p>
            </div>
        </div>
        </>
    );
}
