import React from "react";
import styled from "styled-components";

export const Button = ({ title, onClick, textColor, color1, color2, type }) => {
  return (
    <StyledWrapperButton
      colorone={color1}
      colortwo={color2}
      textcolor={textColor}
    >
      <button
        type={type ? type : "button"}
        className="button"
        onClick={onClick}
      >
        <span className="fold" />
        <div className="points_wrapper">
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
        </div>
        <span className="inner">
          <p className="text-xl text-nowrap">{title}</p>
        </span>
      </button>
    </StyledWrapperButton>
  );
};

const StyledWrapperButton = styled.div`
  .button {
    --h-button: 48px;
    --w-button: 102px;
    --round: 0.75rem;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.25s ease;
    background: radial-gradient(
        65.28% 65.28% at 50% 100%,
        ${(props) => props.color} 0%,
        rgba(223, 113, 255, 0) 100%
      ),
      linear-gradient(
        0deg,
        ${(props) => props.colortwo},
        ${(props) => props.colortwo}
      );
    border-radius: var(--round);
    border: none;
    outline: none;
    padding: 12px 18px;
    width: 100%;
  }
  .button::before,
  .button::after {
    content: "";
    position: absolute;
    inset: var(--space);
    transition: all 0.5s ease-in-out;
    border-radius: calc(var(--round) - var(--space));
    z-index: 0;
  }
  .button::before {
    --space: 1px;
    background: linear-gradient(
      177.95deg,
      rgba(255, 255, 255, 0.19) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  .button::after {
    --space: 2px;
    background: radial-gradient(
        65.28% 65.28% at 50% 100%,
        ${(props) => props.colorone} 0%,
        rgba(223, 113, 255, 0) 100%
      ),
      linear-gradient(
        0deg,
        ${(props) => props.colortwo},
        ${(props) => props.colortwo}
      );
  }
  .button:active {
    transform: scale(0.95);
  }

  .fold {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    height: 1rem;
    width: 1rem;
    display: inline-block;
    transition: all 0.5s ease-in-out;
    background: radial-gradient(
      100% 75% at 55%,
      $((props) => props.color1) 0%,
      rgba(223, 113, 255, 0) 100%
    );
    box-shadow: 0 0 3px black;
    border-bottom-left-radius: 0.5rem;
    border-top-right-radius: var(--round);
  }
  .fold::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 150%;
    height: 150%;
    transform: rotate(45deg) translateX(0%) translateY(-18px);
    background-color: #e8e8e8;
    pointer-events: none;
  }
  .button:hover .fold {
    margin-top: -1rem;
    margin-right: -1rem;
  }

  .points_wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    z-index: 1;
  }

  .points_wrapper .point {
    bottom: -10px;
    position: absolute;
    animation: floating-points infinite ease-in-out;
    pointer-events: none;
    width: 2px;
    height: 2px;
    background-color: #fff;
    border-radius: 9999px;
  }
  @keyframes floating-points {
    0% {
      transform: translateY(0);
    }
    85% {
      opacity: 0;
    }
    100% {
      transform: translateY(-55px);
      opacity: 0;
    }
  }
  .points_wrapper .point:nth-child(1) {
    left: 10%;
    opacity: 1;
    animation-duration: 2.35s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(2) {
    left: 30%;
    opacity: 0.7;
    animation-duration: 2.5s;
    animation-delay: 0.5s;
  }
  .points_wrapper .point:nth-child(3) {
    left: 25%;
    opacity: 0.8;
    animation-duration: 2.2s;
    animation-delay: 0.1s;
  }
  .points_wrapper .point:nth-child(4) {
    left: 44%;
    opacity: 0.6;
    animation-duration: 2.05s;
  }
  .points_wrapper .point:nth-child(5) {
    left: 50%;
    opacity: 1;
    animation-duration: 1.9s;
  }
  .points_wrapper .point:nth-child(6) {
    left: 75%;
    opacity: 0.5;
    animation-duration: 1.5s;
    animation-delay: 1.5s;
  }
  .points_wrapper .point:nth-child(7) {
    left: 88%;
    opacity: 0.9;
    animation-duration: 2.2s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(8) {
    left: 58%;
    opacity: 0.8;
    animation-duration: 2.25s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(9) {
    left: 98%;
    opacity: 0.6;
    animation-duration: 2.6s;
    animation-delay: 0.1s;
  }
  .points_wrapper .point:nth-child(10) {
    left: 65%;
    opacity: 1;
    animation-duration: 2.5s;
    animation-delay: 0.2s;
  }

  .inner {
    z-index: 2;
    position: relative;
    width: 100%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    transition: color 0.2s ease-in-out;
    gap: 8px;
    color: ${(props) => (props.textcolor ? props.textcolor : "white")};
  }

  .inner svg.icon {
    width: 18px;
    height: 18px;
    transition: fill 0.1s linear;
  }

  .button:focus svg.icon {
    fill: white;
  }
  .button:hover svg.icon {
    fill: transparent;
    animation: dasharray 1s linear forwards, filled 0.1s linear forwards 0.95s;
  }
  @keyframes dasharray {
    from {
      stroke-dasharray: 0 0 0 0;
    }
    to {
      stroke-dasharray: 68 68 0 0;
    }
  }
  @keyframes filled {
    to {
      fill: white;
    }
  }
`;

export const Form = () => {
  return (
    <StyledWrapperForm>
      <form className="form">
        <div className="title">
          Welcome,
          <br />
          <span>sign up to continue</span>
        </div>
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
        />
        <div className="login-with">
          <div className="button-log">
            <b>t</b>
          </div>
          <div className="button-log">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width="56.6934px"
              viewBox="0 0 56.6934 56.6934"
              version="1.1"
              style={{ enableBackground: "new 0 0 56.6934 56.6934" }}
              id="Layer_1"
              height="56.6934px"
              className="icon"
            >
              <path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017  c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139  c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649  c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805  c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294  c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196  c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372  C14.7889,7.8907,9.6815,12.3763,6.8497,18.0459c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836  C3.6238,29.5732,4.382,35.2707,6.8468,40.1378c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078  c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138  C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z" />
            </svg>
          </div>
          <div className="button-log">
            <svg
              className="icon"
              height="56.693px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 56.693 56.693"
              width="56.693px"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029  c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77  L40.43,21.739z" />
            </svg>
          </div>
        </div>
        <button className="button-confirm">Let`s go →</button>
      </form>
    </StyledWrapperForm>
  );
};

const StyledWrapperForm = styled.div`
  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: beige;
    --main-color: black;
    padding: 20px;
    background: lightblue;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .title span {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .input:focus {
    border: 2px solid var(--input-focus);
  }

  .login-with {
    display: flex;
    gap: 20px;
  }

  .button-log {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    color: var(--font-color);
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: var(--main-color);
  }

  .button-log:active,
  .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .button-confirm {
    margin: 50px auto 0 auto;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
`;
