import React, { useState } from "react";
import "./App.css";

function App() {

  const [fine, setFine] = useState(0);
  const fines = [{"title": "Часть робота упала на поле", "points": 20}, {"title": "Ухудшение поля или игровых элементов", "points": 30}, {"title": "Нерабочая система предотвращения столкновений", "points": 30}];
  return (
    <>
      <div class="container">
        <h1 class="text-center mt-2">Eurobot 2023 Calculator {fine}</h1>
        <div class="text-center mb-4">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal" data-bs-target="#pointsCalculated"
            >
              Подсчёт
            </button>
            <a
              class="btn btn-light"
              href="https://www.coupederobotique.fr/wp-content/uploads/Eurobot2023_Rules_EN_FINALE.pdf"
              target="__blank"
              role="button"
            >
              Правила
            </a>
            <button type="button" class="btn btn-danger">
              Отчистить форму
            </button>
          </div>
        </div>
        <form>
          <div class="col col-lg-5 mx-auto">
            <div class="mb-3">
              <label for="fineHelp" class="form-label">
                Штраф
              </label>
              <input
                type="number"
                class="form-control"
                id="fine_points_cnt"
                aria-describedby="fineHelp"
                value="0"
                data-points-coeff="1"
              />
              <div id="fineHelp" class="form-text">
                Количество штрафных очков (
                <a
                  class="text-primary pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#fineSelectModal"
                >
                  Выбрать нарушения
                </a>
                )
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Собранные торты </label>
              <div>
                <button type="button" class="btn btn-primary btn-sm">
                  Добавить торт
                </button>
              </div>
            </div>

            <div class="mb-3">
              <label for="correctCakesHelp" class="form-label">
                Количество вишенок в корзине
              </label>
              <input
                type="number"
                class="form-control"
                id="cherries_in_basket_cnt"
                aria-describedby="correctCakesHelp"
                value="0"
                data-points-coeff="1"
              />
              <div id="correctCakesHelp" class="form-text">
                Сколько вишенок было заброшено в корзину(<b>1 pnt</b>)
              </div>
            </div>

            <div class="mb-3">
              <label for="correctCakesHelp" class="form-label">
                Прогноз
              </label>
              <input
                type="number"
                class="form-control"
                id="predicted_points"
                aria-describedby="correctCakesHelp"
                value="0"
              />
              <div id="correctCakesHelp" class="form-text">
                бонус = 20 - abs(real - prediction)
              </div>
            </div>
          </div>
          <div class="col col-lg-5 mx-auto">
            <label for="correctCakesHelp" class="form-label">
              True/False
            </label>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="basketPlaced"
                data-points="5"
              />
              <label class="form-check-label" for="basketPlaced">
                У команды есть корзина
              </label>
              <div id="basketPlaced" class="form-text">
                Команда установила корзину во время подготовки(<b>5 pnt</b>)
              </div>
            </div>

            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="backetCounterWorks"
                data-points="5"
              />
              <label class="form-check-label" for="backetCounterWorks">
                Счётчик корзины правильно работает
              </label>
              <div id="backetCounterWorks" class="form-text">
                Счётчик на корзине показывает количество вишенок внутри неё(
                <b>5 pnt</b>)
              </div>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="robotsReturn"
                data-points="15"
              />
              <label class="form-check-label" for="robotsReturn">
                Роботы правильно вернулись
              </label>
              <div id="robotsReturn" class="form-text">
                В конце матча роботы находятся на своих местах(<b>15 pnt</b>)
              </div>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="finalActionDone"
                data-points="5"
              />
              <label class="form-check-label" for="finalActionDone">
                Весёлое действие
              </label>
              <div id="finalActionDone" class="form-text">
                Funny action(<b>5 pnt</b>)
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="modal fade"
        id="fineSelectModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="fineSelectModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="fineSelectModalLabel">
                Выбор штрафов
              </h5>
            </div>
            <div class="modal-body">
              <form id="fines_select_form">
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    onChange={(e) => {console.log(e.target.checked)}}
                    id="fine_0"
                    data-fine-size="20"
                  />
                  <label class="form-check-label black" for="fine_0">
                    Часть робота упала на поле
                  </label>
                  <div id="fine_0" class="form-text">
                    20 pnt
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="fine_1"
                    data-fine-size="30"
                  />
                  <label class="form-check-label black" for="fine_1">
                    Ухудшение поля или игровых элементов
                  </label>
                  <div id="fine_1" class="form-text">
                    30 pnt
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="fine_2"
                    data-fine-size="30"
                  />
                  <label class="form-check-label black" for="fine_2">
                    Нерабочая система предотвращения столкновений
                  </label>
                  <div id="fine_2" class="form-text">
                    30 pnt
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="fine_3"
                    data-fine-size="50"
                  />
                  <label class="form-check-label black" for="fine_3">
                    Некорректный старт
                  </label>
                  <div id="fine_3" class="form-text">
                    50 pnt
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="fine_4"
                    data-fine-size="50"
                  />
                  <label class="form-check-label black" for="fine_4">
                    Движение робота после окончания матча
                  </label>
                  <div id="fine_4" class="form-text">
                    50 pnt
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="fine_5"
                    data-fine-size="50"
                  />
                  <label class="form-check-label black" for="fine_5">
                    Черезмерное время подготовки
                  </label>
                  <div id="fine_5" class="form-text">
                    50 pnt
                  </div>
                </div>
                <label class="form-check-label black">Итого: </label>
                <span id="fine_points_cnt_preview">0</span>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onclick="apply_fines()"
                data-bs-dismiss="modal"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="pointsCalculated"
        tabindex="-1"
        role="dialog"
        aria-labelledby="pointsCalculatedLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pointsCalculatedLabel">
                Итоговые баллы
              </h5>
            </div>
            <div class="modal-body">
              <div class="row">
                <label class="form-check-label black">
                  Без бонуса: <span id="points_without_bonus">0</span>
                </label>
                <label class="form-check-label black">
                  Бонус: <span id="points_with_bonus">0</span>
                </label>
                <label class="form-check-label black">
                  Итого: <span id="points_final">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
