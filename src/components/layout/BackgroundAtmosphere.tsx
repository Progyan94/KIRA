import React from 'react';
import { GameSettings } from '../../types/settings';

interface Props {
  settings: GameSettings;
}

export const BackgroundAtmosphere: React.FC<Props> = ({ settings }) => {
  return (
    <div className="app-atmosphere" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-vignette" />
      {settings.filmGrainEnabled && <div className="bg-film-grain" />}
      {settings.scanlinesEnabled && <div className="scanlines-overlay" />}
    </div>
  );
};
