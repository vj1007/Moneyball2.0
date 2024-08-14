import React, {useState}from "react";
import { useNavigate } from 'react-router-dom';
import { teamName } from "../Content/TeamList";
import { playerPosition } from "../Content/PlayerPosition";
import {Layout, Menu, theme } from 'antd';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';

const imageUrl = 'hi'
const item = [
  {
    label: <img width='200' height='30' src={require('./Moneyball .png')}/>,
    key: 'home',
    
  },
  {
    label: 'Home',
    key: 'home',
    
  },
  {
    label: 'Tool',
    key: 'firsttool',
    
  },
  {
    label: 'Contact Us',
    key: 'contactus',
    
  },
  {
    label:'Log Out',
    key: 'login',
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const { Header, Content, Footer } = Layout;

const onTeamSearch = (value) => {
  console.log('search:', value);
};

const onPositionSearch = (value) => {
    console.log('search:', value);
  };

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

// Filter `option.label` match the user type `input`
const filterOption = (input,teamName) =>
teamName.map(option => option.toLowerCase().includes(input.toLowerCase()))


function FirstTool(){


  
  const [team, setTeam] = useState('');
  
  const [optionsTeam, setOptionsTeam] = useState(teamName);
  
  const [result, setResult] = useState('');
  const [current, setCurrent] = useState('firsttool');


  const navigate = useNavigate()


  const filteredOptionsTeam = optionsTeam.filter(option =>
    option.toLowerCase().includes(team.toLowerCase())
  );
 

  
  // Event handler for team change
  const handleTeamChange = (event) => {
    setTeam(event);
  };

  const menuChange = (e) => {
    //navigate(`/${item}`,{replace: false})
    console.log('click ', e);
    setCurrent(e.key);
    navigate(`/${e.key}`)
    
  };
  // Event handler for form submission
  const handleSubmit = async() => {
    //event.preventDefault();
    // Here, you can use the stored input values as needed, such as sending them to an API
    
    console.log('Team:', team);
    
    try {
        console.log('Generating click...');
        const response = await fetch('/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            team
          }),
        });
        console.log('Click done');
        if (response.ok) {
          console.log('Response is okay');
          const data = await response.json();
          console.log(data.output); // Handle the output as needed
          const resultArray = Array.isArray(data.output) ? data.output : [data.output];
          
          setResult(resultArray);
  
          // Navigate to another page with the result
          navigate(`/chart`, { state: { result: resultArray, team: team  }});
  
        } else {
          console.log('Response is not okay');
          const error = await response.json();
          console.error(error.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }

  };

  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout>
      <Header
      
        
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={item}
          
          
          onClick={menuChange}
          style={{
            gap:'9.5%',
           
          }}
        />
      </Header>
      <Content
        theme='dark'
        style={{
          padding: '115px 350px',
          
          
          
        }}
      
      >
        
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Form
    {...formItemLayout}
    variant="filled"
    style={{
      
      
    }}
    onFinish={handleSubmit}
  >
    

    

    

    <Form.Item
      label="Choose your team"
      
      name="Select"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Select
    showSearch
    placeholder="Choose your team"
    optionFilterProp="children"
    onSearch={onTeamSearch}
    filterOption={filteredOptionsTeam}
    value={team} 
    onChange={handleTeamChange}
    >
        {filteredOptionsTeam.map((teamName, index) => (
              <Select.Option key={index} value={teamName}>{teamName}</Select.Option>
            ))}
    </Select>
    </Form.Item>

    

    


    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Visualize Team Stats
      </Button>
    </Form.Item>
  </Form>
          
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          
        }}
      >
        MoneyBall 2.0 ©{new Date().getFullYear()} Created by Team 14
      </Footer>
    </Layout>
    </div>
  );
}

export default FirstTool;