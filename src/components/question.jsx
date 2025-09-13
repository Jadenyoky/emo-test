import React, { useRef, useState } from "react";
import Radio, { Button } from "./elements";
import { useQuiz } from "@/lib/quizProvider";
import Loader from "./loader";
import { serverTimestamp } from "firebase/firestore";

const Question = ({
  allData,
  quizItemId,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
  updateQuizItemId,
  onResult,
}) => {
  const { quizData, updateQuizData, quizLoading } = useQuiz();

  const [videoPaused, setvideoPaused] = useState(false);
  const videoRef = useRef(null);

  const [alert, setalert] = useState(false);

  const handleVideo = () => {
    if (videoPaused) {
      videoRef.current.play();
      setvideoPaused(!videoPaused);
    } else {
      videoRef.current.pause();
      setvideoPaused(!videoPaused);
    }
  };

  const handleAlert = () => {
    setalert(!alert);
  };

  const handleReset = () => {
    setalert(false);
    updateQuizData({
      currentQuiz: {
        lastQuestion: null,
        answers: {},
        quizScore: 0,
        completed: false,
        startedAt: serverTimestamp(),
        completedAt: null,
      },
    });
    updateQuizItemId(0);
    setvideoPaused(false);
  };

  const handleLastQuestion = () => {
    updateQuizItemId(quizData?.currentQuiz?.lastQuestion - 1);
  };

  const showLastQuestion = () => {
    if (
      quizData?.currentQuiz?.lastQuestion &&
      quizData?.currentQuiz?.lastQuestion - 1 !== quizItemId &&
      quizData?.currentQuiz?.lastQuestion - 1 > quizItemId
    )
      return true;

    return false;
  };

  return (
    <div
      className={` flex-1 max-w-[100%] w-[500px] ${
        quizLoading ? "bg-[white]" : "bg-[var(--gold)]"
      }
            shadow-[var(--shadow2)]
            rounded-2xl max-md:rounded-[24px_24px_0_0] px-8 py-6 mx-auto flex flex-col justify-between gap-4 `}
    >
      {quizLoading ? (
        <>
          <div className="relative justify-between flex flex-col gap-4 ">
            <div className="h-[12px] rounded-full bg-white flex flex-col justify-center shadow-[var(--shadow3)]">
              <div
                className={`h-full rounded-full bg-[var(--sky)]
                transition-all duration-500 ease-in-out
                `}
                style={{
                  width: `${((quizItemId + 1) / allData.items.length) * 100}%`,
                  background:
                    "linear-gradient(90deg, var(--teal), var(--gold))",
                }}
              ></div>
            </div>

            <div className="relative bg-[var(--warm)] p-4 rounded-2xl flex items-start justify-between">
              <div
                className="w-fit bg-[var(--teal)] rounded-full flex flex-col gap-2 p-2 max-sm:p-1 items-center font-[space_grotesk] text-[var(--gold)]
            "
              >
                <p className="text-xl max-md:text-lg font-semibold text-[var(--teal)] w-[40px] h-[40px] max-md:h-[30px] max-md:w-[30px] rounded-full flex items-center justify-center bg-[var(--gold)]">
                  {allData.items[quizItemId].id}
                </p>{" "}
                <p className="">of</p>
                <p className="text-xl max-md:text-base font-semibold text-[var(--teal)] w-[40px] h-[40px] max-md:h-[30px] max-md:w-[30px] rounded-full flex items-center justify-center bg-[var(--warm)]">
                  {allData.items.length}
                </p>
              </div>

              <video
                ref={videoRef}
                src={allData.items[quizItemId].video}
                loop
                muted
                autoPlay
                className={`aspect-square object-cover rounded-3xl max-w-[50%] shadow-[var(--shadow2)] transition-all
            ${
              videoPaused
                ? "scale-90 brightness-80"
                : "scale-100 brightness-100"
            }`}
              />

              <div className="flex flex-col gap-2">
                {!videoPaused ? (
                  <button
                    className="cursor-pointer w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] rounded-full bg-[var(--red)] flex items-center justify-center text-[var(--smokey)]
                hover:shadow-[var(--shadow3)] transition-all outline-none
                "
                    onClick={() => {
                      handleVideo();
                    }}
                  >
                    <i className="fi fi-sr-pause mt-1.5 text-xl max-sm:text-base"></i>
                  </button>
                ) : (
                  <button
                    className="cursor-pointer w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] rounded-full bg-[var(--teal)] flex items-center justify-center text-[var(--gold)]
                shadow-[var(--shadow)] hover:shadow-[var(--shadow3)] transition-all outline-none
                "
                    onClick={() => {
                      handleVideo();
                    }}
                  >
                    <i className="fi fi-sr-play mt-1.5 text-xl max-sm:text-base"></i>
                  </button>
                )}
                {showLastQuestion() && (
                  <button
                    className="cursor-pointer w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] rounded-full bg-[var(--teal)] flex items-center justify-center text-[var(--gold)]
                hover:shadow-[var(--shadow3)] transition-all outline-none
                "
                    onClick={() => {
                      handleLastQuestion();
                    }}
                  >
                    <i className="fi fi-sr-leaf-maple mt-1.5 text-xl max-sm:text-base"></i>
                  </button>
                )}
                {quizData?.currentQuiz?.answers &&
                  Object.keys(quizData?.currentQuiz?.answers).length > 1 && (
                    <button
                      className="cursor-pointer w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] rounded-full bg-[var(--red)] flex items-center justify-center text-[var(--smokey)]
                hover:shadow-[var(--shadow3)] transition-all outline-none
                "
                      onClick={() => {
                        handleAlert();
                      }}
                    >
                      <i className="fi fi-ss-coffee mt-1.5 text-xl max-sm:text-base"></i>
                    </button>
                  )}
              </div>
            </div>
            <div className="text-[var(--sky)] font-semibold flex-1 text-right my-3 text-lg max-sm:text-base">
              {allData.question}
            </div>
          </div>

          <Radio
            name={`q-${allData.items[quizItemId].id}`}
            options={allData.items[quizItemId].options}
            selected={selectedAnswer}
            onChange={onAnswerSelect}
          />

          <div className="flex flex-wrap items-center max-w-[100%] w-[500px] mx-auto justify-between gap-4 *:flex-1">
            {!isFirst && (
              <div className="">
                <Button
                  color1={"var(--gold)"}
                  color2={"var(--red)"}
                  textColor={"black"}
                  title="السابق"
                  onClick={() => {
                    onPrev();
                    setvideoPaused(false);
                  }}
                />
              </div>
            )}
            {isLast ? (
              <div className="">
                <Button
                  disabled={!selectedAnswer}
                  color1={"var(--gold)"}
                  color2={"var(--teal)"}
                  textColor={"var(--gold)"}
                  title={"النتيجة"}
                  onClick={() => {
                    onResult();
                  }}
                />
              </div>
            ) : (
              <div className="">
                <Button
                  disabled={!selectedAnswer}
                  color1={"var(--teal)"}
                  color2={"var(--teal)"}
                  textColor={"var(--gold)"}
                  title={"التالي"}
                  onClick={() => {
                    onNext();
                    setvideoPaused(false);
                  }}
                />
              </div>
            )}
          </div>

          {alert && (
            <div className=" z-[200] fixed h-svh w-full top-0 left-0 flex flex-col justify-center max-md:justify-end items-center backdrop-blur-lg ">
              <div
                className="fixed z-[-1] h-svh w-full top-0 left-0  bg-[var(--black)] opacity-50"
                onClick={() => {
                  handleAlert();
                }}
              />
              <div className="bg-[var(--smokey)] rounded-2xl px-16 max-md:px-4 py-8 drop-shadow-2xl max-md:w-[100%] flex justify-center shadow-[var(--shadow3)] flex-wrap max-md:rounded-[32px_32px_0_0]">
                <div className="w-fit flex justify-center gap-8 flex-col flex-wrap">
                  <div className="flex flex-col text-right gap-4 bg-[var(--warm)] rounded-2xl p-4">
                    <p className="text-lg max-md:text-base text-[var(--red)] font-semibold">
                      انت متأكد انك عاوز تمسح الاختبار الحالي ؟
                    </p>
                    <p className="text-sm text-[var(--black)] opacity-50">
                      كل الاجابات السابقة سيتم حذفها
                    </p>
                  </div>
                  <div className="flex justify-between gap-4 *:flex-1 flex-wrap">
                    <Button
                      color1={"var(--teal)"}
                      color2={"var(--teal)"}
                      textColor={""}
                      title="رجوع"
                      onClick={() => {
                        handleAlert();
                      }}
                    />
                    <Button
                      color1={"var(--red)"}
                      color2={"var(--red)"}
                      textColor={""}
                      title="ابدأ من جديد"
                      onClick={() => {
                        handleReset();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center flex-1">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Question;
