import { useEffect, useState } from "react";
import { Col, Row, Alert } from "antd";
import { ADD_BOOK } from '../../GraphQL/Mutations'
import { GET_AUTHORS } from "../../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  Form,
  Input,
  Button,
  Select,
  Divider
} from 'antd';
function AddBook() {
  const GetAuthors = useQuery(GET_AUTHORS);
  const [authors, setAuthors] = useState([])
  const [bookAdded, setBookAdded] = useState(false)
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      setBookAdded(true);
        setTimeout(() => {
            setBookAdded(false);
         }, 3000)
    }
  });
  useEffect(() => {
    setAuthors(GetAuthors.data?.authors)
  }, [GetAuthors]);
  const genres = [
    "Action",
    "Sci-fi",
    "Drama",
    "Romance",
    "Fiction"
  ]
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log(values);
    };
    const getValues = () => {
      let { bookname, author, genre } = form.getFieldsValue()
      console.log(bookname === "")
      if (bookname === "" || author === "" || genre === ""){
        alert('The Data is not Complete');
      }else {
        console.log(author)
        addBook({ variables: { name: bookname, authorId: author, genre } })
      }
    }
  // if ('error')
  //   return (
  //     <Row style={{ padding: "50px 0px" }}>
  //       <Col span="18" offset="3">
          
  //       </Col>
  //     </Row>
  //   );

  return (
    <div className="container">
      { (loading) ?? ('Submitting...')  }
      <Row style={{ padding: "50px 0px" }}>
        <Col span="18" offset="3">
          <h1>Add Book</h1>
          <Divider />
          <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              size="large"
              onFinish={onFinish}
            >
                  <Form.Item label="Book Name" name="bookname" >
                  <Input placeholder="Enter Book Name" value=""/>
                </Form.Item>
                 <Form.Item label="Author Name" name="author">
                  <Select placeholder="Select Author">
                      {authors?.map((author) => (
                      <Select.Option key={author.id} value={author.id}>{author.name}</Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Genre" name="genre">
                  <Select placeholder="Select Genre">
                      {genres?.map((genre, index) => (
                      <Select.Option key={index} value={genre}>{genre}</Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Button onClick={getValues} loading={loading} style={{ marginBottom: '16px'}}>Add Book</Button>
                { bookAdded ? (
                  <Alert
                    message={`Added`}
                    description={`${data?.addBook.name} Book Added Successfuly`}
                    type="success"
                    closable
                  />
                ): '' }
                {
                  error ? (
                      <Alert
                    message={`Error`}
                    description={`Something Went Wrong, Please Refresh the page and try again`}
                    type="error"
                    closable
                  />
                  ) : ''
                }
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddBook;
