import { useEffect, useState } from "react";
import { GET_AUTHORS } from "../../GraphQL/Queries";
import { REMOVE_AUTHOR } from "../../GraphQL/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import {
  Table,
  Button,
  Modal,
  List,
  Card,
  Col,
  Row,
  Divider,
  Alert,
} from "antd";
import { Link } from "react-router-dom";
function Authors() {
  const authorsData = useQuery(GET_AUTHORS);
  const [removeAuthorMutation, { loading }] = useMutation(REMOVE_AUTHOR, {
    refetchQueries: [GET_AUTHORS],
  });
  const removeAuthorConfirmation = (author) => {
    Modal.warning({
      title: `Delete ${author.name}`,
      content: (
        <div>
          <p>
            Are you sure that you want to delete Author {author.name} ?
            <br /> This gonna delete the author and all his related books
          </p>
          <Card title="Books name">
            <List
              grid={{ gutter: 8, column: 1 }}
              dataSource={author.books}
              renderItem={(item, index) => (
                <List.Item>{index + 1 + ". " + item.name}</List.Item>
              )}
            />
          </Card>
        </div>
      ),
      closable: true,
      okText: "Yes, Remove",
      okType: "danger",
      onOk() {
        removeAuthor(author.id);
      },
    });
  };
  const removeAuthor = (authorId) => {
    removeAuthorMutation({ variables: { id: authorId } });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Books",
      dataIndex: "",
      key: "books",
      render: (author) => (
        <>
          <span>{author.books.length}</span>
        </>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "",
      render: (author) => (
        <>
          <Link to={`/edit-author/${author.id}`}>
            <Button style={{ margin: "0px 8px" }}>Edit</Button>
          </Link>
          <Button
            style={{ margin: "0px 8px" }}
            type="primary"
            danger
            onClick={() => removeAuthorConfirmation(author)}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];
  if (authorsData.error)
    return (
      <Row style={{ padding: "50px 0px" }}>
        <Col span="18" offset="3">
          <Alert
            message="Error Getting Authors"
            description={authorsData.error.message}
            type="error"
          />
        </Col>
      </Row>
    );

  return (
    <div className="container">
      <Row style={{ padding: "50px 0px" }}>
        <Col span="18" offset="3">
          <h1>Authors List</h1>
          <Divider />
          <Table
            columns={columns}
            dataSource={authorsData?.data?.authors}
            loading={authorsData.loading || loading}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Authors;
