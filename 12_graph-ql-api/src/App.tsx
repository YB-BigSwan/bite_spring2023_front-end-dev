import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRY_DATA = gql`
	query {
		countries {
			code
			name
			continent {
				name
			}
		}
	}
`;

function App() {
	const { loading, error, data } = useQuery(GET_COUNTRY_DATA);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<div className='App'>
			<table>
				<tbody>
					<tr>
						<th>Code</th>
						<th>Country</th>
						<th>Continent</th>
					</tr>
					{data.countries.map((info: any, index: number) => (
						<tr key={index}>
							<td>{info.code}</td>
							<td>{info.name}</td>
							<td>{info.continent.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
