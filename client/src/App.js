import Books from "./components/Books";
import Authors from "./components/Authors";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import EditBook from "./components/EditBook";
import EditAuthor from "./components/EditAuthor";
const { Header, Content } = Layout;
function App() {
  const navItems = [
    {
      label: "Books",
      link: "/",
    },
    {
      label: "Authors",
      link: "/authors",
    },
    {
      label: "Add Book",
      link: "/add-book",
    },
    {
      label: "Add Author",
      link: "/add-author",
    },
  ];
  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            {navItems.map((item, index) => (
              <Menu.Item key={index}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/add-author" element={<AddAuthor />} />
            <Route path="/edit-book/:bookId" element={<EditBook />} />
            <Route path="/edit-author/:authorId" element={<EditAuthor />} />

          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
