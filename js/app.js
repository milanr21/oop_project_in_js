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
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render();
    }

    _displayTotalCalories() {
        const totalCaloriesEl = document.getElementById('calories-total');

        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayConsumedCalories() {
        const consumedCaloriesEl = document.getElementById('calories-consumed');

        const totalCaloriesConsumed = this._meals.reduce(
            (total, meal) => total + meal.calories,
            0
        );

        consumedCaloriesEl.innerHTML = totalCaloriesConsumed;
    }

    _displayBurnedCalories() {
        const burnedCaloriesEl = document.getElementById('calories-burned');

        const totalBurnedCalories = this._workouts.reduce((total, workout) => total + workout.calories, 0);

        burnedCaloriesEl.innerHTML = totalBurnedCalories;


    }

    _displayCaloriesRemaining() {
        const caloriesRemainingEl = document.getElementById('calories-remaining');

        const finalRemainingCalories = this._calorieLimit - this._totalCalories;

        caloriesRemainingEl.innerHTML = finalRemainingCalories;

    }


    _displayCaloriesLimit() {
        const caloriesLimitEl = document.getElementById('calories-limit');

        caloriesLimitEl.innerHTML = this._calorieLimit;
    }

    _render() {
        this._displayTotalCalories();
        this._displayConsumedCalories();
        this._displayBurnedCalories();
        this._displayCaloriesRemaining();

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

const breakfast = new Meal('chicken', 800);

tracker.addMeal(breakfast);

const running = new Workout('morning running', 500);

tracker.addWorkout(running);

console.log(tracker._meals);
console.log(tracker._workouts);

console.log(tracker._totalCalories);
