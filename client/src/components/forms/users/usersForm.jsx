import { Form, Input, Row, Col } from "antd";

const UsersForm = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  // Función para manejar el envío del formulario
  const handleFinish = (values) => {
    console.log("Formulario enviado:", values);
    onFinish?.(); // Llama a la función onFinish pasada como prop
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleFinish}
      layout="vertical" // Establece el diseño vertical del formulario
    >
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Usuario"
            name="username"
            rules={[
              { required: true, message: "Por favor ingrese un usuario" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Apellido"
            name="lastname"
            rules={[
              { required: true, message: "Por favor ingrese un apellido" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Estado"
            name="status"
            rules={[
              { required: true, message: "Por favor seleccione un estado" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Por favor ingrese un email" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: "Por favor ingrese una edad" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UsersForm;
