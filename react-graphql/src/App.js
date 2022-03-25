import { gql, useQuery } from "@apollo/client";
import "./App.css";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return "<p>ローディング中です</p>";
  if (error) return "<p>エラーが発生しています。<p>";

  return (
    <div className="App">
      <div style={{ margin: "3em" }}>
        <h1>GraphQL</h1>
        {data.users.map((user) => (
          <div key={user.id}>Name: {user.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
