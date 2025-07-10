export const splitText = (text: string) => {
	const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
	const splited = lines.map(line => { return line.split(/[,\s]+/) })

	return splited
}
