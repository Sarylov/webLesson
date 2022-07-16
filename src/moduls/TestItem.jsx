import React from "react";

const TestItem = (props) => {
  let asks = props.qsn.ask;
  // asks.sort(() => Math.random() - 0.5);

  let handleChangeRadio = (event) => {
    props.dispatch({
      type: "CHANGE_ASK",
      ask: event.target.value,
      name: event.target.name,
      id: event.target.id,
      qty: props.qsnQty,
    });
  };

  let drowAsks = asks.map((ask, index) => {
    let res = [];
    res.push();
    res.push(
      <label>
        <input
          onChange={handleChangeRadio}
          name={"ask" + props.id}
          type="radio"
          id={"ask" + props.id + index}
          value={ask}
          checked={
            // props.stateTest.checkedAsk === ask &&
            props.stateTest.checkedId.includes("ask" + props.id + index) &&
            props.stateTest.btnFinishTest
          }
        />
        {ask.replace("<s>", "")}
      </label>
    );

    return res;
  });

  return (
    <div className="qsn" style={props.show} id={props.id + 1}>
      <h2 className="content__title">{props.qsn.qsn}</h2>

      {drowAsks}
    </div>
  );
};

export default TestItem;
