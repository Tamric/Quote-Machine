//get quotes from server here
const _url =new URL('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
export const fetchQuotes = async () =>
{
	const data =[... await new Promise((resolve)=>{
		fetch(
			_url,
			{
				method: 'GET',
				accept: 'text/html,application/xhtml+xml,application/xml;',
			}
		).then(
			res=>res.json()
		).then(
			res=>resolve(res.quotes)
		).catch(
			 e=>{resolve([{"quote": 'The internet is currently acting funny.', "author": 'The Browser'}])}
			)})]
	return data;
}

