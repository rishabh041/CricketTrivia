import React from "react";
import "./index.css";

const QuestionComp = ({ question, options, showError, selected, setAnswer }) => {

    return (
        <div className={showError === true ? "errorQuestionBox" : "questionBox"}>
            <div className="questionWrapper">{question}</div>
            <div className="answersWrapper">
                <select onChange={setAnswer} value={selected}>
                    <option value="" >
                        Select an Option
                    </option>
                    {options.map((text, index) => (
                        <option
                            key={index}
                            value={text}
                        >
                            {text}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default QuestionComp;