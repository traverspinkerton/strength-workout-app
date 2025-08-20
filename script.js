class StrengthWorkoutGenerator {
    constructor() {
        this.selectedDuration = null;
        this.selectedExperience = null;
        this.selectedGoal = null;
        
        this.exercises = {
            compound: {
                squat: {
                    name: "Back Squat",
                    primaryMuscles: ["quadriceps", "glutes"],
                    notes: "King of lower body exercises. Focus on depth and control."
                },
                frontSquat: {
                    name: "Front Squat",
                    primaryMuscles: ["quadriceps", "core"],
                    notes: "Excellent for quad development and core strength."
                },
                deadlift: {
                    name: "Conventional Deadlift",
                    primaryMuscles: ["hamstrings", "glutes", "back"],
                    notes: "Hip hinge movement pattern. Keep spine neutral."
                },
                romanianDeadlift: {
                    name: "Romanian Deadlift",
                    primaryMuscles: ["hamstrings", "glutes"],
                    notes: "Focus on hip hinge with straight legs. Great for posterior chain."
                },
                benchPress: {
                    name: "Barbell Bench Press",
                    primaryMuscles: ["chest", "triceps", "shoulders"],
                    notes: "Retract shoulder blades, arch slightly, control descent."
                },
                overheadPress: {
                    name: "Standing Overhead Press",
                    primaryMuscles: ["shoulders", "triceps", "core"],
                    notes: "Full body tension. Press in straight line overhead."
                },
                barbellRow: {
                    name: "Bent-Over Barbell Row",
                    primaryMuscles: ["lats", "rhomboids", "rear delts"],
                    notes: "Hinge at hips, squeeze shoulder blades together."
                },
                pullup: {
                    name: "Pull-ups/Chin-ups",
                    primaryMuscles: ["lats", "biceps"],
                    notes: "Full range of motion. Control both up and down phases."
                }
            },
            accessory: {
                inclinePress: {
                    name: "Incline Dumbbell Press",
                    primaryMuscles: ["upper chest", "shoulders"],
                    notes: "30-45 degree angle. Focus on stretch and contraction."
                },
                dumbbellRow: {
                    name: "Single-Arm Dumbbell Row",
                    primaryMuscles: ["lats", "rhomboids"],
                    notes: "Support with bench. Focus on lat engagement."
                },
                bulgarianSplit: {
                    name: "Bulgarian Split Squats",
                    primaryMuscles: ["quadriceps", "glutes"],
                    notes: "Unilateral strength. Focus on front leg work."
                },
                walkingLunges: {
                    name: "Walking Lunges",
                    primaryMuscles: ["quadriceps", "glutes"],
                    notes: "Step into lunge, drive through front heel."
                },
                hipThrust: {
                    name: "Hip Thrusts",
                    primaryMuscles: ["glutes"],
                    notes: "Squeeze glutes at top. Focus on hip extension."
                },
                latPulldown: {
                    name: "Lat Pulldown",
                    primaryMuscles: ["lats", "rhomboids"],
                    notes: "Lean back slightly, pull to upper chest."
                },
                facePulls: {
                    name: "Cable Face Pulls",
                    primaryMuscles: ["rear delts", "rhomboids"],
                    notes: "High rep exercise for rear delt health."
                },
                plank: {
                    name: "Plank",
                    primaryMuscles: ["core"],
                    notes: "Maintain straight line from head to heels."
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Duration selection
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOption('.duration-btn', e.target);
                this.selectedDuration = parseInt(e.target.dataset.duration);
            });
        });
        
        // Experience selection
        document.querySelectorAll('.experience-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOption('.experience-btn', e.target);
                this.selectedExperience = e.target.dataset.level;
            });
        });
        
        // Goal selection
        document.querySelectorAll('.goal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOption('.goal-btn', e.target);
                this.selectedGoal = e.target.dataset.goal;
            });
        });
        
        // Generate workout
        document.getElementById('generateWorkout').addEventListener('click', () => {
            this.generateWorkout();
        });
        
        // Generate another workout
        document.getElementById('generateAnother').addEventListener('click', () => {
            this.resetGenerator();
        });
    }
    
    selectOption(selector, selectedElement) {
        document.querySelectorAll(selector).forEach(btn => {
            btn.classList.remove('selected');
        });
        selectedElement.classList.add('selected');
        this.updateGenerateButton();
    }
    
    updateGenerateButton() {
        const generateBtn = document.getElementById('generateWorkout');
        const isReady = this.selectedDuration && this.selectedExperience && this.selectedGoal;
        generateBtn.disabled = !isReady;
    }
    
    generateWorkout() {
        if (!this.selectedDuration || !this.selectedExperience || !this.selectedGoal) {
            alert('Please select all options before generating a workout.');
            return;
        }
        
        const workout = this.createWorkout();
        this.displayWorkout(workout);
    }
    
    createWorkout() {
        const workout = {
            summary: this.getWorkoutSummary(),
            exercises: []
        };
        
        // Determine exercise selection based on experience and goals
        let compoundExercises = [];
        let accessoryExercises = [];
        
        if (this.selectedGoal === 'powerlifting') {
            compoundExercises = this.getPowerliftingExercises();
        } else if (this.selectedGoal === 'strength') {
            compoundExercises = this.getStrengthExercises();
        } else {
            compoundExercises = this.getHypertrophyCompounds();
        }
        
        accessoryExercises = this.getAccessoryExercises();
        
        // Add exercises based on duration
        if (this.selectedDuration >= 60) {
            workout.exercises = [...compoundExercises, ...accessoryExercises.slice(0, 3)];
        } else if (this.selectedDuration >= 45) {
            workout.exercises = [...compoundExercises, ...accessoryExercises.slice(0, 2)];
        } else {
            workout.exercises = compoundExercises;
        }
        
        return workout;
    }
    
    getPowerliftingExercises() {
        return [
            {
                ...this.exercises.compound.squat,
                sets: this.selectedExperience === 'beginner' ? 3 : 4,
                reps: this.selectedExperience === 'beginner' ? '5' : '3-5',
                intensity: this.selectedExperience === 'beginner' ? '75-80%' : '80-87%',
                rest: '3-5 minutes'
            },
            {
                ...this.exercises.compound.benchPress,
                sets: this.selectedExperience === 'beginner' ? 3 : 4,
                reps: this.selectedExperience === 'beginner' ? '5' : '3-5',
                intensity: this.selectedExperience === 'beginner' ? '75-80%' : '80-87%',
                rest: '3-5 minutes'
            },
            {
                ...this.exercises.compound.deadlift,
                sets: this.selectedExperience === 'beginner' ? 3 : 4,
                reps: this.selectedExperience === 'beginner' ? '5' : '1-5',
                intensity: this.selectedExperience === 'beginner' ? '75-80%' : '80-90%',
                rest: '3-5 minutes'
            }
        ];
    }
    
    getStrengthExercises() {
        const exercises = [
            {
                ...this.exercises.compound.squat,
                sets: 4,
                reps: this.selectedExperience === 'beginner' ? '5-6' : '3-5',
                intensity: '80-85%',
                rest: '3-4 minutes'
            },
            {
                ...this.exercises.compound.overheadPress,
                sets: 3,
                reps: this.selectedExperience === 'beginner' ? '6-8' : '5-6',
                intensity: '75-80%',
                rest: '2-3 minutes'
            }
        ];
        
        if (Math.random() > 0.5) {
            exercises.push({
                ...this.exercises.compound.deadlift,
                sets: 3,
                reps: '3-5',
                intensity: '80-85%',
                rest: '3-4 minutes'
            });
        } else {
            exercises.push({
                ...this.exercises.compound.barbellRow,
                sets: 4,
                reps: '6-8',
                intensity: '75-80%',
                rest: '2-3 minutes'
            });
        }
        
        return exercises;
    }
    
    getHypertrophyCompounds() {
        return [
            {
                ...this.exercises.compound.frontSquat,
                sets: 4,
                reps: '8-10',
                intensity: '70-75%',
                rest: '2-3 minutes'
            },
            {
                ...this.exercises.compound.benchPress,
                sets: 4,
                reps: '8-10',
                intensity: '70-75%',
                rest: '2-3 minutes'
            },
            {
                ...this.exercises.compound.romanianDeadlift,
                sets: 3,
                reps: '10-12',
                intensity: '65-70%',
                rest: '2 minutes'
            }
        ];
    }
    
    getAccessoryExercises() {
        const accessories = Object.values(this.exercises.accessory);
        const shuffled = accessories.sort(() => 0.5 - Math.random());
        
        return shuffled.slice(0, 4).map(exercise => ({
            ...exercise,
            sets: this.selectedGoal === 'strength' ? 3 : 4,
            reps: this.selectedGoal === 'strength' ? '8-10' : '10-15',
            intensity: 'RPE 7-8',
            rest: '1-2 minutes'
        }));
    }
    
    getWorkoutSummary() {
        const principles = {
            beginner: "Focus on movement quality and consistency. Progressive overload through adding weight weekly.",
            intermediate: "Higher volume for muscle growth. Train each movement 2-3x per week.",
            advanced: "Periodized approach with intensity variations. Focus on weak points."
        };
        
        const goalDescriptions = {
            strength: "Emphasizing heavy compound movements with lower reps for maximum strength gains.",
            hypertrophy: "Volume-focused training in moderate rep ranges for optimal muscle growth.",
            powerlifting: "Specific training for squat, bench press, and deadlift competition lifts."
        };
        
        return {
            principle: principles[this.selectedExperience],
            goal: goalDescriptions[this.selectedGoal],
            duration: `${this.selectedDuration} minute workout`,
            experience: this.selectedExperience.charAt(0).toUpperCase() + this.selectedExperience.slice(1)
        };
    }
    
    displayWorkout(workout) {
        const workoutContent = document.getElementById('workoutContent');
        
        let html = `
            <div class="workout-summary">
                <div class="summary-title">Workout Summary</div>
                <div class="summary-content">
                    <p><strong>Experience Level:</strong> ${workout.summary.experience}</p>
                    <p><strong>Duration:</strong> ${workout.summary.duration}</p>
                    <p><strong>Focus:</strong> ${workout.summary.goal}</p>
                    <p><strong>Principle:</strong> ${workout.summary.principle}</p>
                </div>
            </div>
        `;
        
        workout.exercises.forEach((exercise, index) => {
            html += `
                <div class="exercise-block">
                    <div class="exercise-name">${index + 1}. ${exercise.name}</div>
                    <div class="exercise-details">
                        <strong>Sets:</strong> ${exercise.sets} | 
                        <strong>Reps:</strong> ${exercise.reps} | 
                        <strong>Intensity:</strong> ${exercise.intensity} | 
                        <strong>Rest:</strong> ${exercise.rest}
                    </div>
                    <div class="exercise-notes">${exercise.notes}</div>
                </div>
            `;
        });
        
        html += `
            <div class="workout-summary">
                <div class="summary-title">Evidence-Based Notes</div>
                <div class="summary-content">
                    <p>• Progressive overload is the key driver of strength and muscle gains</p>
                    <p>• Volume landmarks: 10-20 sets per muscle group per week for hypertrophy</p>
                    <p>• Rest periods: 3-5 min for strength, 2-3 min for hypertrophy</p>
                    <p>• RPE 7-8 means 2-3 reps in reserve for most sets</p>
                </div>
            </div>
        `;
        
        workoutContent.innerHTML = html;
        
        document.querySelector('.workout-generator').classList.add('hidden');
        document.getElementById('workoutDisplay').classList.remove('hidden');
    }
    
    resetGenerator() {
        document.getElementById('workoutDisplay').classList.add('hidden');
        document.querySelector('.workout-generator').classList.remove('hidden');
        
        // Reset selections
        document.querySelectorAll('.selected').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        this.selectedDuration = null;
        this.selectedExperience = null;
        this.selectedGoal = null;
        this.updateGenerateButton();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StrengthWorkoutGenerator();
});