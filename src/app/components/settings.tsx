import React from 'react';

export type SettingsType = {
	volume: number;
}

export const Settings = ({ settings, setSettings }: { settings: SettingsType, setSettings: React.Dispatch<React.SetStateAction<SettingsType>> }) => {
	return (<div className='text-black'>
		<div className='flex flex-row'>
			<input type='range' id='volume' className='grow' min={0} max={100} value={settings['volume'] || 50} onChange={(e) => setSettings(prev => ({ ...prev, volume: parseInt(e.target.value) }))} />
			<label htmlFor='volume' className='mx-2'>音量: {settings['volume'] || 50}</label>
		</div>
	</div>)
}
