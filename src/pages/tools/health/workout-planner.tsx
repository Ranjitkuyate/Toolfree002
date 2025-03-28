import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaHeartbeat, FaRunning, FaStopwatch, FaFire } from 'react-icons/fa';

const WorkoutPlanner: React.FC = () => {
  const [fitnessLevel, setFitnessLevel] = useState<string>('beginner');
  const [goal, setGoal] = useState<string>('strength');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('3');
  const [equipment, setEquipment] = useState<string[]>(['bodyweight']);
  const [workoutPlan, setWorkoutPlan] = useState<any | null>(null);

  const equipmentOptions = [
    { id: 'bodyweight', label: 'Bodyweight Only' },
    { id: 'dumbbells', label: 'Dumbbells' },
    { id: 'barbell', label: 'Barbell' },
    { id: 'machines', label: 'Gym Machines' },
    { id: 'kettlebell', label: 'Kettlebell' },
    { id: 'resistance-bands', label: 'Resistance Bands' }
  ];

  const handleEquipmentChange = (id: string) => {
    if (equipment.includes(id)) {
      setEquipment(equipment.filter(item => item !== id));
    } else {
      setEquipment([...equipment, id]);
    }
  };

  // Exercise database
  const exercises = {
    bodyweight: {
      strength: [
        { name: 'Push-ups', target: 'chest', difficulty: 'beginner' },
        { name: 'Pull-ups', target: 'back', difficulty: 'intermediate' },
        { name: 'Dips', target: 'chest', difficulty: 'intermediate' },
        { name: 'Squats', target: 'legs', difficulty: 'beginner' },
        { name: 'Lunges', target: 'legs', difficulty: 'beginner' },
        { name: 'Plank', target: 'core', difficulty: 'beginner' },
        { name: 'Mountain Climbers', target: 'core', difficulty: 'beginner' },
        { name: 'Burpees', target: 'full body', difficulty: 'intermediate' },
        { name: 'Pistol Squats', target: 'legs', difficulty: 'advanced' },
        { name: 'Handstand Push-ups', target: 'shoulders', difficulty: 'advanced' }
      ],
      cardio: [
        { name: 'Jumping Jacks', target: 'full body', difficulty: 'beginner' },
        { name: 'High Knees', target: 'legs', difficulty: 'beginner' },
        { name: 'Burpees', target: 'full body', difficulty: 'intermediate' },
        { name: 'Mountain Climbers', target: 'core', difficulty: 'beginner' },
        { name: 'Jump Squats', target: 'legs', difficulty: 'intermediate' },
        { name: 'Jumping Lunges', target: 'legs', difficulty: 'intermediate' },
        { name: 'Bear Crawls', target: 'full body', difficulty: 'intermediate' },
        { name: 'Skater Jumps', target: 'legs', difficulty: 'intermediate' }
      ],
      flexibility: [
        { name: 'Standing Hamstring Stretch', target: 'legs', difficulty: 'beginner' },
        { name: 'Butterfly Stretch', target: 'hips', difficulty: 'beginner' },
        { name: 'Cobra Pose', target: 'back', difficulty: 'beginner' },
        { name: 'Child\'s Pose', target: 'back', difficulty: 'beginner' },
        { name: 'Downward Dog', target: 'full body', difficulty: 'beginner' },
        { name: 'Pigeon Pose', target: 'hips', difficulty: 'intermediate' },
        { name: 'Seated Forward Bend', target: 'back', difficulty: 'beginner' }
      ]
    },
    dumbbells: {
      strength: [
        { name: 'Dumbbell Bench Press', target: 'chest', difficulty: 'beginner' },
        { name: 'Dumbbell Rows', target: 'back', difficulty: 'beginner' },
        { name: 'Dumbbell Shoulder Press', target: 'shoulders', difficulty: 'beginner' },
        { name: 'Dumbbell Lunges', target: 'legs', difficulty: 'beginner' },
        { name: 'Dumbbell Squats', target: 'legs', difficulty: 'beginner' },
        { name: 'Dumbbell Bicep Curls', target: 'arms', difficulty: 'beginner' },
        { name: 'Dumbbell Tricep Extensions', target: 'arms', difficulty: 'beginner' },
        { name: 'Dumbbell Lateral Raises', target: 'shoulders', difficulty: 'beginner' }
      ]
    },
    barbell: {
      strength: [
        { name: 'Barbell Bench Press', target: 'chest', difficulty: 'intermediate' },
        { name: 'Barbell Squats', target: 'legs', difficulty: 'intermediate' },
        { name: 'Barbell Deadlifts', target: 'back', difficulty: 'intermediate' },
        { name: 'Barbell Rows', target: 'back', difficulty: 'intermediate' },
        { name: 'Barbell Overhead Press', target: 'shoulders', difficulty: 'intermediate' },
        { name: 'Barbell Lunges', target: 'legs', difficulty: 'intermediate' }
      ]
    },
    machines: {
      strength: [
        { name: 'Leg Press', target: 'legs', difficulty: 'beginner' },
        { name: 'Chest Press Machine', target: 'chest', difficulty: 'beginner' },
        { name: 'Lat Pulldown', target: 'back', difficulty: 'beginner' },
        { name: 'Seated Row Machine', target: 'back', difficulty: 'beginner' },
        { name: 'Leg Extension', target: 'legs', difficulty: 'beginner' },
        { name: 'Leg Curl', target: 'legs', difficulty: 'beginner' },
        { name: 'Shoulder Press Machine', target: 'shoulders', difficulty: 'beginner' }
      ]
    },
    kettlebell: {
      strength: [
        { name: 'Kettlebell Swings', target: 'full body', difficulty: 'beginner' },
        { name: 'Kettlebell Goblet Squats', target: 'legs', difficulty: 'beginner' },
        { name: 'Kettlebell Clean and Press', target: 'full body', difficulty: 'intermediate' },
        { name: 'Kettlebell Turkish Get-up', target: 'full body', difficulty: 'advanced' },
        { name: 'Kettlebell Rows', target: 'back', difficulty: 'beginner' }
      ]
    },
    'resistance-bands': {
      strength: [
        { name: 'Resistance Band Squats', target: 'legs', difficulty: 'beginner' },
        { name: 'Resistance Band Chest Press', target: 'chest', difficulty: 'beginner' },
        { name: 'Resistance Band Rows', target: 'back', difficulty: 'beginner' },
        { name: 'Resistance Band Bicep Curls', target: 'arms', difficulty: 'beginner' },
        { name: 'Resistance Band Tricep Extensions', target: 'arms', difficulty: 'beginner' },
        { name: 'Resistance Band Lateral Raises', target: 'shoulders', difficulty: 'beginner' }
      ]
    }
  };

  const generateWorkoutPlan = () => {
    // Determine number of days per week
    const days = parseInt(daysPerWeek);
    
    // Create workout split based on days per week
    let split: string[] = [];
    if (days === 1) {
      split = ['Full Body'];
    } else if (days === 2) {
      split = ['Upper Body', 'Lower Body'];
    } else if (days === 3) {
      if (goal === 'strength') {
        split = ['Push', 'Pull', 'Legs'];
      } else {
        split = ['Full Body', 'Cardio', 'Full Body'];
      }
    } else if (days === 4) {
      split = ['Chest & Triceps', 'Back & Biceps', 'Legs', 'Shoulders & Core'];
    } else if (days === 5) {
      split = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms & Core'];
    } else if (days >= 6) {
      split = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
      if (days > 6) split.push('Active Recovery');
    }
    
    // Filter exercises based on equipment and fitness level
    const availableExercises: any = {};
    
    equipment.forEach(equip => {
      if (exercises[equip as keyof typeof exercises]) {
        Object.keys(exercises[equip as keyof typeof exercises]).forEach(type => {
          if (!availableExercises[type]) {
            availableExercises[type] = [];
          }
          
          const exercisesForType = exercises[equip as keyof typeof exercises][type as keyof typeof exercises[keyof typeof exercises]];
          const filteredExercises = exercisesForType.filter((ex: any) => {
            if (fitnessLevel === 'beginner') {
              return ex.difficulty === 'beginner';
            } else if (fitnessLevel === 'intermediate') {
              return ex.difficulty === 'beginner' || ex.difficulty === 'intermediate';
            } else {
              return true; // advanced can do all exercises
            }
          });
          
          availableExercises[type] = [...availableExercises[type], ...filteredExercises];
        });
      }
    });
    
    // Generate workout for each day
    const workouts = split.map(day => {
      let exercises: any[] = [];
      let targetMuscles: string[] = [];
      
      // Determine which exercises to include based on the day's focus
      if (day === 'Full Body') {
        // Include exercises for all major muscle groups
        targetMuscles = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
      } else if (day === 'Upper Body') {
        targetMuscles = ['chest', 'back', 'shoulders', 'arms'];
      } else if (day === 'Lower Body') {
        targetMuscles = ['legs', 'core'];
      } else if (day === 'Push') {
        targetMuscles = ['chest', 'shoulders', 'triceps'];
      } else if (day === 'Pull') {
        targetMuscles = ['back', 'biceps'];
      } else if (day === 'Legs') {
        targetMuscles = ['legs'];
      } else if (day === 'Chest & Triceps' || day === 'Chest') {
        targetMuscles = ['chest', 'triceps'];
      } else if (day === 'Back & Biceps' || day === 'Back') {
        targetMuscles = ['back', 'biceps'];
      } else if (day === 'Shoulders & Core' || day === 'Shoulders') {
        targetMuscles = ['shoulders', 'core'];
      } else if (day === 'Arms & Core' || day === 'Arms') {
        targetMuscles = ['biceps', 'triceps', 'forearms'];
      } else if (day === 'Core') {
        targetMuscles = ['core'];
      } else if (day === 'Cardio') {
        targetMuscles = ['full body'];
      } else if (day === 'Active Recovery') {
        targetMuscles = ['full body'];
      }
      
      // Select exercises based on goal and target muscles
      if (goal === 'strength') {
        targetMuscles.forEach(muscle => {
          const muscleExercises = availableExercises.strength.filter((ex: any) => 
            ex.target === muscle || ex.target === 'full body'
          );
          
          if (muscleExercises.length > 0) {
            // Randomly select 1-2 exercises per muscle group
            const numExercises = Math.min(Math.floor(Math.random() * 2) + 1, muscleExercises.length);
            for (let i = 0; i < numExercises; i++) {
              const randomIndex = Math.floor(Math.random() * muscleExercises.length);
              exercises.push({
                ...muscleExercises[randomIndex],
                sets: fitnessLevel === 'beginner' ? 3 : fitnessLevel === 'intermediate' ? 4 : 5,
                reps: '8-12'
              });
              muscleExercises.splice(randomIndex, 1);
            }
          }
        });
      } else if (goal === 'cardio') {
        // Select cardio exercises
        const cardioExercises = availableExercises.cardio || [];
        const numExercises = Math.min(6, cardioExercises.length);
        
        for (let i = 0; i < numExercises; i++) {
          if (cardioExercises.length > 0) {
            const randomIndex = Math.floor(Math.random() * cardioExercises.length);
            exercises.push({
              ...cardioExercises[randomIndex],
              duration: '30-60 seconds',
              rest: '15-30 seconds'
            });
            cardioExercises.splice(randomIndex, 1);
          }
        }
      } else if (goal === 'flexibility') {
        // Select flexibility exercises
        const flexExercises = availableExercises.flexibility || [];
        const numExercises = Math.min(8, flexExercises.length);
        
        for (let i = 0; i < numExercises; i++) {
          if (flexExercises.length > 0) {
            const randomIndex = Math.floor(Math.random() * flexExercises.length);
            exercises.push({
              ...flexExercises[randomIndex],
              duration: '30-60 seconds',
              sets: 2
            });
            flexExercises.splice(randomIndex, 1);
          }
        }
      }
      
      return {
        day,
        exercises
      };
    });
    
    setWorkoutPlan({
      fitnessLevel,
      goal,
      daysPerWeek,
      equipment,
      workouts
    });
  };

  return (
    <Layout>
      <Head>
        <title>Workout Planner | ToolsFree Online</title>
        <meta name="description" content="Create a personalized workout plan based on your fitness level, goals, and available equipment." />
        <meta name="keywords" content="workout planner, exercise plan, fitness planner, workout generator, exercise routine" />
      </Head>

      <PageContainer>
        <PageTitle>Workout Planner</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <PlannerSection>
            <InputsContainer>
              <InputGroup>
                <label>Fitness Level:</label>
                <select 
                  value={fitnessLevel} 
                  onChange={(e) => setFitnessLevel(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </InputGroup>
              
              <InputGroup>
                <label>Goal:</label>
                <select 
                  value={goal} 
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="strength">Strength & Muscle</option>
                  <option value="cardio">Cardio & Fat Loss</option>
                  <option value="flexibility">Flexibility & Mobility</option>
                </select>
              </InputGroup>
              
              <InputGroup>
                <label>Days Per Week:</label>
                <select 
                  value={daysPerWeek} 
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                >
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                </select>
              </InputGroup>
            </InputsContainer>
            
            <EquipmentSection>
              <EquipmentTitle>Available Equipment:</EquipmentTitle>
              <EquipmentOptions>
                {equipmentOptions.map(option => (
                  <EquipmentOption key={option.id}>
                    <input 
                      type="checkbox" 
                      id={option.id} 
                      checked={equipment.includes(option.id)} 
                      onChange={() => handleEquipmentChange(option.id)} 
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </EquipmentOption>
                ))}
              </EquipmentOptions>
            </EquipmentSection>
            
            <GenerateButton onClick={generateWorkoutPlan}>
              <FaRunning /> Generate Workout Plan
            </GenerateButton>
            
            {workoutPlan && (
              <WorkoutPlanContainer>
                <PlanTitle>Your {workoutPlan.daysPerWeek}-Day {workoutPlan.goal.charAt(0).toUpperCase() + workoutPlan.goal.slice(1)} Workout Plan</PlanTitle>
                <PlanSubtitle>Fitness Level: {workoutPlan.fitnessLevel.charAt(0).toUpperCase() + workoutPlan.fitnessLevel.slice(1)}</PlanSubtitle>
                
                <WorkoutDays>
                  {workoutPlan.workouts.map((workout: any, index: number) => (
                    <WorkoutDay key={index}>
                      <DayTitle>Day {index + 1}: {workout.day}</DayTitle>
                      
                      {workout.exercises.length > 0 ? (
                        <ExerciseList>
                          {workout.exercises.map((exercise: any, exIndex: number) => (
                            <ExerciseItem key={exIndex}>
                              <ExerciseName>{exercise.name}</ExerciseName>
                              <ExerciseDetails>
                                {goal === 'strength' ? (
                                  <span>{exercise.sets} sets × {exercise.reps} reps</span>
                                ) : (
                                  <span>{exercise.duration} {exercise.sets ? `× ${exercise.sets} sets` : ''}</span>
                                )}
                                <ExerciseTarget>Target: {exercise.target.charAt(0).toUpperCase() + exercise.target.slice(1)}</ExerciseTarget>
                              </ExerciseDetails>
                            </ExerciseItem>
                          ))}
                        </ExerciseList>
                      ) : (
                        <NoExercises>No suitable exercises found for this day. Try adding more equipment options.</NoExercises>
                      )}
                    </WorkoutDay>
                  ))}
                </WorkoutDays>
                
                <WorkoutTips>
                  <TipsTitle>Workout Tips:</TipsTitle>
                  <TipsList>
                    <TipItem>Warm up for 5-10 minutes before each workout</TipItem>
                    <TipItem>Rest 60-90 seconds between sets for strength training</TipItem>
                    <TipItem>Stay hydrated throughout your workout</TipItem>
                    <TipItem>Focus on proper form rather than lifting heavier weights</TipItem>
                    <TipItem>Cool down and stretch for 5-10 minutes after your workout</TipItem>
                  </TipsList>
                </WorkoutTips>
              </WorkoutPlanContainer>
            )}
          </PlannerSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Workout Planning</InfoTitle>
          <InfoText>
            A well-designed workout plan is essential for achieving your fitness goals efficiently and safely. This workout planner creates personalized exercise routines based on:
            
            <InfoSubtitle>Fitness Level:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Beginner:</strong> Focuses on fundamental movements and building a foundation</InfoItem>
              <InfoItem><strong>Intermediate:</strong> Incorporates more challenging exercises and increased volume</InfoItem>
              <InfoItem><strong>Advanced:</strong> Includes complex movements and higher intensity workouts</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Goals:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Strength & Muscle:</strong> Emphasizes resistance training with moderate to heavy weights</InfoItem>
              <InfoItem><strong>Cardio & Fat Loss:</strong> Focuses on high-intensity exercises with minimal rest</InfoItem>
              <InfoItem><strong>Flexibility & Mobility:</strong> Prioritizes stretching and range of motion exercises</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> This planner provides general workout recommendations. Always consult with a healthcare professional before starting a new exercise program, especially if you have any health concerns or medical conditions.
            </InfoNote>
          </InfoText>
        </InfoContainer>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>
      </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AdContainer = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  text-align: center;
`;

const AdText = styled.p`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdContent = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border: 1px dashed #ddd;
`;

const ToolContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const PlannerSection = styled.div`
  padding: 2rem;
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const EquipmentSection = styled.div`
  margin-bottom: 1.5rem;
`;

const EquipmentTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const EquipmentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
`;

const EquipmentOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const GenerateButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const WorkoutPlanContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const PlanTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const PlanSubtitle = styled.div`
  color: #666;
  margin-bottom: 1.5rem;
`;

const WorkoutDays = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const WorkoutDay = styled.div`
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExerciseItem = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ExerciseName = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ExerciseDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const ExerciseTarget = styled.div`
  color: #999;
`;

const NoExercises = styled.div`
  padding: 1rem;
  color: #666;
  font-style: italic;
  text-align: center;
`;

const WorkoutTips = styled.div`
  padding: 1.5rem;
  background-color: #e8f4fd;
  border-radius: 4px;
`;

const TipsTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const TipsList = styled.ul`
  padding-left: 1.5rem;
`;

const TipItem = styled.li`
  margin-bottom: 0.5rem;
  color: #666;
`;

const InfoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InfoSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 1.5rem 0 0.5rem;
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const InfoList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
`;

const InfoNote = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 0 4px 4px 0;
`;

export default WorkoutPlanner;
