class CalorieTracker {
  constructor() {
    this._calorieLimit = 3000;
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
  }

  // function to add a workout and update the total calories

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
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

const tracker = new CalorieTracker();

const breakfast = new Meal('chicken', 1100);

tracker.addMeal(breakfast);

const running = new Workout('morning running', 500);

tracker.addWorkout(running);

console.log(tracker._meals);
console.log(tracker._workouts);

console.log(tracker._totalCalories);
