import { ScenarioDefinition } from '../../types/scenario';
import { case01_shinjukuTail } from './case01_shinjukuTail';
import { case02_entranceHall } from './case02_entranceHall';
import { case03_roomSurveillance } from './case03_roomSurveillance';
import { case04_kantoBroadcast } from './case04_kantoBroadcast';

export const ALL_SCENARIOS: ScenarioDefinition[] = [
  case01_shinjukuTail,
  case02_entranceHall,
  case03_roomSurveillance,
  case04_kantoBroadcast,
];

export function getScenarioById(id: string): ScenarioDefinition | undefined {
  return ALL_SCENARIOS.find(s => s.id === id);
}

export function getDefaultScenario(): ScenarioDefinition {
  return case01_shinjukuTail;
}
