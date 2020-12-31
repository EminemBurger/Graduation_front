import React from 'react';
import '../App.css';
import PJH from '../images/PJH.jpg'
import LSS from '../images/LSS.jpg'
import KDH from '../images/KDH.jpg'
import LSK from '../images/LSK.jpg'
import SCW from '../images/SCW.jpg'

export default function Mappage() 
{
  
    return (
        <>
        <div class="team-section">
            <h1>Our Team</h1>
            <div class="about-border"></div>
            <div class="ps">
                <a href="#p1"><img src={LSS} alt=""/></a>
                <a href="#p2"><img src={PJH} alt=""/></a>
                <a href="#p3"><img src={KDH} alt=""/></a>
                <a href="#p4"><img src={LSK} alt=""/></a>
                <a href="#p5"><img src={SCW} alt=""/></a>
            </div>

            <div class="section" id="p1">
                <div class="name">Lee Sang Seok</div>
                <div class="about-border"></div>
                <p>
                정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                </p>
            </div>

            <div class="section" id="p2">
                <div class="name">Park Jae Hyun</div>
                <div class="about-border"></div>
                <p>
                아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...
                아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...
                아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...
                아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...
                아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...아 타릭 따먹고 싶다...
                </p>
            </div>

            <div class="section" id="p3">
                <div class="name">Kim Dong Hyun</div>
                <div class="about-border"></div>
                <p style={{textAlign:"center"}}>
                21511722 컴퓨터공학과 김동현
                </p>
            </div>

            <div class="section" id="p4">
                <div class="name">Lee Sung Keun</div>
                <div class="about-border"></div>
                <p>
                로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄
                로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄
                로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄
                로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄
                로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄로리콘은범죄
                </p>
            </div>

            <div class="section" id="p5">
                <div class="name">Son Chang Won</div>
                <div class="about-border"></div>
                <p>
                동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요
                동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요
                동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요
                동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요
                동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요동현님사랑해요
                </p>
            </div>
        </div>
        </>
    );
}
