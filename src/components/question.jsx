import React from "react";
import Radio, { Button } from "./elements";

const Question = ({
  allData,
  quizItemId,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  return (
    <div
      className=" flex-1 max-w-[100%] w-[500px] bg-[white] 
            shadow-[var(--shadow2)] 
            rounded-2xl max-md:rounded-[24px_24px_0_0] px-8 py-6 mx-auto flex flex-col justify-between gap-4 "
    >
      <div className="relative justify-between flex flex-col gap-4 ">
        <div className="h-[12px] rounded-full bg-white flex flex-col justify-center shadow-[var(--shadow)]">
          <div
            className={`h-full rounded-full bg-[var(--sky)]
                transition-all duration-500 ease-in-out
                `}
            style={{
              width: `${((quizItemId + 1) / allData.items.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="relative rounded-2xl flex items-center justify-center">
          <div
            className="bg-[white] w-fit px-4 rounded-full text-[var(--purple)] flex gap-2 items-center shadow-[var(--shadow)] font-[space_grotesk]
            absolute top-[0] left-0"
          >
            <p className="text-xl text-[var(--sky)]">
              {allData.items[quizItemId].id}
            </p>{" "}
            <div className="flex gap-1 text-xs">
              <span className="">/</span>
              <p className="">{allData.items.length}</p>
            </div>
          </div>
          <video
            src={allData.items[quizItemId].video}
            loop
            muted
            autoPlay
            className="aspect-square object-cover rounded-2xl max-w-[50%]
                 shadow-[var(--shadow2)] max-md:ml-10
                "
          />
        </div>
        <div className="text-[var(--sky)] flex-1 text-right my-3 text-lg max-sm:text-base">
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
              }}
            />
          </div>
        )}
        {isLast ? (
          <div className="">
            <Button
              disabled={!selectedAnswer}
              color1={"var(--purple)"}
              color2={"var(--purple)"}
              textColor={"var(--gold)"}
              title={"النتيجة"}
              onClick={() => {
                onNext();
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
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
