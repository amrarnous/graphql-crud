import { useState } from "react";
import { Col, Row, Alert } from "antd";
import { ADD_AUTHOR } from '../../GraphQL/Mutations'
import { useMutation } from "@apollo/client";
import {
  Form,
  Input,
  Button,
  Divider
} from 'antd';
function AddAuthor() {
  const [authorAdded, setAuthorAdded] = useState(false)
  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR, {
    onCompleted: () => {
        setAuthorAdded(true)
        setTimeout(() => {
            setAuthorAdded(false)
        }, 3500)
    }
  });


    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log(values);
    };
    const getValues = () => {
      let { authorname, age } = form.getFieldsValue()
      if (authorname === "" || age === "" ){
        alert('The Data is not Complete');
      }else {
        addAuthor({ variables: { name: authorname, age: parseInt(age) } })
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
          <h1>Add Author</h1>
          <Divider />
          <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              size="large"
              onFinish={onFinish}
            >
                  <Form.Item label="Author Name" name="authorname" >
                  <Input placeholder="Enter Author Name" value=""/>
                </Form.Item>
                 <Form.Item label="Author Age" name="age" >
                  <Input placeholder="Enter Author Age" value=""/>
                </Form.Item>
                <Button onClick={getValues} loading={loading} style={{ marginBottom: '16px'}}>Add Author</Button>
                { authorAdded ? (
                  <Alert
                    message={`Added`}
                    description={`${data?.addAuthor.name} Added Successfuly`}
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

export default AddAuthor;
