import dayjs from 'dayjs';

export function exportToCsv<T extends Record<string, any>>(filename: string, rows: T[]) {
	if (!rows.length) return;

	const headers = Object.keys(rows[0]!);

	const escape = (value: any) => {
		if (value == null) return '';
		const str = String(value);
		return `"${str.replace(/"/g, '""')}"`;
	};

	const csv = [
		headers.join(','),
		...rows.map((row) => headers.map((h) => escape(row[h])).join(',')),
	].join('\n');

	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${filename}-${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.csv`);
	link.click();

	URL.revokeObjectURL(url);
}
