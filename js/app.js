class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayTotalCalories();
    this._displayConsumedCalories();
    this._displayBurnedCalories();
    this._displayCaloriesLimit();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  // Function to add and meal and update the total calories
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
    this._displayNewMeal(meal);
  }

  // function to add a workout and update the total calories

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
    this._displayNewWorkout(workout);
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      this._meals.splice(index, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;

      this._workouts.splice(index, 1);
      this._render();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  // function to display the total calories

  _displayTotalCalories() {
    const totalCaloriesEl = document.getElementById('calories-total');

    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  // function to display the consumed calories
  _displayConsumedCalories() {
    const consumedCaloriesEl = document.getElementById('calories-consumed');

    // reduce method to get the total calories consumed

    const totalCaloriesConsumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    consumedCaloriesEl.innerHTML = totalCaloriesConsumed;
  }

  // function to display the burned calories

  _displayBurnedCalories() {
    const burnedCaloriesEl = document.getElementById('calories-burned');

    const totalBurnedCalories = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    burnedCaloriesEl.innerHTML = totalBurnedCalories;
  }

  // function to display the calories remaining
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const caloriesProgressEl = document.getElementById('calorie-progress');

    const finalRemainingCalories = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.innerHTML = finalRemainingCalories;

    if (finalRemainingCalories <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      caloriesProgressEl.classList.remove('bg-success');
      caloriesProgressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-denger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      caloriesProgressEl.classList.remove('bg-danger');
      caloriesProgressEl.classList.add('bg-success');
    }
  }

  // function to display the calories limit

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');

    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesProgress() {
    const caloriesProgressEl = document.getElementById('calorie-progress');

    const percentageCalories = (this._totalCalories / this._calorieLimit) * 100;

    const width = Math.min(percentageCalories, 100);

    caloriesProgressEl.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');

    const mealEl = document.createElement('div');

    mealEl.classList.add('card', 'my-2');

    mealEl.setAttribute('data-id', meal.id);

    mealEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${meal.name}</h4>
      <div
        class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
      >
        ${meal.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>`;

    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');

    const workoutEl = document.createElement('div');

    workoutEl.classList.add('card', 'my-2');

    workoutEl.setAttribute('data-id', workout.id);

    workoutEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${workout.name}</h4>
      <div
        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
      >
        ${workout.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
     `;

    workoutsEl.appendChild(workoutEl);
  }

  // function to render the total calories, consumed calories, burned calories and calories remaining

  // It will update the total calories, consumed calories, burned calories and calories remaining on the UI

  _render() {
    this._displayTotalCalories();
    this._displayConsumedCalories();
    this._displayBurnedCalories();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Storage {
  static getCalorieLimit(initialLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = initialLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));

    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));

    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));

    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));

    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItems.bind(this, 'meal'));

    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItems.bind(this, 'workout'));

    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));

    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);

    const calories = document.getElementById(`${type}-calories`);

    if (!name.value || !calories.value) {
      alert('Please fill on both the name and calories for the ' + type + '-');
    }

    if (type === 'meal') {
      const meal = new Meal(name.value, Number(calories.value));
      this._tracker.addMeal(meal);
    } else if (type === 'workout') {
      const workout = new Workout(name.value, Number(calories.value));

      this._tracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';

    const collapseItem = document.getElementById(`collapse-${type}`);

    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure you want to delete ?')) {
        const id = e.target.closest('.card').getAttribute('data-id');
        console.log(id);

        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);

        e.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const nameElement = item.querySelector('.card-body h4'); // Select the element more specifically
      if (nameElement) {
        // Ensure nameElement is not null
        const name = nameElement.textContent;
        console.log(name);
        if (name.toLowerCase().indexOf(text) !== -1) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      } else {
        console.warn('Name element not found in:', item);
      }
    });
  }

  _reset() {
    this._tracker.reset();
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    document.getElementById('filter-meals').innerHTML = '';
    document.getElementById('filter-workouts').innerHTML = '';
  }

  _setLimit(e) {
    e.preventDefault();

    const limit = document.getElementById('limit');

    if (limit.value === '') {
      alert('Please add a calorie limit');
      return;
    }

    this._tracker.setLimit(Number(limit.value));
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

// It is the instance of the App class, It Initializes the application and sets up the event listeners for the form Submission
const app = new App();
