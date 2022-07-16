import React from "react";
import { Link } from "react-scroll";
import TestItem from "./TestItem";

const Test = (props) => {
  let qsns = Object.keys(props.test);
  let drow = true;
  let showDeley = 0.3;

  let restartTest = () => {
    props.dispatch({ type: "RESTART_TEST" });
    qsns.sort(() => Math.random() - 0.5);
    drow = false;
  };

  let takeResalt = () => {
    props.dispatch({ type: "GIVE_RESULT_TEST" });
  };

  let drowQsns = qsns.map((qsn, index) => {
    let show = {
      animation: "fadeInUpBig",
      animationDuration: showDeley + "s",
    };
    showDeley += 0.2;
    return (
      <TestItem
        show={show}
        stateTest={props.stateTest}
        dispatch={props.dispatch}
        qsn={props.test[qsn]}
        id={index}
        qsnQty={qsns.length}
      />
    );
  });

  return (
    <div>
      {drow ? drowQsns : false}

      <div className="test-result">{props.stateTest.testResult}</div>

      {props.stateTest.btnFinishTest ? (
        <button onClick={takeResalt} className="btn-finish-test button ">
          завершить тест
        </button>
      ) : (
        <Link
          smooth={true}
          offset={-70}
          duration={500}
          to={1}
          spy={true}
          onClick={restartTest}
          className="btn-finish-test button "
        >
          пройти заново
        </Link>
      )}
    </div>
  );
};

export default Test;
