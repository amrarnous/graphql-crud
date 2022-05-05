import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { UPDATE_AUTHOR } from "../../GraphQL/Mutations";
import { GET_AUTHOR } from "../../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  Form,
  Input,
  Button,
  Divider,
  Spin,
  Col,
  Row,
  Alert,
  Result,
} from "antd";
function EditAuthor() {
  const [authorUpdated, setAuthorUpdated] = useState(false);
  const [fields, setFields] = useState([]);
  const urlParams = useParams();
  const getAuthor = useQuery(GET_AUTHOR, {
    variables: { id: urlParams.authorId },
  });
  const [updateAuthor, { data, loading, error }] = useMutation(UPDATE_AUTHOR, {
    onCompleted: () => {
      setAuthorUpdated(true);
      setTimeout(() => {
        setAuthorUpdated(false);
      }, 3500);
    },
    refetchQueries: [GET_AUTHOR],
  });

  useEffect(() => {
    console.log(getAuthor.data);

    setFields([
      {
        name: "authorname",
        value: getAuthor?.data?.author.name,
      },
      {
        name: "age",
        value: getAuthor?.data?.author.age,
      },
    ]);
  }, [getAuthor.data]);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const getValues = () => {
    let { authorname, age } = form.getFieldsValue();
    if (authorname === "" || age === "") {
      alert("The Data is not Complete");
    } else {
      updateAuthor({
        variables: {
          id: getAuthor.data.author.id,
          name: authorname,
          age: parseInt(age),
        },
      });
    }
  };
  if (getAuthor?.error) {
    return (
      <Result
        status="error"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/authors">
            <Button type="primary">Back To Authors</Button>
          </Link>
        }
      />
    );
  } else {
    return (
      <div className="container">
        <Row style={{ padding: "50px 0px" }}>
          <Col span="18" offset="3">
            <Spin spinning={getAuthor?.loading} tip="Fetching Author Info">
              <h1>Add Author</h1>
              <Divider />
              <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                size="large"
                onFinish={onFinish}
                fields={fields}
              >
                <Form.Item label="Author Name" name="authorname">
                  <Input placeholder="Enter Author Name" value="" />
                </Form.Item>
                <Form.Item label="Author Age" name="age">
                  <Input placeholder="Enter Author Age" value="" />
                </Form.Item>
                <Button
                  onClick={getValues}
                  loading={loading}
                  style={{ marginBottom: "16px" }}
                >
                  Update Author
                </Button>
                {authorUpdated ? (
                  <Alert
                    message={`Added`}
                    description={`${data?.updateAuthor.name} Updated Successfuly`}
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

export default EditAuthor;
