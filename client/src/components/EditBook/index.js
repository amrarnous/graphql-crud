import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Alert,
  Spin,
  Result,
  Form,
  Input,
  Button,
  Select,
  Divider,
} from "antd";
import { UPDATE_BOOK } from "../../GraphQL/Mutations";
import { GET_AUTHORS, GET_BOOK } from "../../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
function EditBook() {
  let urlParams = useParams();
  const GetAuthors = useQuery(GET_AUTHORS);
  const [authors, setAuthors] = useState([]);
  const [bookUpdated, setBookUpdated] = useState(false);
  const [fields, setFields] = useState([]);
  const getBook = useQuery(GET_BOOK, {
    variables: { id: urlParams.bookId },
  });
  const [updateBook, { data, loading, error }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      setBookUpdated(true);
      setTimeout(() => {
        setBookUpdated(false);
      }, 3000);
    },
  });
  useEffect(() => {
    setAuthors(GetAuthors.data?.authors);
    setFields([
      {
        name: "bookname",
        value: getBook.data?.book.name,
      },
      {
        name: "author",
        value: getBook.data?.book.author.id,
      },
      {
        name: "genre",
        value: getBook.data?.book.genre,
      },
    ]);
  }, [getBook, GetAuthors]);
  const genres = ["Action", "Sci-fi", "Drama", "Romance", "Fiction"];
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const getValues = () => {
    let { bookname, author, genre } = form.getFieldsValue();
    console.log(bookname === "");
    if (bookname === "" || author === "" || genre === "") {
      alert("The Data is not Complete");
    } else {
      console.log(author);
      updateBook({
        variables: {
          id: getBook.data.book.id,
          name: bookname,
          authorId: author,
          genre,
        },
      });
    }
  };
  if (getBook?.error) {
    return (
      <Result
        status="error"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back To Books</Button>
          </Link>
        }
      />
    );
  } else {
    return (
      <div className="container">
        <Row style={{ padding: "50px 0px" }}>
          <Col span="18" offset="3">
            <Spin spinning={getBook.loading} tip="Loading...">
              <h1>Edit {getBook.data?.book.name}</h1>
              <Divider />
              <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                size="large"
                onFinish={onFinish}
                fields={fields}
                loading={loading}
              >
                <Form.Item label="Book Name" name="bookname">
                  <Input placeholder="Enter Book Name" />
                </Form.Item>
                <Form.Item label="Author Name" name="author">
                  <Select placeholder="Select Author">
                    {authors?.map((author) => (
                      <Select.Option key={author.id} value={author.id}>
                        {author.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Genre" name="genre">
                  <Select placeholder="Select Genre">
                    {genres?.map((genre, index) => (
                      <Select.Option key={index} value={genre}>
                        {genre}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  onClick={getValues}
                  loading={loading}
                  style={{ marginBottom: "16px" }}
                >
                  Edit Book
                </Button>
                {bookUpdated ? (
                  <Alert
                    message={`Added`}
                    description={`${data?.updateBook.name} Book Added Successfuly`}
                    type="success"
                    closable
                  />
                ) : (
                  ""
                )}
                {error ? (
                  <Alert
                    message={`Error`}
                    description={`Something Went Wrong, Please Refresh the page and try again`}
                    type="error"
                    closable
                  />
                ) : (
                  ""
                )}
              </Form>
            </Spin>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditBook;
