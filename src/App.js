import React, { PureComponent } from 'react';
import './App.css';
import { questionData } from "./assets/Data"
import QuestionComp from "./components/QuestionComp"
import BarGraph from "./components/BarGraph"

class App extends PureComponent {
  state = {
    showGraphFlag: false,
    userAnswers: {},
    submitFlag: false,
    mediaWidth: window.innerWidth
  };
  questionData = questionData;
  totLength = questionData.length;
  componentDidMount() {
    window.addEventListener('resize', () => this.setState({ mediaWidth: window.innerWidth }));
  }
  resetHandler = () => {
    this.setState({
      submitFlag: false,
      resetFlag: true,
      userAnswers: {},
      showGraphFlag: false
    })
  }
  submitQuizHandler = () => {
    let correctAns = 0, flag = true;
    for (let i = 0; i < this.totLength; i++) {
      const userAns = this.state.userAnswers[this.questionData[i].id];
      if (!userAns) {
        flag = false;
        break;
      }
      else if (userAns === this.questionData[i].correct)
        correctAns++;
    }
    if (flag) {
      this.setState({
        correctAns,
        showGraphFlag: true
      })
    }
    else {
      this.setState({ showGraphFlag: false, submitFlag: true })
    }
  }
  setAnswer = (e, qIndex) => {
    let ansArr = { ...this.state.userAnswers };
    if (ansArr[qIndex] !== e.target.value) {
      ansArr[qIndex] = e.target.value;
      this.setState({
        userAnswers: ansArr,
      })
    }
    if (this.state.resetFlag === true)
      this.setState({ resetFlag: false });
  }
  render() {
    return (
      <div className="container">
        <h2 className="title">Cricket Trivia</h2>
        <div className={this.state.mediaWidth >= 768 ? "bodyContainer" : "bodyContainer1"}>
          <div className="quizContainer">
            {this.questionData.map(({ question, answers, id }) => {
              return (
                <QuestionComp
                  key={`question_${id}`}
                  question={question}
                  options={answers}
                  showError={this.state.submitFlag === true && !this.state.userAnswers[id] ? true : false}
                  selected={this.state.resetFlag === true ? "" : this.state.userAnswers[id] || ""}
                  setAnswer={(e) => this.setAnswer(e, id)}
                />
              )
            }
            )
            }
            <div className="btnHandler">
              <button type="button" onClick={this.submitQuizHandler}>Submit</button>
              <button type="reset" onClick={this.resetHandler}>Clear Values</button>
            </div>
          </div>
          {this.state.showGraphFlag && <div className="barGraphContainer">
            <BarGraph correctAns={this.state.correctAns} wrongAns={this.totLength - this.state.correctAns} />
          </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
