import Matter from '../node_modules/matter-js/build/matter';

const Physics = (entities, {touches, time}) => {
  let engine = entities.physics.engine;
  let bird = entities.bird.body;

  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.applyForce(bird, bird.position, {x: 0.0, y: 0.7});
      engine.world.gravity.y = 0.5;
    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
