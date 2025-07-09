import React from 'react';

export type SettingsType = {
	volume: number;
}

export const Settings = ({ settings, setSettings }: { settings: SettingsType, setSettings: React.Dispatch<React.SetStateAction<SettingsType>> }) => {
	return (<div className='text-black'>
		<input type='range' id='volume' min={0} max={100} value={settings['volume'] || 50} onChange={(e) => setSettings(prev => ({ ...prev, volume: parseInt(e.target.value) }))} />
		<label htmlFor='volume' className='mx-2'>Volume: {settings['volume'] || 50}</label>
	</div>)
}
