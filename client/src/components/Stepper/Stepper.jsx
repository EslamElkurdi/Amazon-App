import React from 'react';
import './Stepper.css';
import { TiTick } from 'react-icons/ti';

function Stepper({ orderState }) {
  const steps = ["Processing", "Shipping", "Delivered", "Received"];
  return (
    <div className='stepperContainer'>
      {steps?.map((step, i) => (
        <div key={i} className={`step-item ${step === orderState && "activeParent"} ${steps.indexOf(step) < steps.indexOf(orderState) && "completeParent"}`}>
          <div className={`step ${step === orderState && "active"} ${steps.indexOf(step) < steps.indexOf(orderState) && "complete"}`}>
            {steps.indexOf(step) < steps.indexOf(orderState) ? <TiTick size={24} /> : (steps.indexOf(orderState)==steps.length-1)?<TiTick size={24} />:i + 1}
          </div>
          <p className='stepParag'>{step}</p>
        </div>
      ))}
    </div>
  );
}

export default Stepper;