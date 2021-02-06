import React, { useState } from 'react';
import '../App.css';


const Modal: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState(["none", "none", "none", "none"])

   
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

  );
}

export default Modal;