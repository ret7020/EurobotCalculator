import React, { useState } from "react";
import "./App.css";

function App() {
  const calculate_points = (with_bonus = false) => {
    return (
      parseInt(cherriesInsideBasket) +
      basket * 5 +
      counterWorks * 5 +
      correctParking * 15 +
      funnyActionPerformed * 5
    );
  };
  const [fines_selected, setSelectedFines] = useState([]);
  const fines_list = [
    { title: "Часть робота упала на поле", points: 20, id: 0 },
    { title: "Ухудшение поля или игровых элементов", points: 30, id: 1 },
    {
      title: "Нерабочая система предотвращения столкновений",
      points: 30,
      id: 2,
    },
    { title: "Некорректный старт", points: 50, id: 3 },
    { title: "Движение робота после окончания матча", points: 50, id: 4 },
    { title: "Черезмерное время подготовки", points: 50, id: 5 },
  ];
  const [cherriesInsideBasket, setCherriesInsideBasket] = useState(0);
  const [prediction, SetPrediction] = useState(0);
  const [basket, setBasket] = useState(false);
  const [counterWorks, setCounterWorks] = useState(false);
  const [correctParking, setCorrectParking] = useState(false);
  const [funnyActionPerformed, setFunnyActionPerformed] = useState(false);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-2">Eurobot 2023 Calculator</h1>
        <div className="text-center mb-4">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#pointsCalculated"
            >
              Подсчёт
            </button>
            <a
              className="btn btn-light"
              href="https://www.coupederobotique.fr/wp-content/uploads/Eurobot2023_Rules_EN_FINALE.pdf"
              target="__blank"
              role="button"
            >
              Правила
            </a>
            <button type="button" className="btn btn-danger">
              Отчистить форму
            </button>
          </div>
        </div>
        <form>
          <div className="col col-lg-5 mx-auto">
            <div className="mb-3">
              <label htmlFor="fineHelp" className="form-label">
                Штраф
              </label>
              <input
                type="number"
                className="form-control"
                id="fine_points_cnt"
                aria-describedby="fineHelp"
                value="0"
                data-points-coeff="1"
              />
              <div id="fineHelp" className="form-text">
                Количество штрафных очков (
                <a
                  className="text-primary pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#fineSelectModal"
                >
                  Выбрать нарушения
                </a>
                )
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Собранные торты </label>
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#addCake"
                >
                  Добавить торт
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label for="correctCakesHelp" className="form-label">
                Количество вишенок в корзине
              </label>
              <input
                type="number"
                className="form-control"
                id="cherries_in_basket_cnt"
                aria-describedby="correctCakesHelp"
                value={cherriesInsideBasket}
                onChange={(e) => {
                  setCherriesInsideBasket(e.target.value);
                }}
                data-points-coeff="1"
              />
              <div id="correctCakesHelp" className="form-text">
                Сколько вишенок было заброшено в корзину(<b>1 pnt</b>)
              </div>
            </div>

            <div className="mb-3">
              <label for="correctCakesHelp" className="form-label">
                Прогноз
              </label>
              <input
                type="number"
                className="form-control"
                id="predicted_points"
                aria-describedby="correctCakesHelp"
                value={prediction}
                onChange={(e) => {
                  SetPrediction(e.target.value);
                }}
              />
              <div id="correctCakesHelp" className="form-text">
                бонус = 20 - abs(real - prediction)
              </div>
            </div>
          </div>
          <div className="col col-lg-5 mx-auto">
            <label for="correctCakesHelp" className="form-label">
              True/False
            </label>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="basketPlaced"
                data-points="5"
                value={basket}
                onChange={(e) => {
                  setBasket(e.target.checked);
                }}
              />
              <label className="form-check-label" for="basketPlaced">
                У команды есть корзина
              </label>
              <div id="basketPlaced" className="form-text">
                Команда установила корзину во время подготовки(<b>5 pnt</b>)
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="backetCounterWorks"
                data-points="5"
                value={counterWorks}
                onChange={(e) => {
                  setCounterWorks(e.target.checked);
                }}
              />
              <label className="form-check-label" for="backetCounterWorks">
                Счётчик корзины правильно работает
              </label>
              <div id="backetCounterWorks" className="form-text">
                Счётчик на корзине показывает количество вишенок внутри неё(
                <b>5 pnt</b>)
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="robotsReturn"
                data-points="15"
                value={correctParking}
                onChange={(e) => {
                  setCorrectParking(e.target.checked);
                }}
              />
              <label className="form-check-label" for="robotsReturn">
                Роботы правильно вернулись
              </label>
              <div id="robotsReturn" className="form-text">
                В конце матча роботы находятся на своих местах(<b>15 pnt</b>)
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="finalActionDone"
                data-points="5"
                value={funnyActionPerformed}
                onChange={(e) => {
                  setFunnyActionPerformed(e.target.checked);
                }}
              />
              <label className="form-check-label" for="finalActionDone">
                Весёлое действие
              </label>
              <div id="finalActionDone" className="form-text">
                Funny action(<b>5 pnt</b>)
              </div>
            </div>
          </div>
          <div className="col col-lg-5 mx-auto">
            <span className="text-secondary ">
              Coded with ReactJS by RobotX team
            </span>
          </div>
        </form>
      </div>

      <div
        className="modal fade"
        id="fineSelectModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fineSelectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="fineSelectModalLabel">
                Выбор штрафов
              </h5>
            </div>
            <div className="modal-body">
              <form id="fines_select_form">
                {fines_list.map((item) => (
                  <div className="mb-3 form-check" key={item.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFines([...fines_selected, item.id]);
                        }
                      }}
                      id={`fine_${item.id}`}
                    />
                    <label
                      className="form-check-label black"
                      htmlFor={`fine_${item.id}`}
                    >
                      {item.title}
                    </label>
                    <div id="fine_0" className="form-text">
                      {item.points} pnts
                    </div>
                  </div>
                ))}

                <label className="form-check-label black">Итого: </label>
                <span id="fine_points_cnt_preview">0</span>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick="apply_fines()"
                data-bs-dismiss="modal"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="pointsCalculated"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="pointsCalculatedLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pointsCalculatedLabel">
                Итоговые баллы
              </h5>
            </div>
            <div className="modal-body">
              <div className="row">
                <label className="form-check-label black">
                  Без бонуса:{" "}
                  <span id="points_without_bonus">{calculate_points()}</span>
                </label>
                <label className="form-check-label black">
                  Бонус: <span id="points_with_bonus">0</span>
                </label>
                <label className="form-check-label black">
                  Итого: <span id="points_final">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addCake"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addCakeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCakeLabel">
                Добавить торт(ы)
              </h5>
            </div>
            <div className="modal-body">
              <div className="row mw-85 mx-auto">
                <div className="mb-3 form-check">
                  <label htmlFor="fineHelp" className="form-label text-body">
                    Количество слоёв
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="layers_cnt"
                    aria-describedby="layers_cnt"
                    min={0}
                    max={3}
                    data-points-coeff="1"
                  />
                  <div id="layers_cnt" className="form-text">
                    Количество слоёв в торте (<b>1 pnt</b>)
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="legendary"
                    data-points="5"
                    value={funnyActionPerformed}
                    onChange={(e) => {
                      setFunnyActionPerformed(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label text-body"
                    htmlFor="legendary"
                  >
                    Собран по легендарному рецепту
                  </label>
                  <div id="legendary" className="form-text">
                    Слои торта расположены в определённом порядке(<b>4 pnt</b>)
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="cherry_placed"
                    data-points="5"
                    value={funnyActionPerformed}
                    onChange={(e) => {
                      setFunnyActionPerformed(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label text-body"
                    htmlFor="cherry_placed"
                  >
                    На торт установлена вишенка
                  </label>
                  <div id="cherry_placed" className="form-text">
                    На верхнем слое торта есть вишенка(<b>3 pnt</b>)
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick=""
                  data-bs-dismiss="modal"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
