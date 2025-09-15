import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Button = ({
  title,
  onClick,
  textColor,
  color1,
  color2,
  type,
  disabled,
}) => {
  return (
    <StyledWrapperButton
      $colorone={color1}
      $colortwo={color2}
      $textcolor={textColor}
    >
      <button
        type={type ? type : "button"}
        className="button"
        onClick={onClick}
        disabled={disabled}
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
  .button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
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
        ${(props) => props.$colorone} 0%,
        rgba(223, 113, 255, 0) 100%
      ),
      linear-gradient(
        0deg,
        ${(props) => props.$colortwo},
        ${(props) => props.$colortwo}
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
    box-shadow: 0 0 3px white;
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
    color: ${(props) => (props.$textcolor ? props.$textcolor : "white")};
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

export const Radio = ({ name, options, selected, onChange }) => {
  return (
    <StyledWrapper className="relative flex-1 *:flex-1 bg-[var(--white)] rounded-2xl px-4 py-4 shadow-[var(--shadow2)] font-[changa] overflow-hidden">
      <img
        src="/pics/quiz-options.png"
        className="absolute top-0 right-25 bg-cover max-w-[100%] rotate-12 opacity-5 pointer-events-none"
      />
      {options?.map((option, i) => {
        return (
          <label key={i} className="radio-label">
            <input
              className="radio-input"
              type="radio"
              name={name}
              checked={selected === option}
              value={option}
              onChange={() => onChange(option)}
            />
            <span className="radio-custom" />
            <span className="radio-text">{option}</span>
          </label>
        );
      })}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 15px;
  direction: rtl;

  .radio-label {
    display: flex;
    gap: 25px;
    align-items: center;
    // margin: 30px 0;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .radio-input {
    display: none;
  }

  .radio-custom {
    width: 22px;
    height: 22px;
    background-color: transparent;
    border: 2px solid #5c5e79;
    border-radius: 50%;
    margin-right: 18px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .radio-custom::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: #8a8b9f;
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .radio-custom::after {
    content: "";
    position: absolute;
    width: 34px;
    height: 34px;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: #00a6ff;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s ease;
  }

  .radio-text {
    // font-size: 1.1rem;
    font-size: 16px;
    font-weight: 500;
    color: #c1c3d9;
    transition: color 0.3s ease;
  }

  .radio-label:hover .radio-input:not(:checked) + .radio-custom {
    transform: scale(1.1);
    border-color: #8a8daf;
  }

  .radio-label:hover .radio-text {
    color: var(--purple);
  }

  .radio-input:checked + .radio-custom {
    border-color: #00a6ff;
    transform: scale(0.9);
  }

  .radio-input:checked + .radio-custom::before {
    transform: scale(1);
    background-color: #00a6ff;
  }

  .radio-input:checked + .radio-custom::after {
    opacity: 1;
    transform: scale(1.3);
    animation: orbit 2.5s infinite linear;
    box-shadow: 0 0 30px #00a6ff, 0 0 80px rgba(0, 166, 255, 0.2);
  }

  .radio-input:checked ~ .radio-text {
    color: #00a6ff;
    // font-weight: 700;
  }

  @keyframes orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
