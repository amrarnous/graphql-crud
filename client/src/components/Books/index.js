import { useEffect, useState } from "react";
import { GET_BOOKS } from "../../GraphQL/Queries";
import { REMOVE_BOOK } from '../../GraphQL/Mutations'
import { useQuery, useMutation } from "@apollo/client";
import { Table, Modal, Col, Row, Divider, Alert, Button } from "antd";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const booksData = useQuery(GET_BOOKS);
  const [removeBookMutation, { loading, error }] = useMutation(REMOVE_BOOK, {
    refetchQueries: [
      GET_BOOKS
    ]
  });
  useEffect(() => {
    setBooks(booksData.data);
  }, [booksData.data]);
  const removeBookConfirmation = (book) => {
    Modal.warning({
      title: `Delete ${book.name}`,
      content: (
      <div>
        <p>Are you sure that you want to delete {book.name} ?</p>
      </div>
    ),
    closable: true,
    okText: 'Yes, Remove',
    okType: 'danger',
    onOk() {
      removeBook(book.id)
    },
    })
  }
  const removeBook = (bookId) => {
      removeBookMutation({ variables: { id: bookId } })
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => author?.name,
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: '',
      render: (book) => (
        <>
        <Button style={{ margin: '0px 8px' }}>
          <Link to={`/edit-book/${book.id}`}>Edit</Link>
        </Button>
        <Button style={{ margin: '0px 8px' }} type="primary" danger onClick={() => removeBookConfirmation(book)}>Remove</Button>
        </>
      )
    }
  ];
  if (error)
    return (
      <Row style={{ padding: "50px 0px" }}>
        <Col span="18" offset="3">
          <Alert
            message="Error Getting Books"
            description={error.message}
            type="error"
          />
        </Col>
      </Row>
    );
  return (
    <div className="container">
      <Row style={{ padding: "50px 0px" }}>
        <Col span="18" offset="3">
          <h1>Books List</h1>
          <Divider />
          <Table loading={booksData.loading || loading} columns={columns} dataSource={books?.books} />
        </Col>
      </Row>
    </div>
  );
}

export default Books;
