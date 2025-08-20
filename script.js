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
                legPress: {
                    name: "Leg Press",
                    primaryMuscles: ["quadriceps", "glutes"],
                    notes: "Great for high volume quad training. Control the descent."
                },
                legCurls: {
                    name: "Lying Leg Curls",
                    primaryMuscles: ["hamstrings"],
                    notes: "Isolation for hamstrings. Squeeze at the top."
                },
                legExtensions: {
                    name: "Leg Extensions",
                    primaryMuscles: ["quadriceps"],
                    notes: "Quad isolation. Can train to failure safely."
                },
                lateralRaises: {
                    name: "Lateral Raises",
                    primaryMuscles: ["side delts"],
                    notes: "Essential for shoulder width. Control the negative."
                },
                bicepCurls: {
                    name: "Dumbbell Bicep Curls",
                    primaryMuscles: ["biceps"],
                    notes: "Full range of motion. Avoid swinging."
                },
                tricepExtensions: {
                    name: "Overhead Tricep Extensions",
                    primaryMuscles: ["triceps"],
                    notes: "Stretch the triceps. Keep elbows stable."
                },
                calfRaises: {
                    name: "Standing Calf Raises",
                    primaryMuscles: ["calves"],
                    notes: "Full range of motion. Pause at the top."
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
        // Updated based on 2025 Pelland meta-regression: higher volumes show continued benefits
        const baseVolume = this.selectedExperience === 'beginner' ? 3 : 
                          this.selectedExperience === 'intermediate' ? 5 : 6;
        
        return [
            {
                ...this.exercises.compound.frontSquat,
                sets: baseVolume,
                reps: '6-12',
                intensity: '65-80%',
                rest: '2-3 minutes'
            },
            {
                ...this.exercises.compound.benchPress,
                sets: baseVolume,
                reps: '6-12',
                intensity: '65-80%',
                rest: '2-3 minutes'
            },
            {
                ...this.exercises.compound.romanianDeadlift,
                sets: baseVolume - 1,
                reps: '8-15',
                intensity: '60-75%',
                rest: '2-3 minutes'
            }
        ];
    }
    
    getAccessoryExercises() {
        const accessories = Object.values(this.exercises.accessory);
        const shuffled = accessories.sort(() => 0.5 - Math.random());
        
        // Updated volume recommendations based on latest research
        const accessoryVolume = this.selectedGoal === 'strength' ? 3 : 
                               this.selectedExperience === 'beginner' ? 3 : 
                               this.selectedExperience === 'intermediate' ? 4 : 5;
        
        return shuffled.slice(0, 4).map(exercise => ({
            ...exercise,
            sets: accessoryVolume,
            reps: this.selectedGoal === 'strength' ? '6-10' : '8-20',
            intensity: this.selectedGoal === 'strength' ? 'RPE 8-9' : 'RPE 7-9',
            rest: this.selectedGoal === 'strength' ? '2-3 minutes' : '1-2 minutes'
        }));
    }
    
    getWorkoutSummary() {
        const principles = {
            beginner: "Focus on movement quality and habit formation. Progressive overload through adding weight weekly. Stay 2-3 reps from failure.",
            intermediate: "Higher volume drives muscle growth. Latest research supports 15-25+ sets per muscle per week. Train 2-3x per week frequency.",
            advanced: "Periodized approach with high volumes. Research shows benefits up to 30+ sets per week. Focus on weak points and competition prep."
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
                <div class="summary-title">2025 Research Updates</div>
                <div class="summary-content">
                    <p>• <strong>Volume:</strong> Latest meta-analysis shows benefits up to 25+ sets per muscle per week</p>
                    <p>• <strong>Proximity to Failure:</strong> Training closer to failure (RPE 8-9) maximizes hypertrophy</p>
                    <p>• <strong>Frequency:</strong> 2-3x per week optimal for most muscle groups</p>
                    <p>• <strong>Progressive Overload:</strong> Primary driver of both strength and muscle gains</p>
                    <p>• <strong>Individual Variation:</strong> Optimal volume varies significantly between individuals</p>
                    <p><em>Based on Stronger by Science 2025 research reviews</em></p>
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