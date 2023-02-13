import React, { useState } from "react";
import "./App.css";

function download_as_file(filename, data) {
  const blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function App() {
  const generate_report = () => {
    let [real_points, bonus, final_points] = calculate_points();
    let report = `Eurobot 2023 Report
---------------
Итоговые баллы: ${final_points}
Баллы без бонуса: ${real_points}
Размер бонуса: ${bonus}
---------------
Наличие корзины: ${basket * 5} points
Счётчик корзины: ${counterWorks * 5} points
Парковка роботов: ${correctParking * 15} points
Весёлое действие: ${funnyActionPerformed * 5} points
---------------
Торты
слои|легендарный рецепт|вишня cверху
`;
    let cakes_string = "";
    let final_cakes = 0;
    cakes.forEach((cake) => {
      let curr_cake = cake.layers + cake.legend * 4 + cake.cherry_on_top * 3;
      cakes_string += `${cake.layers} + ${cake.legend * 4} + ${
        cake.cherry_on_top * 3
      } = ${curr_cake}\n`;
      final_cakes += curr_cake;
    });
    report += cakes_string + `Суммарно: ${final_cakes}`;
    download_as_file("report.txt", report);
  };

  const apply_fines = () => {
    let final_fine = 0;
    fines_selected.forEach((fine_id) => {
      final_fine += fines_list[fine_id].points;
    });
    SetFineValue(final_fine);
  }

  const calculate_points = () => {
    // Basic
    let real_points =
      parseInt(cherriesInsideBasket) +
      basket * 5 +
      counterWorks * 5 +
      correctParking * 15 +
      funnyActionPerformed * 5;
    // Cakes
    cakes.forEach((cake) => {
      real_points += calculate_cake(cake);
    });
    let bonus = 20 - Math.abs(real_points - parseInt(prediction));
    if (bonus < 0) bonus = 0;
    return [real_points, bonus, real_points + bonus];
  };
  const calculate_cake = (cake) => {
    return cake.layers + cake.legend * 4 + cake.cherry_on_top * 3;
  };

  const [fines_selected, setSelectedFines] = useState([]);
  const [fineValue, SetFineValue] = useState(0);

  const fines_list = [
    { title: "Часть робота упала на поле", points: 20},
    { title: "Ухудшение поля или игровых элементов", points: 30},
    {
      title: "Нерабочая система предотвращения столкновений",
      points: 30,
    },
    { title: "Некорректный старт", points: 50},
    { title: "Движение робота после окончания матча", points: 50},
    { title: "Черезмерное время подготовки", points: 50},
  ];

  // Global input
  const [cherriesInsideBasket, setCherriesInsideBasket] = useState(0);
  const [prediction, SetPrediction] = useState(0);
  const [basket, setBasket] = useState(false);
  const [counterWorks, setCounterWorks] = useState(false);
  const [correctParking, setCorrectParking] = useState(false);
  const [funnyActionPerformed, setFunnyActionPerformed] = useState(false);

  // For Cake
  const [layersCnt, SetLayersCnt] = useState(1);
  const [legendaryBuild, SetLegendaryBuild] = useState(false);
  const [cherryOnTop, SetCherryOnTop] = useState(false);
  const [cakesCnt, SetCakesCnt] = useState(1);

  // Cakes pool
  const [cakes, SetCakes] = useState([]);
  // Saved

  // Cake example
  /* {
    "layers": int,
    "legend": bool,
    "cherry_on_top": bool,
  }
  */

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
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                generate_report();
              }}
            >
              Отчёт
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
                value={fineValue}
                min={0}
                onChange={(e) => {SetFineValue(e.target.value)}}
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
                  className="btn btn-primary btn-sm mb-2"
                  style={{ marginRight: 10 }}
                  data-bs-toggle="modal"
                  data-bs-target="#addCake"
                >
                  Добавить торт
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm mb-2"
                  onClick={(e) => {
                    SetCakes([]);
                  }}
                >
                  Удалить все торты
                </button>
              </div>

              <div>
                <ol class="list-group list-group-numbered">
                  {cakes.map((cake, index) => (
                    <li
                      class="list-group-item d-flex justify-content-between align-items-start"
                      key={index}
                    >
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">
                          Торт - {cake.layers}{" "}
                          {cake.layers == 1 ? "слой" : "слоя"}
                        </div>
                        {cake.legend ? "Легендарный" : "Обычный"}{" "}
                        {cake.cherry_on_top ? "с вишней" : "без вишни"}
                      </div>
                      <span class="badge bg-primary rounded-pill">
                        {calculate_cake(cake)}
                      </span>
                      <span
                        class="badge bg-success rounded-pill delete-cake-btn"
                        onClick={() => {
                          SetCakes([...cakes, cake]);
                        }}
                      >
                        +
                      </span>
                      <span
                        class="badge bg-danger rounded-pill delete-cake-btn"
                        onClick={() => {
                          let tmp = [...cakes];
                          tmp.splice(index, 1);
                          SetCakes([...tmp]);
                        }}
                      >
                        -
                      </span>
                    </li>
                  ))}
                </ol>
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
            <span className="text-secondary">
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
                Выбор штрафов {fines_selected.length}
              </h5>
            </div>
            <div className="modal-body">
              <form id="fines_select_form">
                {fines_list.map((item, item_id) => (
                  <div className="mb-3 form-check" key={item_id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFines([...fines_selected, item_id]);
                        } else {
                          let tmp = [...fines_selected];
                          var index = tmp.indexOf(item_id);
                          if (index !== -1) {
                            tmp.splice(index, 1);
                            setSelectedFines([...tmp])
                          }
                        }
                      }}
                      id={`fine_${item_id}`}
                    />
                    <label
                      className="form-check-label black"
                      htmlFor={`fine_${item_id}`}
                    >
                      {item.title}
                    </label>
                    <div id="fine_0" className="form-text">
                      {item.points} pnts
                    </div>
                  </div>
                ))}

              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {apply_fines()}}
                data-bs-dismiss="modal"
              >
                Добавить
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
                  <span id="points_without_bonus">{calculate_points()[0]}</span>
                </label>
                <label className="form-check-label black">
                  Бонус:{" "}
                  <span id="points_with_bonus">{calculate_points()[1]}</span>
                </label>
                <label className="form-check-label black">
                  Итого: <span id="points_final">{calculate_points()[2]}</span>
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
                    min={1}
                    max={3}
                    value={layersCnt}
                    onChange={(e) => {
                      SetLayersCnt(e.target.value);
                    }}
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
                    value={legendaryBuild}
                    onChange={(e) => {
                      SetLegendaryBuild(e.target.checked);
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
                    value={cherryOnTop}
                    onChange={(e) => {
                      SetCherryOnTop(e.target.checked);
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

                <div className="mb-3 form-check">
                  <label htmlFor="cakes_cnt" className="form-label text-body">
                    Количество таких тортов
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cakes_cnt"
                    aria-describedby="cakes_cnt"
                    min={1}
                    max={20}
                    value={cakesCnt}
                    onChange={(e) => {
                      SetCakesCnt(e.target.value);
                    }}
                  />
                  <div id="cakes_cnt" className="form-text">
                    Если собрано несколько тортов с такой же конфигурацией, то
                    вы можете сразу добавить их все.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    let cakes_buffer = Array(parseInt(cakesCnt)).fill({
                      layers: parseInt(layersCnt),
                      legend: legendaryBuild,
                      cherry_on_top: cherryOnTop,
                    });
                    console.log(cakes_buffer);
                    SetCakes([...cakes, ...cakes_buffer]);
                  }}
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
